import { resolvers } from "../resolvers/Query";
import * as multipleValueRes from "./mock-data/country/multiple-value.json";
import * as singleValueRes from "./mock-data/country/single-value.json";
describe("Country resolver", () => {
  const mockContext = jest.fn();

  it("should call country from query API ", async () => {
    mockContext.mockReturnValueOnce(singleValueRes);
    const res = await resolvers.country(
      null,
      { name: "US" },
      { getResults: mockContext }
    );

    expect(res).toEqual({
      name: "US",
      results: [
        {
          date: "2020-1-22",
          confirmed: 1,
          deaths: 0,
          recovered: 0,
          growthRate: 0,
        },
      ],
      mostRecent: {
        date: "2020-1-22",
        confirmed: 1,
        deaths: 0,
        recovered: 0,
        growthRate: 0,
      },
    });
  });
});
