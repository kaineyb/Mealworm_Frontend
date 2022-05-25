import config from "./config.json";

const { siteName } = config;

export const en = {
  foo: (arg1, arg2) => `Hello ${arg1} ${arg2}`,
  bar: (arg1) => `Hello ${arg1}`,

  hero: {
    header: "Welcome to the Site!",
    text: `${siteName} helps you organise your meals and meal plans, it
    generates a shopping list from your plans to help speed up making a
    shopping list :)`,
  },

  copyright: `© 2022 - ${siteName}`,

  stores: {
    titlePlural: "Stores",
    titleSingular: "Store",
    createNew: "Create new Store",
    newName: "New Store Name...",
  },

  sections: {
    titlePlural: "Sections",
    titleSingular: "Section",
    createNew: "Create new Section",
    newName: "New Section Name...",
    choose: "Choose Section",
    without: "Without Section",
  },

  ingredients: {
    titlePlural: "Ingredients",
    titleSingular: "Ingredient",
    createNew: "Create new Ingredient",
    newName: "New Ingredient Name...",
  },

  meals: {
    titlePlural: "Meals",
    titleSingular: "Meal",
    createNew: "Create new Meal",
    newName: "New Meal Name...",
  },

  plans: {
    titlePlural: "Plans",
    titleSingular: "Plan",
    createNew: "Create new Plan",
    newName: "New Plan Name...",
    startsOn: "Starts On",
    day: "Day",
    reorderDays: "Reorder Days",
    addDay: "Add Day",
    shoppingList: "Shopping List",
    schedule: "Schedule",
    Recipes: "Recipes",
  },

  profile: {
    userProfile: "User Profile",
    userID: "User ID",
    userName: "Username",
    email: "Email",
    secretAdminBox: "Secret Admin Box",
    accessTokenTime: "Access Token Time",
    refreshTokenTime: "Refresh Token Time",
    reloadDataFromServer: "Reload Data from Server",
    logout: "Logout",
  },
};
