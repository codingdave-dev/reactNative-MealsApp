import React, {useCallback, useEffect} from "react";

import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import DefaultText from "../components/DefaultText";
import {connect} from "react-redux";
import {toggleFavourite} from "../store/actions/mealsActions";

const mapStateToProps = (state) => {
  return {
    meals: state.meals.meals,
    favouriteMeals: state.meals.favouriteMeals
  }
}

const actions = {
  toggleFavourite
}

const MealDetailScreen = (props) => {
  const {toggleFavourite} = props
  const mealId = props.navigation.getParam("mealId");
  const availableMeals = props.meals
  const favouriteMeals = props.favouriteMeals

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const isFavourite = favouriteMeals.some(meal => meal.id === mealId)

  const handleToggleFavourite = useCallback(() => {
    // DISPATCH
    toggleFavourite(selectedMeal.id)
  }, [toggleFavourite, mealId])

  useEffect(() => {
    props.navigation.setParams({toggleFav: handleToggleFavourite, isFavourite: isFavourite})
  }, [handleToggleFavourite, isFavourite])



  const ListItem = (props) => {
    return (
      <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
      </View>
    );
  };
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.mealDetail}>
        {/*DEFAULT TEXT USES CUSTOM TEXT COMPONENT*/}
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity}</DefaultText>
        <DefaultText>{selectedMeal.affordability}</DefaultText>
      </View>

      <Text style={styles.title}>Ingredients</Text>

      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}

      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const toggleFavourite = navigationData.navigation.getParam('toggleFav')
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const favourite = navigationData.navigation.getParam("isFavourite");


  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title={"Favourite"}
          iconName={favourite ? 'ios-star' : "ios-star-outline"}
          onPress={toggleFavourite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  mealDetail: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    fontFamily: "open-sans",
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default connect(mapStateToProps, actions)(MealDetailScreen);
