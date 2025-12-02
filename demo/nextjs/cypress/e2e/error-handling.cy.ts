/// <reference types="cypress" />

describe('Error Handling - Next.js', () => {
  it('should display loading state initially', () => {
    cy.visit('/');
    
    // Should show loading message while scripts are being fetched
    cy.contains('Loading Kaptha Email Editor...', { timeout: 1000 }).should('exist');
  });

  it('should handle application lifecycle gracefully', () => {
    cy.visit('/');
    
    // App should be functional
    cy.contains('Kaptha Email Editor - Next.js Demo').should('be.visible');
  });

  it('should not crash on console errors', () => {
    cy.visit('/');
    
    // App should still be functional despite any console errors
    cy.contains('Kaptha Email Editor - Next.js Demo').should('be.visible');
  });

  it('should handle navigation errors gracefully', () => {
    cy.visit('/');
    cy.waitForEditor();
    
    // Verify the page loaded successfully
    cy.contains('Kaptha Email Editor - Next.js Demo').should('be.visible');
    
    // Verify no Next.js specific error messages in headings or alerts
    cy.get('h1, h2, [role="alert"]').should('not.contain', 'Application error');
  });
});
