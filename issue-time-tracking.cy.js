

describe('AUTOMATION TEST FOR TIME TRACKING FUNCTIONALITY', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const getIssueTimeTrackingModal =() => cy.get('[data-testid="modal:tracking"]');
    const estimatedTime = '6'
    const editedEstimatedTime = '10'
    const stopwatch =  '[data-testid="icon:stopwatch"]'
    const timeSpent =  'Time spent (hours)'
    const timeRemaining = 'Time remaining (hours)'
    const spentTime = '2'
    const remainingTime = '4'
    const editedSpentTime= '1'
    const editedRemainingTime = '3'
    
   

    it('Adding, Editing and Remove estimation values', () => {
       //Should add estimation
        getIssueDetailsModal().within(() => {
            cy.contains('Original Estimate (hours)')    
            cy.get('input[placeholder="Number"]')
            .clear()
            .type(estimatedTime)
            cy.contains('div', '6h estimated').should('be.visible')
        }); 
       //Should edit estimation
        getIssueDetailsModal().within(() => {
            cy.contains('Original Estimate (hours)')    
            cy.get('input[placeholder="Number"]')
            .clear()
            .type(editedEstimatedTime)
            cy.contains('div', '10h estimated').should('be.visible')
        }); 
       //Should delete estimation
        getIssueDetailsModal().within(() => {
            cy.contains('Original Estimate (hours)')    
            cy.get('input[placeholder="Number"]')
            .clear()
            cy.contains('div', '10h estimated').should('not.exist')
        }); 

    });

    it('Add, Edit and Remove time logging values', () => {
      //Should add spent and remaining time  
        cy.get(stopwatch).click()
        getIssueTimeTrackingModal().within(() => {  
            cy.contains(timeSpent)
            cy.get('input[placeholder="Number"][value="4"]')
             .clear()
             .type(spentTime)
            cy.contains(timeRemaining)
              cy.get('input[placeholder="Number"][value=""]')
             .type(remainingTime)
            cy.contains('button', 'Done')
            .click()
        }); 
      //Spent and remaining time should be visible
        cy.contains('div', '2h logged').should('be.visible')
        cy.contains('div', '4h remaining').should('be.visible')

     //Should edit spent and remaining time
     cy.get(stopwatch).click()
     getIssueTimeTrackingModal().within(() => {  
         cy.contains(timeSpent)
         cy.get('input[placeholder="Number"][value="2"]')
          .clear()
          .type(editedSpentTime)
         cy.contains(timeRemaining)
           cy.get('input[placeholder="Number"][value="4"]')
           .clear()
          .type(editedRemainingTime)
         cy.contains('button', 'Done')
         .click()
     }); 

      //Edited spent and remaining time should be visible
      cy.contains('div', '1h logged').should('be.visible')
      cy.contains('div', '3h remaining').should('be.visible')


     //Should delete spent and remaining time
     cy.get(stopwatch).click()
     getIssueTimeTrackingModal().within(() => {  
         cy.contains(timeSpent)
         cy.get('input[placeholder="Number"][value="1"]')
          .clear()
         cy.contains(timeRemaining)
           cy.get('input[placeholder="Number"][value="3"]')
           .clear()
         cy.contains('button', 'Done')
         .click()
     }); 

     //Spent and remaining time should not be visible and estimated time is shown
     cy.contains('div', 'No time logged').should('be.visible')
     cy.contains('div', '3h remaining').should('not.exist')
     cy.contains('div','8h estimated').should('be.visible')
    });
});