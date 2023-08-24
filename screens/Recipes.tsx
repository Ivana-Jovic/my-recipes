import React, { useState } from "react";
import { FlatList, View, StyleSheet, RefreshControl } from "react-native";
import {
  QueryFunctionContext,
  UseQueryResult,
  useQuery,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  QueryClient,
  useQueryClient,
} from "react-query";
import { useStore } from "../store/store";
//Components
import RecipeCard from "../components/RecipeCard";
// import Title from "../components/Title";
import ScreenMessage from "../components/ScreenMessage";
//Utils
import { Colors } from "../utils/colors";
import { RecipeType } from "../utils/types";

const fetchRecipes: (page: number) => Promise<RecipeType[]> = async (page) => {
  const response = await fetch(`http://localhost:3000/recipes/?_page=${page}`); // TODO: ne radi na androidu
  const jsonData = (await response.json()) as RecipeType[];
  console.log(page);
  return jsonData;
};

function Recipes() {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const recipesContext = useStore((state) => state.recipes);
  const addRecipes = useStore((state) => state.addRecipes);
  const clearRecipes = useStore((state) => state.clearRecipes);

  const {
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
  }: UseInfiniteQueryResult<RecipeType[], [string, number]> = useInfiniteQuery(
    "recipes",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    ({ pageParam = 1 }) => fetchRecipes(pageParam),
    {
      getNextPageParam: (lastPage, allPages): number | undefined => {
        console.log("in getNextPageParam");
        const nextPage =
          lastPage.length === 10 ? allPages.length + 1 : undefined;
        return nextPage;
      },
      onSuccess(data) {
        console.log("okk", data.pages[0][0].id);
        const tmpRcipes = data.pages[data.pages.length - 1];
        addRecipes(tmpRcipes);
        console.log(
          " addRecipes(data.pages[data.pages.length - 1])",
          data.pages[0].length,
        );
        tmpRcipes.forEach((element) => {
          console.log(-element.id);
        });
      },
    },
  );

  const onRefresh = () => {
    setRefreshing(true);
    console.log("setCalledRefetch(2);");
    queryClient.removeQueries(["recipes"]);
    clearRecipes();
    refetch()
      .then(() => {
        setRefreshing(false);
        console.log("setCalledRefetch(1);");
      })
      .catch(() => {});
  };

  if (isLoading) {
    return <ScreenMessage msg="Loading..." />;
  }

  if (isError) {
    return <ScreenMessage msg="Error fetching data" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={recipesContext}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => {
            console.log("before setPageChanged(true);");
            if (hasNextPage) {
              fetchNextPage()
                .then(() => {
                  console.log("hasNextPage-fetchNextPagee");
                })
                .catch(() => {});
            }
          }}
          onEndReachedThreshold={0.5} // todo koja vrednost je ok ovde
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
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
