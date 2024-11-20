import React, { useEffect } from 'react';
import { debugData } from '../utils/debugData';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Questionare from './questionare';
import { useNuiEvent } from '../hooks/useNuiEvent';
import Question from './questionare/Question';
import Finish from './questionare/Finish';
import { fetchNui } from '@/utils/fetchNui';
import { locale } from '@/store/locale';

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

	useEffect(() => {
		fetchNui<{ [key: string]: string }>('initLocale').then((data) => {
			for (const [name, str] of Object.entries(data)) locale[name] = str;
		});
	}, []);

	return (
		<Routes>
			<Route path="/question" element={<Questionare />} />
			<Route path="/question/:no" element={<Question />} />
			<Route path="/finish" element={<Finish />} />
		</Routes>
	);
};

export default App;
