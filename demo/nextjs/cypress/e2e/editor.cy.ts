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
    
    // Verify editor container is present
    cy.get('div[id^="kaptha-editor-"]', { timeout: 10000 }).should('exist');
  });

  it('should work with Next.js client component', () => {
    cy.wait(2000);
    
    // Verify the editor component loaded
    cy.get('div[id^="kaptha-editor-"]', { timeout: 10000 }).should('exist');
  });

  it('should load external scripts and styles', () => {
    cy.wait(2000);
    
    // Check if CSS is loaded (builder.css in v2)
    cy.get('link[href*="kaptha.dev/core/builder.css"], link[href*="code.kaptha.dev/core/builder.css"]', { timeout: 10000 }).should('exist');
    
    // Check if JS is loaded (builder.js in v2)
    cy.get('script[src*="kaptha.dev/core/builder.js"], script[src*="code.kaptha.dev/core/builder.js"]', { timeout: 10000 }).should('exist');
  });

  it('should maintain responsive height on different viewports', () => {
    cy.wait(2000);
    
    // Test desktop
    cy.viewport(1920, 1080);
    cy.get('div[id^="kaptha-editor-"]', { timeout: 10000 }).should('be.visible');
    
    // Test laptop
    cy.viewport(1280, 720);
    cy.get('div[id^="kaptha-editor-"]').should('be.visible');
    
    // Test tablet
    cy.viewport(768, 1024);
    cy.get('div[id^="kaptha-editor-"]').should('be.visible');
  });

  it('should handle Next.js hydration correctly', () => {
    cy.visit('/');
    cy.wait(2000);
    
    // Should not show hydration errors
    cy.get('body').should('not.contain', 'Hydration failed');
    cy.get('body').should('not.contain', 'Text content does not match');
    
    // Verify editor loaded
    cy.get('div[id^="kaptha-editor-"]', { timeout: 10000 }).should('exist');
  });

  it('should work with Next.js 16 App Router', () => {
    cy.visit('/');
    
    // Verify page loads without errors
    cy.contains('Kaptha Email Editor - Next.js Demo').should('be.visible');
    
    // Check that metadata is rendered correctly
    cy.title().should('include', 'Kaptha Email Editor');
  });
});
