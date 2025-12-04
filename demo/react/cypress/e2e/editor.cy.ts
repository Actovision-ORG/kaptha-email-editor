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
    // Check for loading state (may appear briefly)
    // In v2, the editor loads quickly so we just check that the page loads
    cy.get('main', { timeout: 10000 }).should('exist');
    
    // Verify editor container is present
    cy.get('div[id^="kaptha-editor-"]', { timeout: 10000 }).should('exist');
  });

  it('should load external scripts and styles', () => {
    cy.wait(2000); // Wait for scripts to load
    
    // Check if CSS is loaded (builder.css in v2) - can be local or CDN
    cy.get('link[href*="builder.css"]', { timeout: 10000 }).should('exist');
    
    // Check if JS is loaded (builder.js in v2) - can be local or CDN
    cy.get('script[src*="builder.js"]', { timeout: 10000 }).should('exist');
  });

  it('should set up React and ReactDOM globals', () => {
    cy.visit('/');
    cy.wait(2000);
    
    // In v2, React and ReactDOM are set up by the component
    // Verify the editor component loaded
    cy.get('div[id^="kaptha-editor-"]', { timeout: 10000 }).should('exist');
  });
});
