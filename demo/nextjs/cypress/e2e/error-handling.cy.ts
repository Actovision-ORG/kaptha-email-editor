/// <reference types="cypress" />

describe('Error Handling - Next.js', () => {
  it('should display error when CDN script fails to load', () => {
    // Intercept the CDN script and force it to fail
    cy.intercept('GET', '**/kaptha.dev/core/editor.js', {
      statusCode: 500,
      body: 'Internal Server Error',
    }).as('editorScript');

    cy.visit('/');

    // Wait for the failed request
    cy.wait('@editorScript');

    // Should show error message
    cy.contains('Error loading Kaptha Email Editor', { timeout: 10000 }).should('be.visible');
  });

  it('should handle missing CSS gracefully', () => {
    // Block CSS file
    cy.intercept('GET', '**/kaptha.dev/core/editor.css', {
      statusCode: 404,
    });

    cy.visit('/');
    
    // Editor should still attempt to load (even without styles)
    cy.contains('Loading Kaptha Email Editor...').should('exist');
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
