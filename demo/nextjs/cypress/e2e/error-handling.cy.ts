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
    
    // Verify no Next.js specific errors
    cy.get('body').should('not.contain', 'Application error');
    cy.get('body').should('not.contain', '404');
  });
});
