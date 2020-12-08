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
      await resolvers.country(
        null,
        { name: "Denmark" },
        { getResults: mockContext }
      );

    await expect(t()).rejects.toThrow(
      "Couldn't find data from country Denmark"
    );
  });

  it("should raise error if the date is invalid", () => {});

  it("should return the most recent result if the date is not provided", () => {});

  it("should return the correct result given an existing country and an existing date", () => {});
});
