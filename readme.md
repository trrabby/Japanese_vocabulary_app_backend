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

![System Architecture Diagram](https://example.com/diagram-path.png)

---

## Installation

### Prerequisites:

- Node.js
- MongoDB
- TypeScript (for development)

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/japanese-vocabulary-app.git
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

### Authentication:

- **POST /auth/login**: Log in for both Admin and Users.
  - Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "token": "jwt-token"
    }
    ```

### Admin Endpoints:

#### User Management:

- **GET /admin/users**: View all users.
- **PATCH /admin/users/:id**: Update user role.

#### Lesson Management:

- **GET /admin/lessons**: View all lessons.
- **POST /admin/lessons**: Add a new lesson.
- **PATCH /admin/lessons/:id**: Update lesson.
- **DELETE /admin/lessons/:id**: Delete lesson.

#### Vocabulary Management:

- **GET /admin/vocabularies**: View all vocabularies.
- **POST /admin/vocabularies**: Add a new vocabulary.
- **PATCH /admin/vocabularies/:id**: Update vocabulary.
- **DELETE /admin/vocabularies/:id**: Delete vocabulary.

#### Tutorial Management:

- **POST /admin/tutorials**: Add a tutorial.
  - Body:
    ```json
    {
      "tutorial_name": "Introduction to Kanji",
      "tutorial_category": "Kanji",
      "tutorial_iFrame_url": "https://www.youtube.com/embed/example-url",
      "created_by": "admin-objectid"
    }
    ```
- **GET /admin/tutorials**: View all tutorials.

---

## Contribution

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

MIT License.

---

## Contact

For inquiries or feedback, contact us at [contact@example.com].
