import { useState } from 'react';
import './App.css';
import { useExitListener } from './hooks/useExitListener';
import { useNuiEvent } from './hooks/useNuiEvent';
import { fetchNui } from './utils/fetchNui';
import { Questions, QuestionsProps } from './Questions';

function App() {
  const [display, setDisplay] = useState(false);
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState<QuestionsProps>({
    task: 'You must answer at least 0 correct answer out of 10 questions!',
    title: '',
    description: '',
    image: '',
    cancel: 'Cancel',
    next: 'Next',
    questions: [
      {
        question: 'Default Question',
        answers: {
          a: 'Answer is this',
          b: 'False',
          c: 'Nope',
          d: 'Not This',
          correct: 'a',
        },
      },
    ],
    minimum: 0,
    shuffleQuestions: false,
  });

  useNuiEvent('closeQuiz', (data) => {
    setDisplay(data);
    setStart(false);
  });

  useNuiEvent('openQuiz', (data) => {
    setQuestions(data.questions);
    setDisplay(data.display);
  });

  const handleClose = () => {
    setDisplay(false);
    setStart(false);
    fetchNui('hideFrame');
  };

  useExitListener(setDisplay);

  if (!display) return null;
  else
    return (
      <div className="flex h-screen">
        <div
          className="m-auto inset-0 h-5/6 w-5/6 rounded-lg flex"
          style={{
            backgroundColor: '#19181D',
          }}
        >
          {start ? (
            <Questions {...questions} />
          ) : (
            <div
              className="w-2/5 h-3/5 rounded-lg m-auto inset-0 text-center text-white flex flex-col justify-center"
              style={{
                backgroundColor: '#383838',
              }}
            >
              <div
                className="bg-contain bg-no-repeat w-24 h-24 left-0 right-0 mx-auto bg-bottom"
                style={{
                  backgroundImage: `url(images/${questions.image}.png)`,
                }}
              ></div>
              <p className="text-3xl font-bold mt-6 mb-4">{questions.title}</p>
              <p className="mb-6">{questions.description}</p>
              <div className="inline-flex w-full justify-center">
                <button
                  className="rounded-lg w-40 py-2 text-white font-bold mx-4 hover:scale-110 transition-transform duration-200"
                  style={{
                    backgroundColor: '#19181D',
                  }}
                  onClick={handleClose}
                >
                  {questions.cancel}
                </button>
                <button
                  className="rounded-lg w-40 py-2 text-white font-bold mx-4 bg-lime-600 hover:scale-110 transition-transform duration-200"
                  onClick={() => setStart(true)}
                >
                  {questions.next}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default App;
