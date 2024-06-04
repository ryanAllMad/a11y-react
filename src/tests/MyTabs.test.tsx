import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyTabs from '../components/MyTabs';

describe('MyTabs', () => {
	it('Label Text in doc', () => {
		render(<MyTabs />);
		expect(screen.getByLabelText("Tab 3")).toBeInTheDocument();
	});
});
