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
* Set up separate folders for frontend and backend.
* Developed a functional Login Page for the frontend.

### Milestone 3: Project Setup & Foundation

* Established project structure, set up database connection, and implemented basic error handling.

### Milestone 4: User Authentication & File Uploads

* Implemented user registration, login, and file upload functionalities.
* Integrated user authentication and authorization middleware.

### Milestone 5: User Signup

* Created the Signup page with form validation.

### Milestone 6: Password Encryption & Data Storage

1. *Encrypt Password:*
    * Hash the user's password with bcrypt during signup.
    * Store the hashed password securely in the database.

2. *Store User Data:*
    * Save user data (e.g., name, email) in the database, ensuring the password remains encrypted.

### Milestone 7: Login Endpoint

1. *Accept User Credentials:* Receive email/username and password from the user.
2. *Retrieve User:* Query the database for the user matching the provided credentials.
3. *Password Validation:*
    * Hash the entered password with bcrypt.
    * Compare the hashed password with the stored hashed password in the database.
    * Authentication is successful if they match.

### Milestone 8: Product Card & Homepage Layout

* Created a reusable Card Component with props for product details.
* Designed the Homepage layout using a grid or flexbox to display multiple product cards.

### Milestone 9: Product Form Creation

1. *Create Product Form:*
   - Make a form for adding product details like name, description, price, and images.

2. *Image Uploads:*
   - Allow users to upload multiple images for the product.

3. *Form Validation:*
   - Check that the form fields are filled correctly (e.g., price is a number, name is not empty).

### Milestone 10: Product Schema & Endpoint

1. *Product Schema:*
   - Define product details (name, description, price, image URL) using Mongoose with validation.

2. *Endpoint Creation:*
   - Create a POST endpoint to save product data to MongoDB.

3. *Why Validation?*
   - Ensures only valid data is saved, keeping the database accurate.   


### Milestone 11: Display Products Dynamically

1. *Backend:*
   - Create an endpoint to send all product data from MongoDB to the frontend.

2. *Frontend:*
   - Write a function to fetch product data from the backend.
   - Pass the fetched data to the product card component.

3. *Dynamic Display:*
   - Use the product card component to display all products dynamically on the page.


### Milestone 12: Filter Products by User Email

1. **Backend:**
   - Create an endpoint to send products filtered by user email from MongoDB.

2. **Frontend:**
   - Write a function to fetch filtered data from the backend.
   - Pass the data to the product card component.

3. **Dynamic Display:**
   - Use the product card component to display the filtered products dynamically.


### Milestone 13: Update Existing Data

1. **Backend:**
   - Create an endpoint to update existing product data in MongoDB.

2. **Frontend:**
   - Add an edit button to the product card.
   - On click, send the product data to a form, auto-fill the fields, and allow editing.

3. **Dynamic Update:**
   - After editing, save the updated data back to MongoDB.

