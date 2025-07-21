# 📥 Fake News Detective - Download Guide

## 🎯 Quick Setup (Copy & Paste Method)

### 1. Create Project Structure
```bash
mkdir fake-news-detective
cd fake-news-detective
mkdir -p api ml src/{components,pages,context}
mkdir -p src/components/{detection,layout,auth}
```

### 2. Backend Files

#### `api/requirements.txt`
```
flask==3.0.0
flask-cors==4.0.0
scikit-learn>=1.3.2
pandas>=2.0.0
numpy>=1.24.0
nltk>=3.8.0
joblib>=1.3.0
requests>=2.31.0
```

#### `api/app.py`
```python
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
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt_tab')

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
```

### 3. Frontend Files

#### `package.json`
```json
{
  "name": "fake-news-detective",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",
    "react-toastify": "^10.0.4",
    "framer-motion": "^11.0.5",
    "react-hook-form": "^7.50.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

#### `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

### 4. Machine Learning Training Script

#### `ml/train_model.py`
```python
#!/usr/bin/env python3
import pandas as pd
import numpy as np
import re
import joblib
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from datetime import datetime
import os

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt_tab')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

def clean_text(text):
    if not isinstance(text, str):
        return ""
    
    text = text.lower()
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    text = re.sub(r'\S+@\S+', '', text)
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = ' '.join(text.split())
    
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(text)
    filtered_text = [word for word in word_tokens if word not in stop_words]
    
    return ' '.join(filtered_text)

def create_sample_dataset():
    fake_news = [
        "Scientists discover that drinking water daily is actually harmful to your health",
        "Government secretly replacing all birds with surveillance drones, leaked documents reveal",
        "Local man discovers one weird trick that doctors hate - cures all diseases instantly",
        "Breaking: Earth confirmed to be flat by new NASA study that they don't want you to see",
        "Vaccines contain microchips designed to control your thoughts, expert claims",
        "Celebrity found dead in hotel room after posting controversial tweet about aliens",
        "New study shows that breathing air causes cancer in 99% of people tested",
        "Government plans to ban all forms of transportation except walking backwards",
        "Scientists prove that gravity is just a government conspiracy to keep us down",
        "Local woman ages backwards after eating this one magical fruit doctors hate",
        "Breaking news: Internet to be shut down permanently next week by secret organization",
        "Researchers discover that sleeping more than 3 hours per night is deadly",
        "Government admits to putting mind control chemicals in tap water supply",
        "New evidence suggests that the moon is actually made of government surveillance equipment",
        "Doctor reveals shocking truth: exercise is actually bad for your health and fitness"
    ]
    
    real_news = [
        "Local community center receives funding for new youth programs and educational initiatives",
        "University researchers publish study on climate change effects in coastal regions",
        "City council approves budget for infrastructure improvements and road maintenance",
        "Technology company announces new software update with enhanced security features",
        "Hospital staff recognized for outstanding patient care during challenging times",
        "Educational institution launches scholarship program for underprivileged students",
        "Environmental group organizes cleanup initiative for local parks and waterways",
        "Small business owners adapt to changing market conditions with innovative solutions",
        "Research team develops new method for early disease detection and treatment",
        "Community leaders work together to address housing affordability challenges",
        "Public library expands digital resources and online learning opportunities",
        "Local farmers market celebrates successful season with record attendance",
        "Transportation department announces schedule for upcoming road construction projects",
        "Healthcare workers receive additional training in emergency response procedures",
        "School district implements new curriculum focused on science and technology education"
    ]
    
    data = []
    for text in fake_news:
        data.append({'text': text, 'label': 0})
    for text in real_news:
        data.append({'text': text, 'label': 1})
    
    df = pd.DataFrame(data)
    return df.sample(frac=1).reset_index(drop=True)

def train_model(df):
    print("Starting model training...")
    df['cleaned_text'] = df['text'].apply(clean_text)
    df = df[df['cleaned_text'].str.len() > 0]
    
    X = df['cleaned_text']
    y = df['label']
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    vectorizer = TfidfVectorizer(
        max_features=5000,
        stop_words='english',
        ngram_range=(1, 2),
        max_df=0.7,
        min_df=2
    )
    
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)
    
    model = PassiveAggressiveClassifier(
        max_iter=1000,
        random_state=42,
        C=1.0
    )
    
    model.fit(X_train_tfidf, y_train)
    y_pred = model.predict(X_test_tfidf)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"Model Accuracy: {accuracy:.4f} ({accuracy*100:.2f}%)")
    
    return model, vectorizer, accuracy

def save_model(model, vectorizer, accuracy):
    api_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'api')
    
    joblib.dump(model, os.path.join(api_dir, 'model.pkl'))
    joblib.dump(vectorizer, os.path.join(api_dir, 'vectorizer.pkl'))
    
    metadata = {
        'accuracy': accuracy,
        'algorithm': 'PassiveAggressiveClassifier',
        'vectorizer': 'TF-IDF',
        'trained_at': datetime.now().isoformat(),
    }
    
    import json
    with open(os.path.join(api_dir, 'model_metadata.json'), 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print("Model saved successfully!")

def main():
    print("FAKE NEWS DETECTION MODEL TRAINING")
    df = create_sample_dataset()
    model, vectorizer, accuracy = train_model(df)
    save_model(model, vectorizer, accuracy)
    print(f"Training completed! Accuracy: {accuracy*100:.2f}%")

if __name__ == "__main__":
    main()
```

## 🚀 Setup Instructions

### 1. Backend Setup
```bash
cd api
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ../ml
python train_model.py
cd ../api
python app.py
```

### 2. Frontend Setup
```bash
npm install
npm run dev
```

### 3. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📋 Complete File List

You'll need to create these additional files by copying from the main project:
- `src/App.tsx` - Main React app
- `src/pages/HomePage.tsx` - Home page component  
- `src/pages/DetectionPage.tsx` - Detection page
- `src/components/detection/TextInputSection.tsx` - Text input component
- `index.html` - HTML entry point
- `tailwind.config.js` - Tailwind configuration
- `tsconfig.json` - TypeScript configuration

## 🎯 Quick Test
After setup, test with:
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Scientists discover that drinking water is harmful"}'
```

The system should return a prediction with confidence score!