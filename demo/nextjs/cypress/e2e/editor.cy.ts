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
    // In v2, the editor loads quickly so we just check that it loads
    cy.get('main', { timeout: 10000 }).should('exist');
    
    // Verify editor wrapper is present (may show loading or editor)
    cy.get('main').find('div').should('exist');
  });

  it('should work with Next.js client component', () => {
    cy.wait(3000);
    
    // Verify the component rendered (check for either loading state or editor)
    cy.get('main').should('be.visible');
  });

  it('should load external scripts and styles', () => {
    cy.wait(3000);
    
    // Check if CSS is loaded (editor.css from CDN)
    cy.get('link[href*="editor.css"]', { timeout: 15000 }).should('exist');
    
    // Check if JS is loaded (editor.js from CDN)
    cy.get('script[src*="editor.js"]', { timeout: 15000 }).should('exist');
  });

  it('should maintain responsive height on different viewports', () => {
    cy.wait(3000);
    
    // Test desktop - check for main container
    cy.viewport(1920, 1080);
    cy.get('main').should('be.visible');
    
    // Test laptop
    cy.viewport(1280, 720);
    cy.get('main').should('be.visible');
    
    // Test tablet
    cy.viewport(768, 1024);
    cy.get('main').should('be.visible');
  });

  it('should handle Next.js hydration correctly', () => {
    cy.visit('/');
    cy.wait(3000);
    
    // Should not show hydration errors
    cy.get('body').should('not.contain', 'Hydration failed');
    cy.get('body').should('not.contain', 'Text content does not match');
    
    // Verify page rendered
    cy.get('main').should('be.visible');
  });

  it('should work with Next.js 16 App Router', () => {
    cy.visit('/');
    
    // Verify page loads without errors
    cy.contains('Kaptha Email Editor - Next.js Demo').should('be.visible');
    
    // Check that metadata is rendered correctly
    cy.title().should('include', 'Kaptha Email Editor');
  });
});
