import { resolvers } from "../resolvers/Query";

describe("Country resolver", () => {
  const mockContext = jest.fn();
  mockContext.mockReturnValue({
    Afghanistan: [
      {
        date: "2020-1-22",
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      },
    ],
  });

  it("should call country from query API ", async () => {
    const res = await resolvers.country(
      null,
      { name: "Afghanistan" },
      { getResults: mockContext }
    );

    expect(res).toEqual({
      name: "Afghanistan",
      results: "",
    });
  });
});
