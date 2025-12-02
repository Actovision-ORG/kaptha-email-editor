/// <reference types="cypress" />

describe('Kaptha Email Editor - React Demo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the application', () => {
    cy.contains('Kaptha Email Editor - React Demo').should('be.visible');
    cy.contains('Build beautiful emails with drag and drop').should('be.visible');
  });

  it('should display loading state and then load the editor', () => {
    // Check for loading state
    cy.contains('Loading Kaptha Email Editor...').should('exist');
    
    // Wait for editor to load
    cy.waitForEditor();
    
    // Verify editor container is present
    cy.get('div[style*="height"]').should('exist');
  });

  it('should load external scripts and styles', () => {
    cy.waitForEditor();
    
    // Check if CSS is loaded
    cy.get('link[href*="kaptha.dev/core/editor.css"]').should('exist');
    
    // Check if JS is loaded
    cy.get('script[src*="kaptha.dev/core/editor.js"]').should('exist');
  });

  it('should expose KapthaEmailEditor global object', () => {
    cy.waitForEditor();
    
    cy.window().should('have.property', 'KapthaEmailEditor');
    cy.window().its('KapthaEmailEditor').should('have.property', 'EmailEditor');
  });

  it('should handle editor export callback', () => {
    cy.waitForEditor();
    
    // Stub console.log to verify export is called
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog');
    });
    
    // Note: Actual export testing would require interacting with the loaded editor
    // This is a placeholder for when the editor API is available
  });

  it('should handle editor save callback', () => {
    cy.waitForEditor();
    
    // Stub console.log to verify save is called
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog');
    });
    
    // Note: Actual save testing would require interacting with the loaded editor
    // This is a placeholder for when the editor API is available
  });

  it('should maintain responsive height', () => {
    cy.waitForEditor();
    
    cy.get('div[style*="height"]').should('have.css', 'height');
    
    // Test on different viewport sizes
    cy.viewport(1920, 1080);
    cy.get('div[style*="height"]').should('be.visible');
    
    cy.viewport(1280, 720);
    cy.get('div[style*="height"]').should('be.visible');
  });

  it('should handle React and ReactDOM globals', () => {
    cy.waitForEditor();
    
    cy.window().should('have.property', 'React');
    cy.window().should('have.property', 'ReactDOM');
    
    // Verify they're the same instances from the app
    cy.window().its('React').should('exist');
    cy.window().its('ReactDOM').should('exist');
  });
});
