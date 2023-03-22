
describe("SalaryCalculator", () => {
  let salaryCalculator;
  let form;

  beforeEach(() => {
    form = document.createElement("form");
    form.innerHTML = `
      <input type="text" name="annualSalary" value="">
      <input type="text" name="rentMortgage" value="">
      <input type="text" name="restaurants" value="">
      <input type="text" name="markets" value="">
      <input type="text" name="transportation" value="">
      <input type="text" name="utilities" value="">
      <input type="text" name="childcare" value="">
      <input type="text" name="clothingShoes" value="">
      <input type="text" name="sportsLeisure" value="">
      <input type="text" name="doctorVisit" value="">
      <input type="text" name="streaming" value="">
      <input type="text" name="contingency" value="">
    `;
    salaryCalculator = new SalaryCalculator(form);
  });

  describe("#calculateTotalExpenses", () => {


    it("rejects the promise if any input is invalid", async () => {
      form.elements.doctorVisit.value = "invalid";
      await expectAsync(salaryCalculator.calculateTotalExpenses()).toBeRejectedWithError("Invalid input.");
    });
  });

  describe("#calculateSalarySurplusDeficit", () => {


    it("rejects the promise if any input is invalid", async () => {
      form.elements.markets.value = "invalid";
      await expectAsync(salaryCalculator.calculateSalarySurplusDeficit()).toBeRejectedWithError("Invalid input.");
    });
  });
});
