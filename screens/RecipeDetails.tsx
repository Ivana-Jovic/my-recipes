import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { RecipeType } from "../utils/types";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useStore } from "../store/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";

type Props = NativeStackScreenProps<RootStackParamList, "RecipeDetails">;

type RecipeDetailsScreenRouteProp = Props["route"];

function RecipeDetails() {
  const router = useRoute<RecipeDetailsScreenRouteProp>();
  const recipeId = parseInt(router.params.recipeId);
  const recipesContext = useStore((state) => state.recipes);
  const currRecipe = recipesContext.find(
    (recipe: RecipeType) => recipe.id === recipeId,
  );

  if (!currRecipe) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Title:{currRecipe?.title}</Text> */}
      <Title>{currRecipe.title}</Title>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-assignment */}
      <Image source={require("../assets/pasta.jpeg")} style={styles.image} />
      <View style={styles.containerRight}>
        <View style={styles.details}>
          <View style={styles.detailsItem}>
            <Ionicons name="timer-outline" />
            <Text>{currRecipe.cookTime}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Ionicons name="ios-analytics" />
            <Text>{currRecipe.difficulty}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Ionicons name="person-outline" />
            <Text>{currRecipe.author}</Text>
          </View>
        </View>
        <Text>{currRecipe.description}</Text>
        {/* //sastojci */}
      </View>
    </View>
  );
}

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.cardColor,
    padding: 20,
    minHeight: 100,
    flex: 1,
    width: "100%",
    gap: 20,
    alignItems: "center",
  },
  containerRight: {
    flex: 2,
    width: "100%",
    gap: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  details: {
    flexDirection: "row",
    gap: 35,
    width: "100%",
  },
  detailsItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
