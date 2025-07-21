from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import re
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import os
import json
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

# Global variables for model and vectorizer
model = None
vectorizer = None

def load_model():
    """Load the trained model and vectorizer"""
    global model, vectorizer
    try:
        model = joblib.load('model.pkl')
        vectorizer = joblib.load('vectorizer.pkl')
        print("Model and vectorizer loaded successfully")
        return True
    except FileNotFoundError:
        print("Model files not found. Please train the model first.")
        return False

def preprocess_text(text):
    """Clean and preprocess text data"""
    if not isinstance(text, str):
        return ""
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    
    # Remove email addresses
    text = re.sub(r'\S+@\S+', '', text)
    
    # Remove punctuation and special characters
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(text)
    filtered_text = [word for word in word_tokens if word not in stop_words]
    
    return ' '.join(filtered_text)

def predict_news(text):
    """Predict if news is fake or real"""
    global model, vectorizer
    
    if model is None or vectorizer is None:
        if not load_model():
            return None, None
    
    # Preprocess the text
    cleaned_text = preprocess_text(text)
    
    # Vectorize the text
    text_vector = vectorizer.transform([cleaned_text])
    
    # Make prediction
    prediction = model.predict(text_vector)[0]
    prediction_proba = model.decision_function(text_vector)[0]
    
    # Convert decision function score to confidence percentage
    confidence = abs(prediction_proba) / (abs(prediction_proba) + 1) * 100
    confidence = min(confidence, 99.9)  # Cap at 99.9%
    
    label = "Real" if prediction == 1 else "Fake"
    
    return label, round(confidence, 1)

@app.route('/api/predict', methods=['POST'])
def predict():
    """Main prediction endpoint"""
    try:
        data = request.json
        text = data.get('text', '').strip()
        
        if not text:
            return jsonify({"error": "Text content is required"}), 400
        
        if len(text) < 10:
            return jsonify({"error": "Text too short for reliable analysis"}), 400
        
        # Make prediction
        label, confidence = predict_news(text)
        
        if label is None:
            return jsonify({"error": "Model not available. Please try again later."}), 500
        
        # Create response
        response = {
            "label": label,
            "confidence": confidence,
            "text_length": len(text),
            "processed_at": datetime.now().isoformat(),
            "model_info": {
                "algorithm": "PassiveAggressiveClassifier",
                "vectorizer": "TF-IDF"
            }
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    global model, vectorizer
    
    model_status = "loaded" if model is not None else "not loaded"
    vectorizer_status = "loaded" if vectorizer is not None else "not loaded"
    
    return jsonify({
        "status": "healthy",
        "model": model_status,
        "vectorizer": vectorizer_status,
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/model/info', methods=['GET'])
def model_info():
    """Get model information"""
    global model, vectorizer
    
    if model is None:
        return jsonify({"error": "Model not loaded"}), 404
    
    return jsonify({
        "algorithm": "PassiveAggressiveClassifier",
        "vectorizer": "TF-IDF",
        "status": "loaded",
        "features": getattr(vectorizer, 'vocabulary_', {}) != {},
        "model_type": str(type(model).__name__)
    })

# Initialize model on startup
load_model()

if __name__ == '__main__':
    app.run(debug=True, port=5000)