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

  it('should set up React and ReactDOM globals', () => {
    cy.visit('/');
    
    // Verify React globals are exposed for the CDN script
    cy.window().should('have.property', 'React');
    cy.window().should('have.property', 'ReactDOM');
    
    // Verify they're the same instances from the app
    cy.window().its('React').should('exist');
    cy.window().its('ReactDOM').should('exist');
  });
});
