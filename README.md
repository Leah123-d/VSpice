# VSpice

**VSpice** is a spice management app — a streamlined, digital way to keep track of your spices with AI assistance! Built with the PERN stack and enriched with Tailwind, AWS S3 for image storage, and OpenAI integration, VSpice helps users manage their spice inventory in a modern, efficient, and visually clean experience.

---

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
cd Vspice
```

### 2. Environment Setup

### Server

```bash

cd server
npm install

```

### Client

```bash

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

### 4. AWS S3 Setup
1. Sign-up for an [AWS account](https://portal.aws.amazon.com/billing/signup) 
2. Create a user with admistrative access
3. Follow steps to create the [S3 bucket](https://portal.aws.amazon.com/billing/signup)
4. Complete instructions can be found [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html)

### 5. Configure Environment Variables

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

- Add your AWS S3 bucket credentials. All the information for the bucket can be found on your AWS account created in step 4. 

---

### 6. Database Tables

- From within the `server` directory, run:

```bash

psql -U your_user -d vspice -f db.sql
```

---

### 7. Run the App

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

- Add, edit, and delete spices
- Search and filter through your spice collection
- AI-enhanced suggestions for spice details using OpenAI
- Responsive UI with Tailwind for mobile and desktop

---

## Future Plans

- Implement soft deletion (trash bin with restore feature)
- Integrate Google Places API for store/location-based
- Add user authentication and private spice collections
- Create shopping lists with export feature

## Preview
![spice-cabinet-walkthrough](https://github.com/user-attachments/assets/5f02d123-3b1d-481d-b12b-21a6f2890883)

