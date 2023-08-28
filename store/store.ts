import { create } from "zustand";
import { RecipeDetailsType, RecipeType } from "../utils/types";

interface StoreState {
  recipes: RecipeDetailsType[];
  recentRecipe: RecipeType | undefined;
  addRecipes: (recipesList: RecipeDetailsType[]) => void; //todo vrati na details
  addRecentRecipes: (recipe: RecipeType) => void;
  clearRecipes: () => void;
}

export const useStore = create<StoreState>((set) => ({
  recipes: [],
  recentRecipe: undefined,
  addRecipes: (recipesList) =>
    set((state) => ({ recipes: state.recipes.concat(recipesList) })),
  addRecentRecipes: (recipe) => set({ recentRecipe: recipe }),
  clearRecipes: () => {
    console.log("in clearRecipes");
    set({ recipes: [] });
  },
}));
