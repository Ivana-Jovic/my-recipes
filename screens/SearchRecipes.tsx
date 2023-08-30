import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { View, StyleSheet, ScrollView } from "react-native";
import { searchRecipes } from "../utils/functions/searchRecipes";
import { UseQueryResult, useQuery } from "react-query";
import { useDebounce } from "@uidotdev/usehooks";
// //Utils
import { RecipeDetailsType } from "../utils/types";
import RecipeCard from "../components/RecipeCard";
import { useUser } from "../store/user";
import ScreenMessage from "../components/ScreenMessage";

const SearchRecipes: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);

  const user = useUser((state) => state.user);

  const {
    isLoading,
    isError,
    data,
  }: UseQueryResult<RecipeDetailsType[], [string, string]> = useQuery(
    ["recipes", debouncedSearchTerm],
    searchRecipes,
  );

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  if (isLoading) {
    return <ScreenMessage msg="Loading..." />;
  }

  if (isError) {
    return <ScreenMessage msg="Error fetching data" />;
  }
  return (
    <View style={styles.view}>
      {/* //todo search bar izgubi fokus */}
      <SearchBar
        platform="ios"
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        inputContainerStyle={{ height: 10 }}
        containerStyle={{
          backgroundColor: "transparent",
          marginBottom: 10,
        }}
        style={{ fontSize: 14 }}
      />
      <ScrollView>
        {data?.map((fav) => (
          <RecipeCard
            key={fav.id}
            recipe={fav}
            isUsersRecpe={fav.author === user?.name}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchRecipes;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
  },
});
