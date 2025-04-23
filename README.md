# VSpice

**VSpice** is a spice management app — a streamlined, digital way to keep track of your spices with AI assistance! Built with the PERN stack and enriched with Tailwind, AWS S3 for image storage, and OpenAI integration, VSpice helps users manage their spice inventory in a modern, efficient, and visually clean experience.

---

## 📑 Table of Contents

## 📑 Table of Contents
- [Project Objective](#project-objective)
- [Tech Stack](#tech-stack)
- [Installation Instructions](#installation-instructions)
- [Features](#features)
- [Future Plans](#future-plans)


# VSpice

**VSpice** is a spice management app — a streamlined, digital way to keep track of your spices with AI assistance! Built with the PERN stack and enriched with Tailwind, AWS S3 for image storage, and OpenAI integration, VSpice helps users manage their spice inventory in a modern, efficient, and visually clean experience.

---

## Project Objective

The goal of this project is to demonstrate full-stack development by creating a CRUD-based spice inventory system with AI-powered enhancements. Users can add, view, and manage spices, while also generating helpful suggestions using AI.

---

## Tech Stack

| Tool | Role |
| --- | --- |
| React | Frontend Library |
| Tailwind | CSS Framework |
| Express.js | Backend Framework |
| Node.js | Runtime Environment |
| PostgreSQL | Database |
| OpenAI | AI Integration |
| AWS S3 | Cloud Storage |

---

## Installation Instructions

### 1. Clone the repository

```bash

git clone https://github.com/your-username/vspice.git
cd vspice
```

### 2. Environment Setup

### Server

```bash

cd server
npm install

```

### Client

```bash
bash
CopyEdit
cd client
npm install
```

---

### 3. PostgreSQL Setup

- Log in to PostgreSQL via your terminal:

```bash

psql

```

- Create the database:

```sql

CREATE DATABASE vspice;

```

- To find your username and host info, run:

```sql

\conninfo

```

---

### 4. Configure Environment Variables

- Navigate to `server/sample.env`
- Copy the contents and create a `.env` file in the same directory:

```bash

cp sample.env .env
```

- Add your own database credentials and API keys (PostgreSQL and OpenAI)
    
    **API Key setup:**
    
    1. Sign-up for an [Open AI account](https://auth.openai.com/log-in)
    2. During the sign-up process you'll be provided an API key
    3. Copy the key and paste it in your .env file created with the database setup.

---

### 5. Database Tables

- From within the `server` directory, run:

```bash

psql -U your_user -d vspice -f db.sql
```

---

### 6. Run the App

### Backend

```bash

cd server
node server.js
```

Check backend is running at: [http://localhost:3000](http://localhost:3000/)

### Frontend

```bash

cd client
npm run dev

```

App will be available at: [http://localhost:5173](http://localhost:5173/)

---

## Features

- Add, edit, and delete spices with custom images
- Search and filter through your spice collection
- Cloud image storage via AWS S3
- AI-enhanced suggestions for spice pairings and descriptions using OpenAI
- Responsive UI with Tailwind for mobile and desktop
- Export shopping lists or create wishlists (Coming Soon)

---

## Future Plans

- Implement soft deletion (trash bin with restore feature)
- Integrate Google Places API for store/location-based spice suggestions
- Add user authentication and private spice collections

## Project Objective

The goal of this project is to demonstrate full-stack development by creating a CRUD-based spice inventory system with AI-powered enhancements. Users can add, view, and manage spices, while also generating helpful suggestions using AI.

---

## Tech Stack

| Tool | Role |
| --- | --- |
| React | Frontend Library |
| Tailwind | CSS Framework |
| Express.js | Backend Framework |
| Node.js | Runtime Environment |
| PostgreSQL | Database |
| OpenAI | AI Integration |
| AWS S3 | Cloud Storage |

---

## Installation Instructions

### 1. Clone the repository

```bash

git clone https://github.com/your-username/vspice.git
cd vspice
```

### 2. Environment Setup

### Server

```bash

cd server
npm install

```

### Client

```bash
bash
CopyEdit
cd client
npm install
```

---

### 3. PostgreSQL Setup

- Log in to PostgreSQL via your terminal:

```bash

psql postgres

```

- Create the database:

```sql

CREATE DATABASE vspice;

```

- To find your username and host info, run:

```sql

\conninfo

```

---

### 4. Configure Environment Variables

- Navigate to `server/sample.env`
- Copy the contents and create a `.env` file in the same directory:

```bash

cp sample.env .env
```

- Add your own database credentials and API keys (PostgreSQL and OpenAI)
    
    **API Key setup:**
    
    1. Sign-up for an [Open AI account](https://auth.openai.com/log-in)
    2. During the sign-up process you'll be provided an API key
    3. Copy the key and paste it in your .env file created with the database setup.

---

### 5. Database Tables

- From within the `server` directory, run:

```bash

psql -U your_user -d vspice -f db.sql
```

---

### 6. Run the App

### Backend

```bash

cd server
node server.js
```

Check backend is running at: [http://localhost:3000](http://localhost:3000/)

### Frontend

```bash

cd client
npm run dev

```

App will be available at: [http://localhost:5173](http://localhost:5173/)

---

## Features

- Add, edit, and delete spices with custom images
- Search and filter through your spice collection
- Cloud image storage via AWS S3
- AI-enhanced suggestions for spice pairings and descriptions using OpenAI
- Responsive UI with Tailwind for mobile and desktop
- Export shopping lists or create wishlists (Coming Soon)

---

## Future Plans

- Implement soft deletion (trash bin with restore feature)
- Integrate Google Places API for store/location-based spice suggestions
- Add user authentication and private spice collections