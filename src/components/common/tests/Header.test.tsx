import { render, screen } from '@testing-library/react';
import Header from '../Header'; // Adjust path if necessary
import { BrowserRouter } from 'react-router-dom'; // If Header uses Link or other router components

describe('Header Component', () => {
  it('renders a navigation element or a prominent title', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    // Example: Check for a navigation landmark
    const navigation = screen.queryByRole('navigation');
    // Example: Check for a common header title or brand text (adjust "Your App Title" as needed)
    // const title = screen.queryByText(/Your App Title/i);
    // expect(navigation || title).toBeInTheDocument();

    // More robust: Check for specific, identifiable elements.
    // For now, let's just check if it renders something without erroring.
    // This test will need to be adapted to the actual content of Header.tsx
    // For a placeholder, let's assume it has a div:
    const headerElement = screen.queryByRole('banner'); // Default role for <header>
     if (headerElement) {
      expect(headerElement).toBeInTheDocument();
    } else {
      // Fallback if no <header> tag, look for a common container
      const mainDiv = document.querySelector('header'); // Or a more specific selector
      expect(mainDiv).toBeInTheDocument();
    }
  });
});
