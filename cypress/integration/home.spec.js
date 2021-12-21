let goodLink1 = "https://docs.cypress.io/guides/references/roadmap"
let goodPath1 = "roadmap"
let badLink1 = "hello"

describe('The Home Page Structure', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('successfully loads', () => {})

    it('contains 2 input boxes', () => {
        cy.get('form').get('input').should('have.length', 2)
    })

    it('contains submit button', () => {
        cy.get('form').get('button').should('have.length', 1).should('have.attr', "type", "submit")
    })
})

describe('Input Handling', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('empty inputs', () => {
        cy.get("#shortenButton").click()
        cy.get("mainAlert").should("not.exist")
    })

    it('missing original link', () => {
        cy.get("#customPathInput").type(goodPath1)
        cy.get("#shortenButton").click()
        cy.get("errorAlert").should("not.exist")
        cy.get("successAlert").should("not.exist")
    })

    it('missing custom path', () => {
        cy.get("#originalLinkInput").type(goodLink1)
        cy.get("#shortenButton").click()
        cy.get("errorAlert").should("not.exist")
        cy.get("successAlert").should("not.exist")
    })

    it('bad original link 1', () => {
        cy.get("#originalLinkInput").type(badLink1)
        cy.get("#customPathInput").type(goodPath1)
        cy.get("#shortenButton").click()
        cy.get("#errorAlert").should("exist")
    })
})