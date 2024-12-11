# Japanese Vocabulary Application

## Overview

A web application designed to help users learn Japanese vocabulary through interactive lessons and vocabulary entries. Admins can manage users, lessons, vocabularies, and tutorials, while users can access lessons and learn vocabularies interactively.

## Features

### Authentication

- **Admin**: Secure login/logout.
- **User**: Secure login/logout.

### Roles

#### Admin Features:

- **User Management**:
  - View all users with name, email, and role.
  - Update user roles.
- **Content Management**:
  - View, add, update, and delete lessons and vocabularies.
  - Manage lessons and vocabularies by lesson number and word.
- **Tutorial Management**:
  - Embed and manage YouTube tutorial links for additional learning resources (8-10 videos).

#### User Features:

- **Lesson Access**:
  - View all lessons and specific lessons by number.
- **Vocabulary Access**:
  - View vocabularies, navigate between entries, listen to pronunciation, and track progress with a completion button.

## Diagram

Here is the architecture diagram for the application:

![System Architecture Diagram]src/

├── app/
│ ├── modules/
│ │ ├── users/
│ │ │ ├── user.controller.ts # Handles user management actions (CRUD operations)
│ │ │ ├── user.route.ts # Routes for user CRUD operations
│ │ │ ├── user.service.ts # Business logic for user management
│ │ │ ├── user.model.ts # User schema (email, name, role)
│ │ │ ├── user.validation.ts # Validation schema for user data
│ │ ├── lessons/
│ │ │ ├── lesson.controller.ts # Handles lesson management actions
│ │ │ ├── lesson.route.ts # Routes for lesson CRUD operations
│ │ │ ├── lesson.service.ts # Business logic for lesson management
│ │ │ ├── lesson.model.ts # Lesson schema (lesson name, lesson number)
│ │ │ ├── lesson.validation.ts # Validation schema for lessons
│ │ ├── vocabularies/
│ │ │ ├── vocabulary.controller.ts # Handles vocabulary management actions
│ │ │ ├── vocabulary.route.ts # Routes for vocabulary CRUD operations
│ │ │ ├── vocabulary.service.ts # Business logic for vocabulary management
│ │ │ ├── vocabulary.model.ts # Vocabulary schema (word, meaning, pronunciation)
│ │ │ ├── vocabulary.validation.ts # Validation schema for vocabularies
│ │ ├── tutorials/
│ │ │ ├── tutorial.controller.ts # Handles tutorial management actions
│ │ │ ├── tutorial.route.ts # Routes for tutorial management
│ │ │ ├── tutorial.service.ts # Business logic for tutorial management
│ │ │ ├── tutorial.model.ts # Tutorial schema (video name, category, iFrame URL)
│ │ │ ├── tutorial.validation.ts # Validation schema for tutorials
├── config/
│ ├── db.config.ts # Database configuration (e.g., MongoDB URI)
│ ├── server.config.ts # Server configuration (port, etc.)
├── middlewares/
│ ├── validateRequest.ts # Middleware for request validation
│ ├── authMiddleware.ts # Middleware for checking authentication
├── utils/
│ ├── logger.ts # Utility for logging
├── server.ts # Entry point for the server
└── app.ts # App configuration and route setup

---

## Installation

### Prerequisites:

- Node.js
- MongoDB
- TypeScript (for development)

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/trrabby/Japanese_vocabulary_app_backend.git
   cd japanese-vocabulary-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - `MONGO_URI`: MongoDB connection URI
   - `JWT_SECRET`: JWT secret
4. Run in development:
   ```bash
   npm run startDev
   ```
   For production:
   ```bash
   npm run build
   npm run startProd
   ```

---

## API Endpoints

# API Endpoints

## User Management:

- **GET /admin/users**: View all users.
  - **Description**: Get a list of all users in the system.
- **GET /admin/users/:email**: View a specific user.

  - **Description**: Get details of a user by email.
  - **Parameters**:
    - `email`: The email of the user.

- **PATCH /admin/users/:email**: Update user details.

  - **Description**: Update a user's information, such as role or email.
  - **Parameters**:
    - `email`: The email of the user.
  - **Request Body**:
    ```json
    {
      "role": "admin"
    }
    ```

- **DELETE /admin/users/:email**: Delete a user.
  - **Description**: Delete a user by email.
  - **Parameters**:
    - `email`: The email of the user.

---

## Lesson Management:

- **GET /admin/lessons**: View all lessons.
  - **Description**: Get a list of all lessons in the system.
- **POST /admin/lessons**: Add a new lesson.

  - **Description**: Create a new lesson.
  - **Request Body**:
    ```json
    {
      "lesson_name": "Basic Greetings",
      "lesson_no": "Lesson_1"
    }
    ```

- **GET /admin/lessons/:lesson_no**: Get a specific lesson.

  - **Description**: Get details of a specific lesson by its lesson number.
  - **Parameters**:
    - `lesson_no`: The lesson's unique number.

- **PATCH /admin/lessons/:lesson_no**: Update lesson.

  - **Description**: Update the details of a specific lesson.
  - **Parameters**:
    - `lesson_no`: The lesson's unique number.
  - **Request Body**:
    ```json
    {
      "lesson_name": "Advanced Greetings"
    }
    ```

- **DELETE /admin/lessons/:lesson_no**: Delete lesson.
  - **Description**: Delete a lesson by its lesson number.
  - **Parameters**:
    - `lesson_no`: The lesson's unique number.

---

## Vocabulary Management:

- **GET /admin/vocabularies**: View all vocabularies.
  - **Description**: Get a list of all vocabularies in the system.
- **POST /admin/vocabularies**: Add a new vocabulary.

  - **Description**: Create a new vocabulary.
  - **Request Body**:
    ```json
    {
      "word": "ありがとう",
      "meaning": "Thank you",
      "pronunciation": "ありがとう",
      "when_to_say": "When expressing gratitude",
      "lesson_no": "Lesson_1",
      "email": "admin@example.com"
    }
    ```

- **GET /admin/vocabularies/:id**: View a specific vocabulary.

  - **Description**: Get details of a specific vocabulary by its ID.
  - **Parameters**:
    - `id`: The vocabulary's unique identifier.

- **GET /admin/vocabularies/lessonwise/:lesson_no**: Get vocabularies by lesson.

  - **Description**: Get a list of vocabularies for a specific lesson number.
  - **Parameters**:
    - `lesson_no`: The lesson number.

- **PATCH /admin/vocabularies/:id**: Update a vocabulary.

  - **Description**: Update details of a specific vocabulary.
  - **Parameters**:
    - `id`: The vocabulary's unique identifier.
  - **Request Body**:
    ```json
    {
      "meaning": "Arigato (Thank you)"
    }
    ```

- **DELETE /admin/vocabularies/:id**: Delete a vocabulary.
  - **Description**: Delete a vocabulary by its ID.
  - **Parameters**:
    - `id`: The vocabulary's unique identifier.

---

## Tutorial Management:

- **POST /admin/tutorials/create-tutorial**: Add a new tutorial.

  - **Description**: Create a new tutorial.
  - **Request Body**:
    ```json
    {
      "tutorial_name": "Basic Japanese Greetings",
      "tutorial_category": "Lesson_1",
      "tutorial_iFrame_url": "https://www.youtube.com/embed/sample",
      "created_by": "user_id"
    }
    ```

- **GET /admin/tutorials**: View all tutorials.

  - **Description**: Get a list of all tutorials in the system.

- **GET /admin/tutorials/:id**: View a specific tutorial.

  - **Description**: Get details of a tutorial by its ID.
  - **Parameters**:
    - `id`: The tutorial's unique identifier.

- **PATCH /admin/tutorials/:id**: Update a tutorial.

  - **Description**: Update the details of a specific tutorial.
  - **Parameters**:
    - `id`: The tutorial's unique identifier.
  - **Request Body**:
    ```json
    {
      "tutorial_name": "Advanced Japanese Greetings"
    }
    ```

- **DELETE /admin/tutorials/:id**: Delete a tutorial.
  - **Description**: Delete a tutorial by its ID.
  - **Parameters**:
    - `id`: The tutorial's unique identifier.

---

## Contribution

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

---

## Contact

For inquiries or feedback, contact us at [https://towfiq-portfolio.netlify.app].
