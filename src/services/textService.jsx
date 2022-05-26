import { Fragment } from "react";
import config from "./config.json";

const { siteName } = config;

export const en = {
  foo: (arg1, arg2) => `Hello ${arg1} ${arg2}`,
  bar: (arg1) => `Hello ${arg1}`,

  aria: { cancel: "Cancel", delete: "Delete", save: "Save" },

  units: [
    [" x ", "Items"],
    ["g", "Grams"],
    ["kg", "Kilograms"],
    ["ml", "Millilitres"],
    ["l", "Litres"],
  ],

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
    newName: "New Store name...",
    notFound: "Store not found",

    postPromise: {
      pending: (category, storeName) => `Creating ${category}: ${storeName}`,
      success: (category, storeName) => `${category} "${storeName}" created! `,
      error: (category, storeName) =>
        ` Creating ${category}: ${storeName} failed! Please try again later`,
    },
    patchPromise: {
      pending: (storeName) => `Updating ${storeName} on server...`,
      success: (storeName) => `Updated ${storeName} on server! :)`,
      error: (storeName) => `Couldn't update ${storeName} on server! :(`,
    },
    delete: {
      confirm: (storeName) => `Really Delete "${storeName}"?`,
      promise: {
        pending: (storeName) => `Deleting ${storeName} from server...`,
        success: (storeName) => `Deleted ${storeName} from server! :)`,
        error: (storeName) => `Couldn't deleted ${storeName} from server! :(`,
      },
    },
  },

  aisles: {
    aisle: "Aisle: ",
    ariaSave: "Save",
    ariaDelete: "Delete",
    ariaCancel: "Cancel",
    notSet: "Not Set",
    addAisle: "Add Aisle",

    delete: {
      confirm: (aisleNumber, sectionName, storeName) =>
        `Really Delete "Aisle No ${aisleNumber} for Section: ${sectionName} @  ${storeName}" ?`,
      promise: {
        pending: (aisleNumber, sectionName, storeName) =>
          `Deleting Aisle No: ${aisleNumber} for Section: ${sectionName} @  ${storeName} on server`,
        success: (aisleNumber, sectionName, storeName) =>
          `Deleted Aisle No: ${aisleNumber} for Section: ${sectionName} @  ${storeName} on server!`,
        error: (aisleNumber, sectionName, storeName) =>
          `Couldn't delete Aisle No: ${aisleNumber} for Section: ${sectionName} @  ${storeName} on server :(`,
      },
    },
    postPromise: {
      pending: (sectionName, storeName) =>
        `Creating Aisle for ${sectionName} at ${storeName} on server`,
      success: (sectionName, storeName) =>
        `Created Aisle for ${sectionName} at ${storeName} on server!`,
      error: (sectionName, storeName) =>
        `Couldn't create Aisle for ${sectionName} at ${storeName} on server :(`,
    },
    patchPromise: {
      pending: (sectionName) =>
        `Updating Aisle Number for Section: ${sectionName} on server`,
      success: (sectionName) =>
        `Updated Aisle Number for Section: ${sectionName} on server!`,
      error: (sectionName) =>
        `Couldn't update Aisle Number for Section: ${sectionName} on server :(`,
    },
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
    notFound: "Ingredient not found",
    patchPromise: {
      pending: (name) => `Updating ${name} on server...`,
      success: (name) => `Updated ${name} on server! :)`,
      error: (name) => `Couldn't update ${name} on server! :(`,
    },
    postPromise: {
      pending: (name) => `Adding ${name} to server...`,
      success: (name) => `Added ${name} to server! :)`,
      error: (name) => `Couldn't add ${name} to server! :(`,
    },
    delete: {
      confirm: (name) => `Really Delete "${name}"?`,
      promise: {
        pending: (category, name) => `Deleting ${category}: ${name}`,
        success: (category, name) => `Deleted ${category}: ${name}!`,
      },
      error: {
        alreadyDeleted: (category) =>
          `This ${category} has already been deleted!`,
        failedTryAgainLater: (category, name) =>
          `Deleting ${category} Failed!: ${name}, please try again later`,
      },
    },
  },

  meals: {
    titlePlural: "Meals",
    titleSingular: "Meal",
    createNew: "Create new Meal",
    newName: "New Meal Name...",
    notFound: "Meal not found",
    ariaDelete: "Delete Meal",
    ariaCancel: "Cancel",
    ariaSave: "Save",
    postPromise: {
      pending: (mealName) => `Creating Meal: ${mealName} on server`,
      success: (mealName) => `Created Meal: ${mealName} on server!`,
      error: (mealName) => `Couldn't create Meal: ${mealName} on server :(`,
    },
    patchPromise: {
      pending: (mealName) => `Updating ${mealName} on server...`,
      success: (mealName) => `Updated ${mealName} on server! :)`,
      error: (mealName) => `Couldn't update ${mealName} on server! :(`,
    },
    delete: {
      confirm: (name) => `Really delete Meal: "${name}" ?`,
      promise: {
        pending: (name) => `Deleting ${name} from server...`,
        success: (name) => `Deleted ${name} from server! :)`,
        error: (name) => `Couldn't deleted ${name} from server! :(`,
      },
    },
  },

  mealIngredient: {
    enterQuantity: "Enter Quantity",
    chooseUnit: "Choose Unit...",
    chooseIngredient: "Choose Ingredient...",
    postPromise: {
      pending: (mealName) =>
        `Creating Meal Ingredient for Meal: ${mealName} on server`,
      success: (mealName) =>
        `Created Meal Ingredient for meal: ${mealName} on server!`,
      error: (mealName) =>
        `Couldn't create Meal Ingredient for meal: ${mealName} on server :(`,
    },
    ariaSave: "Save",
    ariaCancel: "Cancel",
    ariaDelete: "Delete Meal",
    delete: {
      confirm: (quantity, unit, name) =>
        `Really Delete "${quantity} ${unit} ${name}"?`,
      promise: {
        pending: (meal) =>
          `Deleting Meal Ingredient for Meal: ${meal} on server`,
        success: (meal) =>
          `Deleted Meal Ingredient for meal: ${meal} on server!`,
        error: (meal) =>
          `Couldn't delete Meal Ingredient for meal: ${meal} on server :(`,
      },
    },
    patchPromise: {
      pending: (mealName) =>
        `Updating Meal Ingredient for Meal: ${mealName} on server`,
      success: (mealName) =>
        `Updated Meal Ingredient for meal: ${mealName} on server!`,
      error: (mealName) =>
        `Couldn't update Meal Ingredient for meal: ${mealName} on server :(`,
    },
  },

  plans: {
    ariaSave: "Save",
    ariaCancel: "Cancel",
    ariaDelete: "Delete",
    titlePlural: "Plans",
    titleSingular: "Plan",
    createNew: "Create new Plan",
    newName: "New Plan name...",
    startsOn: "Starts On",
    day: "Day",
    reorderDays: "Reorder Days",
    addDay: "Add Day",
    shoppingList: "Shopping List",
    schedule: "Schedule",
    recipes: "Recipes",
    postPromise: {
      pending: (planName) => `Creating Plan: ${planName} on server`,
      success: (planName) => `Created Plan: ${planName} on server!`,
      error: (planName) => `Couldn't create Plan: ${planName} on server :(`,
    },

    patchPromise: {
      pending: (plan) => `Updating ${plan} on server...`,
      success: (plan) => `Updated ${plan} on server! :)`,
      error: (plan) => `Couldn't update ${plan} on server! :(`,
    },
    delete: {
      confirm: (planName) => `Really delete Plan: "${planName}" ?`,
      promise: {
        pending: (planName) => `Deleting ${planName} from server...`,
        success: (planName) => `Deleted ${planName} from server! :)`,
        error: (planName) => `Couldn't deleted ${planName} from server! :(`,
      },
    },
  },

  startDayPlans: {
    ariaCancel: "Cancel",
    ariaDelete: "Delete",
    ariaSave: "Save",
    startsOn: "Starts On: ",
    promise: {
      pending: (planName) =>
        `Updating Start Day for Plan: ${planName} on server`,
      success: (planName) =>
        `Updated Start Day for Plan: ${planName} on server!`,
      error: (planName) =>
        `Couldn't update Start Day for Plan: ${planName} on server :(`,
    },
  },

  recipes: {
    recipesFor: "Recipes for",
    recipe: "Recipe",
    comingSoonBadge: "Coming Soon :)",
    loremIpsum: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore
    neque pariatur itaque minus similique odit asperiores. Maiores, aliquid
    commodi adipisci esse libero officia. Beatae doloremque ipsam architecto
    quisquam soluta eaque.`,
  },

  schedule: {
    scheduleFor: "Schedule for",
    day: "Day",
    meal: "Meal",
    blurb: (plan, longDay) => (
      <Fragment>
        Starts on a <strong>{longDay}</strong> and lasts{" "}
        <strong>{plan.day_set.length}</strong> days
      </Fragment>
    ),
  },

  planDays: {
    day: "Day: ",
    chooseMeal: "Choose Meal...",
    ariaSave: "Save",
    ariaCancel: "Cancel",
    ariaDelete: "Delete",
    patchPromise: {
      pending: (planName) => `Updating Day for Plan: ${planName} on server`,
      success: (planName) => `Updated Day for Plan: ${planName} on server!`,
      error: (planName) =>
        `Couldn't update Day for Plan: ${planName} on server :(`,
    },
    postPromise: {
      pending: (planDay) => `Creating Day for Plan: ${planDay} on server`,
      success: (planDay) => `Created Day for Plan: ${planDay} on server!`,
      error: (planDay) =>
        `Couldn't create Day for Plan: ${planDay} on server :(`,
    },
    delete: {
      confirm: (dayOrder, mealName) =>
        `Really Delete "Day ${dayOrder}: ${mealName}"?`,
      promise: {
        pending: (planDay) => `Deleting Day for Plan: ${planDay} on server`,
        success: (planDay) => `Deleting Day for Plan: ${planDay} on server!`,
        error: (planDay) =>
          `Couldn't delete Day for Plan: ${planDay} on server :(`,
      },
    },
  },

  shoppingList: {
    whatStore: "What store are you shopping at today?",
    selectStore: "Please select a Store",
    shoppingListFor: "Shopping List for ",
  },

  user: {
    profile: "Profile",
    userProfile: "User Profile",
    userID: "User ID",
    userName: "Username",
    email: "Email",
    secretAdminBox: "Secret Admin Box",
    accessTokenTime: "Access Token Time",
    refreshTokenTime: "Refresh Token Time",
    reloadDataFromServer: "Reload Data from Server",
    logOut: "Logout",
    logIn: "Login",
    register: "Register",
    enterUsername: "Enter your username",
    enterPassword: "Enter your password",
    enterEmail: " Enter your email address",
    yourUsername: "Your Username",
    yourPassword: "Your Password",
    yourEmail: "Your Email Address",
    loggedIn: "Logged in!",
    loggedOut: "Logged out!",
  },

  loginForm: {
    resultPromise: {
      pending:
        "If you see this, then the backend is offline or asleep, please wait :)",
      error: "Couldn't log you in, username or password incorrect.",
    },
  },

  registerForm: {
    requestedUsername: "Requested Username",
    resultPromise: {
      pending: "Attempting to create an account for you",
      success: (username) =>
        `Created an account for you! Welcome to the site ${username}`,
      error:
        "Couldn't create an account for you, username or email may already be taken",
    },
    loginPromise: {
      pending: "Attempting to Log you in!",
      error: "Couldn't log you in, please try to login manually",
    },
  },

  error: {
    notfound: "404 - Not Found!",
  },

  updateDataPromise: {
    pending: "Getting data from server 🧐",
    success: "Got latest data from server 🥰",
    error: "Couldn't get data from server! 🤬",
  },

  days: {
    weekend: "weekend",
    short: {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    },
    long: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
  },

  simpleForm: {
    promise: {
      pending: (name) => `Updating ${name} on server...`,
      success: (name) => `Updated ${name} on server! :)`,
      error: (name) => `Couldn't update ${name} on server! :(`,
    },

    delete: {
      confirm: (name) => `Really Delete "${name}"?`,
      promise: {
        pending: (category, item) => `Deleting ${category}: ${item}`,
        success: (category, item) => `Deleted ${category}: ${item}!`,
      },
      error: {
        alreadyDeleted: (name) => `This ${name} has already been deleted!`,
        failedTryAgainLater: (category, name) =>
          `Deleting ${category} Failed!: ${name}, please try again later`,
      },
    },

    created: {
      promise: {
        pending: (category, name) => `Creating ${category}: ${name}`,
        success: (category, name) => `${category} "${name}" created!`,
      },
      error: (category, name) =>
        ` Creating ${category}: ${name} failed! Please try again later`,
    },
  },
};
