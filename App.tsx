import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import Recipes from "./screens/Recipes";
import SignInScreen from "./screens/SignInScreen";
import RecipeDetails from "./screens/RecipeDetails";
import AddRecipe from "./screens/AddRecipe";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import Button from "./components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { init } from "./utils/database";
import AppLoading from "expo-app-loading";

// const Drawer = createDrawerNavigator();

// {/* // todo da li je ugnezdeno kako treba */}

export type RootStackParamList = {
  SignInScreen: undefined;
  Recipes: undefined;
  RecipeDetails: { recipeId: string };
  AddRecipe: undefined;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const Stack = createNativeStackNavigator<RootStackParamList>(); // todo Zasto ovo ne radi (bez linije iznad)

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
        <Stack.Navigator>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen
            name="Recipes"
            component={Recipes}
            options={({ navigation }) => ({
              headerRight() {
                return (
                  <Button
                    onPress={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                      navigation.navigate("AddRecipe");
                    }}
                  >
                    <Ionicons name="add" />
                  </Button>
                );
              },
            })}
          />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
          <Stack.Screen name="AddRecipe" component={AddRecipe} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </QueryClientProvider>
  );
}
