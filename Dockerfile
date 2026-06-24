FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy website files
COPY index.html /usr/share/nginx/html/index.html
COPY register.html /usr/share/nginx/html/register.html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
