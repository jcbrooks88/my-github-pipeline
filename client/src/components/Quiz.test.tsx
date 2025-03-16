import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from './Quiz';
import { getQuestions } from '../services/questionApi';
import '@testing-library/jest-dom';

// Mock API response
vi.mock('../services/questionApi', () => ({
  getQuestions: vi.fn(),
}));

const mockQuestions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: true },
      { text: "5", isCorrect: false },
    ],
  },
];

describe('Quiz Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (getQuestions as vi.Mock).mockResolvedValue(mockQuestions);
  });

  it('renders Start Quiz button initially', () => {
    render(<Quiz />);
    expect(screen.getByText(/Start Quiz/i)).toBeInTheDocument();
  });

  it('fetches questions and displays first question', async () => {
    render(<Quiz />);
    
    fireEvent.click(screen.getByText(/Start Quiz/i));

    await waitFor(() => {
      expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
    });
  });

  it('selects an incorrect answer and completes the quiz', async () => {
    render(<Quiz />);
    
    fireEvent.click(screen.getByText(/Start Quiz/i));
    await waitFor(() => screen.getByText("What is 2 + 2?"));

    // Click the incorrect answer (Button "1" which corresponds to "3")
    fireEvent.click(screen.getByText("1"));

    await waitFor(() => expect(screen.getByText(/Quiz Completed/i)).toBeInTheDocument());
    expect(screen.getByText("Your score: 0/1")).toBeInTheDocument();
  });

  it('selects the correct answer and updates the score', async () => {
    render(<Quiz />);
    
    fireEvent.click(screen.getByText(/Start Quiz/i));
    await waitFor(() => screen.getByText("What is 2 + 2?"));

    // Click the correct answer (Button "2" which corresponds to "4")
    fireEvent.click(screen.getByText("2"));

    await waitFor(() => expect(screen.getByText(/Quiz Completed/i)).toBeInTheDocument());
    expect(screen.getByText("Your score: 1/1")).toBeInTheDocument();
  });

  it("restarts the quiz successfully", async () => {
    render(<Quiz />);
  
    // Start the quiz
    fireEvent.click(screen.getByText(/Start Quiz/i));
  
    // Wait for the first question to appear
    await waitFor(() => screen.getByText("What is 2 + 2?"));
  
    // Select an answer
    fireEvent.click(screen.getByText("2"));
  
    // Wait for the quiz to complete
    await waitFor(() => screen.getByText(/Quiz Completed/i));
  
    // Restart the quiz
    fireEvent.click(screen.getByText(/Take New Quiz/i));
  
    // 🔥 FIX: Check if the first question appears instead of "Start Quiz"
    await waitFor(() => expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument());
  });
});
