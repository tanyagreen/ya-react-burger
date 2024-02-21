beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    cy.visit('/');

    cy.get('ul li:first a').as('ingredientFirst');
    cy.get('ul li:last a').as('ingredientLast');
    cy.get('[data-testid="constructor"]').as('constructorContainer');
});

describe('Modal Ingredient works corectly', () => {
    const modalOverlaySelector = '[data-testid="close-modal-overlay"]';

    it('should open modal', () => {
        cy.get('@ingredientFirst').click();
        cy.get('p.text_type_main-large').should('have.text', 'Детали ингридиента');
        cy.get('p.text_type_main-medium').should('have.text', 'Ингредиент 1');
    });

    it('should close modal by click on icon', () => {
        cy.get('@ingredientFirst').click();
        cy.get('[data-testid="close-modal-icon"]').click();
        cy.get(modalOverlaySelector).should('not.exist');
    });

    it('should close modal by click on overlay', () => {
        cy.get('@ingredientFirst').click();
        cy.get(modalOverlaySelector).click({ force: true });
        cy.get(modalOverlaySelector).should('not.exist');
    });
});

describe('Dragging works corectly', () => {
    it('should drag element', () => {
        cy.get('@ingredientLast').trigger('dragstart');
        cy.get('@constructorContainer').trigger('drop');
        cy.get('@constructorContainer').contains('Ингредиент 2');
    });
});
