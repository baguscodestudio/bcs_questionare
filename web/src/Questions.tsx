import { useState, useEffect } from 'react';
import { fetchNui } from './utils/fetchNui';
import { shuffle } from './utils/misc';

export interface QuestionsProps {
  task: string;
  title: string;
  description: string;
  image: string;
  cancel: string;
  next: string;
  questions: [
    {
      question: string;
      answers: {
        a: string;
        b: string;
        c: string;
        d: string;
        correct: string;
      };
    }
  ];
  minimum: number;
  shuffleQuestions: boolean;
}

export const Questions: React.FC<QuestionsProps> = ({
  task,
  questions,
  minimum,
  shuffleQuestions,
}) => {
  const [correct, setCorrect] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [finish, setFinish] = useState(false);
  let quiz = [];

  const handleNext = (selected: string, answer: string) => {
    if (selected === answer) setCorrect(correct + 1);

    if (currentQuestion < questions.length)
      setCurrentQuestion(currentQuestion + 1);
    else {
      setFinish(true);
    }
  };

  useEffect(() => {
    if (finish) {
      fetchNui('finishQuiz', {
        correct: correct,
        questions: questions.length,
        passed: correct >= minimum,
      });
      fetchNui('hideFrame');
    }
  }, [finish]);

  if (shuffleQuestions) quiz = shuffle(questions);
  else quiz = questions;

  return (
    <div className="text-gray-200 w-full">
      <div className="h-full w-4/6 mx-auto">
        <div className="font-bold text-2xl mt-10 mb-4">{task}</div>
        <div
          className="h-4/6 w-full rounded-lg flex flex-col p-8"
          style={{
            backgroundColor: '#383838',
          }}
        >
          {quiz.map((question, index) => {
            if (index + 1 == currentQuestion)
              return (
                <>
                  <div className="text-lg mb-6">
                    {`${index + 1}. ${question.question}`}
                  </div>
                  <div className="grid grid-cols-2 grid-rows-2 gap-10 h-3/5">
                    <button
                      className="rounded-lg w-full h-full py-2 px-4 text-center hover:scale-110 transition-transform duration-200 ease-linear relative"
                      style={{
                        backgroundColor: '#212121',
                      }}
                      onClick={() => handleNext('a', question.answers.correct)}
                    >
                      <div className="absolute font-bold top-2 left-4">A.</div>
                      <p>{question.answers.a}</p>
                    </button>
                    <button
                      className="rounded-lg w-full h-full py-2 px-4 text-center hover:scale-110 transition-transform duration-200 ease-linear relative"
                      style={{
                        backgroundColor: '#212121',
                      }}
                      onClick={() => handleNext('b', question.answers.correct)}
                    >
                      <div className="absolute font-bold top-2 left-4">B.</div>
                      <p>{question.answers.b}</p>
                    </button>
                    <button
                      className="rounded-lg w-full h-full py-2 px-4 text-center hover:scale-110 transition-transform duration-200 ease-linear relative"
                      style={{
                        backgroundColor: '#212121',
                      }}
                      onClick={() => handleNext('c', question.answers.correct)}
                    >
                      <div className="absolute font-bold top-2 left-4">C.</div>
                      <p>{question.answers.c}</p>
                    </button>
                    <button
                      className="rounded-lg w-full h-full py-2 px-4 text-center hover:scale-110 transition-transform duration-200 ease-linear relative"
                      style={{
                        backgroundColor: '#212121',
                      }}
                      onClick={() => handleNext('d', question.answers.correct)}
                    >
                      <div className="absolute font-bold top-2 left-4">D.</div>
                      <p>{question.answers.d}</p>
                    </button>
                  </div>
                </>
              );
          })}
        </div>
      </div>
    </div>
  );
};
