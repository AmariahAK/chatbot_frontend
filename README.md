```markdown
# 🤖 Chatbot Frontend Application

## 📖 Overview

This repository hosts a full-stack chatbot application featuring a dynamic React frontend and two optional backend implementations: one in Python (Flask) and another in Node.js. The application allows users to sign up, log in, and interact with a chatbot interface that saves user data to a backend database.

## 🌳 Branches

The repository contains three branches:

- **Main Branch:** Contains the frontend code and serves as the baseline for the application.
- **Python Backend (Flask):** Implements the backend using Flask.
- **Node.js Backend:** Implements the backend using Node.js.
- **Plain Frontend:** Contains only the frontend code without any backend implementation.

## 🌟 Main Branch

### Features

- **User Authentication:** Sign up and log in functionality.
- **Chatbot Interface:** Allows users to interact with the chatbot.
- **Responsive Design:** Ensures the application works well on various devices.

### Contributors

- **Amariah Kamau**
  - **Phone:** 0759336068
  - **Email:** [amariah.abish@gmail.com](mailto:amariah.abish@gmail.com)

## 🐍 Python Backend (Flask) Branch

### Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/chatbot_frontend.git
   cd chatbot_frontend
   git checkout python-backend
   ```

2. **Create a Virtual Environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Backend Server:**
   ```bash
   python app.py
   ```

5. **Run the Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Notes

- Ensure the backend server is running on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## 🟢 Node.js Backend Branch

### Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/chatbot_frontend.git
   cd chatbot_frontend
   git checkout node-backend
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Run the Backend Server:**
   ```bash
   npm start
   ```

4. **Run the Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

### Notes

- Ensure the backend server is running on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## 🌐 Plain Frontend Branch

### Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/chatbot_frontend.git
   cd chatbot_frontend
   git checkout plain-frontend
   ```

2. **Run the Frontend:**
   ```bash
   npm install
   npm start
   ```

### Notes

- This branch does not include any backend implementation. It only contains the frontend code.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
```
