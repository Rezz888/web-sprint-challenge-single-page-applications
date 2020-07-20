describe("Test form inputs", () => {
    before(() => {
      cy.visit("localhost:3000/pizza");
    });
    it("Input name into the name field", () => {
      cy.get('input[name="name"]').type("Reza").should("have.value", "Reza");
    });
    it("Testing check boxes", () => {
      cy.get('input[name="pepperoni"]').check().should("be.checked");
      cy.get('input[name="mushroom"]').check().should("be.checked");
      cy.get('input[name="olive"]').check().should("be.checked");
      cy.get('input[name="anchovi"]').check().should("be.checked");
    });
    it("Testing special instructions", () => {
      cy.get('textarea[name="instructions"]')
        .type("Please leave the pizza at door")
        .should("have.value", "Please leave the pizza at door");
    });
  
    it("test submit button on form", () => {
      cy.get("form").submit();
    });
  });