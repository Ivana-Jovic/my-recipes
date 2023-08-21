import { create } from "zustand";
import { RecipeDetailsType, RecipeType } from "../utils/types"; // todo change name

interface StoreState {
  recipes: RecipeType[];
  recentRecipe: RecipeType | undefined;
  addRecipes: (recipesList: RecipeType[]) => void; //todo vrati na details
  addRecentRecipes: (recipe: RecipeType) => void;
  // getRecipeId: (id: number) => RecipeType;
}

export const useStore = create<StoreState>((set) => ({
  recipes: [],
  recentRecipe: undefined,
  addRecipes: (recipesList) =>
    set((state) => ({ recipes: state.recipes.concat(recipesList) })),
  addRecentRecipes: (recipe) => set({ recentRecipe: recipe }),
  // getRecipeId: (recipeId) => {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //   return useStore
  //     .getState()
  //     .find((recipe: RecipeType) => recipe.id === recipeId);
  // },
}));
