#!/usr/bin/env python3
"""
Fake News Detection Model Evaluation Script
This script evaluates the trained model and provides detailed performance metrics.
"""

import joblib
import pandas as pd
import numpy as np
import re
import json
import os
from datetime import datetime
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import classification_report, confusion_matrix
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

def clean_text(text):
    """
    Clean and preprocess text data (same as training)
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

def load_model():
    """
    Load the trained model and vectorizer
    """
    api_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'api')
    
    model_path = os.path.join(api_dir, 'model.pkl')
    vectorizer_path = os.path.join(api_dir, 'vectorizer.pkl')
    
    try:
        model = joblib.load(model_path)
        vectorizer = joblib.load(vectorizer_path)
        print("Model and vectorizer loaded successfully")
        return model, vectorizer
    except FileNotFoundError as e:
        print(f"Error loading model: {e}")
        print("Please train the model first using train_model.py")
        return None, None

def create_test_dataset():
    """
    Create a test dataset for evaluation
    """
    print("Creating test dataset...")
    
    # Test fake news samples
    fake_test = [
        "Breaking: Scientists confirm that the moon landing was staged in Hollywood studio",
        "Local doctor discovers miracle cure that pharmaceutical companies don't want you to know",
        "Government plans to replace all currency with chocolate coins next month",
        "New research proves that cats are actually alien spies sent to monitor humans",
        "Breaking news: Time travel discovered by teenager in garage using household items",
        "Study reveals that watching TV backwards can reverse aging process completely",
        "Government secretly adding happiness chemicals to pizza to control population mood",
        "Scientists discover that plants are actually trying to communicate with aliens",
        "Breaking: Researchers prove that gravity works differently on Tuesdays",
        "Local man claims he can predict weather by listening to his pet goldfish"
    ]
    
    # Test real news samples
    real_test = [
        "University research team publishes findings on renewable energy efficiency improvements",
        "City announces new public transportation routes to serve growing suburban areas",
        "Local hospital implements new patient safety protocols following industry guidelines",
        "Technology conference showcases latest innovations in artificial intelligence and robotics",
        "Environmental agency reports progress in reducing carbon emissions across industrial sector",
        "Educational board approves updated curriculum standards for mathematics and science courses",
        "Community organizations partner to provide job training programs for unemployed residents",
        "Public health officials recommend seasonal flu vaccination for all eligible individuals",
        "Transportation authority begins construction on new bridge to improve traffic flow",
        "Research institute receives grant funding for climate change adaptation studies"
    ]
    
    # Create test DataFrame
    test_data = []
    
    # Add fake news with label 0
    for text in fake_test:
        test_data.append({'text': text, 'label': 0, 'category': 'fake'})
    
    # Add real news with label 1
    for text in real_test:
        test_data.append({'text': text, 'label': 1, 'category': 'real'})
    
    test_df = pd.DataFrame(test_data)
    test_df = test_df.sample(frac=1).reset_index(drop=True)  # Shuffle
    
    print(f"Created test dataset with {len(test_df)} samples")
    print(f"Fake news samples: {len(test_df[test_df['label'] == 0])}")
    print(f"Real news samples: {len(test_df[test_df['label'] == 1])}")
    
    return test_df

def evaluate_model(model, vectorizer, test_df):
    """
    Evaluate the model on test data
    """
    print("\nEvaluating model performance...")
    
    # Preprocess test data
    test_df['cleaned_text'] = test_df['text'].apply(clean_text)
    
    # Prepare features and labels
    X_test = test_df['cleaned_text']
    y_test = test_df['label']
    
    # Transform text to TF-IDF features
    X_test_tfidf = vectorizer.transform(X_test)
    
    # Make predictions
    y_pred = model.predict(X_test_tfidf)
    y_pred_proba = model.decision_function(X_test_tfidf)
    
    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    # Print overall metrics
    print(f"\nOverall Performance Metrics:")
    print(f"Accuracy:  {accuracy:.4f} ({accuracy*100:.2f}%)")
    print(f"Precision: {precision:.4f} ({precision*100:.2f}%)")
    print(f"Recall:    {recall:.4f} ({recall*100:.2f}%)")
    print(f"F1-Score:  {f1:.4f} ({f1*100:.2f}%)")
    
    # Detailed classification report
    print(f"\nDetailed Classification Report:")
    print(classification_report(y_test, y_pred, target_names=['Fake', 'Real']))
    
    # Confusion matrix
    print(f"\nConfusion Matrix:")
    cm = confusion_matrix(y_test, y_pred)
    print(f"{'':>10} {'Predicted':>20}")
    print(f"{'Actual':>10} {'Fake':>10} {'Real':>10}")
    print(f"{'Fake':>10} {cm[0,0]:>10} {cm[0,1]:>10}")
    print(f"{'Real':>10} {cm[1,0]:>10} {cm[1,1]:>10}")
    
    return {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1_score': f1,
        'predictions': y_pred,
        'probabilities': y_pred_proba
    }

def test_individual_predictions(model, vectorizer, test_df, results):
    """
    Test individual predictions and show detailed results
    """
    print(f"\nIndividual Prediction Analysis:")
    print("=" * 80)
    
    test_df['cleaned_text'] = test_df['text'].apply(clean_text)
    X_test_tfidf = vectorizer.transform(test_df['cleaned_text'])
    
    for i, row in test_df.iterrows():
        text = row['text']
        true_label = "Real" if row['label'] == 1 else "Fake"
        
        # Make prediction
        pred = model.predict(X_test_tfidf[i])[0]
        pred_label = "Real" if pred == 1 else "Fake"
        
        # Get confidence
        confidence_score = model.decision_function(X_test_tfidf[i])[0]
        confidence = abs(confidence_score) / (abs(confidence_score) + 1) * 100
        
        # Determine if prediction is correct
        correct = "✓" if pred == row['label'] else "✗"
        
        print(f"\nSample {i+1}: {correct}")
        print(f"Text: {text[:100]}{'...' if len(text) > 100 else ''}")
        print(f"True Label: {true_label}")
        print(f"Predicted: {pred_label} (Confidence: {confidence:.1f}%)")
        
        if pred != row['label']:
            print(f"❌ MISCLASSIFIED")

def save_evaluation_report(results, test_df):
    """
    Save evaluation results to a file
    """
    api_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'api')
    
    report = {
        'evaluation_date': datetime.now().isoformat(),
        'test_samples': len(test_df),
        'metrics': {
            'accuracy': float(results['accuracy']),
            'precision': float(results['precision']),
            'recall': float(results['recall']),
            'f1_score': float(results['f1_score'])
        },
        'model_info': {
            'algorithm': 'PassiveAggressiveClassifier',
            'vectorizer': 'TF-IDF'
        }
    }
    
    report_path = os.path.join(api_dir, 'evaluation_report.json')
    
    with open(report_path, 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"\nEvaluation report saved to: {report_path}")

def main():
    """
    Main evaluation function
    """
    print("=" * 60)
    print("FAKE NEWS DETECTION MODEL EVALUATION")
    print("=" * 60)
    
    # Load the trained model
    model, vectorizer = load_model()
    
    if model is None or vectorizer is None:
        print("Cannot proceed without trained model. Exiting.")
        return
    
    # Create test dataset
    test_df = create_test_dataset()
    
    # Evaluate the model
    results = evaluate_model(model, vectorizer, test_df)
    
    # Test individual predictions
    test_individual_predictions(model, vectorizer, test_df, results)
    
    # Save evaluation report
    save_evaluation_report(results, test_df)
    
    print("\n" + "=" * 60)
    print("EVALUATION COMPLETED!")
    print(f"Overall Accuracy: {results['accuracy']:.4f} ({results['accuracy']*100:.2f}%)")
    print("=" * 60)

if __name__ == "__main__":
    main()