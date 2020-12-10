import { ApolloError } from "apollo-server-micro";
import { resolvers } from "../resolvers/Query";
import * as multipleValueRes from "./mock-data/country/multiple-value.json";
import * as singleValueRes from "./mock-data/country/single-value.json";
import * as allData from "./mock-data/timeseries.json";

describe("Results resolver", () => {
  const mockContext = jest.fn();
  it("should raise error with message 'Couldn't find data from country' if no data is provided for given country", async () => {
    mockContext.mockReturnValueOnce(singleValueRes);
    const t = async () =>
      await resolvers.results(
        null,
        { countries: ["Denmark"], date: "01/01/2000" },
        { getResults: mockContext }
      );

    await expect(t()).rejects.toThrow(
      "Couldn't find data from country Denmark"
    );
  });
  it("should raise error if no country is provided", async () => {
    mockContext.mockReturnValueOnce(singleValueRes);
    const t = async () =>
      await resolvers.results(
        null,
        { countries: [], date: "01/01/2000" },
        { getResults: mockContext }
      );

    await expect(t()).rejects.toThrow(Error);
  });

  it("should raise error if the date is invalid", async () => {
    mockContext.mockReturnValueOnce(singleValueRes);
    const t = async () =>
      await resolvers.results(
        null,
        { countries: ["France"], date: "-1/-2/abc" },
        { getResults: mockContext }
      );

    await expect(t()).rejects.toThrow(Error);
  });

  it("should return the most recent results if the date is not provided", async () => {
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

  it("should return the correct results given one country and a date (eq operation)", async () => {
    mockContext.mockReturnValueOnce(multipleValueRes);
    const res = await resolvers.results(
      null,
      { countries: ["France"], date: { eq: "12/05/2020" } },
      { getResults: mockContext }
    );

    expect(res).toEqual([
      {
        growthRate: (2334626 - 2321703) / 2321703,
        country: {
          name: "France",
        },
        date: "2020-12-5",
        confirmed: 2334626,
        deaths: 55073,
        recovered: 174992,
      },
    ]);
  });

  it("should return the correct results given one country and a minimum date (gt operation)", async () => {
    mockContext.mockReturnValueOnce(multipleValueRes);
    const res = await resolvers.results(
      null,
      { countries: ["France"], date: { gt: "12/03/2020" } },
      { getResults: mockContext }
    );

    expect(res).toEqual([
      {
        growthRate: (2321703 - 2310271) / 2310271,
        country: {
          name: "France",
        },
        date: "2020-12-4",
        confirmed: 2321703,
        deaths: 54859,
        recovered: 173986,
      },
      {
        growthRate: (2334626 - 2321703) / 2321703,
        country: {
          name: "France",
        },
        date: "2020-12-5",
        confirmed: 2334626,
        deaths: 55073,
        recovered: 174992,
      },
      {
        growthRate: (2345648 - 2334626) / 2334626,
        country: {
          name: "France",
        },
        date: "2020-12-6",
        confirmed: 2345648,
        deaths: 55247,
        recovered: 175220,
      },
    ]);
  });

  // TODO
  it("should return the correct results given one country and a maximum date (lt operation)", async () => {
    mockContext.mockReturnValueOnce(multipleValueRes);
    const res = await resolvers.results(
      null,
      { countries: ["France"], date: { lt: "12/04/2020" } },
      { getResults: mockContext }
    );

    expect(res).toEqual(
      expect.arrayContaining([
        {
          growthRate: (2310271 - 2297393) / 2297393,
          country: {
            name: "France",
          },
          date: "2020-12-3",
          confirmed: 2310271,
          deaths: 54231,
          recovered: 172574,
        },
        {
          growthRate: 0,
          country: {
            name: "France",
          },
          date: "2020-12-2",
          confirmed: 2297393,
          deaths: 53906,
          recovered: 171197,
        },
      ])
    );
  });
  it("should return the correct results given more than one country and a date (eq operation)", async () => {
    mockContext.mockReturnValueOnce(multipleValueRes);
    const res = await resolvers.results(
      null,
      { countries: ["France"], date: { eq: "12/05/2020" } },
      { getResults: mockContext }
    );

    expect(res).toEqual([
      {
        growthRate: (2334626 - 2321703) / 2321703,
        country: {
          name: "France",
        },
        date: "2020-12-5",
        confirmed: 2334626,
        deaths: 55073,
        recovered: 174992,
      },
    ]);
  });

  it("should return the correct results given more than one country and a minimum date (gt operation)", async () => {
    mockContext.mockReturnValueOnce(multipleValueRes);
    const res = await resolvers.results(
      null,
      { countries: ["France"], date: { gt: "12/03/2020" } },
      { getResults: mockContext }
    );

    expect(res).toEqual([
      {
        growthRate: (2321703 - 2310271) / 2310271,
        country: {
          name: "France",
        },
        date: "2020-12-4",
        confirmed: 2321703,
        deaths: 54859,
        recovered: 173986,
      },
      {
        growthRate: (2334626 - 2321703) / 2321703,
        country: {
          name: "France",
        },
        date: "2020-12-5",
        confirmed: 2334626,
        deaths: 55073,
        recovered: 174992,
      },
      {
        growthRate: (2345648 - 2334626) / 2334626,
        country: {
          name: "France",
        },
        date: "2020-12-6",
        confirmed: 2345648,
        deaths: 55247,
        recovered: 175220,
      },
    ]);
  });
  it("should return the correct results given more than one country and a maximum date (lt operation)", async () => {
    mockContext.mockReturnValueOnce(multipleValueRes);
    const res = await resolvers.results(
      null,
      { countries: ["France"], date: { lt: "12/04/2020" } },
      { getResults: mockContext }
    );

    expect(res).toEqual(
      expect.arrayContaining([
        {
          growthRate: (2310271 - 2297393) / 2297393,
          country: {
            name: "France",
          },
          date: "2020-12-3",
          confirmed: 2310271,
          deaths: 54231,
          recovered: 172574,
        },
        {
          growthRate: 0,
          country: {
            name: "France",
          },
          date: "2020-12-2",
          confirmed: 2297393,
          deaths: 53906,
          recovered: 171197,
        },
      ])
    );
  });
});
