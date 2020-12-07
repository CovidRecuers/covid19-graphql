import { formatDate, getGrowthRate } from "../resolvers/Query";
import * as multipleValueRes from "./mock-data/country/multiple-value.json";

describe("formatDate", () => {
  it("should format the date", () => {
    const d = new Date("01/01/2011");
    expect(formatDate(d)).toBe("1/1/2011");
  });
});

describe('getGrowtRate', () => {
  it('should return 0 if index === 0', () => {
    expect(getGrowthRate(0,multipleValueRes.US)).toBe(0)
  });

  it('should return undefined if result[index-1] === 0 ', () => {
    expect(getGrowthRate(1,multipleValueRes.VaticanCity)).toBe(undefined)
  });

  it('should return the growth rate from the following day', () => {
    expect(getGrowthRate(1,multipleValueRes.US)).toBe(0.01611681877046251)
  });
  
});