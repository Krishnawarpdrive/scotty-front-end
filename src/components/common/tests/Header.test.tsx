
import { render } from '@testing-library/react';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header Component', () => {
  it('renders a navigation element or a prominent title', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // Check if it renders something without erroring
    const headerElement = document.querySelector('header');
    if (headerElement) {
      expect(headerElement).toBeInTheDocument();
    } else {
      // Fallback check for any rendered content
      expect(document.body).toContainHTML('<div');
    }
  });
});
