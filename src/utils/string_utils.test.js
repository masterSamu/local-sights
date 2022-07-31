import { capitalizeWords } from "./string_utils";

describe("String utils tests", () => {
  test("capitalizeFirstLetter function will convert first letter to upper case", () => {
    const string = "hello";
    const capitalizedString = capitalizeWords(string);
    expect(capitalizedString).toBe("Hello");
  });

  test("capitalizeFirstLetter function converts first letter after dash to upper case", () => {
    const string = "hello-world-first";
    const capitalizedString = capitalizeWords(string);
    expect(capitalizedString).toBe("Hello-World-First");
  })
});
