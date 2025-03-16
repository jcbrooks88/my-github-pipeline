import type { Question } from '../models/Question.js';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'https://my-github-pipeline.onrender.com/api';

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch(`${API_URL}/questions/random`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
};

