import _ from "lodash";
import { Fragment } from "react";
import mealFromID from "../../../snippets/meals";

function ShoppingListTable(props) {
  const { meals, plan, ingredients, sections } = props;

  // Go through each meal and look at the ingredient,
  // check the id and unit, and add them to our object.

  // If the id and unit combination already exists then we add to that specific object.else we create a new object.

  const sectionFromId = (id, sections, object) => {
    const item = sections.filter((section) => section["id"] === id)[0];
    if (item && object) {
      return item;
    } else if (item) {
      return item.name;
    } else {
      return { item, error: "Section not found" };
    }
  };

  const combineIngredients = (plan) => {
    const mealTotals = {};

    plan.day_set.forEach((day) => {
      if (mealTotals[day.meal]) {
        mealTotals[day.meal] = mealTotals[day.meal] + 1;
      } else {
        mealTotals[day.meal] = 1;
      }
    });

    return mealTotals;
  };

  const generateIngredientTotals = (mealTotals) => {
    const ingredientTotals = {};

    Object.entries(mealTotals).forEach(([mealID, amount]) => {
      const meal = mealFromID(parseInt(mealID), meals, {});

      meal.meal_ingredients.forEach((mealIngredient) => {
        const uniqueId = `${mealIngredient.ingredient}-${mealIngredient.unit}`;

        const ingredient = sectionFromId(
          parseInt(mealIngredient.ingredient),
          ingredients,
          {}
        );

        if (ingredientTotals[uniqueId]) {
          ingredientTotals[uniqueId]["quantity"] +=
            mealIngredient.quantity * amount;
        } else {
          ingredientTotals[uniqueId] = {
            id: uniqueId,
            ingredient: ingredient.id,
            name: ingredient.name,
            sectionId: ingredient.section,
            section: sectionFromId(ingredient.section, sections),
            aisle: null,
            unit: mealIngredient.unit,
            quantity: mealIngredient.quantity * amount,
          };
        }
      });
    });

    return ingredientTotals;
  };

  const sortShoppingData = (data) => {
    // data.push({
    //   id: 0,
    //   ingredient: 0,
    //   name: "LOL",
    //   sectionId: 0,
    //   section: "Injected",
    //   aisle: 1,
    //   unit: "flibbles",
    //   quantity: 0,
    // });
    return _.orderBy(data, ["aisle", "section", "name"], ["asc"]);
  };

  const mealTotals = combineIngredients(plan);
  const shoppingListData = generateIngredientTotals(mealTotals);

  const generateTableRows = (shoppingListData) => {
    let rows = Object.values(shoppingListData);

    rows = sortShoppingData(rows);

    return rows.map((row) => (
      <tr key={row.id}>
        <td>{row.section}</td>
        <td>{row.name}</td>
        <td>
          {row.quantity} {row.unit}
        </td>
        <td>[...]</td>
      </tr>
    ));
  };

  generateTableRows(shoppingListData);

  return (
    <Fragment>
      <div>
        <table>
          <colgroup>
            <col span="1" />
            <col span="1" />
            <col span="1" />
            <col span="1" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Section</th>
              <th scope="col">Ingredient</th>
              <th scope="col">Quantity</th>
              <th scope="col">Got?</th>
            </tr>
          </thead>
          <tbody>{generateTableRows(shoppingListData)}</tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default ShoppingListTable;
