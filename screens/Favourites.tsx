import React from "react";
import { View, ScrollView } from "react-native";
import { useUser } from "../store/user";
import { UseQueryResult, useQueries, QueryFunctionContext } from "react-query";
// Utils
import { fetchRecipesById } from "../utils/functions/fetchRecipesById";
import { RecipeType } from "../utils/types";
// Components
import RecipeCard from "../components/RecipeCard";
import ScreenMessage from "../components/ScreenMessage";

const Favourites: React.FC = () => {
  const user = useUser((state) => state.user);

  if (!user?.favourites) {
    return <ScreenMessage msg="Loading..." />;
  }

  const queryResults: UseQueryResult<RecipeType, unknown>[] = // note: if i put [string, number] instead of unknown there is a ts error
    useQueries(
      user.favourites.map((recipeId) => ({
        queryKey: ["recipe", recipeId] as [string, number],
        queryFn: (context: QueryFunctionContext<[string, number]>) =>
          fetchRecipesById(context),
      })),
    );

  const data: RecipeType[] = queryResults
    .flatMap((result) => result.data || [])
    .filter((resultData) => resultData !== undefined);

  if (!data || data.length === 0)
    return <ScreenMessage msg="No favourite recipes" />;

  return (
    <View
      style={{
        padding: 20,
        // flex: 1,
      }}
    >
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

export default Favourites;
