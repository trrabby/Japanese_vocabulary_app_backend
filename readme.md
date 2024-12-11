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

## API Endpoints

## users

*POST: api/v1/create-user
*GET: api/v1/
*GET: api/v1/:email
*PATCH: api/v1/:email
\*DELETE: api/v1/:email

## Lessons

*POST: api/v1/create-lesson
*GET: api/v1/
*GET: api/v1/:lesson_no
*PATCH: api/v1/:lesson_no
\*DELETE: api/v1/:lesson_no

## Vocabularies

*POST: api/v1/create-vocabulary
*GET: api/v1/
*GET: api/v1/:id
*GET: api/v1/lessonwise/:lesson_no
*PATCH: api/v1/:id
*DELETE: api/v1/:id

## Tutorials

*POST: api/v1/create-tutorial
*GET: api/v1/
*GET: api/v1/:id
*PATCH: api/v1/:id
\*DELETE: api/v1/:id

<!-- ## Diagram

Here is the architecture diagram for the application:

<p style="font-size: 5px;">
    src/
├── app/
│ ├── modules/
│ │ ├── users/
│ │ │ ├── user.controller.ts
│ │ │ ├── user.route.ts
│ │ │ ├── user.service.ts
│ │ │ ├── user.model.ts
│ │ │ ├── user.validation.ts
│ │ ├── lessons/
│ │ │ ├── lesson.controller.ts
│ │ │ ├── lesson.route.ts
│ │ │ ├── lesson.service.ts
│ │ │ ├── lesson.model.ts
│ │ │ ├── lesson.validation.ts
│ │ ├── vocabularies/
│ │ │ ├── vocabulary.controller.ts
│ │ │ ├── vocabulary.route.ts
│ │ │ ├── vocabulary.service.ts
│ │ │ ├── vocabulary.model.ts
│ │ │ ├── vocabulary.validation.ts
│ │ ├── tutorials/
│ │ │ ├── tutorial.controller.ts
│ │ │ ├── tutorial.route.ts
│ │ │ ├── tutorial.service.ts
│ │ │ ├── tutorial.model.ts
│ │ │ ├── tutorial.validation.ts
├── config/
│ ├── db.config.ts
│ ├── server.config.ts
├── middlewares/
│ ├── validateRequest.ts
│ ├── authMiddleware.ts
├── utils/
│ ├── logger.ts
├── server.ts
└── app.ts
</p>

--- -->

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

## Contribution

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

---

## Contact

For inquiries or feedback, contact me at [https://towfiq-portfolio.netlify.app].
