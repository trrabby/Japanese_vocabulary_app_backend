# Japanese Vocabulary Application

## Overview

The Japanese Vocabulary Application is designed to help users learn Japanese vocabulary through interactive lessons and vocabulary entries. The app supports two types of users: Admins and Users. Admins can manage users, lessons, vocabularies, and tutorials, while Users can access lessons, view vocabularies, and learn through interactive features.

## Features

### 1. Authentication

- **Admin**:
  - Admin can log in and log out securely.
- **User**:
  - Users can log in and log out securely.

### 2. Roles

#### **Admin Features**

1. **Manage Users**
   - Find all users with the following details:
     - User Name
     - Email
     - Current Role (Normal User or Admin)
   - Admin can update roles (change user to admin and vice versa).
2. **Content Management**

   - **Find All Lessons**:
     - View a list of all lessons with:
       - Lesson Name
       - Lesson Number
       - Vocabulary Count
   - **Add a Lesson**:
     - Admin can add a lesson by providing:
       - Lesson Name (e.g., "Basic Greetings")
       - Lesson Number
   - **Find All Vocabularies**:
     - View a table of vocabularies with the following columns:
       - Word
       - Meaning
       - Pronunciation
       - When to Say
       - Lesson No (Filterable)
     - Option to **Update** or **Delete** each vocabulary.
   - **Add a Vocabulary**:
     - Admin can add a vocabulary with:
       - Word
       - Pronunciation
       - When to say
       - Lesson No
       - Admin Email
   - **Lesson Management**:
     - Admin can **Update/Delete** lessons.
   - **Vocabulary Management**:
     - Admin can **Update/Delete** vocabularies.

3. **Tutorial Management**:
   - Admin can embed and manage YouTube tutorial links to provide users with additional learning resources (8-10 videos).

---

#### **User Features**

1. **Lesson Access**:
   - Users can:
     - View all lessons.
     - Find a specific lesson by its lesson number.
2. **Vocabulary Access**:
   - Users can:
     - View one vocabulary at a time.
     - Navigate to the **next** or **previous** vocabulary.
     - Pronounce the vocabulary with an audio button.
     - Mark vocabulary as **complete** to track progress.

---

## Diagram

Here is the architecture diagram for the Japanese Vocabulary Application:

![System Architecture Diagram](https://example.com/diagram-path.png)

The diagram above illustrates the flow of data and interaction between the components in the system.

---

## Installation

To set up the application on your local machine:

### Prerequisites

- Node.js
- MongoDB
- TypeScript (for development)

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/japanese-vocabulary-app.git
cd japanese-vocabulary-app
```
