# File: Portfolio_Project/nginx/Dockerfile
FROM nginx:1.25-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY maimoonamin.com.conf /etc/nginx/conf.d/

# Create healthcheck endpoint directory
RUN mkdir -p /usr/share/nginx/html && echo "OK" > /usr/share/nginx/html/health

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]