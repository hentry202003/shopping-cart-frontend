# 3J Mart — Shopping Cart Web Application

A full-stack e-commerce shopping cart application built with React and Spring Boot.

Users can register, log in securely, browse products, manage their shopping cart, place orders, and view their order history.

## 🚀 Live Demo

**[3J Mart — Live Demo](https://3j-mart-shopping-cart.vercel.app)**

## 📂 GitHub Repositories

### Frontend

**[shopping-cart-frontend](https://github.com/hentry202003/shopping-cart-frontend)**

### Backend

**[shopping-cart-api](https://github.com/hentry202003/shopping-cart-api)**

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Axios
- React Router
- HTML
- CSS

### Backend

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven

### Database

- MySQL
- Aiven MySQL

### Deployment

- Vercel — Frontend
- Render — Backend
- Aiven — Database

## ✨ Features

- User registration
- Secure login with JWT authentication
- Password encryption using BCrypt
- Browse products
- Add products to cart
- Increase/decrease cart quantity
- Remove products from cart
- Stock validation
- Place orders
- Automatic stock reduction after order
- View order history
- User-specific cart and order data
- Global exception handling
- RESTful APIs
- Production deployment

## 🔐 Authentication

The application uses JWT-based authentication.

After successful login, the backend generates a JWT token. The frontend sends the token with authenticated API requests using the Authorization header.

```text
Authorization: Bearer <token>
```

## 🏗️ Application Architecture

```text
React Frontend
      │
      │ Axios / REST API
      ▼
Spring Boot Backend
      │
      │ JPA / Hibernate
      ▼
Aiven MySQL Database
```

## 📦 Main Modules

### 👤 User Module

- Register
- Login
- Get current user

### 📦 Product Module

- View products
- Product details
- Stock management

### 🛒 Cart Module

- Add to cart
- Update quantity
- Remove from cart
- View current user's cart

### 🧾 Order Module

- Place order
- Reduce product stock
- Clear purchased cart item
- View current user's orders

## 🌐 Deployment Architecture

```text
                         3J Mart
                            │
                            ▼
                  React + Vite Frontend
                            │
                            ▼
                          Vercel
                            │
                         REST API
                            │
                            ▼
                 Spring Boot REST API
                            │
                            ▼
                         Render
                            │
                     JPA / Hibernate
                            │
                            ▼
                       Aiven MySQL
```

## 🧪 Production Testing

The application has been tested in production for:

- User registration
- User login
- JWT authentication
- Product loading
- Add to cart
- Cart quantity increase/decrease
- Cart item deletion
- Order placement
- Cart clearing after order
- Order persistence
- User data isolation
- Production CORS
- Vercel → Render → Aiven integration

## 📌 Future Improvements

- Payment gateway integration
- Admin dashboard
- Product management
- Order status management
- Product search and filtering
- Product categories
- OrderItem-based order architecture

## 👨‍💻 Developer

### Hentry Joseph

**B.E. Electronics and Communication Engineering**

**Java Full Stack Developer | Spring Boot | React | MySQL**

**GitHub:**  
[github.com/hentry202003](https://github.com/hentry202003)
