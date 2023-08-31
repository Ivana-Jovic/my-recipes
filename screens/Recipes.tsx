import React from "react";
import { FlatList, View, StyleSheet, RefreshControl } from "react-native";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQueryClient,
} from "react-query";
import { useUser } from "../store/user";
//Components
import RecipeCard from "../components/RecipeCard";
import ScreenMessage from "../components/ScreenMessage";
//Utils
import { Colors } from "../utils/colors";
import { RecipeDetailsType } from "../utils/types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const fetchRecipes: (page: number) => Promise<RecipeDetailsType[]> = async (
  page,
) => {
  const response = await fetch(`${apiUrl}/recipes-details/?_page=${page}`); // TODO: ne radi na androidu network
  const jsonData = (await response.json()) as RecipeDetailsType[];
  return jsonData;
};

const Recipes: React.FC = () => {
  const queryClient = useQueryClient();
  const user = useUser((state) => state.user);

  const {
    isLoading,
    data,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    isFetching,
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
      },
    );

  const onRefresh = () => {
    queryClient.removeQueries(["recipes"]);
    refetch()
      .then(() => {})
      .catch(() => {});
  };

  if (isLoading && !isFetching) {
    return <ScreenMessage msg="Loading..." />;
  }

  if (isError) {
    return <ScreenMessage msg="Error fetching data" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={data?.pages.flat()}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              isUsersRecpe={item.author === user?.name}
            />
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
          onEndReachedThreshold={0.725} // if greater than this, when calling refetch, all the cards move down and it triggers refetching another page, which is not what is wanted
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
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
