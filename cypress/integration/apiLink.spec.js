
let goodLink1 = "https://docs.cypress.io/api/commands/stub#Syntax"
let goodPath1 = "stubs"
let badLink1 = "hello"
let nonExistPath1 = "MSeyN4iVwv"
// let goodResult1 = {
//     customPath: 'stubs',
//     originalLink: 'https://docs.cypress.io/guides/guides/stubs-spies-and-clocks#',
//     _id: new ObjectId("61c25104d5df1f22624c4c27"),
//     createdAt: "2021-12-21T22:11:16.780Z",
//     updatedAt: "2021-12-21T22:11:16.780Z",
//     __v: 0
//   }



describe('Links API', () => {
    it('Missing custom path', () => {   
        cy.request({
            method: 'POST', 
            url: 'api/links', 
            body: { originalLink: badLink1, customPath: "" },
            failOnStatusCode: false,
        }).then(
            (response) => {
                expect(response.body).to.have.property('error', "Missing custom path!")
            }
        )
    })

    it('Missing original link', () => {   
        cy.request({
            method: 'POST', 
            url: 'api/links', 
            body: { originalLink: "", customPath: goodPath1 },
            failOnStatusCode: false,
        }).then(
            (response) => {
                expect(response.body).to.have.property('error', "Missing original link!")
            }
        )
    })

    it('Add a existing invalid link', () => {   
        cy.request({
            method: 'POST', 
            url: 'api/links', 
            body: { originalLink: badLink1, customPath: goodPath1 },
            failOnStatusCode: false,
        }).then(
            (response) => {
                expect(response.body).to.have.property('error', "Inavlid Url!")
            }
        )
    })

    it('Add a existing custom path', () => {   
        // cy.stub(Link, "findOne").returns(null);
        // cy.stub(Link, "save")
            cy.request({
                method: 'POST', 
                url: 'api/links', 
                body: { originalLink: goodLink1, customPath: goodPath1 },
                failOnStatusCode: false,
            }).then(
                (response) => {
                    expect(response.body).to.have.property('error', 'Short link taken!')
                }
            )
        })
})

describe('Link API', () => {
    it('Get non existant custom path', () => {   
        cy.request({
            method: 'GET', 
            url: `api/link/${nonExistPath1}`, 
            failOnStatusCode: false,
        }).then(
            (response) => {
                expect(response.body).to.have.property('error', "Custom path does not exist!")
            }
        )
    })
})