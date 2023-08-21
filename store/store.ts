import { create } from "zustand";
import { RecipeType } from "../utils/types"; // todo change name

interface StoreState {
  recipes: RecipeType[];
  addRecipes: (recipesList: RecipeType[]) => void;
  // getRecipeId: (id: number) => RecipeType;
}

export const useStore = create<StoreState>((set) => ({
  recipes: [],
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  addRecipes: (recipesList) =>
    set((state) => ({ recipes: state.recipes.concat(recipesList) })),
  // getRecipeId: (recipeId) => {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //   return useStore
  //     .getState()
  //     .find((recipe: RecipeType) => recipe.id === recipeId);
  // },
}));
