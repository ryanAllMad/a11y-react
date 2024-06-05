import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyTabs from '../components/MyTabs';

describe('MyTabs test Aria roles, states and properties', () => {
	it('The tablist element has an accessible label.', () => {
		render(<MyTabs />);
		const tablist = screen.getByRole('tablist', {
			name: 'Horizontal Tabs',
		});
		expect(tablist).toBeInTheDocument();
	});
	it('Each element that serves as a tab has role tab and is contained within the element with role tablist.', () => {
		render(<MyTabs />);
		const tablist = screen.getByRole('tablist', {
			name: 'Horizontal Tabs',
		});
		const tabsListChildren = Array.from(tablist.children);
		tabsListChildren.forEach((child) => {
			expect(child).toBeInTheDocument()
			expect(child).toHaveRole('tab');
		});
	})
	it('Each element with role tabpanel has the property aria-labelledby referring to its associated tab element.', () => {
		render(<MyTabs />);
		expect(
			screen.getByRole('tabpanel', { name: 'Tab & TabPanel Label 3' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('tabpanel', { name: 'Tab & TabPanel Label 2' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('tabpanel', { name: 'Tab & TabPanel Label 1' })
		).toBeInTheDocument();
	});
	it('Each element with role tab has the property aria-controls referring to its associated tabpanel element.', async () => {
		const user = userEvent.setup();
		render(<MyTabs />);
		const tabOne = screen.getByRole('tab', { name: 'Tab & TabPanel Label 1' })
		const tabPanelOne = screen.getByRole('tabpanel', { name: 'Tab & TabPanel Label 1' })
		await user.tab()
		// component requires user input to get aria-controls property
		await user.keyboard('{ArrowRight>}{Tab}{/ArrowRight}');
		const tabPanel = tabPanelOne.getAttribute('id')
		const tabControls = tabOne.getAttribute('aria-controls')
		expect(tabPanel).toEqual(tabControls)
	})
	it('The active tab element has the state aria-selected set to true and all other tab elements have it set to false.', async () => {
		const user = userEvent.setup();
		render(<MyTabs />);
		const tabOne = screen.getByRole('tab', { name: 'Tab & TabPanel Label 1' })
		const tabTwo = screen.getByRole('tab', { name: 'Tab & TabPanel Label 2' })
		const tabThree = screen.getByRole('tab', { name: 'Tab & TabPanel Label 3' })
		await user.tab()
		// component requires user input to get aria-controls property
		await user.keyboard('{ArrowRight>}{Tab}{/ArrowRight}');
		expect(tabTwo.getAttribute('aria-selected')).toEqual('true')
		expect(tabOne.getAttribute('aria-selected')).toEqual('false')
		expect(tabThree.getAttribute('aria-selected')).toEqual('false')
	})
});
describe('MyTabs Horizontal Tablist Keyboard interactions', () => {
	it('When focus moves into the tab list, places focus on the active tab element', async () => {
		const user = userEvent.setup();
		render(<MyTabs />);
		const tablist = screen.getByRole('tablist');
		await user.tab();
		expect(tablist).not.toHaveFocus();
		expect(screen.getByRole('tab', { name: 'Tab & TabPanel Label 1' })).toHaveFocus();
	});
	it('When the tab list contains the focus, moves focus to the next element in the page tab sequence outside the tablist, which is the tabpanel unless the first element containing meaningful content inside the tabpanel is focusable.', async () => {
		const user = userEvent.setup();
		render(<MyTabs />);
		await user.tab();
		// tests that second tab tabs out of tab component
		await user.tab();
		const allTabs = screen.getAllByRole('tab');
		allTabs.forEach((t) => expect(t).not.toHaveFocus());
		// tests that shift + tab tabs back to first tab
		await user.keyboard('{Shift>}{Tab}{/Shift}');
		expect(screen.getByRole('tab', { name: 'Tab & TabPanel Label 1' })).toHaveFocus();
		// tests that shift tab also tabs out of tab component
		await user.keyboard('{Shift>}{Tab}{/Shift}');
		allTabs.forEach((t) => expect(t).not.toHaveFocus());
	});
	it('Tests Left and Right Arrows when focus is on a tab element in a horizontal tab list', async () => {
		const user = userEvent.setup();
		render(<MyTabs />);
		await user.tab();
		expect(screen.getByRole('tab', { name: 'Tab & TabPanel Label 1' })).toHaveFocus();
		// we have to add the tab to trap users focus
		await user.keyboard('{ArrowLeft>}{Tab}{/ArrowLeft}');
		expect(screen.getByRole('tab', { name: 'Tab & TabPanel Label 1' })).not.toHaveFocus();
		expect(screen.getByRole('tab', { name: 'Tab & TabPanel Label 3' })).toHaveFocus();
		// we have to add the tab to trap users focus
		await user.keyboard('{ArrowLeft>}{Tab}{/ArrowLeft}');
		// forcing tabs is causing issues with testing focus
		await user.tab();
		expect(screen.getByRole('tab', { name: 'Tab & TabPanel Label 3' })).not.toHaveFocus();
		expect(screen.getByRole('tab', { name: 'Tab & TabPanel Label 2' })).toHaveFocus();
		// we have to add the tab to trap users focus
		await user.keyboard('{ArrowRight>}{Tab}{/ArrowRight}');
		expect(screen.getByRole('tab', { name: 'Tab & TabPanel Label 2' })).not.toHaveFocus();
		expect(screen.getByRole('tab', { name: 'Tab & TabPanel Label 3' })).toHaveFocus();
	});
});
