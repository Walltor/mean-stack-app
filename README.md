# Real Estate Management App 
A web application built using the MEAN stack (MongoDB, Express.js, Angular, and Node.js).

## Features
- [MongoDB 7.0](https://www.mongodb.com/docs/)
- [Node.js 20.x](https://nodejs.org/en/download/package-manager/)
- [Express.js 4.x](https://expressjs.com/en/4x/api.html/)
- [Angular 17.x](https://angular.io/docs/)

## Installation
- Install [MongoDB](https://www.mongodb.com/try/download/community-kubernetes-operator/).
- (Optional) Install [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database).
- Install [Node.js](https://nodejs.org/en/download/package-manager).
- Set up the project directory and backend.
```bash
mkdir mean-stack-app
cd mean-stack-app
mkdir backend
cd backend
npm init -y
```
- Install Express.js and other required Node packages.
```bash 
npm install express mongoose body-parser cors bcrypt jsonwebtoken multer
```
- Setup the frontend with Angular.
```bash
npm install -g @angular/cli
ng new frontend --no-standalone --routing --ssr=false
cd frontend
npm install mongodb jquery bootstrap slick-carousel ngx-slick-carousel
```
## Setup
- Clone the git repository and place the 'backend' and 'frontend' directories in your project directory.
```bash
git clone https://github.com/Walltor/mean-stack-app.git
```
- Configure your connection to MongoDB (replace 'myapp' with your database name).
```json
mongoose.connect('mongodb://127.0.0.1:27017/myapp');
```
- Update your Angular configuration to include the installed styles and scripts.  
In 'angular.json', modify the "styles" and "scripts" sections to include:
```json
"styles": [
  "src/styles.css",
  "node_modules/slick-carousel/slick/slick.scss",
  "node_modules/slick-carousel/slick/slick-theme.scss"
],
"scripts": [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/slick-carousel/slick/slick.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```
## Running the Application
- Run the backend server.
```bash
cd backend
node server.js
```
- Run the Angular application.
```bash
cd frontend
ng serve
```
- Open your browser and navigate to http://localhost:4200 to see your application.
## Notes
- Make sure MongoDB is running if you're using a local instance.
- If using MongoDB Atlas, update the connection string in your backend configuration accordingly.