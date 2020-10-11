import React from "react";

import MealList from "../components/MealList";
import {View, Text, StyleSheet} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

import {connect} from "react-redux";
import DefaultText from "../components/DefaultText";

const mapStateToProps = (state) => {
    return {
        meals: state.meals.favouriteMeals
    }
}

const FavouritesScreen = (props) => {
    const favouriteMeals = props.meals

    if (favouriteMeals.length === 0 || !favouriteMeals) {
        return <View style={styles.screen}><DefaultText>No Favourite Meals Found</DefaultText></View>
    }
  return <MealList listData={favouriteMeals} navigation={props.navigation} />;
};

FavouritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Favourite Meals",
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
              title={"Menu Icon"}
              iconName={"ios-menu"}
              onPress={() => {
                navData.navigation.toggleDrawer()
              }}
          />
        </HeaderButtons>
    ),
  }

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

});

export default connect(mapStateToProps)(FavouritesScreen);
