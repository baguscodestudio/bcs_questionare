import React from 'react';
import { debugData } from '../utils/debugData';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Questionare from './questionare';
import { useNuiEvent } from '../hooks/useNuiEvent';
import Question from './questionare/Question';

// This will set the NUI to visible if we are
// developing in browser
debugData([
	{
		action: 'setVisible',
		data: true,
	},
]);

setTimeout(
	() =>
		debugData([
			{
				action: 'setPage',
				data: 'question',
			},
		]),
	500
);

const App: React.FC = () => {
	const navigate = useNavigate();

	useNuiEvent<string>('setPage', (data) => {
		navigate(`/${data}`);
	});

	return (
		<Routes>
			<Route path="/question" element={<Questionare />} />
			<Route path="/question/:no" element={<Question />} />
		</Routes>
	);
};

export default App;
