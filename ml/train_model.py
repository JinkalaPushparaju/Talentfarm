#!/usr/bin/env python3
"""
Fake News Detection Model Training Script
This script trains a PassiveAggressiveClassifier to detect fake news using TF-IDF features.
"""

import pandas as pd
import numpy as np
import re
import string
import joblib
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
# import matplotlib.pyplot as plt
# import seaborn as sns
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
    """
    Clean and preprocess text data
    """
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

def create_sample_dataset():
    """
    Create a sample dataset for demonstration purposes
    In a real scenario, you would load your actual dataset here
    """
    print("Creating sample dataset...")
    
    # Sample fake news headlines/articles
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
    
    # Sample real news headlines/articles
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
    
    # Create DataFrame
    data = []
    
    # Add fake news with label 0
    for text in fake_news:
        data.append({'text': text, 'label': 0})
    
    # Add real news with label 1
    for text in real_news:
        data.append({'text': text, 'label': 1})
    
    df = pd.DataFrame(data)
    
    # Shuffle the dataset
    df = df.sample(frac=1).reset_index(drop=True)
    
    print(f"Created dataset with {len(df)} samples")
    print(f"Fake news samples: {len(df[df['label'] == 0])}")
    print(f"Real news samples: {len(df[df['label'] == 1])}")
    
    return df

def train_model(df):
    """
    Train the fake news detection model
    """
    print("\nStarting model training...")
    
    # Clean the text data
    print("Cleaning text data...")
    df['cleaned_text'] = df['text'].apply(clean_text)
    
    # Remove empty texts
    df = df[df['cleaned_text'].str.len() > 0]
    
    # Prepare features and labels
    X = df['cleaned_text']
    y = df['label']
    
    print(f"Training on {len(X)} samples")
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"Training set: {len(X_train)} samples")
    print(f"Test set: {len(X_test)} samples")
    
    # Create TF-IDF vectorizer
    print("Creating TF-IDF features...")
    vectorizer = TfidfVectorizer(
        max_features=5000,
        stop_words='english',
        ngram_range=(1, 2),
        max_df=0.7,
        min_df=2
    )
    
    # Fit and transform the training data
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)
    
    print(f"TF-IDF feature matrix shape: {X_train_tfidf.shape}")
    
    # Train the model
    print("Training PassiveAggressiveClassifier...")
    model = PassiveAggressiveClassifier(
        max_iter=1000,
        random_state=42,
        C=1.0
    )
    
    model.fit(X_train_tfidf, y_train)
    
    # Make predictions
    y_pred = model.predict(X_test_tfidf)
    
    # Calculate accuracy
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nModel Accuracy: {accuracy:.4f} ({accuracy*100:.2f}%)")
    
    # Print detailed classification report
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=['Fake', 'Real']))
    
    # Print confusion matrix
    print("\nConfusion Matrix:")
    cm = confusion_matrix(y_test, y_pred)
    print(cm)
    
    return model, vectorizer, accuracy

def save_model(model, vectorizer, accuracy):
    """
    Save the trained model and vectorizer
    """
    print(f"\nSaving model with accuracy: {accuracy:.4f}")
    
    # Save to the api directory so the Flask app can load it
    api_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'api')
    
    model_path = os.path.join(api_dir, 'model.pkl')
    vectorizer_path = os.path.join(api_dir, 'vectorizer.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump(vectorizer, vectorizer_path)
    
    print(f"Model saved to: {model_path}")
    print(f"Vectorizer saved to: {vectorizer_path}")
    
    # Save model metadata
    metadata = {
        'accuracy': accuracy,
        'algorithm': 'PassiveAggressiveClassifier',
        'vectorizer': 'TF-IDF',
        'trained_at': datetime.now().isoformat(),
        'features': 'max_features=5000, ngram_range=(1,2)'
    }
    
    metadata_path = os.path.join(api_dir, 'model_metadata.json')
    import json
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"Metadata saved to: {metadata_path}")

def main():
    """
    Main training function
    """
    print("=" * 60)
    print("FAKE NEWS DETECTION MODEL TRAINING")
    print("=" * 60)
    
    # Create or load dataset
    df = create_sample_dataset()
    
    # Train the model
    model, vectorizer, accuracy = train_model(df)
    
    # Save the model
    save_model(model, vectorizer, accuracy)
    
    print("\n" + "=" * 60)
    print("TRAINING COMPLETED SUCCESSFULLY!")
    print(f"Final Model Accuracy: {accuracy:.4f} ({accuracy*100:.2f}%)")
    print("=" * 60)
    
    # Test with sample predictions
    print("\nTesting with sample predictions:")
    
    test_texts = [
        "Scientists discover breakthrough in cancer research at local university",
        "Government secretly controls weather using alien technology hidden in mountains"
    ]
    
    for text in test_texts:
        cleaned = clean_text(text)
        vectorized = vectorizer.transform([cleaned])
        prediction = model.predict(vectorized)[0]
        confidence = model.decision_function(vectorized)[0]
        conf_pct = abs(confidence) / (abs(confidence) + 1) * 100
        
        label = "Real" if prediction == 1 else "Fake"
        print(f"\nText: {text}")
        print(f"Prediction: {label} (Confidence: {conf_pct:.1f}%)")

if __name__ == "__main__":
    main()