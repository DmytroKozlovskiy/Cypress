const expenseModal = require('./expense.modal');

class FuelExpensesPage {
  open() {
    cy.contains(/fuel expenses|fuel/i).click({ force: true });
    // приймаємо два стани: або таблиця, або кнопка "Add an expense"
    cy.get('body', { timeout: 10000 }).should(($body) => {
      const hasTable = $body.find('table.expenses_table').length > 0;
      const hasBtn = $body.find('button.btn').filter((_, el) =>
        /add\s+(an\s+)?expense|add\s+fuel/i.test(el.innerText)
      ).length > 0;
      if (!hasTable && !hasBtn) throw new Error('Fuel Expenses not ready yet');
    });
    return this;
  }

  openAddExpenseModal() {
    cy.contains('button', /add (an )?expense|add fuel/i, { timeout: 10000 })
      .scrollIntoView()
      .click({ force: true });
    cy.get('.modal-content, .mat-dialog-container', { timeout: 10000 })
      .first()
      .should('be.visible');
    return this;
  }

  ensureAtLeastOneExpense() {
    this.open();
    cy.get('body').then(($b) => {
      const hasRows = $b.find('table.expenses_table tbody tr').length > 0;
      if (!hasRows) {
        this.openAddExpenseModal();
        // ▼ REPLACEMENT: створюємо перший запис із фіксованим mileage = 135
const fixedMileage = 135;

expenseModal
  .selectCarByIndex(0)   // якщо селекта немає — метод нічого не робить
  .typeMileage(fixedMileage)
  .typeLiters(10)
  .typeTotalCost(100)
  .save();

// дочекайся появи рядка з 135 у таблиці
cy.contains('table.expenses_table td', '135', { timeout: 10000 }).should('be.visible');

      }
    });
    return this;
  }

  editFirstRow() {
    this.ensureAtLeastOneExpense();
    cy.get('table.expenses_table tbody tr').first()
      .find('button.btn.btn-edit').click({ force: true });
    cy.get('.modal-content, .mat-dialog-container').first().should('be.visible');
    return this;
  }
}
module.exports = new FuelExpensesPage();
