const fakeData = {
  deals: [
    {
      _id: "String",
      title: "String",
      dealID: "String",
      storeID: 1,
      gameID: 1,
      salePrice: 1,
      normalPrice: 1,
      isOnSale: 1,
      metacriticScore: 1,
      steamRatingText: "String",
      steamRatingPercent: 1,
      steamRatingCount: 1,
      steamAppID: 1,
      releaseDate: 1,
      lastChange: 1,
      dealRating: 1,
      thumb: "String",
    },
  ],
  status: 200,
};

export const request = async (route, method, data = {}, token) => {
  return await new Promise((resolve) => {
    resolve(fakeData);
  });
};
