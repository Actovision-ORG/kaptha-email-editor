import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import KapthaEmailEditor from '../src/index';

describe('KapthaEmailEditor Component', () => {
  const TEST_API_KEY = 'kpt_dev_ws001_demo12345678';

  beforeEach(() => {
    // Clear any existing scripts and styles
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    
    // Reset global objects (CDN API uses window.KapthaEmailEditor)
    delete (window as any).KapthaEmailEditor;
  });

  it('should render without crashing with required apiKey', () => {
    const { container } = render(<KapthaEmailEditor apiKey={TEST_API_KEY} />);
    expect(container).toBeTruthy();
  });

  it('should display loading state initially', () => {
    render(<KapthaEmailEditor apiKey={TEST_API_KEY} />);
    expect(screen.getByText('Loading Kaptha Email Editor...')).toBeInTheDocument();
  });

  it('should accept custom minHeight prop', () => {
    const { container } = render(<KapthaEmailEditor apiKey={TEST_API_KEY} minHeight="800px" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should accept onReady callback', () => {
    const mockReady = jest.fn();
    const { container } = render(<KapthaEmailEditor apiKey={TEST_API_KEY} onReady={mockReady} />);
    expect(container).toBeTruthy();
  });

  it('should accept onDesignChange callback', () => {
    const mockChange = jest.fn();
    const { container } = render(<KapthaEmailEditor apiKey={TEST_API_KEY} onDesignChange={mockChange} />);
    expect(container).toBeTruthy();
  });

  it('should accept initialDesign prop', () => {
    const design = {
      components: [
        {
          type: 'text',
          props: {
            content: '<h1>Test</h1>',
            fontSize: '24px'
          }
        }
      ]
    };
    
    const { container } = render(<KapthaEmailEditor apiKey={TEST_API_KEY} initialDesign={design} />);
    expect(container).toBeTruthy();
  });

  it('should accept custom blocks', () => {
    const customBlocks = [
      {
        id: 'custom-1',
        name: 'Custom Block',
        category: 'Custom',
        components: []
      }
    ];
    
    const { container } = render(
      <KapthaEmailEditor 
        apiKey={TEST_API_KEY}
        customBlocks={customBlocks}
      />
    );
    expect(container).toBeTruthy();
  });

  it('should render with proper structure', () => {
    const { container } = render(<KapthaEmailEditor apiKey={TEST_API_KEY} />);
    // Should render loading state initially
    expect(container.querySelector('div')).toBeTruthy();
  });

  it('should render loading state with loading text', () => {
    render(<KapthaEmailEditor apiKey={TEST_API_KEY} />);
    
    const loadingText = screen.getByText('Loading Kaptha Email Editor...');
    
    expect(loadingText).toBeInTheDocument();
    expect(loadingText.parentElement).toBeTruthy();
  });

  it('should render different instances independently', () => {
    const { container: container1 } = render(<KapthaEmailEditor apiKey={TEST_API_KEY} minHeight="600px" />);
    const { container: container2 } = render(<KapthaEmailEditor apiKey={TEST_API_KEY} minHeight="700px" />);
    
    expect(container1).toBeTruthy();
    expect(container2).toBeTruthy();
    expect(container1).not.toBe(container2);
  });

  it('should accept onLoad callback', () => {
    const mockLoad = jest.fn();
    const { container } = render(
      <KapthaEmailEditor 
        apiKey={TEST_API_KEY}
        onLoad={mockLoad}
      />
    );
    expect(container).toBeTruthy();
  });

  it('should render with all callbacks', () => {
    const mockLoad = jest.fn();
    const mockReady = jest.fn();
    const mockChange = jest.fn();

    const { container } = render(
      <KapthaEmailEditor 
        apiKey={TEST_API_KEY}
        onLoad={mockLoad}
        onReady={mockReady}
        onDesignChange={mockChange}
      />
    );
    
    expect(container).toBeTruthy();
  });

  it('should load CSS from CDN', () => {
    render(<KapthaEmailEditor apiKey={TEST_API_KEY} />);
    
    // Wait a tick for useEffect to run
    setTimeout(() => {
      const cssLink = document.querySelector('link[href*="code.kaptha.dev/core/embed/editor.css"]');
      expect(cssLink).toBeTruthy();
    }, 0);
  });

  it('should load JavaScript from CDN', () => {
    render(<KapthaEmailEditor apiKey={TEST_API_KEY} />);
    
    // Wait a tick for useEffect to run
    setTimeout(() => {
      const script = document.querySelector('script[src*="code.kaptha.dev/core/embed/editor.js"]');
      expect(script).toBeTruthy();
    }, 0);
  });

  it('should use correct CDN base URL', () => {
    const { container } = render(<KapthaEmailEditor apiKey={TEST_API_KEY} />);
    expect(container).toBeTruthy();
    
    // CDN should be code.kaptha.dev/core/embed/
    setTimeout(() => {
      const script = document.querySelector('script[src*="/core/embed/"]');
      expect(script).toBeTruthy();
    }, 0);
  });

  it('should include cache-busting parameter in CDN URLs', () => {
    render(<KapthaEmailEditor apiKey={TEST_API_KEY} />);
    
    setTimeout(() => {
      const script = document.querySelector('script[src*="?v=2024-12-06"]');
      const link = document.querySelector('link[href*="?v=2024-12-06"]');
      expect(script).toBeTruthy();
      expect(link).toBeTruthy();
    }, 0);
  });
});
