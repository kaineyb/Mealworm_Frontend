const sections = [
  {
    id: 1,
    name: "Meats",
  },
  {
    id: 2,
    name: "Vegetables",
  },
  {
    id: 3,
    name: "Pasta",
  },
  {
    id: 4,
    name: "Bread",
  },
  {
    id: 5,
    name: "Sauces",
  },
  {
    id: 7,
    name: "Tins",
  },
];

const ingredients = [
  { id: 11, name: "Kaines Null Berries", section: null },
  { id: 50, name: "Lovely Ingredient", section: null },
  { id: 12, name: "Red Pepper", section: null },
  { id: 49, name: "Testy Ingredient", section: 21 },
  { id: 1, name: "Chicken Breast", section: 21 },
  { id: 2, name: "Mince", section: 21 },
  { id: 5, name: "Red Onion", section: 21 },
  { id: 6, name: "Red Pepper", section: 21 },
  { id: 10, name: "Garlic Clove", section: 21 },
  { id: 4, name: "Spaghetti", section: 21 },
  { id: 7, name: "Hovis Granary Slice", section: 21 },
  { id: 3, name: "Spaghetti Bolognese Sauce", section: 21 },
  { id: 8, name: "Beans", section: 21 },
  { id: 13, name: "Heinz Beans", section: 21 },
];

const sectionIds = [];
sections.forEach((item) => sectionIds.push(item.id));

const ingredientsCopy = ingredients.map((item) => ({ ...item }));

ingredientsCopy.forEach((item) => {
  if ((item["section"] !== null) & !sectionIds.includes(item["section"])) {
    item["section"] = null;
  }
});

console.log(ingredientsCopy);
