import React from "react"; // , { useEffect, useState }
import { StatusBar, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
// import AppLoading from "expo-app-loading";
//Screens
import Recipes from "./screens/Recipes";
import SignInScreen from "./screens/SignInScreen";
import RecipeDetails from "./screens/RecipeDetails";
import AddRecipe from "./screens/AddRecipe";
import SearchRecipes from "./screens/SearchRecipes";
//Components
import Button from "./components/Button";
//Utils
import { Colors } from "./utils/colors";
import { NavigationProp } from "./utils/types";
import Modal from "./screens/Modal";
import Favourites from "./screens/Favourites";

export type RootStackParamList = {
  SignInScreen: undefined;
  Recipes: undefined;
  RecipeDetails: { recipeId: string };
  AddRecipe: undefined;
  SearchRecipes: undefined;
  Modal: { recipeId: string };
  Favourites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

export default function App() {
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
                  <View style={{ flexDirection: "row", gap: 20 }}>
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
                    <Button
                      onPress={() => {
                        navigation.navigate("Favourites");
                      }}
                      additionalStyles={{
                        backgroundColor: "transparent",
                        padding: 0,
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons
                        name="star"
                        size={20}
                        style={{
                          color: "black",
                        }}
                      />
                    </Button>
                  </View>
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
            options={{
              headerTitle: "Search for a recipe",
            }}
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
          <Stack.Screen
            name="Favourites"
            component={Favourites}
            options={{ headerTitle: "Favourite recipes" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </QueryClientProvider>
  );
}
