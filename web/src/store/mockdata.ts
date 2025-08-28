import { IQuestionData } from '../pages/questionare/Question';

export const MOCK_ANSWERS: {
	id: string;
	answer?: string;
	image?: string;
}[] = [
	{
		id: 'A',
		answer: '15 KM / H adalah kecepatan maksimal untuk kendaraan s',
	},
	{
		id: 'B',
		answer:
			'20 KM / H adalah kecepatan maksimal untuk kendaraan saat melintasi Perkotaan sadasdawd a',
	},
	{
		id: 'C',
		answer: '25 KM / H adalah kecepatan ',
	},
	{
		id: 'D',
		image: 'images/answer4.png',
	},
];

export const MOCK_QUESTION: IQuestionData = {
	id: 1,
	question:
		'Berapa Kecepatan Maksimal Untuk Kendaraan Saat Melintasi Area Perkotaan?',
	image: 'images/question1.png',
	answers: MOCK_ANSWERS,
	max: 20,
};
