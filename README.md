# Quiz App API

This is a project that I created for the Quiz App that I want to build with ReactJS. I could create a simple NextJS application but I think it is okay and good if I separated the backend to the frontend application.

This application is build with _[NodeJs](https://nodejs.org/)_, _[ExpressJS](https://expressjs.com/)_ and _[Mongoose](https://mongoosejs.com/)_ to build the backend application with _[MongoDB](https://www.mongodb.com)_ as its database.

The application was only tested using manual testing. I used Postman and MongoDB Compass during the development of this application to view the data as well as to test the API.

## Usage

This application requires two different roles for its users. The roles are **_Quizzer_** and **_Quizee_**. These roles has a big part in the application as they are the core uses of the application.

### **_Quizzer_**

- Can create quizzes and questionnaires.
- Can delete their quizzes and questionnaires.
- Can update quizzes
- Can view all the quizzes

### **_Quizee_**

- Can take the quizzes
- Can view all the quizzes

## Installation

This project is very simple to install in your local machine. Follow these instructions to get started:

- Be sure to have [NodeJs](https://nodejs.org/) installed on your local machine.
- Clone the repository to your local machine.
  ```bash
  git clone https://github.com/dwrdvncntcvs/quiz-app-api.git
  ```
- Open the directory on your terminal and run the following commands:

  ```bash
  #Installing dependencies via NPM
  npm install

  #installing dependencies via Yarn
  yarn
  ```

- After installing the dependencies, create a **_.env_** file in the root of your directory.
  ```javascript
  MONGO_DB_URL = "Replace this with your MongoDB URL";
  ```
- Run this following commands to run the application.
  ```bash
  yarn dev
  ```

> **_Note:_** _This is only a side project. I don't know yet if this is already done or I will add some new functionalities when I integrated this with its frontend counter part._
