# [Shopping](https://shoppingmernappjs.herokuapp.com/)

This is an eCommerce web application created with MERN Stack. It has user authentication system, an admin user who can add new products in the app, check for order and payments and also choose which order has been delivered from the store. It is also connected to PayPal for payments. 


## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)
- Cropped Image Upload(Working on it)

## How to use this repo

### install node_modules

- Frontend
  
  ```bash
  ~\Shopping> cd frontend
  ~\Shopping\frontend> npm install
  ~\Shopping\frontend> cd ..
  ```

- Backend
  
  ```bash
  ~\Shopping> npm install
  ```

### configure environment variables

1. Create a `.env` file in `Shopping folder
2. Add the following variables to it
   
   ```env
    NODE_ENV = production
    PORT = 5000
    MONGO_URL =  
    JWT_SECRET = 
    PAYPAL_CLIENT_ID = 
   ```

   - `NODE_ENV` is used to state whether a particular environment is a `production` or a `development` environment.
   - `PORT` is the port the server will listen on.
   - `MONGO_URL` is mongo atlas's connection string. You can find my details in [here](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/)
   - `JWT_SECRET` is
   - `PAYPAL_CLIENT_ID`

### Update new code to heroku

- Login in to heroku in master branch
  
  ```
  heroku login
  ```
- push code to heroku
  ```
  git push heroku master
  ```

## Built with

- NodeJs
- Express
- ReactJs
- Redux
- MongoDb
- React Hooks
- React Bootstrap
- Axios
- Bcrypt
- JSON Web Tokens
- Prettier
- Eslint
- React Helmet

## Live Version

https://shoppingmernappjs.herokuapp.com/


## Acknowledgments

- Website: [traversy-media](http://traversymedia.com/)

