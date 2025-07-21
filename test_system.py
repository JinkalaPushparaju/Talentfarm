#!/usr/bin/env python3
"""
Test script for the Fake News Detection System
This script tests both the API endpoints and demonstrates the functionality.
"""

import requests
import json
import time

# Test data
test_cases = [
    {
        "text": "Scientists discover that drinking water daily is actually harmful to your health",
        "expected": "Fake",
        "description": "Clearly false health claim"
    },
    {
        "text": "Local community center receives funding for new youth programs and educational initiatives",
        "expected": "Real", 
        "description": "Typical real news headline"
    },
    {
        "text": "Government secretly replacing all birds with surveillance drones, leaked documents reveal",
        "expected": "Fake",
        "description": "Conspiracy theory"
    },
    {
        "text": "University researchers publish study on climate change effects in coastal regions",
        "expected": "Real",
        "description": "Academic research news"
    },
    {
        "text": "Breaking: Earth confirmed to be flat by new NASA study that they don't want you to see",
        "expected": "Fake",
        "description": "Flat earth conspiracy"
    }
]

def test_api_health():
    """Test the health endpoint"""
    print("🔍 Testing API Health...")
    try:
        response = requests.get("http://localhost:5000/api/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API is healthy: {data['status']}")
            print(f"   Model: {data['model']}")
            print(f"   Vectorizer: {data['vectorizer']}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_prediction(text, expected, description):
    """Test a single prediction"""
    try:
        response = requests.post(
            "http://localhost:5000/api/predict",
            headers={"Content-Type": "application/json"},
            json={"text": text}
        )
        
        if response.status_code == 200:
            data = response.json()
            label = data['label']
            confidence = data['confidence']
            
            # Check if prediction matches expectation (note: with small dataset, accuracy may vary)
            status = "✅" if label == expected else "⚠️"
            
            print(f"{status} {description}")
            print(f"   Text: {text[:60]}{'...' if len(text) > 60 else ''}")
            print(f"   Predicted: {label} (Confidence: {confidence}%)")
            print(f"   Expected: {expected}")
            print()
            
            return label == expected
        else:
            print(f"❌ Prediction failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Prediction error: {e}")
        return False

def test_model_info():
    """Test the model info endpoint"""
    print("📊 Testing Model Info...")
    try:
        response = requests.get("http://localhost:5000/api/model/info")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Model Info Retrieved:")
            print(f"   Algorithm: {data['algorithm']}")
            print(f"   Vectorizer: {data['vectorizer']}")
            print(f"   Status: {data['status']}")
            print()
            return True
        else:
            print(f"❌ Model info failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Model info error: {e}")
        return False

def main():
    """Main test function"""
    print("=" * 70)
    print("🕵️  FAKE NEWS DETECTION SYSTEM TEST")
    print("=" * 70)
    print()
    
    # Test API health
    if not test_api_health():
        print("❌ API health check failed. Make sure the backend is running.")
        return
    print()
    
    # Test model info
    test_model_info()
    
    # Test predictions
    print("🧪 Testing Predictions...")
    print("-" * 50)
    
    correct_predictions = 0
    total_predictions = len(test_cases)
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"Test {i}/{total_predictions}:")
        if test_prediction(test_case['text'], test_case['expected'], test_case['description']):
            correct_predictions += 1
        time.sleep(0.5)  # Small delay between requests
    
    # Results summary
    print("=" * 70)
    print("📈 TEST RESULTS SUMMARY")
    print("=" * 70)
    print(f"Total Tests: {total_predictions}")
    print(f"Correct Predictions: {correct_predictions}")
    print(f"Accuracy: {(correct_predictions/total_predictions)*100:.1f}%")
    print()
    
    if correct_predictions == total_predictions:
        print("🎉 All tests passed! The system is working perfectly.")
    elif correct_predictions >= total_predictions * 0.6:
        print("⚠️  Most tests passed. Note: With a small training dataset,")
        print("   accuracy may vary. Consider training with more data.")
    else:
        print("❌ Many tests failed. The model may need retraining with more data.")
    
    print()
    print("🌐 Frontend URL: http://localhost:5173")
    print("🔗 Backend API: http://localhost:5000")
    print("📚 Try the web interface to test interactively!")

if __name__ == "__main__":
    main()