import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import RecipeCard from "../components/RecipeCard";
import { QueryFunctionContext, UseQueryResult, useQuery } from "react-query";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../utils/colors";
import { RecipeType } from "../utils/types";
import { useStore } from "../store/store";
import Title from "../components/Title";

const fetchRecipes: (
  context: QueryFunctionContext<[string, number]>,
) => Promise<RecipeType[]> = async (context) => {
  const page = context.queryKey[1];
  const response = await fetch(`http://localhost:3000/recipes/?_page=${page}`); // TODO: ne radi na androidu
  const jsonData = (await response.json()) as RecipeType[];
  return jsonData;
};

function Recipes() {
  const [page, setPage] = useState<number>(1);
  const recipesContext = useStore((state) => state.recipes);
  const addRecipes = useStore((state) => state.addRecipes);

  const {
    data: recipes,
    isLoading,
    isError,
  }: UseQueryResult<RecipeType[], [string, number]> = useQuery(
    ["recipes", page],
    fetchRecipes,
  );

  useEffect(() => {
    if (recipes) addRecipes(recipes);
  }, [recipes]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <View style={styles.container}>
      <Title>Recipes</Title>
      <View style={styles.list}>
        <FlatList
          data={recipesContext}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => {
            if (recipes?.length !== 0) {
              setPage((prev) => {
                return prev + 1;
              });
            }
          }}
          onEndReachedThreshold={0.5} // todo koja vrednost je ok ovde
        />
      </View>

      {/* <View style={styles.pagination}>
        <Pressable
          disabled={page === 1}
          onPress={() =>
            setPage((prev) => {
              if (prev !== 1) {
                return prev - 1;
              } else return prev;
            })
          }
          style={styles.paginationButton}
        >
          <Ionicons name="remove" />
        </Pressable>
        <Text style={styles.paginationPage}>{page}</Text>
        <Pressable
          disabled={recipes?.length !== 10}
          onPress={() =>
            setPage((prev) => {
              return prev + 1;
            })
          }
          style={styles.paginationButton}
        >
          <Ionicons name="add" />
        </Pressable>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  list: {
    width: "100%",
    flex: 1,
  },
  pagination: {
    flexDirection: "row",
    gap: 10,
    alignSelf: "center",
    marginTop: 15,
  },
  paginationButton: {
    backgroundColor: Colors.lightGrey,
    padding: 5,
    borderRadius: 5,
  },
  paginationPage: {
    fontSize: 20,
  },
});

export default Recipes;
