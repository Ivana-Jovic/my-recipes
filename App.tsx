import React from "react";
// import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, StatusBar, Text } from "react-native";
import Recipes from "./screens/Recipes";
import { Colors } from "./utils/colors";
import SignInScreen from "./screens/SignInScreen";
import RecipeDetails from "./screens/RecipeDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export type RootStackParamList = {
  SignInScreen: undefined;
  Recipes: undefined;
  RecipeDetails: { recipeId: string };
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const Stack = createNativeStackNavigator<RootStackParamList>(); // todo Zasto ovo ne radi (bez linije iznad)

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="SignInScreen" component={SignInScreen} /> */}
          <Stack.Screen name="Recipes" component={Recipes} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </QueryClientProvider>
  );
}
//
{
  /* <SafeAreaView style={styles.container}> </SafeAreaView>*/
}
//  {/* <Recipes />
//     <Text>hi</Text>
//     {/* <SignInScreen /> */}
// {/* // todo da li je ugnezdeno kako treba */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10, //Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
