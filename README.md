# Project Title: 
E-Commerce Application 

## Project Overview
This project is a comprehensive e-commerce platform designed to provide a fully functional online shopping experience. It includes features like user authentication, product management, and order handling. The purpose is to build a robust and scalable application that demonstrates full-stack development skills using the MERN stack.

## Key Features
- **REST API Creation** for user authentication, product management, and order handling.
- **Secure login and registration functionality** using JWT and password hashing.
- **Structured MongoDB schemas** for users, products, and orders.
- **Robust server-side logic** with Node.js and Express.
- **Interactive and responsive user interface** built with React.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB (using Mongoose for schema design)
- **Deployment**: GitHub Pages (frontend) and Render/Heroku (backend)
- **Additional Tools**: Postman for API testing, JWT for authentication, and bcrypt for password hashing.

## Why This Project
I chose this project because it provides an opportunity to practice and demonstrate a wide range of development skills, including frontend and backend development, database schema design, and secure authentication. Building an e-commerce platform is both challenging and rewarding, as it allows me to explore real-world scenarios and enhance my ability to create scalable web applications.


## Milestones

### Milestone 1: Repository Creation

* Created a GitHub repository named "Ecommerce-Follow-Along" with a README file.

### Milestone 2: Initial Setup & Login Page

* Pushed code to the GitHub repository.
* Created separate folders for frontend and backend.
* Implemented a functional Login Page in the frontend.

### Milestone 3: Project Setup & Foundation

* Established project structure, database connection, and basic error handling.

### Milestone 4: User Authentication & File Uploads

* Implemented user registration, login, and file upload functionalities.
* Integrated user authentication and authorization middleware.

### Milestone 5: User Signup

* Created the Signup page with form validation.

### Milestone 6

1. **Encrypt Password:**
    * Hash the user's password using `bcrypt` during signup.
    * Store the hashed password in the database.

2. **Store User Data:**
    * Save all user data (e.g., name, email) in the database. 
    * Ensure the password remains encrypted and secure.


### Milestone 7:

**Login Endpoint**

1. **Accept User Credentials:** Receive user input for email/username and password.
2. **Retrieve User:** Query the database to find the user associated with the provided credentials.
3. **Password Validation:**
    * Hash the entered password using `bcrypt`.
    * Compare the hashed input with the stored hashed password in the database. 
    * If they match, authentication is successful.
