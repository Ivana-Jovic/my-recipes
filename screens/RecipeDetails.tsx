import React, { useLayoutEffect } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useStore } from "../store/store";
import { UseQueryResult, useQuery } from "react-query";
//Components
import Carousel from "../components/Carousel";
import ScreenMessage from "../components/ScreenMessage";
import DetailItem from "../components/DetailItem";
//Utils
import {
  RecipeType,
  NavigationProp,
  ToRecipeDetailsRouteProp,
  // RecipeDetailsType,
  // RecipeDBAllType,
} from "../utils/types";
import { fetchRecipesById } from "../utils/fetchRecipesById";

// const fetchRecipes: (
//   context: QueryFunctionContext<[string, number]>,
// ) => Promise<RecipeType> = async (context) => {
//   const id = context.queryKey[1]; // details id from the card

//   const [recipesResponse, detailsResponse] = await Promise.all([
//     fetch(`http://localhost:3000/recipes-all/${id}`),
//     fetch(`http://localhost:3000/recipes-details/${id}`),
//   ]);

//   const [recipesData, detailsData] = await Promise.all([
//     recipesResponse.json() as Promise<RecipeDBAllType>,
//     detailsResponse.json() as Promise<RecipeDetailsType>,
//   ]);

//   const combinedData = {
//     ...recipesData,
//     ...detailsData,
//     pictures: recipesData.pictures,
//   };
//   return combinedData;
// };

const RecipeDetails: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const router = useRoute<ToRecipeDetailsRouteProp>();
  const recipeId = parseInt(router.params.recipeId);

  const addRecentRecipes = useStore((state) => state.addRecentRecipes);
  const recentRecipe = useStore((state) => state.recentRecipe);

  const { isLoading, isError }: UseQueryResult<RecipeType, [string, number]> =
    useQuery(["recipes", recipeId], fetchRecipesById, {
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

  if (!recentRecipe || isLoading) {
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
            <DetailItem
              icon={"timer-outline"}
              text={recentRecipe.cookTime.toString()}
            />
            <DetailItem
              icon={"ios-analytics"}
              text={recentRecipe.difficulty.toString()}
            />
            <DetailItem
              icon={"person-outline"}
              text={recentRecipe.author.toString()}
            />
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
};

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
