import { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../../context/dataContext";
import http from "../../../../services/httpService";
import MealIngredients from "./mealIngredients";

const Meal = (props) => {
  const { meal } = props;

  const context = useContext(dataContext);

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(meal.name);
  const [newName, setNewName] = useState(name);

  const handleChange = ({ currentTarget: input }) => {
    setNewName(input.value);
  };

  const handleClick = () => {
    if (editable) {
      setEditable(false);
    } else {
      setEditable(true);
    }
  };

  const handleCancel = () => {
    setNewName(name);
    setEditable(false);
  };

  const handleSave = () => {
    if (name !== newName) {
      const {
        data: { meals },
        setData,
      } = context;

      const newMeals = [...meals];
      const item = meals.filter((_meal) => _meal.id === meal.id)[0];
      const index = meals.indexOf(item);

      newMeals[index]["name"] = newName;

      setData("meals", newMeals);

      setName(newName);
      doSave(meal.id, newMeals[index]);
    }

    setEditable(false);
  };

  const doSave = async (id, item) => {
    const payload = { name: item.name };

    const endpoint = http.mealsEP;
    await toast.promise(http.patch(`${endpoint}${id}/`, payload), {
      pending: `Updating ${item.name} on server...`,
      success: `Updated ${item.name} on server! :)`,
      error: `Couldn't update ${item.name} on server! :(`,
    });
  };

  const handleDelete = () => {
    const deleteMe = window.confirm(`Really delete Meal: "${name}" ?`);

    if (deleteMe) {
      const {
        data: { meals },
        setData,
      } = context;

      const newMeals = meals.filter((_meal) => _meal.id !== meal.id);

      setData("meals", newMeals);
      doDelete();
    }
  };

  const doDelete = async () => {
    const endpoint = http.mealsEP;
    await toast.promise(http.delete(`${endpoint}${meal.id}/`), {
      pending: `Deleting ${name} from server...`,
      success: `Deleted ${name} from server! :)`,
      error: `Couldn't deleted ${name} from server! :(`,
    });
  };

  const mealName = editable ? (
    <Fragment>
      <input
        name={name}
        id={meal.id}
        defaultValue={name}
        onChange={(event) => handleChange(event)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleDelete}>Delete Meal</button>
    </Fragment>
  ) : (
    <Fragment>
      <strong className="clickable" onClick={handleClick}>
        {name}
      </strong>
    </Fragment>
  );

  return (
    <div className="meal">
      {mealName}
      <ul>
        <MealIngredients meal_ingredients={meal.meal_ingredients} meal={meal} />
      </ul>
    </div>
  );
};

export default Meal;
