from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import json
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# You should replace this with your actual Perplexity API key
# Use environment variables in production
PERPLEXITY_API_KEY = os.environ.get("PERPLEXITY_API_KEY", "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")

# Store sessions in memory (replace with a database in production)
sessions = {}

@app.route('/api/query', methods=['POST'])
def query():
    data = request.json
    question = data.get('question')
    session_id = data.get('sessionId')
    parent_id = data.get('parentId')  # For follow-up questions
    
    if not question:
        return jsonify({"error": "Question is required"}), 400
    
    # Create a new session if it doesn't exist
    if not session_id or session_id not in sessions:
        session_id = str(int(time.time()))
        sessions[session_id] = {
            "id": session_id,
            "title": question[:50] + "..." if len(question) > 50 else question,
            "created_at": datetime.now().isoformat(),
            "conversations": []
        }
    
    # Call Perplexity API
    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "sonar-medium-online",
        "query": question,
        "temperature": 0.7,
        "max_tokens": 2048
    }
    
    if parent_id:
        # Find the parent question and add it to the request for context
        parent_question = next((conv for conv in sessions[session_id]["conversations"] if conv["id"] == parent_id), None)
        if parent_question:
            payload["context"] = {
                "query": parent_question["question"],
                "answer": parent_question["answer"]
            }
    
    try:
        response = requests.post(
            "https://api.perplexity.ai/chat/completions",
            headers=headers,
            json=payload
        )
        
        if response.status_code != 200:
            return jsonify({"error": f"API Error: {response.text}"}), response.status_code
        
        result = response.json()
        
        # Extract answer and citations
        answer_text = result["choices"][0]["message"]["content"]
        
        # Parse citations if available
        citations = []
        if "links" in result.get("choices", [{}])[0].get("message", {}).get("metadata", {}):
            citations = result["choices"][0]["message"]["metadata"]["links"]
        
        # Generate a unique ID for this conversation
        conv_id = f"{session_id}_{len(sessions[session_id]['conversations'])}"
        
        # Create conversation object
        conversation = {
            "id": conv_id,
            "question": question,
            "answer": answer_text,
            "citations": citations,
            "timestamp": datetime.now().isoformat(),
            "parent_id": parent_id
        }
        
        # Add to session
        sessions[session_id]["conversations"].append(conversation)
        
        return jsonify({
            "sessionId": session_id,
            "conversationId": conv_id,
            "answer": answer_text,
            "citations": citations,
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sessions', methods=['GET'])
def get_sessions():
    return jsonify(list(sessions.values()))

@app.route('/api/sessions/<session_id>', methods=['GET'])
def get_session(session_id):
    if session_id not in sessions:
        return jsonify({"error": "Session not found"}), 404
    
    return jsonify(sessions[session_id])

if __name__ == '__main__':
    app.run(debug=True, port=5000)