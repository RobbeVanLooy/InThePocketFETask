import React from "react";
//import logo from "./logo.svg";
import { useQuery } from "graphql-hooks";
//import { Image } from "react-datocms";
import "./App.css";

const RECIPE_QUERY = `query Recipe {
  allRecipes {
    title
    recipeimage {
      alt
      filename
    }
    description
    externallink
    recipeingredients {
      item
      amount
      unit
    }
  }
}`;

function App() {
  const { loading, error, data } = useQuery(RECIPE_QUERY);

  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";

  return (
    <div>
      {JSON.stringify(data)}
      {data.allRecipes.map((recipe) => (
        <article>
          <h2>{recipe.title}</h2>
          <p>{recipe.recipeimage.filename}</p>
          <p>{recipe.description}</p>
          <p>{recipe.externallink}</p>
          {recipe.recipeingredients.map((ingredient) => (
            <p>
              {ingredient.item} {ingredient.amount} {ingredient.unit}
            </p>
          ))}
        </article>
      ))}
    </div>
  );
}

export default App;
