FROM node:10

RUN apt-get update && apt-get install -y nginx

RUN adduser --disabled-password --gecos ""  www \
    && mkdir /www \
    && mkdir -p /run/nginx \
    && touch /run/nginx/nginx.pid \
    && chown -R www:www /var/lib/nginx \
    && chown -R www:www /run/nginx \
    && chown -R www:www /www 

COPY nginx.conf /etc/nginx/nginx.conf

# Create app directory
RUN mkdir /src
WORKDIR /src
COPY . /src
EXPOSE 80
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT /entrypoint.sh