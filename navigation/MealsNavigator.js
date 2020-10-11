import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createCompatNavigatorFactory } from "@react-navigation/compat";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import { Platform, Text } from "react-native";
import Colors from "../constants/Colors";
import FavouritesScreen from "../screens/FavouritesScreen";
import { Ionicons } from "@expo/vector-icons";
import FiltersScreen from "../screens/FiltersScreen";

// STACK NAVIGATORS
const defaultStackOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor:
        Platform.OS === "android" ? Colors.primaryColor : "white",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerBackTitleStyle: {
      fontFamily: "open-sans",
    },
  },
};

const MealsNavigator = createCompatNavigatorFactory(createStackNavigator)(
  {
    Categories: { screen: CategoriesScreen },
    CategoryMeals: { screen: CategoryMealsScreen },
    MealDetail: { screen: MealDetailScreen },
  },
  defaultStackOptions
);

const FavouritesNavigator = createCompatNavigatorFactory(createStackNavigator)(
  {
    Favourites: { screen: FavouritesScreen },
    MealDetail: { screen: MealDetailScreen },
  },
  defaultStackOptions
);

const FiltersNavigator = createCompatNavigatorFactory(createStackNavigator)(
  {
    Filters: { screen: FiltersScreen },
  },
  defaultStackOptions
);

// TAB NAVIGATOR
const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name={"ios-restaurant"} size={25} color={tabInfo.color} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        ),
    },
  },
  Favourites: {
    screen: FavouritesNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name={"ios-star"} size={25} color={tabInfo.color} />;
      },
      tabBarColor: Colors.secondaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favourites</Text>
        ) : (
          "Favourites"
        ),
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createCompatNavigatorFactory(createMaterialBottomTabNavigator)(
        tabScreenConfig,
        {
          activeColor: "white",
          shifting: true,
        }
      )
    : createCompatNavigatorFactory(createBottomTabNavigator)(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.secondaryColor,
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
        },
      });

// DRAWER NAVIGATOR
const DrawerNavigator = createCompatNavigatorFactory(createDrawerNavigator)(
  {
    MealFavourites: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Filters: FiltersNavigator,
  },
  {
    drawerContentOptions: {
      activeTintColor: Colors.secondaryColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);

export default DrawerNavigator;
