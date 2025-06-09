import { render, screen } from '@testing-library/react';
import App from './App'; // Assuming App.tsx is the main app component

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    // Replace 'Vite + React' with actual text if different
    // or look for a more generic element.
    // This is just a placeholder to ensure tests can run.
    // Consider looking for a heading or a known element from your App.tsx
    // For example, if App.tsx renders a <Header /> component that has "Dashboard":
    // expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    // For now, let's assume there's a main role.
    // expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Welcome to AMS/i })).toBeInTheDocument();
  });
});
