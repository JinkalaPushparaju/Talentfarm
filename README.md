# CurioScope

CurioScope is a web application that allows users to ask questions and receive real-time answers with citations using the Perplexity Sonar API. It features follow-up questions (chain-of-thought), session history, and a clean, responsive UI.

## Features

- Ask any question and get detailed answers with citations
- Follow-up questions for deeper exploration of topics
- Save and revisit conversation history
- Clean, responsive UI that works on all devices
- Flask backend for secure API interaction

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Flask (Python)
- API: Perplexity Sonar API

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.7+
- Perplexity API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/curioscope.git
   cd curioscope
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Set up the Flask backend:
   ```
   cd api
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `api` directory with your Perplexity API key:
   ```
   PERPLEXITY_API_KEY=your_api_key_here
   ```

### Running the Application

1. Start the Flask backend:
   ```
   cd api
   python app.py
   ```

2. In a separate terminal, start the React frontend:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
curioscope/
├── api/                 # Flask backend
│   ├── app.py           # Main Flask application
│   ├── requirements.txt # Python dependencies
│   └── .env.example     # Example environment variables
├── src/
│   ├── api/             # API client functions
│   ├── components/      # React components
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── package.json         # Node.js dependencies
└── README.md            # Project documentation
```

## Acknowledgements

- [Perplexity](https://www.perplexity.ai/) for the Sonar API
- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/)