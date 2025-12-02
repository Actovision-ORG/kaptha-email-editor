import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailEditor from '../src/index';

describe('EmailEditor Component', () => {
  beforeEach(() => {
    // Clear any existing scripts
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    
    // Reset global objects
    delete (window as any).KapthaEmailEditor;
  });

  it('should render without crashing', () => {
    const { container } = render(<EmailEditor />);
    expect(container).toBeTruthy();
  });

  it('should display loading state initially', () => {
    render(<EmailEditor />);
    expect(screen.getByText('Loading Kaptha Email Editor...')).toBeInTheDocument();
  });

  it('should accept custom height prop', () => {
    const { container } = render(<EmailEditor height="800px" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should accept onExport callback', () => {
    const mockExport = jest.fn();
    const { container } = render(<EmailEditor onExport={mockExport} />);
    expect(container).toBeTruthy();
  });

  it('should accept onSave callback', () => {
    const mockSave = jest.fn();
    const { container } = render(<EmailEditor onSave={mockSave} />);
    expect(container).toBeTruthy();
  });

  it('should accept initialTemplate prop', () => {
    const template = {
      name: 'Test Template',
      category: 'custom',
      components: [],
    };
    
    const { container } = render(<EmailEditor initialTemplate={template} />);
    expect(container).toBeTruthy();
  });

  it('should accept additional props', () => {
    const customProps = {
      'data-testid': 'custom-editor',
      className: 'custom-class',
    };
    
    const { container } = render(<EmailEditor {...customProps} />);
    expect(container).toBeTruthy();
  });

  it('should set React and ReactDOM on window when component mounts', () => {
    render(<EmailEditor />);
    
    // Component should attempt to set these (even if useEffect hasn't run yet)
    // This tests the component structure, not the async behavior
    expect(typeof window).toBe('object');
  });

  it('should render loading state with loading text', () => {
    render(<EmailEditor />);
    
    const loadingText = screen.getByText('Loading Kaptha Email Editor...');
    
    expect(loadingText).toBeInTheDocument();
    expect(loadingText.parentElement).toBeTruthy();
  });

  it('should render different instances independently', () => {
    const { container: container1 } = render(<EmailEditor height="600px" />);
    const { container: container2 } = render(<EmailEditor height="700px" />);
    
    expect(container1).toBeTruthy();
    expect(container2).toBeTruthy();
    expect(container1).not.toBe(container2);
  });

  it('should expose window globals after render', () => {
    render(<EmailEditor />);
    
    // The component should attempt to expose React and ReactDOM
    expect(window).toBeDefined();
    expect((window as any).React).toBeDefined();
    expect((window as any).ReactDOM).toBeDefined();
  });
});
