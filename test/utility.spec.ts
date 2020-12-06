import { formatDate } from "../resolvers/Query";

describe("formatDate", () => {
  it("should format the date", () => {
    const d = new Date("01/01/2011");
    expect(formatDate(d)).toBe("1/1/2011");
  });
});
