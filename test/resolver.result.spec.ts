import { ApolloError } from "apollo-server-micro";
import { resolvers } from "../resolvers/Query";
import * as multipleValueRes from "./mock-data/country/multiple-value.json";
import * as singleValueRes from "./mock-data/country/single-value.json";
import * as allData from "./mock-data/timeseries.json";

describe("Result resolver", () => {
  const mockContext = jest.fn();
  it("should raise error with message 'Couldn't find data from country' if no data is provided for given country", async () => {
    mockContext.mockReturnValueOnce(singleValueRes);
    const t = async () =>
      await resolvers.result(
        null,
        { country: "Denmark", date: "01/01/2000" },
        { getResults: mockContext }
      );

    await expect(t()).rejects.toThrow(Error);
  });

  it("should raise error if no country is provided", async () => {
    mockContext.mockReturnValueOnce(singleValueRes);
    const t = async () =>
      await resolvers.result(
        null,
        { country: null, date: "01/01/2000" },
        { getResults: mockContext }
      );
    await expect(t()).rejects.toThrow(Error);
  });

  it("should raise error if the date is invalid", async () => {
    mockContext.mockReturnValueOnce(singleValueRes);
    const t = async () =>
      await resolvers.result(
        null,
        { country: "France", date: "-1/-2/abc" },
        { getResults: mockContext }
      );

    await expect(t()).rejects.toThrow(Error);
  });

  it("should return the most recent result if the date is not provided", async () => {
    mockContext.mockReturnValueOnce(multipleValueRes);
    const res = await resolvers.result(
      null,
      { country: "France", date: null },
      { getResults: mockContext }
    );

    expect(res).toEqual({
      growthRate: (2345648 - 2334626) / 2334626,
      country: {
        name: "France",
      },
      date: "2020-12-6",
      confirmed: 2345648,
      deaths: 55247,
      recovered: 175220,
    });
  });

  it("should return the correct result given an existing country and an existing date", async () => {
    mockContext.mockReturnValueOnce(multipleValueRes);
    const res = await resolvers.result(
      null,
      { country: "France", date: "12/05/2020" },
      { getResults: mockContext }
    );

    expect(res).toEqual({
      growthRate: (2334626 - 2321703) / 2321703,
      country: "France",
      date: "2020-12-5",
      confirmed: 2334626,
      deaths: 55073,
      recovered: 174992,
    });
  });
});
