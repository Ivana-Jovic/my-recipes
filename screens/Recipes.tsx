import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import {
  QueryFunctionContext,
  UseQueryResult,
  useQuery,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "react-query";
import { useStore } from "../store/store";
//Components
import RecipeCard from "../components/RecipeCard";
import Title from "../components/Title";
import ScreenMessage from "../components/ScreenMessage";
//Utils
import { Colors } from "../utils/colors";
import { RecipeType } from "../utils/types";

const fetchRecipes: (
  page: number,
  // context: QueryFunctionContext<[string, number]>,
) => Promise<RecipeType[]> = async (
  page,
  // context
) => {
  // const page = context.queryKey[1];
  const response = await fetch(`http://localhost:3000/recipes/?_page=${page}`); // TODO: ne radi na androidu
  const jsonData = (await response.json()) as RecipeType[];
  console.log(page);
  return jsonData;
};

function Recipes() {
  // const [page, setPage] = useState<number>(1);
  const [pageChanged, setPageChanged] = useState<boolean>(false);

  const recipesContext = useStore((state) => state.recipes);
  const addRecipes = useStore((state) => state.addRecipes);

  // const {
  //   data: recipes,
  //   isLoading,
  //   isError,
  //   refetch,
  //   hasNextPage,
  //   fetchNextPage,
  //   isFetchingNextPage,
  // }: UseQueryResult<RecipeType[], [string, number]> =
  // useQuery(
  //   ["recipes", page],
  //   fetchRecipes,
  //   {
  //     onSuccess(data) {
  //   if (recipesContext.length === 0 || pageChanged) {
  //     addRecipes(data);
  //   }
  // },
  //   },
  // );
  const {
    data: recipes,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }: UseInfiniteQueryResult<RecipeType[], [string, number]> = useInfiniteQuery(
    "todos",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    ({ pageParam = 1 }) => fetchRecipes(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.length === 10 ? allPages.length + 1 : undefined;
        return nextPage;
      },
      onSuccess(data) {
        console.log("okk");
        addRecipes(data.pages[data.pages.length - 1]);
        console.log(
          " addRecipes(data.pages[data.pages.length - 1])",
          data.pages[0].length,
        );
        data.pages[data.pages.length - 1].forEach((element) => {
          console.log(-element.id);
        });
      },
    },
  );

  if (isLoading) {
    return <ScreenMessage msg="Loading..." />;
  }

  if (isError) {
    return <ScreenMessage msg="Error fetching data" />;
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
            console.log("before setPageChanged(true);");
            // if (recipes?.length !== 0) {
            //   // setPage((prev) => {
            //   //   return prev + 1;
            //   // });

            //   setPageChanged(true);
            //   console.log("setPageChanged(true);");r
            // }
            if (hasNextPage) {
              fetchNextPage()
                .then(() => {
                  console.log("hasNextPage-fetchNextPage");
                })
                .catch(() => {});
            }
          }}
          onEndReachedThreshold={0.5} // todo koja vrednost je ok ovde
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
