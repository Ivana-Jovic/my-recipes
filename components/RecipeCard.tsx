import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
//Utils
import { Colors } from "../utils/colors";
import { RecipeDetailsType, NavigationProp } from "../utils/types";
import DetailItem from "./DetailItem";
import Button from "./Button";

interface RecipeCardProps {
  recipe: RecipeDetailsType;
  isUsersRecpe: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  const { recipe, isUsersRecpe } = props;
  const navigation = useNavigation<NavigationProp>();

  const addToFavourites = () => {};

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("RecipeDetails", { recipeId: recipe.id.toString() })
      }
    >
      <Image
        source={{ uri: "data:image/jpeg;base64," + recipe.pictures[0] }}
        style={styles.image}
      />
      <View style={styles.containerRight}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{recipe.title}</Text>
          {isUsersRecpe && (
            <Button
              onPress={() => {
                navigation.navigate("Modal", {
                  recipeId: recipe.id.toString(),
                });
              }}
              additionalStyles={{
                backgroundColor: "transparent",
                padding: 0,
              }}
            >
              <Ionicons
                name="create-outline"
                size={15}
                style={{ color: Colors.textGrey }}
              />
            </Button>
          )}
        </View>
        <Text style={styles.description}>
          {recipe.description.slice(0, 55)}...
        </Text>
        <View style={styles.details}>
          <DetailItem
            icon={"person-outline"}
            text={recipe.author}
            additionalStyles={{ flex: 1 }}
          />
          <View style={styles.details}>
            <DetailItem
              icon={"timer-outline"}
              text={recipe.cookTime.toString()}
            />
            <DetailItem
              icon={"ios-analytics"}
              text={recipe.difficulty.toString()}
            />
            <Button
              onPress={addToFavourites}
              additionalStyles={{
                backgroundColor: "transparent",
                padding: 0,
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="star-outline"
                size={15}
                style={{ color: Colors.textGrey }}
              />
            </Button>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardColor,
    padding: 10,
    paddingRight: 20,
    minHeight: 100,
    flexDirection: "row",
    marginVertical: 10,
    flex: 1,
    width: "100%",
    gap: 20,
    borderRadius: 7,
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
    borderRadius: 7,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
  },
  description: {
    color: Colors.textGrey,
  },
  details: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
    justifyContent: "space-between",
    flex: 1.2,
  },
});

export default RecipeCard;
