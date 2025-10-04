const auth = require('../../support/pom/auth.page');
const garage = require('../../support/pom/garage.page');
const carModal = require('../../support/pom/car.modal');
const carCard = require('../../support/pom/car.card');
const mileageForm = require('../../support/pom/mileage.form');

describe('manage cars (POM)', () => {
  beforeEach(() => {
    auth.ensureLoggedIn();
  });

  it('Adding car', () => {
    garage.open().openAddCarModal();
    carModal.selectBrand('BMW').selectModel('X5').typeMileage(12345).save();
  });

  it('Updating car', () => {
    garage.open();
    carCard.openEditOfFirst();
    carModal
      .selectBrand('Porsche')
      .selectModel('Panamera')
      .typeMileage(34567)
      .typeCreatedAt('25.11.2025')
      .save();
  });

  it('Update mileage', () => {
    garage.open();
    mileageForm.setFirstMiles(484848).submitFirst();
  });

  it('Skip mileage', () => {
    garage.open();
    carCard.openEditOfFirst();
    carModal.clearMileageAndBlur();
    carModal.shouldSeeValidation('Mileage cost required');
  });

  it('Incorrect mileage', () => {
    garage.open();
    carCard.openEditOfFirst();
    carModal.typeMileage(99999999).save();
    carModal.shouldSeeValidation('Mileage has to be from 0 to 999999');
  });

  it('Remove car', () => {
    garage.open();
    carCard.removeFirst(true);
  });

  it('Adding car for next test', () => {
    garage.open().openAddCarModal();
    carModal.selectBrand('BMW').selectModel('X5').typeMileage(123).save();
  });
});
