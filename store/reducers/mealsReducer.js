import { createReducer } from "../../common/util/reducerUtil";

import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVOURITE, SET_FILTERS } from "../constants/mealConstants";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favouriteMeals: [],
};

const toggleFavourite = (state, payload) => {
  const existingIndex = state.favouriteMeals.findIndex(
    (meal) => meal.id === payload.mealId
  );
  if (existingIndex >= 0) {
    const updatedFavMeals = [...state.favouriteMeals];
    updatedFavMeals.splice(existingIndex, 1);
    return {
      ...state,
      favouriteMeals: updatedFavMeals,
    };
  } else {
    const meal = state.meals.find((meal) => meal.id === payload.mealId);
    return {
      ...state,
      favouriteMeals: state.favouriteMeals.concat(meal),
    };
  }
};

const setFilters = (state, payload) => {
  console.log(payload.filters);
  const appliedFilters = payload.filters;
  const filteredMeals = state.meals.filter((meal) => {
    if (appliedFilters.glutenFree && !meal.isGlutenFree) {
      return false;
    }
    if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
      return false;
    }
    if (appliedFilters.vegan && !meal.isVegan) {
      return false;
    }
    if (appliedFilters.vegetarian && !meal.isVegetarian) {
      return false;
    }

    return true;
  });

  return {
    ...state,
    filteredMeals: filteredMeals,
  };
};

export default createReducer(initialState, {
  [TOGGLE_FAVOURITE]: toggleFavourite,
  [SET_FILTERS]: setFilters,
});
