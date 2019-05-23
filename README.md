# Full-Stack Javascript Application (MERN Stack) using SendGrid and Stripe

To make this application work, there are a few steps to take. Firstly run the following command: 

## npm install

Make sure you run npm install in client folder too, as that's our create-react-app server. 

once done, you need to run the following command: 

## npm run dev

Which runs both your client server, nodemon, and also the localtunnel. We've used localtunnel in order to communicate with SendGrid. 

Libraries Used for this project: 

-Passport JS
-Axios
-React-Redux
-React-Router-Dom
-SendGrid
-Stripe
-Localtunnel
-Nodemon
-Lodash

## Caution: 

As there are two servers, and nodemon automatically restarts on every cange, your client server will be restarted too! I've tried ignoreing the folder, but I haven't been successful yet. So if it takes sometimes for your API requests to finalize, it's just normal.
