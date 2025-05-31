# CurioScope API

This is the Flask backend for the CurioScope application, which interfaces with the Perplexity Sonar API.

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on `.env.example` and add your Perplexity API key:
   ```
   PERPLEXITY_API_KEY=your_api_key_here
   ```

5. Run the Flask app:
   ```
   python app.py
   ```

The API will be available at `http://localhost:5000`.

## API Endpoints

- `POST /api/query` - Submit a question
  - Request body: `{ "question": "string", "sessionId": "string" (optional), "parentId": "string" (optional) }`
  - Response: `{ "sessionId": "string", "conversationId": "string", "answer": "string", "citations": [] }`

- `GET /api/sessions` - Get all sessions
  - Response: Array of session objects

- `GET /api/sessions/<session_id>` - Get a specific session
  - Response: Session object with conversations