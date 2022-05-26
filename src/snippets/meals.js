import { en } from "../services/textService";

const mealFromID = (id, meals, object) => {
  const item = meals.filter((meal) => meal["id"] === id)[0];
  if (item && object) {
    return item;
  } else if (item) {
    return item.name;
  } else {
    return en.meals.notFound;
  }
};

export default mealFromID;
