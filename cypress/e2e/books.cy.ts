describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
    //listado de Libros
    cy.visit('/')
        .get('[data-cy=link-to-books]').click()
    //Crear Libros
    cy.get('[href="/libros/crear"]').click()
      .get('[data-cy=input-book-title]')
      .type('Nuevo libro desde cypress')
      .get('[data-cy=button-submit-book]')
      .click()
        .get('[data-cy="book-list"]')
        .contains("Nuevo libro desde cypress");
//Ver un libro
    cy.get('[data-cy^=link-to-visit-book-]')
        .last()
        .click()
        .get("h1").should('contain.text', "Nuevo libro desde cypress")
        .get('[data-cy=link-to-books]').click();
    //Editar Libros
    cy.get('[data-cy^=link-to-edit-book-]')
        .last()
        .click()
        .get('[data-cy=input-book-title]')
        .clear()
        .type('libro Editado desde cypress')
        .get('[data-cy=button-submit-book]')
        .click()
        .get('[data-cy=book-list]')
        .contains('libro Editado desde cypress');
    //ELiminar libro
    cy.get('[data-cy^=link-to-delete-book-]')
        .last()
        .click()
        .get('[data-cy^=link-to-edit-book-]')
        .last().should('not.contain.text', 'libro Editado desde cypress')
  })
})