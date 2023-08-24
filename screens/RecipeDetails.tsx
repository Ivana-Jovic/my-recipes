import React, { useLayoutEffect } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useStore } from "../store/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryFunctionContext, UseQueryResult, useQuery } from "react-query";
//Components
import Carousel from "../components/Carousel";
//Utils
import { RecipeType } from "../utils/types";
import ScreenMessage from "../components/ScreenMessage";

type Props = NativeStackScreenProps<RootStackParamList, "RecipeDetails">;

type RecipeDetailsScreenRouteProp = Props["route"];
type RecipeDetailsScreenNavigationProp = Props["navigation"];

const fetchRecipes: (
  context: QueryFunctionContext<[string, number]>,
) => Promise<RecipeType> = async (context) => {
  const id = context.queryKey[1];
  const response = await fetch(`http://localhost:3000/recipes/${id}`);
  const jsonData = (await response.json()) as RecipeType;
  return jsonData;
};

function RecipeDetails() {
  const navigation = useNavigation<RecipeDetailsScreenNavigationProp>();
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: recentRecipe?.title,
    });
  }, [navigation, recentRecipe]);

  if (!recentRecipe) {
    return <ScreenMessage msg={"Loading..."} />;
  }

  if (isLoading) {
    return <ScreenMessage msg={"Loading..."} />;
  }

  if (isError) {
    return <ScreenMessage msg={"Error fetching data"} />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: "data:image/jpeg;base64," + recentRecipe.pictures[0] }}
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
          <View style={styles.section}>
            <Text style={styles.subtitle}>Description</Text>
            <Text>{recentRecipe.description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Ingredients</Text>
            <View style={styles.ingredients}>
              {recentRecipe.ingredients?.map((ingredient) => (
                <Text key={ingredient}>- {ingredient}</Text>
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Instructions</Text>
            <Text>{recentRecipe.instructions}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>All images</Text>
          <Carousel images={recentRecipe.pictures} />
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
  section: {
    gap: 7,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "500",
  },
});
