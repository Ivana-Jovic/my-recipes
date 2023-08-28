import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
// import {
//   useInfiniteQuery,
//   UseInfiniteQueryResult,
//   useQueryClient,
//   UseQueryResult,
//   QueryFunctionContext,
//   useQuery,
// } from "react-query";
// //Utils
// import {
//   RecipeType,
//   NavigationProp,
//   ToRecipeDetailsRouteProp,
//   RecipeDetailsType,
//   RecipeDBAllType,
// } from "../utils/types";

// const fetchRecipes: (
//   context: QueryFunctionContext<[string, string]>,
// ) => Promise<RecipeType> = async (context) => {
//   const search = context.queryKey[1];

//   const [recipesResponse, detailsResponse] = await Promise.all([
//     fetch(`http://localhost:3000/recipes-all/${search}`),
//     fetch(`http://localhost:3000/recipes-details?title=${search}`), //todo treba da bude case insensitive
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

const SearchRecipes: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  //   const { isLoading, isError }: UseQueryResult<RecipeType, [string, string]> =
  //     useQuery(["recipes", search], fetchRecipes, {
  //       onSuccess(data) {
  //         console.log(data.id, data.title);
  //         // if (!recentRecipe || recentRecipe?.id !== recipeId) {
  //         // addRecentRecipes(data);
  //         // }
  //       },
  //       // enabled: !recentRecipe || recentRecipe?.id !== recipeId,
  //     });

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <View style={styles.view}>
      <SearchBar
        platform="ios"
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        inputContainerStyle={{ height: 10 }}
        // inputStyle={{ backgroundColor: "white" }}
        // inputContainerStyle={{ margin: 0, padding: 0 }}
        // placeholderTextColor={"#g5g5g5"}
        containerStyle={{
          backgroundColor: "transparent",
          // borderWidth: 1,
          // borderRadius: 5,
          // padding: 0,
          // paddingVertical: 0,
        }}
        style={{ fontSize: 14 }}
      />
    </View>
  );
};

export default SearchRecipes;

const styles = StyleSheet.create({
  view: {
    // margin: 10,
    flex: 1,
    padding: 20,
    // height: 10,
    // width: "80%",
  },
});
