import Recipe from "./recipe";
function Recipes(props) {
  const { meals, plan, ingredients } = props;

  return (
    <div className="recipes">
      {plan.day_set.map((day) => (
        <Recipe
          key={day.id}
          day={day}
          meals={meals}
          plan={plan}
          ingredients={ingredients}
        />
      ))}
    </div>
  );
}

export default Recipes;
