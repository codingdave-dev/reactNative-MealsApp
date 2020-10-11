import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { enableScreens } from "react-native-screens";

// FONTS
import * as Font from "expo-font";
// // APP LOADING
import { AppLoading } from "expo";
import MealsNavigator from "./navigation/MealsNavigator";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./store/store";


enableScreens();


export default function App() {
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }



  return (
    <Provider store={store}>

      <NavigationContainer>
        <MealsNavigator />
      </NavigationContainer>

    </Provider>
  );
}

const styles = StyleSheet.create({});
