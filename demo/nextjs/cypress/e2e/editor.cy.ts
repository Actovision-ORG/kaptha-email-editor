/// <reference types="cypress" />

describe('Kaptha Email Editor - Next.js Demo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the Next.js application', () => {
    cy.contains('Kaptha Email Editor - Next.js Demo').should('be.visible');
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

  it('should work with Next.js client component', () => {
    cy.waitForEditor();
    
    // Verify the page is using client-side rendering
    cy.window().should('have.property', 'React');
    cy.window().should('have.property', 'ReactDOM');
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

  it('should maintain responsive height on different viewports', () => {
    cy.waitForEditor();
    
    // Test desktop
    cy.viewport(1920, 1080);
    cy.get('div[style*="height"]').should('be.visible');
    
    // Test laptop
    cy.viewport(1280, 720);
    cy.get('div[style*="height"]').should('be.visible');
    
    // Test tablet
    cy.viewport(768, 1024);
    cy.get('div[style*="height"]').should('be.visible');
  });

  it('should handle Next.js hydration correctly', () => {
    cy.visit('/');
    
    // Should not show hydration errors
    cy.get('body').should('not.contain', 'Hydration failed');
    cy.get('body').should('not.contain', 'Text content does not match');
    
    cy.waitForEditor();
  });

  it('should work with Next.js 16 App Router', () => {
    cy.visit('/');
    
    // Verify page loads without errors
    cy.contains('Kaptha Email Editor - Next.js Demo').should('be.visible');
    
    // Check that metadata is rendered correctly
    cy.title().should('include', 'Kaptha Email Editor');
  });
});
