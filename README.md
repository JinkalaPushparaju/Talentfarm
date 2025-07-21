# Fake News Detective

An intelligent AI-powered system that classifies news articles as Fake or Real using machine learning and natural language processing (NLP). This project addresses the critical problem of misinformation spreading through digital platforms.

## 🧠 Project Overview

Fake News Detective is a comprehensive web application that combines a modern React frontend with a powerful Flask backend to provide real-time fake news detection. The system uses a PassiveAggressiveClassifier trained on TF-IDF features to achieve high accuracy in identifying potentially fake or misleading news content.

## ✅ Features & Functionality

### 🖥 Frontend (User Interface)
- **Home Page**: Welcome message and project introduction
- **Detection Page**: Text input for news content analysis
- **Real-time Results**: Displays classification (Fake/Real) with confidence scores
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### ⚙ Backend (API and Logic)
- **POST /api/predict**: Main endpoint for news content analysis
- **GET /api/health**: Health check endpoint
- **GET /api/model/info**: Model information endpoint
- **Text Preprocessing**: Advanced cleaning and normalization
- **ML Pipeline**: TF-IDF vectorization + PassiveAggressiveClassifier

### 🤖 Machine Learning Model
- **Algorithm**: PassiveAggressiveClassifier
- **Features**: TF-IDF (Term Frequency-Inverse Document Frequency)
- **Preprocessing**: Text cleaning, stopword removal, normalization
- **Expected Accuracy**: ~92%
- **Libraries**: scikit-learn, pandas, NLTK, joblib

## 📁 Project Structure

```
fake-news-detective/
│
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   ├── package.json         # Node.js dependencies
│   └── tailwind.config.js   # Tailwind CSS config
│
├── api/                     # Flask backend
│   ├── app.py              # Main Flask application
│   ├── model.pkl           # Trained ML model
│   ├── vectorizer.pkl      # TF-IDF vectorizer
│   └── requirements.txt    # Python dependencies
│
├── ml/                     # Machine learning scripts
│   ├── train_model.py      # Model training script
│   └── evaluate_model.py   # Model evaluation script
│
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd fake-news-detective
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Set up the backend:**
   ```bash
   cd api
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Train the ML model:**
   ```bash
   cd ../ml
   python train_model.py
   ```

### Running the Application

1. **Start the Flask backend:**
   ```bash
   cd api
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   python app.py
   ```
   The backend will run on `http://localhost:5000`

2. **In a separate terminal, start the React frontend:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser and navigate to `http://localhost:5173`**

## 🔧 API Endpoints

### POST /api/predict
Analyzes news content for authenticity.

**Request:**
```json
{
  "text": "Your news content here..."
}
```

**Response:**
```json
{
  "label": "Fake",
  "confidence": 92.5,
  "text_length": 150,
  "processed_at": "2024-01-15T10:30:00",
  "model_info": {
    "algorithm": "PassiveAggressiveClassifier",
    "vectorizer": "TF-IDF"
  }
}
```

### GET /api/health
Returns the health status of the API and model.

### GET /api/model/info
Returns information about the loaded ML model.

## 🧪 Model Training & Evaluation

### Training the Model
```bash
cd ml
python train_model.py
```

This script will:
- Create a sample dataset (or load your own)
- Preprocess the text data
- Train a PassiveAggressiveClassifier
- Save the model and vectorizer to the `api/` directory

### Evaluating the Model
```bash
cd ml
python evaluate_model.py
```

This script provides:
- Accuracy, precision, recall, and F1-score
- Confusion matrix
- Individual prediction analysis
- Detailed evaluation report

## 🎯 How It Works

1. **Text Input**: User pastes news content into the web interface
2. **Preprocessing**: The backend cleans and normalizes the text
3. **Vectorization**: Text is converted to TF-IDF features
4. **Classification**: PassiveAggressiveClassifier predicts Fake/Real
5. **Results**: Confidence score and classification are returned to the user

## 🌐 Future Improvements

- [ ] Support for URL analysis and content scraping
- [ ] Image-based fake news detection
- [ ] Multi-language support
- [ ] Visual explanation using SHAP or LIME
- [ ] Mobile app development
- [ ] Browser extension
- [ ] Real-time fact-checking integration
- [ ] User authentication and history tracking

## 🛠 Tech Stack

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- React Hook Form

**Backend:**
- Flask
- scikit-learn
- pandas
- NLTK
- joblib

**Machine Learning:**
- PassiveAggressiveClassifier
- TF-IDF Vectorization
- Natural Language Processing

## 📊 Model Performance

- **Algorithm**: PassiveAggressiveClassifier
- **Feature Engineering**: TF-IDF with n-grams (1,2)
- **Preprocessing**: Stopword removal, text cleaning, normalization
- **Expected Accuracy**: ~92%
- **Training Time**: < 1 minute on sample dataset
- **Prediction Time**: < 100ms per article

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [scikit-learn](https://scikit-learn.org/) for machine learning algorithms
- [NLTK](https://www.nltk.org/) for natural language processing
- [React](https://reactjs.org/) for the frontend framework
- [Flask](https://flask.palletsprojects.com/) for the backend API
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📧 Contact

For questions, suggestions, or collaboration opportunities, please open an issue or contact the development team.

---

**⚠️ Disclaimer**: This tool is designed to assist in identifying potentially fake news but should not be the sole source for determining news authenticity. Always verify important information through multiple credible sources.