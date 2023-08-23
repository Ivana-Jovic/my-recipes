import React from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useStore } from "../store/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryFunctionContext, UseQueryResult, useQuery } from "react-query";
//Components
import Title from "../components/Title";
//Utils
import { RecipeType } from "../utils/types";

type Props = NativeStackScreenProps<RootStackParamList, "RecipeDetails">;

type RecipeDetailsScreenRouteProp = Props["route"];

const fetchRecipes: (
  context: QueryFunctionContext<[string, number]>,
) => Promise<RecipeType> = async (context) => {
  const id = context.queryKey[1];
  const response = await fetch(`http://localhost:3000/recipes/${id}`);
  const jsonData = (await response.json()) as RecipeType;
  return jsonData;
};

function RecipeDetails() {
  const router = useRoute<RecipeDetailsScreenRouteProp>();
  const recipeId = parseInt(router.params.recipeId);

  const addRecentRecipes = useStore((state) => state.addRecentRecipes);
  const recentRecipe = useStore((state) => state.recentRecipe);

  const { isLoading, isError }: UseQueryResult<RecipeType, [string, number]> =
    useQuery(["recipes", recipeId], fetchRecipes, {
      // todo nema poente jer imamo u kontekstu
      onSuccess(data) {
        if (!recentRecipe || recentRecipe?.id !== recipeId) {
          addRecentRecipes(data);
        }
      },
      enabled: !recentRecipe || recentRecipe?.id !== recipeId,
    });

  if (!recentRecipe) {
    return <Text>-{recipeId}Loading...</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title>{recentRecipe.title}</Title>
        <Image
          //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-assignment
          source={require("../assets/pasta.jpeg")}
          style={styles.image}
        />
        <View style={styles.innerContainer}>
          <View style={styles.details}>
            <View style={styles.detailsItem}>
              <Ionicons name="timer-outline" />
              <Text>{recentRecipe.cookTime}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Ionicons name="ios-analytics" />
              <Text>{recentRecipe.difficulty}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Ionicons name="person-outline" />
              <Text>{recentRecipe.author}</Text>
            </View>
          </View>
          <Text>{recentRecipe.description}</Text>
          <View style={styles.ingredients}>
            {recentRecipe.ingredients?.map((ingredient) => (
              <Text key={ingredient}>- {ingredient}</Text>
            ))}
          </View>
          <Text>{recentRecipe.instructions}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    gap: 10,
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    gap: 10,
  },
  image: {
    width: "100%",
    height: 200,
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
  ingredients: {
    gap: 7,
  },
});
