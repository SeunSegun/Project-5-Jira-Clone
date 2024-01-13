describe('Issue details editing', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();

        });
    });
  
    it('Should update type, status, assignees, reporter, priority successfully', () => {
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="select:type"]').click('bottomRight');
            cy.get('[data-testid="select-option:Story"]').trigger('mouseover').trigger('click');
            cy.get('[data-testid="select:type"]').should('contain', 'Story');
  
            cy.get('[data-testid="select:status"]').click('bottomRight');
            cy.get('[data-testid="select-option:Done"]').click();
            cy.get('[data-testid="select:status"]').should('have.text', 'Done');
  
            cy.get('[data-testid="select:assignees"]').click('bottomRight');
            cy.get('[data-testid="select-option:Lord Gaben"]').click();
            cy.get('[data-testid="select:assignees"]').click('bottomRight');
            cy.get('[data-testid="select-option:Baby Yoda"]').click();
            cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
            cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');
  
            cy.get('[data-testid="select:reporter"]').click('bottomRight');
            cy.get('[data-testid="select-option:Pickle Rick"]').click();
            cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');
  
            cy.get('[data-testid="select:priority"]').click('bottomRight');
            cy.get('[data-testid="select-option:Medium"]').click();
            cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
        });
    });
  
    it('Should update title, description successfully', () => {
        const title = 'TEST_TITLE';
        const description = 'TEST_DESCRIPTION';
  
        getIssueDetailsModal().within(() => {
            cy.get('textarea[placeholder="Short summary"]').clear().type(title).blur();
            cy.get('.ql-snow').click().should('not.exist');
            cy.get('.ql-editor').clear().type(description);
            cy.contains('button', 'Save').click().should('not.exist');
            cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
            cy.get('.ql-snow').should('have.text', description);
        });
    });

    //Task 1
    it("Should validate priority dropdown options", () => {
      // Predefine variable for expected number of elements in the priority dropdown
      const expectedLength = 5;
      let prioritiesArray = [];
      
      // Define a function to get the priority dropdown
      const getPriorityDropdown = () =>
        cy.get('[data-testid="select:priority"]');
    
      // Open the issue details modal
      getIssueDetailsModal().within(() => {
        // Ensure there is one priority dropdown
        getPriorityDropdown().should("have.length", 1);
    
        // Get the text of the initially selected priority and push it to the array
        getPriorityDropdown()
          .invoke("text")
          .then((text) => {
            prioritiesArray.push(text.trim());
          });
    
        // Click to open the priority dropdown
        getPriorityDropdown().click();
    
        // Loop through the elements in the dropdown
        cy.get('[data-testid^="select-option:"]').each(($element) => {
          const text = $element.text();
          prioritiesArray.push(text.trim());
          
          // Log the added value and length of the array during each iteration
          cy.log(text);
          cy.log("length", prioritiesArray.length);
        });
    
        // Assert that the array has the expected length
        cy.then(() => {
          expect(prioritiesArray).to.have.lengthOf(expectedLength);
        });
      });
    });
    
    
  
    //Task 2: Checking Reporter’s Name for Only Characters
    it("Reporter's name should have only characters in it", () => {
        getIssueDetailsModal().within(() => {
          const getReporterNameText = cy
            .get('[data-testid="select:reporter"]')
            .invoke("text");
          const regex = /^[A-Za-z\s]+$/;
    
          getReporterNameText.should("match", regex);
        });
      });
    
      const getIssueDetailsModal = () =>
        cy.get('[data-testid="modal:issue-details"]');
    
      function getSelectedPriority() {
        return "High";
      }
    
      function getPriorityFromDropdown(i) {
        return cy
          .get('[data-testid="select:priority"]')
          .click()
          .get('[placeholder="Search"]')
          .next()
          .children()
          .eq(i)
          .invoke("text");
      }
    });