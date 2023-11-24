# The Berliest App

## License: MIT

## Table of Contents

- [The Berliest App](#the-berliest-app)
  - [License: MIT](#license-mit)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Key Features](#key-features)
  - [Technical Implementation](#technical-implementation)
    - [Backend](#backend)
    - [Database](#database)
    - [Frontend](#frontend)
  - [Deployment and Version Control](#deployment-and-version-control)
    - [GitHub Repository](#github-repository)
    - [Deployment](#deployment)
  - [NPM Packages Used](#npm-packages-used)
    - [Dependencies](#dependencies)
    - [Dev Dependencies](#dev-dependencies)
  - [License](#license)
  - [Questions and Support](#questions-and-support)

## Introduction

### Key Features

1. **User Authentication and Authorization:**

   - Implementation of secure user signup, login, and logout functionality.
   - Passwords are encrypted using bcrypt during registration.
   - Basic authorization ensures that only logged-in users can access additional features.

2. **List Management:**

   - Enable users to seamlessly create, read, update, and delete lists.
   - Implementation of basic CRUD operations for the efficient management of lists containing favorite places.

3. **Map Integration:**

   - Seamless integration of the Graphhopper API to visualize routes on an interactive map.

4. **Basic User Profile:**

   - Development of an elegant user profile page showcasing users' favorite locations.
   - Users can effortlessly choose places from predefined categories, saving them to their list of favorites. Additionally, these locations can be visualized on the map with routes available for walking, biking, or driving.

5. **Deployment:**
   - Successful deployment of the application for public access.

## Technical Implementation

### Backend

1. **Express.js:**
   - Utilization of Express.js as the robust foundation for the backend server.
   - Implementation of advanced user authentication and authorization mechanisms using middleware and sessions.
   - Rigorous setup of routes and controllers for user authentication, list management, and user profiles.

### Database

2. **MongoDB with Mongoose:**
   - Effective utilization of Mongoose for data modeling and seamless communication with a MongoDB database.
   - Creation of well-defined schemas for users and lists, ensuring the structured management of user data and favorite places.

### Frontend

3. **HTML, CSS, and JavaScript/jQuery:**
   - Development of an intuitive and aesthetically pleasing frontend using basic HTML, CSS, and JavaScript/jQuery.
   - Design of elegant interfaces for user authentication, list management, and map display.

## Deployment and Version Control

### GitHub Repository

4. **GitHub Repository:**
   - Establishment of a comprehensive GitHub repository for robust version control.

### Deployment

5. **Deployment:**
   - Successful deployment of the application, ensuring accessibility to a wider audience.

## NPM Packages Used

### Dependencies

The following npm packages were instrumental in the development of The Berliest App and are listed in the `package.json` file:

- **bcrypt (v5.1.1):** Secure encryption for passwords.
- **connect-mongo (v5.1.0):** Efficient storage of session data in MongoDB.
- **cookie-parser (v1.4.6):** Middleware for streamlined cookie parsing.
- **dotenv (v16.3.1):** Loading of environment variables from a .env file.
- **express (v4.18.2):** Robust web application framework for Node.js.
- **express-session (v1.17.3):** Express middleware for session handling.
- **hbs (v4.2.0):** Implementation of Handlebars.js as the view engine for Express.
- **mongoose (v8.0.1):** MongoDB object modeling tool.
- **morgan (v1.10.0):** HTTP request logger middleware for Node.js.
- **serve-favicon (v2.5.0):** Middleware for streamlined favicon serving.

### Dev Dependencies

- **nodemon (v3.0.1):** Essential utility for automatic Node.js server restarts during development.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Questions and Support

Feel free to reach out if you have any questions or require further clarification. Open an issue on the [GitHub repository](https://github.com/yourusername/your-repository) for support.
