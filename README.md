# User Management API

This is a **User Management API** built with **NestJS** and **MongoDB**. The API allows you to manage users by providing functionality to create, retrieve, update, and delete user records. Additionally, it integrates with an external API to enrich user data during creation.

---

## **Features**

- Create, retrieve, update, and delete users (CRUD).
- Store user data, including:
  - Name
  - Last Name
  - Email (unique)
  - Address (street, city, state, zip code)
  - Gender description fetched from an external API.
- MongoDB integration with Mongoose.
- Input validation and error handling.
- Swagger API documentation.

---

## **Technologies**

- **NestJS**: A progressive Node.js framework for building scalable server-side applications.
- **MongoDB**: A NoSQL database for storing user data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB.
- **Swagger**: For API documentation and testing.