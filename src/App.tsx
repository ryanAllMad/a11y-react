import { useThemeContext, Button } from '@deque/cauldron-react';
import MyTabs from './components/APGTabs';
import '@deque/cauldron-styles';
import '@deque/cauldron-react/lib/cauldron.css';

function App() {
	const { toggleTheme } = useThemeContext();
	return (
		<>
			<header aria-label='Site Header' style={{ textAlign: 'right', padding: '2rem' }}>
				<Button onClick={toggleTheme}>Toggle Dark Mode</Button>
			</header>
			<main style={{ height: '100vh' }}>
				<h1>Vite + React</h1>
				<div className='card'></div>
				<MyTabs />
			</main>
			<footer>Hey check out my accessibility footer</footer>
		</>
	);
}

export default App;
