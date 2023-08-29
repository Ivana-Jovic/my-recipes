import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet, RefreshControl } from "react-native";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQueryClient,
} from "react-query";
import { useStore } from "../store/store";
//Components
import RecipeCard from "../components/RecipeCard";
import ScreenMessage from "../components/ScreenMessage";
//Utils
import { Colors } from "../utils/colors";
import { RecipeDetailsType, User } from "../utils/types";
import { useUser } from "../store/user";

const fetchRecipes: (page: number) => Promise<RecipeDetailsType[]> = async (
  page,
) => {
  const response = await fetch(
    `http://localhost:3000/recipes-details/?_page=${page}`,
  ); // TODO: ne radi na androidu network
  const jsonData = (await response.json()) as RecipeDetailsType[];
  return jsonData;
};

const Recipes: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const recipesContext = useStore((state) => state.recipes);
  const addRecipes = useStore((state) => state.addRecipes);
  const clearRecipes = useStore((state) => state.clearRecipes);

  const users = useUser((state) => state.users);

  const {
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
  }: UseInfiniteQueryResult<RecipeDetailsType[], [string, number]> =
    useInfiniteQuery(
      "recipes",
      ({ pageParam = 1 }) => fetchRecipes(pageParam as number),
      {
        getNextPageParam: (lastPage, allPages): number | undefined => {
          const nextPage =
            lastPage.length === 10 ? allPages.length + 1 : undefined;
          return nextPage;
        },
        onSuccess(data) {
          const tmpRcipes = data.pages[data.pages.length - 1];
          addRecipes(tmpRcipes);
        },
      },
    );

  const onRefresh = () => {
    setRefreshing(true);
    queryClient.removeQueries(["recipes"]);
    clearRecipes();
    refetch()
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (users.length !== 0) setUser((users[0] as User).name); // todo ovaj use eff nema poente, u storu moze da bude i sa,o jedan user, onda nema potrebe za set user i ovim useeff
  }, []);

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
          renderItem={({ item }) => (
            <RecipeCard recipe={item} isUsersRecpe={item.author === user} />
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage()
                .then(() => {})
                .catch(() => {});
            }
          }}
          // formula: wholeList.len - ( threshold * visibleElem.len )-> 10-(x*6)
          onEndReachedThreshold={0.8}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

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
