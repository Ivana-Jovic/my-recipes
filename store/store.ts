import { create } from "zustand";
// Utils
import { RecipeDetailsType, RecipeType } from "../utils/types";

interface StoreState {
  recipes: RecipeDetailsType[];
  recentRecipe: RecipeType | undefined;
  addRecipes: (recipesList: RecipeDetailsType[]) => void;
  addRecentRecipes: (recipe: RecipeType) => void;
  clearRecipes: () => void;
  clearRecentRecipes: () => void;
}

export const useStore = create<StoreState>((set) => ({
  recipes: [],
  recentRecipe: undefined,
  addRecipes: (recipesList) =>
    set((state) => ({ recipes: state.recipes.concat(recipesList) })),
  addRecentRecipes: (recipe) => set({ recentRecipe: recipe }),
  clearRecipes: () => set({ recipes: [] }),
  clearRecentRecipes: () => set({ recentRecipe: undefined }),
}));
