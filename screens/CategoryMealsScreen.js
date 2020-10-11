import React from "react";

import {StyleSheet, View} from 'react-native'
import { CATEGORIES} from "../data/dummy-data";
import MealList from "../components/MealList";
import {connect} from "react-redux";
import DefaultText from "../components/DefaultText";

const mapStateToProps = (state) => {
  return {
    meals: state.meals.filteredMeals
  }
}

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");
  const availableMeals = props.meals

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return <View style={styles.screen}><DefaultText>No Meals found</DefaultText></View>
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;

};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default connect(mapStateToProps)(CategoryMealsScreen);
