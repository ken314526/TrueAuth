# TrueAuth

**TrueAuth** is a secure authentication web application built with Next.js. It offers a range of authentication features including signup, login with OTP, email and OTP verification, password reset, and user management.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
3. [Usage](#usage)
4. [Author](#author)

## Technologies Used

- **`Next.js`**: Framework for server-rendered React applications.
- **`React:`** Library for building user interfaces.
- **`TypeScript:`** Static type checking for JavaScript.
- **`Tailwind CSS`**: Utility-first CSS framework.
- **`Axios:`** Promise-based HTTP client for making requests.
- **`bcryptjs:`** Library for hashing passwords.
- **`jsonwebtoken:`** For generating and verifying JSON Web Tokens.
- **`mongoose:`** ODM library for MongoDB.
- **`nanoid:`** Small, secure, URL-friendly unique ID generator.
- **`nodemailer:`** Module for sending emails.
- **`react-hot-toast`**: Simple and customizable toast notifications.
- **`uuid:`** Library for generating unique IDs.

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
