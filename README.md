# TrueAuth

**TrueAuth** is a secure authentication web application built with Next.js. It offers a range of authentication features including signup, login with OTP, email and OTP verification, password reset, and user management.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
4. [Usage](#usage)
5. [Author](#author)

## Technologies Used

- **`Next.js`**: Framework for server-rendered React applications.
- **`React:`** Library for building user interfaces.
- **`TypeScript:`** Static type checking for JavaScript.
- **`Tailwind CSS`**: Utility-first CSS framework.
- **`Axios:`** Promise-based HTTP client for making requests.
- **`BcryptJS:`** Library for hashing passwords.
- **`JsoWebToken:`** For generating and verifying JSON Web Tokens.
- **`Mongoose:`** ODM library for MongoDB.
- **`Nanoid:`** Small, secure, URL-friendly unique ID generator.
- **`Nodemailer:`** Module for sending emails.
- **`React Hot Toast`**: Simple and customizable toast notifications.
- **`uuid:`** Library for generating unique IDs.

## Features

- **`Sign Up`**
- **`Log In with OTP`**
- **`Forgot Password`**
- **`Reset Password`**
- **`Profile Page`**
- **`Log Out`**

## Getting Started

### Prerequisites

- Node.JS
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ken314526/TrueAuth.git
   cd TrueAuth
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

### Configuration

Create a `.env` file in the root of the project and add the following environment variables:

```env
MONGO_URI=your-mongodb-uri
TOKEN_SECRET=your-secret-token
DOMAIN=http://localhost:3000
USERID=your-mailtrap-userid
PASSWORD=your-mailtrap-password
```

## Usage

Once the development server is running, you can view the application in your browser by navigating to http://localhost:3000.

## Author

Developed by **Abhishek Sharma**
