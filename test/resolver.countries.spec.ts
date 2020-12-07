import { ApolloError } from "apollo-server-micro";
import { resolvers } from "../resolvers/Query";
import * as multipleValueRes from "./mock-data/country/multiple-value.json";
import * as singleValueRes from "./mock-data/country/single-value.json";
import * as allData from "./mock-data/timeseries.json";

describe("Countries resolver", () => {
  const mockContext = jest.fn();
  it("should raise error with message 'Couldn't find data from country' if no data is provided for given country", async () => {
    mockContext.mockReturnValueOnce(singleValueRes);
    const t = async () =>
      await resolvers.country(
        null,
        { name: "Denmark" },
        { getResults: mockContext }
      );

    await expect(t()).rejects.toThrow(
      "Couldn't find data from country Denmark"
    );
  });

  it("should return the result of all countries if no (0) name is specified", async () => {
    mockContext.mockReturnValueOnce(singleValueRes);
    const res = await resolvers.countries(
      null,
      { names: [] },
      { getResults: mockContext }
    );
    expect(res.length).toBe(2);
  });

  it("should return the result of n country if 1 name is specified", async () => {
    mockContext.mockReturnValueOnce(singleValueRes);
    const res = await resolvers.countries(
      null,
      { names: ["France"] },
      { getResults: mockContext }
    );
    expect(res.length).toBe(1);
  });
  it("should return the result of n country if n names is specified where n >= 2", async () => {
    mockContext.mockReturnValueOnce(allData);
    const res = await resolvers.countries(
      null,
      { names: ["France", "US", "China"] },
      { getResults: mockContext }
    );
    expect(res.length).toBe(3);
  });

  it("should correctly aggregate results", async () => {
    mockContext.mockReturnValueOnce(multipleValueRes);
    const res = await resolvers.country(
      null,
      { name: "US" },
      { getResults: mockContext }
    );

    expect(res).toEqual({
      name: "US",
      results: [
        {
          date: "2020-12-3",
          confirmed: 14139577,
          deaths: 276325,
          recovered: 5404018,
          growthRate: 0,
        },
        {
          date: "2020-12-4",
          confirmed: 14367462,
          deaths: 278932,
          recovered: 5470389,
          growthRate: (14367462 - 14139577) / 14139577,
        },
        {
          date: "2020-12-5",
          confirmed: 14581337,
          deaths: 281186,
          recovered: 5576026,
          growthRate: (14581337 - 14367462) / 14367462,
        },
        {
          date: "2020-12-6",
          confirmed: 14757000,
          deaths: 282299,
          recovered: 5624444,
          growthRate: (14757000 - 14581337) / 14581337,
        },
      ],
      mostRecent: {
        date: "2020-12-6",
        confirmed: 14757000,
        deaths: 282299,
        recovered: 5624444,
        growthRate: (14757000 - 14581337) / 14581337,
      },
    });
  });
});
