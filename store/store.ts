import { create } from "zustand";
// Utils
import { RecipeDetailsType, RecipeType } from "../utils/types";

interface StoreState {
  recipes: RecipeDetailsType[];
  recentRecipe: RecipeType | undefined;
  recipeTemplate: Omit<RecipeType, "id" | "author"> | undefined;
  addRecipes: (recipesList: RecipeDetailsType[]) => void;
  addRecentRecipes: (recipe: RecipeType) => void;
  clearRecipes: () => void;
  clearRecentRecipes: () => void;
  addRecipeTemplate: (recipe: Omit<RecipeType, "id" | "author">) => void;
  clearRecipeTemplate: () => void;
}

export const useStore = create<StoreState>((set) => ({
  recipes: [],
  recentRecipe: undefined,
  recipeTemplate: undefined,
  addRecipes: (recipesList) =>
    set((state) => ({ recipes: state.recipes.concat(recipesList) })),
  addRecentRecipes: (recipe) => set({ recentRecipe: recipe }),
  clearRecipes: () => set({ recipes: [] }),
  clearRecentRecipes: () => set({ recentRecipe: undefined }),
  addRecipeTemplate: (recipe) => set({ recipeTemplate: recipe }),
  clearRecipeTemplate: () => set({ recentRecipe: undefined }),
}));
