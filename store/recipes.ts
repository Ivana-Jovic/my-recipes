import { create } from "zustand";
// Utils
import { RecipeType } from "../utils/types";

interface RecipesState {
  recentRecipe: RecipeType | undefined;
  recipeTemplate: Omit<RecipeType, "id" | "author"> | undefined;
  addRecentRecipes: (recipe: RecipeType) => void;
  clearRecentRecipes: () => void;
  addRecipeTemplate: (recipe: Omit<RecipeType, "id" | "author">) => void;
  clearRecipeTemplate: () => void;
}

export const useRecipes = create<RecipesState>((set) => ({
  recentRecipe: undefined,
  recipeTemplate: undefined,
  addRecentRecipes: (recipe) => set({ recentRecipe: recipe }),
  clearRecentRecipes: () => set({ recentRecipe: undefined }),
  addRecipeTemplate: (recipe) => set({ recipeTemplate: recipe }),
  clearRecipeTemplate: () => set({ recentRecipe: undefined }),
}));
