import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App'

describe('App', () => {
	it('Has Banner role labelled', () => {
		render(<App />);
		expect(screen.getByRole('banner', {name: "Site Header"})).toBeInTheDocument();
	})
	it('Has contentinfo role', () => {
		render(<App />);
		expect(screen.getByRole('contentinfo')).toBeInTheDocument();
	})
	it('Has main role', () => {
		render(<App />);
		expect(screen.getByRole('main')).toBeInTheDocument();
	})
	it('Has heading level 1', () => {
		render(<App />);
		expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
	})
})