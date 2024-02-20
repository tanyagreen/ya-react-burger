beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:3000');
});

describe('Modal Ingredient works corectly', () => {
    it('should open modal', () => {
        cy.get('ul li:first a').click();
        cy.get('p.text_type_main-large').should('have.text', 'Детали ингридиента');
        cy.get('p.text_type_main-medium').should('have.text', 'Ингредиент 1');
    });

    it('should close modal by click on icon', () => {
        cy.get('ul li:first a').click();
        cy.get('[data-testid="close-modal-icon"]').click();
        cy.get('[data-testid="close-modal-overlay"]').should('not.exist');
    });

    it('should close modal by click on overlay', () => {
        cy.get('ul li:first a').click();
        cy.get('[data-testid="close-modal-overlay"]').click({ force: true });
        cy.get('[data-testid="close-modal-overlay"]').should('not.exist');
    });
});

describe('Dragging works corectly', () => {
    it('should drag element', () => {
        cy.get('ul li:last a').trigger('dragstart');
        cy.get('[data-testid="constructor"]').trigger('drop');
        cy.get('[data-testid="constructor"]').contains('Ингредиент 2');
    });
});
