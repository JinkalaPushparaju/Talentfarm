import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export async function submitQuestion(
  question: string, 
  sessionId?: string, 
  parentId?: string
) {
  try {
    const response = await axios.post(`${API_BASE_URL}/query`, {
      question,
      sessionId,
      parentId,
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting question:', error);
    throw error;
  }
}

export async function getSessions() {
  try {
    const response = await axios.get(`${API_BASE_URL}/sessions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
}

export async function getSession(sessionId: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching session ${sessionId}:`, error);
    throw error;
  }
}