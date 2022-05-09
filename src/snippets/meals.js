const mealFromID = (id, meals, object = false) => {
  const item = meals.filter((meal) => meal["id"] === id)[0];
  if (item && object) {
    return item;
  } else if (item) {
    return item.name;
  }
};

export default mealFromID;
