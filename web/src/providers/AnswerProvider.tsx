import React, { Context, createContext, useContext, useState } from 'react';

const AnswerCtx = createContext<AnswerProviderValue | null>(null);

interface AnswerProviderValue {
	setAnswers: (answers: { [no: string]: string }) => void;
	answers: { [no: string]: string };
}

// This should be mounted at the top level of your application, it is currently set to
// apply a CSS visibility value. If this is non-performant, this should be customized.
export const AnswerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [answers, setAnswers] = useState<{ [no: string]: string }>({});

	return (
		<AnswerCtx.Provider
			value={{
				answers,
				setAnswers,
			}}
		>
			{children}
		</AnswerCtx.Provider>
	);
};

export const useAnswers = () =>
	useContext<AnswerProviderValue>(AnswerCtx as Context<AnswerProviderValue>);
