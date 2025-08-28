import { useNavigate, useParams } from 'react-router-dom';
import DefaultCard from '../../components/defaultcard';
import { useEffect, useState } from 'react';
import { locale } from '../../store/locale';
import ProgressBar from './components/ProgressBar';
import Answer from './components/Answer';
import { useAnswers } from '../../providers/AnswerProvider';
import { fetchNui } from '../../utils/fetchNui';
import { MOCK_QUESTION } from '../../store/mockdata';

export interface IQuestionData {
	id: number;
	question: string;
	image?: string;
	max: number;
	answers: {
		id: string;
		answer?: string;
		image?: string;
	}[];
}

const Question = () => {
	const { no } = useParams();
	const { answers, setAnswers } = useAnswers();
	const navigate = useNavigate();

	const [question, setQuestion] = useState<IQuestionData>();

	useEffect(() => {
		fetchNui<IQuestionData>('getQuestion', no, MOCK_QUESTION).then(setQuestion);
	}, [no]);

	const nextQuestion = (id: string) => {
		const tempAnswers = { ...answers };
		if (no && question) {
			tempAnswers[question.id] = id;
			// @TODO Correct logic of matching questions number and id
			if (no == question.max.toString()) {
				fetchNui('completeTest', tempAnswers);
				setQuestion(undefined);
				setAnswers({});
			} else {
				setAnswers(tempAnswers);
				navigate(
					`/question/${parseInt(no!) + 1}?max=${question.max.toString()}`
				);
			}
		}
	};

	return (
		<DefaultCard className="blue-gradient p-12 gap-6">
			{question?.image && (
				<img
					alt="question image"
					src={question?.image}
					className="w-80 rounded-sm"
				/>
			)}
			{question && (
				<div className="flex flex-col w-full gap-2">
					<div className="text-lg">
						{locale['question']} {no} / {question.max.toString()}
					</div>
					{/* Progress Bar */}
					<ProgressBar
						no={parseInt(no || '1')}
						max={parseInt(question.max.toString() || '10')}
					/>

					<div>
						<div>
							{no}. {question.question}
						</div>
						<div className="grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-4 mx-9 mt-7">
							{question?.answers?.map((val, index) => (
								<Answer key={index} data={val} onClick={nextQuestion} />
							))}
						</div>
					</div>
				</div>
			)}
		</DefaultCard>
	);
};

export default Question;
