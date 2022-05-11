import days from "../../../snippets/days";
import mealFromID from "../../../snippets/meals";
function Recipe(props) {
  const { meals, plan, ingredients, day } = props;

  const MealIngredients = (mealId) => {
    const meal = mealFromID(mealId, meals, {});
    return meal.meal_ingredients;
  };

  return (
    <div className="recipe" key={day.id}>
      <h3>
        {day.order} - {days.getDay(day.order, plan.start_day)}
      </h3>
      <hr />
      <h4>{mealFromID(day.meal, meals)}</h4>
      <hr />
      <table className="recipe-table" data-table-theme="default zebra">
        <thead>
          <tr>
            <th scope="col">Quantity</th>
            <th scope="col">Unit</th>
            <th scope="col">Ingredient</th>
          </tr>
        </thead>
        <tbody>
          {MealIngredients(day.meal).map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.unit}</td>
              <td>{mealFromID(ingredient.ingredient, ingredients)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <hr />
        <strong>Recipe</strong>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore
          neque pariatur itaque minus similique odit asperiores. Maiores,
          aliquid commodi adipisci esse libero officia. Beatae doloremque ipsam
          architecto quisquam soluta eaque.
        </p>
      </div>
    </div>
  );
}

export default Recipe;