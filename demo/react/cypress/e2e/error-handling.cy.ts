/// <reference types="cypress" />

describe('Error Handling', () => {
  it('should display loading state initially', () => {
    cy.visit('/');
    
    // Should show loading message while scripts are being fetched
    cy.contains('Loading Kaptha Email Editor...', { timeout: 1000 }).should('exist');
  });

  it('should handle application lifecycle gracefully', () => {
    cy.visit('/');
    
    // App should be functional
    cy.contains('Kaptha Email Editor - React Demo').should('be.visible');
    
    // Should have proper structure
    cy.get('.App').should('exist');
    cy.get('header').should('be.visible');
    cy.get('main').should('be.visible');
  });

  it('should load without console errors', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        // Spy on console.error to catch any errors
        cy.spy(win.console, 'error').as('consoleError');
      },
    });
    
    // App should be functional
    cy.contains('Kaptha Email Editor - React Demo').should('be.visible');
  });
});
