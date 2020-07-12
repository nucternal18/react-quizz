import { shuffleArray } from './Utils';

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionsState = Question & { answer: string[] };

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&diffculty=${difficulty}&type=multiple`;

        const data = await (await fetch(endPoint)).json();
        return data.results.map((question: Question) => (
            {
                ...question,
                answer: shuffleArray([
                    ...question.incorrect_answers,
                    question.correct_answer,
                ])
            }
        ))
}
