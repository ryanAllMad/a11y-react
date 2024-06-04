import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyTabs from '../components/MyTabs';

describe('MyTabs', () => {
	it('Has Tablist with "Horizontal Tabs" accessible name', () => {
		render(<MyTabs />);
		expect(screen.getByRole('tablist', {name: "Horizontal Tabs"})).toBeInTheDocument();
	})
	it('Has Tabpanels with Tab 3, Tab 2, and Tab 1 accessible names', () => {
		render(<MyTabs />);
		expect(screen.getByRole('tabpanel', {name: "Tab 3"})).toBeInTheDocument();
		expect(screen.getByRole('tabpanel', {name: "Tab 2"})).toBeInTheDocument();
		expect(screen.getByRole('tabpanel', {name: "Tab 1"})).toBeInTheDocument();
	});
});
