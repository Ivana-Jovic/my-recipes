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
//Components
import Button from "./components/Button";
//Utils
import { init } from "./utils/database";
import { Colors } from "./utils/colors";

// {/* // todo da li je ugnezdeno kako treba */}

export type RootStackParamList = {
  SignInScreen: undefined;
  Recipes: undefined;
  RecipeDetails: { recipeId: string };
  AddRecipe: undefined;
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
            options={({ navigation }) => ({
              headerBackVisible: false,
              headerRight() {
                return (
                  <Button
                    onPress={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                      navigation.navigate("AddRecipe");
                    }}
                    additionalStyle={{ padding: 3 }}
                  >
                    <Ionicons name="add" size={20} />
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
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </QueryClientProvider>
  );
}
