/// <reference types="cypress" />

// ***********************************************
// Custom commands for Kaptha Email Editor testing
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Wait for the email editor to fully load
       * @example cy.waitForEditor()
       */
      waitForEditor(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('waitForEditor', () => {
  // Wait for the loading text to disappear
  cy.contains('Loading Kaptha Email Editor...').should('not.exist');
  
  // Wait for the editor container to be visible
  cy.get('div[style*="height"]').should('be.visible');
});

export {};
