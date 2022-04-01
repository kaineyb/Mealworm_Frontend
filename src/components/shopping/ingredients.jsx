import React, { useState, useEffect } from "react";
import http from "../../services/httpService";

function Ingredients(props) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getIngredients() {
      const result = await http.get("/shopping/ingredients/");
      setIngredients(result.data);
    }
    getIngredients();
  }, []);

  const renderIngredients = () => {
    return ingredients.map((ingredient) => (
      <li key={ingredient.id}>
        <strong>{ingredient.name}</strong> (Section: {ingredient.section})
      </li>
    ));
  };

  return (
    <div>
      <h2>Ingredients:</h2>
      <ul>{renderIngredients()}</ul>
    </div>
  );
}

export default Ingredients;
