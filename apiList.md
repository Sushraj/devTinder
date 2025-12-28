-POST /signup
-POST /login
-POST /logout

## profileRouter

-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## connectionRequestRouter

-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## userRouter

-GET /user/connections
-GET /user/requests
-GET /user/feed - gets you the profiles of other users on platform

Status : ignore, intrested, accepted, rejected



### Deployment steps ###

- signup on AWS
- Lunch EC2 instance  (while lunch we create pem file)
- chmod 400 <secret>.pem
- ssh -i <secret>.pem ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com<region>
- after hitting above command we can access server in terminal.
- install NodeJS (install node version that code working as expected)
- if you want to log-out from server terminal then type 'exit'.
- command for installing node nvm install <version>
- Git clone
- Frontend project
    - install dependencies using npm install
    - here we used vite bundler for build 
    - when we hit build command <$npm run build> it will create dist folder and this folder contains all code you have to run on the server.
    - NGINX (engine X) :- free open source software use for multiple purpose like Web server, Load Balancer, Reverse Proxy,content cache , mail proxy.
    - We use here NGINX for host our project 
    - how to install NGINX over server
            - sudo apt update
            - sudo apt install nginx
            - sudo systemctl start nginx  ---> this is command to start nginx in our system.
            - sudo systemctl enable nginx  
            - Copy code from dist folder (build files) to /var/www/html/    ---->NGINX HTTP server
            - Consider my frontend project folder name is 'DevTinder-web' so it will look like  ubuntu@ip-172-31-4-118:~/devtinder-web$ sudo scp -r dist/*  /var/www/html.
            - find out public IP of AWS EC2 instance.
            - By default AWS blocks all your ports you need to enable port :80
            - for enabling  port you have to navigate to ec2 instance and under security tab you will have security groups in that security group you have inbound rules you have to add rule and give you port number eg. :80.




-Backend Project
      - Install dependencies
      - npm start
      - Allowed ec2 instance public IP on mongoDbserver
      - also enable port :7777 from ec2 instance securityy group --> inbound rules.
      - Application is only  be  running  till my  terminal successfully running if i close the terminal or exit terminal it will not run and also we cannot keep forever active terminal :)  
      - So , solving above problem we using PM2 - this is daemon process manager that will help you manage and keep your application online 24/7.
      - npm install pm2 -g 
      - pm2 start npm --name "devtinderbackend" --start    ----> now we running npm start via process manager so our application live 24/7.
      - pm2 logs
      - pm2 flush <application_name>
      - pm2 list 
      - pm2 stop <application_name>
      - pm2 delete <application_name>
      - pm2 start npm --name "devtinderbackend" -- start
      - config nginx  - /etc/nginx/sites-available/default.
      - Modify the BASEURL in frontend project to "/api".

    


 ### NGINX config:

      - Frontend :- http://43.204.96.49:7777/
      - Backend :- http://43.204.96.49:7777/

        server_name <IP address or domain name>;

        location /api/ {
            proxy_pass http://localhost:7777/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
    }
     - After nginx configuration changes please restart nginx server using below command $ sudo systemctl restart nginx.




  




