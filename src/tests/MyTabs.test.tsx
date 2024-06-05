import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
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
describe('MyTabs Horizontal Tablist Keyboard interactions', () => {
	it('When focus moves into the tab list, places focus on the active tab element', async () => {
		const user = userEvent.setup()
		render(<MyTabs />);
		const tablist = screen.getByRole('tablist')
		await user.tab()
		expect(tablist).not.toHaveFocus()
		expect(screen.getByRole('tab', {name: "Tab 1"})).toHaveFocus()
	})
	it('When the tab list contains the focus, moves focus to the next element in the page tab sequence outside the tablist, which is the tabpanel unless the first element containing meaningful content inside the tabpanel is focusable.', async () => {
		const user = userEvent.setup()
		render(<MyTabs />);
		await user.tab()
		// tests that second tab tabs out of tab component
		await user.tab()
		const allTabs = screen.getAllByRole('tab')
		allTabs.forEach((t) => expect(t).not.toHaveFocus())
		// tests that shift + tab tabs back to first tab
		await user.keyboard('{Shift>}{Tab}{/Shift}')
		expect(screen.getByRole('tab', {name: "Tab 1"})).toHaveFocus()
		// tests that shift tab also tabs out of tab component
		await user.keyboard('{Shift>}{Tab}{/Shift}')
		allTabs.forEach((t) => expect(t).not.toHaveFocus())
	})
	it('Tests Left and Right Arrows when focus is on a tab element in a horizontal tab list', async () => {
		const user = userEvent.setup()
		render(<MyTabs />);
		await user.tab()
		expect(screen.getByRole('tab', {name: "Tab 1"})).toHaveFocus()
		// we have to add the tab to trap users focus
		await user.keyboard('{ArrowLeft>}{Tab}{/ArrowLeft}')	
		expect(screen.getByRole('tab', {name: "Tab 1"})).not.toHaveFocus()
		expect(screen.getByRole('tab', {name: "Tab 3"})).toHaveFocus()
		// we have to add the tab to trap users focus
		await user.keyboard('{ArrowLeft>}{Tab}{/ArrowLeft}')
		// forcing tabs is causing issues with testing focus
		await user.tab()
		expect(screen.getByRole('tab', {name: "Tab 3"})).not.toHaveFocus()
		expect(screen.getByRole('tab', {name: "Tab 2"})).toHaveFocus()
		// we have to add the tab to trap users focus
		await user.keyboard('{ArrowRight>}{Tab}{/ArrowRight}')
		expect(screen.getByRole('tab', {name: "Tab 2"})).not.toHaveFocus()
		expect(screen.getByRole('tab', {name: "Tab 3"})).toHaveFocus()
	})
})
