import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
//Utils
import { Colors } from "../utils/colors";
import { RecipeDetailsType, NavigationProp } from "../utils/types";
import DetailItem from "./DetailItem";

interface RecipeCardProps {
  recipe: RecipeDetailsType;
}

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  const { recipe } = props;
  const navigation = useNavigation<NavigationProp>();

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
        <Text style={styles.title}>{recipe.title}</Text>
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
    flex: 1,
  },
});

export default RecipeCard;
