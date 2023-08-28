import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
//Utils
import { Colors } from "../utils/colors";
import { RecipeDetailsType, NavigationProp } from "../utils/types";

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
        navigation.navigate("RecipeDetails", { recipeId: recipe.id + "" })
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
          <View style={[styles.detailsItem, { flex: 1 }]}>
            <Ionicons name="person-outline" />
            <Text style={styles.detailsItemText}>{recipe.author}</Text>
          </View>
          <View style={styles.details}>
            <View style={styles.detailsItem}>
              <Ionicons name="timer-outline" />
              <Text style={styles.detailsItemText}>{recipe.cookTime}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Ionicons name="ios-analytics" />
              <Text style={styles.detailsItemText}>{recipe.difficulty}</Text>
            </View>
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
  detailsItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  detailsItemText: {
    fontSize: 12,
  },
});

export default RecipeCard;
