# EventSphere: MERN Stack Event Management Platform

![EventSphere Banner](https://via.placeholder.com/1200x630.png?text=EventSphere)

**EventSphere** is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) designed to streamline event management. It provides a robust platform for administrators to organize events and for employees to participate and track their schedules.

---

### **Live Demo & Links**

- **Live Application**: [Deployed on Vercel](https://eventsphere-client.vercel.app/) (placeholder)
- **Backend API**: [Hosted on Render](https://eventsphere-server.onrender.com/) (placeholder)

---

### **Tech Stack**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

---

### **Features**

- **Role-Based Access Control**: Separate dashboards and permissions for Admins and Employees.
- **Task Management**: Admins can create, assign, and track tasks.
- **Employee Dashboard**: Employees can view their assigned tasks and update their status.
- **Secure Authentication**: JWT-based authentication with password hashing (bcrypt).
- **Responsive UI**: Modern, mobile-first design built with Tailwind CSS.

---

### **Screenshots**

*(Placeholder for application screenshots)*

---

### **Installation Guide**

To get a local copy up and running, follow these simple steps.

**Prerequisites:**
- Node.js (v14+)
- npm
- MongoDB Atlas account (or local MongoDB instance)

**1. Clone the repository:**
```bash
git clone https://github.com/patelom494/EventSphere.git
cd EventSphere
```

**2. Install backend dependencies:**
```bash
cd server
npm install
```

**3. Install frontend dependencies:**
```bash
cd ../client
npm install
```

---

### **Environment Variables**

Create a `.env` file in the `server/` directory and add the following variables:

```env
# MongoDB Connection URI
MONGO_URI=your_mongodb_connection_string

# JWT Secret Key
JWT_SECRET=your_jwt_secret

# Port
PORT=5000

# Client URL for CORS
CLIENT_URL=http://localhost:5173
```

---

### **Run Locally**

1. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```

2. **Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```

Your application should now be running at `http://localhost:5173`.

---

### **Folder Structure**

```
EventSphere/
├── client/         # React Frontend
│   ├── src/
│   └── ...
├── server/         # Node.js Backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
└── README.md
```

---

### **API Overview**

- **Authentication**: `POST /api/users/login`, `POST /api/users/register`
- **Tasks**: `GET /api/tasks`, `POST /api/tasks`, `PUT /api/tasks/:id`
- **Users**: `GET /api/users/employees`

---

### **Deployment**

- **Frontend (Vercel)**: Connect your GitHub repository to Vercel and configure the root directory to `client`.
- **Backend (Render)**: Connect your repository to Render, set the root directory to `server`, and add your environment variables.

---

### **Future Improvements**

- [ ] Implement real-time notifications with WebSockets.
- [ ] Add a calendar view for tasks and events.
- [ ] Integrate file uploads for task attachments.

---

### **Author**

- **Patel Om**
- GitHub: [@patelom494](https://github.com/patelom494)

---

### **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.
