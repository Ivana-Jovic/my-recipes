import React, { useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import RecipeCard from "../components/RecipeCard";
import { QueryFunctionContext, UseQueryResult, useQuery } from "react-query";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface RecipeProp {
  title: string;
  picture: string;
  description: string;
  cookTime: number;
  author: string;
  difficulty: number;
  id: number;
}
const fetchRecipes: (
  context: QueryFunctionContext<[string, number]>,
) => Promise<RecipeProp[]> = async (context) => {
  const page = context.queryKey[1];
  const response = await fetch(`http://localhost:3000/recipes/?_page=${page}`); // TODO: ne radi na androidu
  const jsonData = (await response.json()) as RecipeProp[];
  return jsonData;
};
function Recipes() {
  const [page, setPage] = useState<number>(1);

  const {
    data: recipes,
    isLoading,
    isError, // error,
  }: UseQueryResult<RecipeProp[], [string, number]> = useQuery(
    ["recipes", page],
    fetchRecipes,
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>a</Text>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.pagination}>
        <Ionicons
          name="remove"
          disabled={page === 1}
          onPress={() =>
            setPage((prev) => {
              if (prev !== 1) {
                return prev - 1;
              } else return prev;
            })
          }
        />
        <Text>{page}</Text>
        <Ionicons
          name="add"
          disabled={recipes?.length !== 10}
          onPress={() =>
            setPage((prev) => {
              return prev + 1;
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ccc",
    // padding: 10,
    width: "100%",
    // minHeight: 100,
    // flexDirection: "row",
    // alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    gap: 10,
  },
});

export default Recipes;
