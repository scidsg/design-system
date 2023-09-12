#!/bin/bash

# Welcome message and ASCII art
cat << "EOF"
███████ ██ ███    ███ ██████  ██      ███████ 
██      ██ ████  ████ ██   ██ ██      ██      
███████ ██ ██ ████ ██ ██████  ██      █████   
     ██ ██ ██  ██  ██ ██      ██      ██      
███████ ██ ██      ██ ██      ███████ ███████ 

██████  ███████ ███████ ██  ██████  ███    ██ 
██   ██ ██      ██      ██ ██       ████   ██ 
██   ██ █████   ███████ ██ ██   ███ ██ ██  ██ 
██   ██ ██           ██ ██ ██    ██ ██  ██ ██ 
██████  ███████ ███████ ██  ██████  ██   ████ 
                                              
███████ ██    ██ ███████ ████████ ███████ ███    ███ 
██       ██  ██  ██         ██    ██      ████  ████ 
███████   ████   ███████    ██    █████   ██ ████ ██ 
     ██    ██         ██    ██    ██      ██  ██  ██ 
███████    ██    ███████    ██    ███████ ██      ██ 
                                                     
Build resilient websites.

A free resource by Science & Design - https://scidsg.org
EOF
sleep 3

#Update and upgrade
sudo apt update && sudo apt -y dist-upgrade && sudo apt -y autoremove

# Install required packages
sudo apt-get -y install git nginx whiptail tor libnginx-mod-http-geoip geoip-database unattended-upgrades libssl-dev

# Function to display error message and exit
error_exit() {
    echo "An error occurred during installation. Please check the output above for more details."
    exit 1
}

# Trap any errors and call the error_exit function
trap error_exit ERR

SITE_NAME=$(whiptail --title "Site Name" --inputbox "Name your site:" 8 60 "new-site" 3>&1 1>&2 2>&3)


export SITE_NAME

# Create Tor configuration file
sudo tee /etc/tor/torrc << EOL
RunAsDaemon 1
HiddenServiceDir /var/lib/tor/$SITE_NAME/
HiddenServicePort 80 127.0.0.1:80
EOL

# Restart Tor service
sudo systemctl restart tor.service
sleep 10

# Get the Onion address
ONION_ADDRESS=$(sudo cat /var/lib/tor/$SITE_NAME/hostname)

# Configure Nginx
cat > /etc/nginx/sites-available/$SITE_NAME.nginx << EOL
server {
        root /var/www/html/$SITE_NAME;
        server_name localhost;
                
        add_header Strict-Transport-Security "max-age=63072000; includeSubdomains";
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header Onion-Location http://$ONION_ADDRESS\$request_uri;
        add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'none'; form-action 'none'";
        add_header Permissions-Policy "geolocation=(), midi=(), notifications=(), push=(), sync-xhr=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), speaker=(), vibrate=(), fullscreen=(), payment=(), interest-cohort=()";
        add_header Referrer-Policy "no-referrer";
        add_header X-XSS-Protection "1; mode=block";
}
server {
        server_name $ONION_ADDRESS;
        access_log /var/log/nginx/hs-my-website.log;
        index index.html;
        root /var/www/html/$SITE_NAME;
                
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'none'; form-action 'none'";
        add_header Permissions-Policy "geolocation=(), midi=(), notifications=(), push=(), sync-xhr=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), speaker=(), vibrate=(), fullscreen=(), payment=(), interest-cohort=()";
        add_header Referrer-Policy "no-referrer";
        add_header X-XSS-Protection "1; mode=block";
}
EOL

# Configure Nginx with privacy-preserving logging
cat > /etc/nginx/nginx.conf << EOL
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;
events {
        worker_connections 768;
        # multi_accept on;
}
http {
        ##
        # Basic Settings
        ##
        sendfile on;
        tcp_nopush on;
        types_hash_max_size 2048;
        # server_tokens off;
        server_names_hash_bucket_size 128;
        # server_name_in_redirect off;
        include /etc/nginx/mime.types;
        default_type application/octet-stream;
        ##
        # SSL Settings
        ##
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;
        ##
        # Logging Settings
        ##
        # access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;
        ##
        # Gzip Settings
        ##
        gzip on;
        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
        ##
        # Virtual Host Configs
        ##
        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
        ##
        # Enable privacy preserving logging
        ##
        geoip_country /usr/share/GeoIP/GeoIP.dat;
        log_format privacy '0.0.0.0 - \$remote_user [\$time_local] "\$request" \$status \$body_bytes_sent "\$http_referer" "-" \$geoip_country_code';

        access_log /var/log/nginx/access.log privacy;
}
EOL

sudo ln -sf /etc/nginx/sites-available/$SITE_NAME.nginx /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

if [ -e "/etc/nginx/sites-enabled/default" ]; then
    rm /etc/nginx/sites-enabled/default
fi
ln -sf /etc/nginx/sites-available/$SITE_NAME.nginx /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx || error_exit

cd /var/www/html
git clone https://github.com/scidsg/design-system.git
mv design-system $SITE_NAME

echo "
✅ The Design System installation is complete! You can access it using Tor Browser by entering the address below:
                                               
http://$ONION_ADDRESS
"

# Disable the trap before exiting
trap - ERR