import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { RecipeProp } from "../screens/Recipes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../utils/colors";

interface RecipeCardProps {
  recipe: RecipeProp;
}
function RecipeCard(props: RecipeCardProps) {
  const { recipe } = props;
  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment*/}
      <Image source={require("../assets/pasta.jpeg")} style={styles.image} />
      <View style={styles.containerRight}>
        <Text>{recipe.title}</Text>
        <Text>{recipe.description}</Text>
        <View style={styles.details}>
          <View style={styles.detailsItem}>
            <Ionicons name="timer-outline" />
            <Text>{recipe.cookTime}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Ionicons name="ios-analytics" />
            <Text>{recipe.difficulty}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Ionicons name="person-outline" />
            <Text>{recipe.author}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardColor,
    padding: 20,
    minHeight: 100,
    flexDirection: "row",
    margin: 10,
    flex: 1,
    width: "100%",
    gap: 20,
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
    gap: 15,
    width: "100%",
  },
  detailsItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});

export default RecipeCard;
