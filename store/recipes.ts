import { create } from "zustand";
// Utils
import { RecipeType } from "../utils/types";

interface RecipesState {
  recipeTemplate: Omit<RecipeType, "id" | "author"> | undefined;
  addRecipeTemplate: (recipe: Omit<RecipeType, "id" | "author">) => void;
  clearRecipeTemplate: () => void;
}

export const useRecipes = create<RecipesState>((set) => ({
  recipeTemplate: undefined,
  addRecipeTemplate: (recipe) => set({ recipeTemplate: recipe }),
  clearRecipeTemplate: () => set({ recipeTemplate: undefined }),
}));
