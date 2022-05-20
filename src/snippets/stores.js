const storeFromId = (id, stores, object) => {
  const item = stores.filter((stores) => stores["id"] === id)[0];
  if (item && object) {
    return item;
  } else if (item) {
    return item.name;
  } else {
    return "Store not Found";
  }
};

export default storeFromId;
