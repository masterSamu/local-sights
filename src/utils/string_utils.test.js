import { capitalizeFirstLetter } from "./string_utils";

describe("String utils tests", () => {
  test("capitalizeFirstLetter function will convert first letter to upper case", () => {
    const string = "hello";
    const capitalizedString = capitalizeFirstLetter(string);
    expect(capitalizedString).toBe("Hello");
  });
});
