import { resolvers } from "../resolvers/Query";
import * as multipleValueRes from "./mock-data/country/multiple-value.json";
import * as singleValueRes from "./mock-data/country/single-value.json";

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

  it("should return the result of all countries if no name is specified", () => {});

  it("should return the result of n country if n name(s) is specified", () => {});

  it("should correctly aggregate results", () => {});
});
