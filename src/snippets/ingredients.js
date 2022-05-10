const ingredientFromID = (id, ingredients, object = false) => {
  const item = ingredients.filter((ingredient) => ingredient["id"] === id)[0];
  if (item && object) {
    return item;
  } else if (item) {
    return item.name;
  } else {
    return { item, error: "Ingredient not found" };
  }
};

export default ingredientFromID;
