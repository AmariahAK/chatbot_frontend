Chatbot Frontend Application
Overview
This repository hosts a full-stack chatbot application that includes a dynamic React frontend and two optional backend implementations: one in Python (Flask) and another in Node.js. The application allows users to sign up, log in, and interact with a chatbot interface that saves user data to a backend database.

Branches
The repository contains three branches:

Main Branch: Contains the frontend code and serves as the baseline for the application.
Python Backend (Flask): Implements the backend using Flask.
Node.js Backend: Implements the backend using Node.js.
Plain Frontend: Contains only the frontend code without any backend implementation.
Main Branch
Features
User Authentication: Sign up and log in functionality.
Chatbot Interface: Allows users to interact with the chatbot.
Responsive Design: Ensures the application works well on various devices.
Python Backend (Flask) Branch
Setup Instructions
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/chatbot_frontend.git
cd chatbot_frontend
git checkout python-backend
Create a Virtual Environment:

bash
Copy code
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install Dependencies:

bash
Copy code
pip install -r requirements.txt
Run the Backend Server:

bash
Copy code
python app.py
Run the Frontend:

bash
Copy code
cd frontend
npm install
npm start
Notes
Ensure the backend server is running on http://localhost:5000 and the frontend on http://localhost:3000.
