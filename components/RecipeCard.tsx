import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../utils/colors";
import { RecipeDetailsType } from "../utils/types";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "RecipeDetails">;
type RecipeDetailsScreenNavigationProp = Props["navigation"];

interface RecipeCardProps {
  recipe: RecipeDetailsType;
}

function RecipeCard(props: RecipeCardProps) {
  const { recipe } = props;
  const navigation = useNavigation<RecipeDetailsScreenNavigationProp>();

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        navigation.navigate("RecipeDetails", { recipeId: recipe.id + "" })
      }
    >
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardColor,
    padding: 15,
    paddingRight: 20,
    minHeight: 100,
    flexDirection: "row",
    marginVertical: 10,
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
    justifyContent: "space-between",
  },
  detailsItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});

export default RecipeCard;
