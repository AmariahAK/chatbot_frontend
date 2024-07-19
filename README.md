Branch: Flask Backend
Chatbot Frontend with Flask Backend
This project is a full-stack web application combining a React frontend with a Flask backend. The application features user authentication, chat functionalities, and integration with Azure for user management.

Project Structure
arduino
Copy code
backend/
├── Pipfile
├── Pipfile.lock
├── __pycache__
│   ├── app.cpython-312.pyc
│   └── config.cpython-312.pyc
├── app.py
├── config.py
├── instance
│   └── data.db
├── migrations
│   ├── README
│   ├── alembic.ini
│   ├── env.py
│   ├── script.py.mako
│   └── versions
│       └── 5661a19e76ec_initial_migration.py
├── models
│   ├── chat.py
│   └── user.py
├── routes
│   ├── auth.py
│   ├── home.py
│   └── routes.py
└── venv
frontend/
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── api.js
│   ├── azureConfig.js
│   ├── components
│   │   ├── AuthContext.js
│   │   ├── Chat.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Logout.js
│   │   ├── Navbar.js
│   │   ├── Profile.js
│   │   └── SignUp.js
│   ├── css
│   │   ├── Chat.css
│   │   ├── Home.css
│   │   ├── Login.css
│   │   ├── NavBar.css
│   │   ├── Profile.css
│   │   ├── SignUp.css
│   │   └── styles.css
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
Setup
Prerequisites
Python 3.10
Node.js
npm or yarn
Backend Setup
Navigate to the backend directory:

bash
Copy code
cd backend
Create a virtual environment:

bash
Copy code
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install the dependencies:

bash
Copy code
pip install -r requirements.txt
Run the Flask server:

bash
Copy code
python app.py
Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install the dependencies:

bash
Copy code
npm install
Run the React development server:

bash
Copy code
npm start
Deployment
To create a production build and serve it, run:

bash
Copy code
npm run build
serve -s build
Usage
Access the application at http://localhost:3000.
The Flask API is available at http://localhost:5000.
