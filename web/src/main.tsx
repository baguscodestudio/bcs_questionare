import React from 'react';
import ReactDOM from 'react-dom/client';
import { VisibilityProvider } from './providers/VisibilityProvider';
import App from './pages/App';
import './index.css';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { AnswerProvider } from './providers/AnswerProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HashRouter
			future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true,
			}}
		>
			<ThemeProvider>
				<VisibilityProvider>
					<AnswerProvider>
						<App />
					</AnswerProvider>
				</VisibilityProvider>
			</ThemeProvider>
		</HashRouter>
	</React.StrictMode>
);
