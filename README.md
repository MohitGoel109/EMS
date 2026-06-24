# 👥 Employee Management System (EMS)

A full-stack Employee Management System built with **React + Vite** on the frontend and **Node.js + Express** on the backend.

🔗 **Live Demo:** [https://ems-bay-seven.vercel.app](https://ems-bay-seven.vercel.app)

---

## ✨ Features

- ➕ Add new employees
- ✏️ Edit existing employee details
- 🗑️ Delete employees
- 🔍 Search by name or department
- 🏷️ Filter by department
- 👤 Employee count & average salary stats
- 🌙 Dark / Light mode toggle
- 🎨 Department color badges
- 🔔 Toast notifications on actions
- 📱 Responsive design

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite |
| Backend | Node.js, Express |
| Styling | Plain CSS (CSS Variables) |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Render |

---

## 📁 Project Structure

```
EMS/
├── ems-frontend/        # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx      # Main component
│   │   └── index.css    # Global styles
│   ├── .env             # Local environment variables (not pushed)
│   └── package.json
│
└── EMS-backend/         # Node.js + Express backend
    ├── controllers/
    │   └── employeeController.js
    ├── routes/
    │   └── employeeRoutes.js
    ├── middleware/
    │   └── loggerMiddleware.js
    ├── data/
    │   └── employee.js  # In-memory data store
    └── index.js         # Entry point
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- npm

### 1. Clone the repo

```bash
git clone https://github.com/MohitGoel109/EMS.git
cd EMS
```

### 2. Start the Backend

```bash
cd EMS-backend
npm install
npm run dev
# Runs on http://localhost:5100
```

### 3. Start the Frontend

```bash
cd ems-frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### 4. Create `.env` in `ems-frontend/`

```
VITE_API_URL=http://localhost:5100/employees
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Get all employees |
| GET | `/employees/:id` | Get employee by ID |
| POST | `/employees` | Add new employee |
| PUT | `/employees/:id` | Update employee |
| DELETE | `/employees/:id` | Delete employee |

---

## 🔧 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://ems-bay-seven.vercel.app |
| Backend | Render | https://ems-7kie.onrender.com |

> **Note:** The backend uses in-memory storage. Data resets on every server restart. For persistent storage, connect a database like MongoDB Atlas.

---

## 📸 Screenshots

> Add screenshots of your app here

---

## 👨‍💻 Author

**Mohit Goel**
- GitHub: [@MohitGoel109](https://github.com/MohitGoel109)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
