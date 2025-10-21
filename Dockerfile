# Simple, production-grade static hosting via Nginx
FROM nginx:alpine

# (Optional) remove default Nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy your static site (index.html, css/, js/, images/, etc.)
COPY . /usr/share/nginx/html

# Nginx listens on 80 by default
EXPOSE 80

# Use the default Nginx CMD
