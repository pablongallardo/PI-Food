import LandingPage from "./LandingPage";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Link } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('Landing Page component test', () => {

    test('renders content', () => {

        const component = render(<BrowserRouter><LandingPage /></BrowserRouter>);   
        expect(component.container).toHaveTextContent('Looking for a recipe? this is the place');
    });

    test(`'Let´s go' button should de working`, () => {
        const component = render(<BrowserRouter><LandingPage /></BrowserRouter>);   
        // const button = component.getByText('Let´s go')
        // fireEvent.click(button)

        expect(component.getByRole('button')).not.toBeDisabled()
    });   

    test(`When clicking 'Let´s Go!' button should take you to Home`, () => {
        let component = render(<BrowserRouter><LandingPage /></BrowserRouter>)
    
        const link = component.getByRole('link', { name: `Let's Go!` });
        expect(link.getAttribute('href')).toBe('/home');
      });
    

});
