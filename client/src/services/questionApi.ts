import type { Question } from '../models/Question.js';

// Get the base API URL from environment variables (using import.meta.env for Vite)
const API_URL = import.meta.env.VITE_API_URL || '/api'; // Use VITE_API_URL instead of process.env.REACT_APP_API_URL

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch(`${API_URL}/questions/random`); // Use the dynamic URL
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Question[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
};
