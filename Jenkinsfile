pipeline {
  agent any

  environment {
    APP_NAME   = 'my-static-site'
    HTTP_PORT  = '80'       // host port on EC2
    IMAGE_TAG  = "website:${env.BUILD_NUMBER}"
    IMAGE_LATEST = 'website:latest'
  }

  options {
    timestamps()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          docker build -t ${IMAGE_TAG} -t ${IMAGE_LATEST} .
        '''
      }
    }

    stage('Deploy Container') {
      steps {
        sh '''
          set -eux

          # Stop & remove old container if exists
          docker ps -a --format '{{.Names}}' | grep -w ${APP_NAME} && \
            docker rm -f ${APP_NAME} || true

          # Run new container
          docker run -d --name ${APP_NAME} \
            --restart=always \
            -p ${HTTP_PORT}:80 \
            ${IMAGE_LATEST}

          # Health check
          sleep 2
          curl -fsS http://127.0.0.1:${HTTP_PORT} > /dev/null
        '''
      }
    }

    stage('Cleanup old images (optional)') {
      steps {
        sh '''
          # Keep :latest and current build, prune everything else
          docker image prune -f
        '''
      }
    }
  }

  post {
    success {
      echo "Deployed: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)/"
    }
    failure {
      sh 'docker logs ${APP_NAME} || true'
    }
  }
}
