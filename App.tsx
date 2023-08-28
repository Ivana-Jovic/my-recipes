import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppLoading from "expo-app-loading";
//Screens
import Recipes from "./screens/Recipes";
import SignInScreen from "./screens/SignInScreen";
import RecipeDetails from "./screens/RecipeDetails";
import AddRecipe from "./screens/AddRecipe";
import SearchRecipes from "./screens/SearchRecipes";
//Components
import Button from "./components/Button";
//Utils
import { init } from "./utils/database";
import { Colors } from "./utils/colors";
import { NavigationProp, RecipeType } from "./utils/types";
import Modal from "./screens/Modal";

export type RootStackParamList = {
  SignInScreen: undefined;
  Recipes: undefined;
  RecipeDetails: { recipeId: string };
  AddRecipe: undefined;
  SearchRecipes: undefined;
  Modal: { recipeId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

export default function App() {
  const [dbInitialized, setdbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setdbInitialized(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!dbInitialized) {
    <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: Colors.primary,
              paddingBottom: 20,
            },
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: "500",
            },
          }}
        >
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{ headerTitle: "Sign in" }}
          />
          <Stack.Screen
            name="Recipes"
            component={Recipes}
            options={({ navigation }: { navigation: NavigationProp }) => ({
              headerBackVisible: false,
              headerLeft() {
                return (
                  <Button
                    onPress={() => {
                      navigation.navigate("AddRecipe");
                    }}
                    additionalStyles={{ padding: 3 }}
                  >
                    <Ionicons name="add" size={20} />
                  </Button>
                );
              },
              headerRight() {
                return (
                  <Button
                    onPress={() => {
                      navigation.navigate("SearchRecipes");
                    }}
                    additionalStyles={{
                      padding: 3,
                      backgroundColor: "transparent",
                    }}
                  >
                    <Ionicons
                      name="search"
                      size={20}
                      style={{ color: Colors.textGrey }}
                    />
                  </Button>
                );
              },
            })}
          />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
          <Stack.Screen
            name="AddRecipe"
            component={AddRecipe}
            options={{ headerTitle: "Add a recipe" }}
          />
          <Stack.Screen
            name="SearchRecipes"
            component={SearchRecipes}
            options={({ navigation }: { navigation: NavigationProp }) => ({
              headerTitle: "Search for a recipe", //() => <Search></Search>,
              // headerRight() {
              //   return (
              //     <Button
              // onPress={() => {
              //   navigation.navigate("Modal");
              // }}
              //       additionalStyles={{
              //         padding: 3,
              //         backgroundColor: "transparent",
              //       }}
              //     >
              //       <Ionicons
              //         name="search"
              //         size={20}
              //         style={{ color: Colors.textGrey }}
              //       />
              //     </Button>
              //   );
              // },
            })}
          />
          <Stack.Screen
            name="Modal"
            component={Modal}
            options={({ navigation }: { navigation: NavigationProp }) => ({
              presentation: "modal",
              // headerShown: false,
              headerTitle: "",
              headerRight: () => (
                <Ionicons
                  name="close"
                  size={30}
                  color="black"
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 10 }}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </QueryClientProvider>
  );
}
