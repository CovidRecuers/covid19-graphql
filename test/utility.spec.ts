import { formatDate, getGrowthRate } from "../resolvers/Query";

describe("formatDate", () => {
  it("should format the date", () => {
    const d = new Date("01/01/2011");
    expect(formatDate(d)).toBe("1/1/2011");
  });
});

describe('getGrowtRate', () => {
  it('should return 0 if index === 0', () => {
    expect(getGrowthRate(0,[4,1,2,5])).toBe(0)
  });

  it('should return undefined if result[index-1] === 0 ', () => {
    expect(getGrowthRate(1,[0,1,4,1,6])).toBe(undefined)
  });

  it('should return the growth rate from the following day', () => {
    expect(getGrowthRate(1,[4,1,2,5])).toBe(3.5)
  });
  
});