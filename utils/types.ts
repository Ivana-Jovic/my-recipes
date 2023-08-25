export interface RecipeDetailsType {
  title: string;
  pictures: string[];
  description: string;
  cookTime: number;
  author: string;
  difficulty: number;
  id: number;
}

export interface RecipeType extends RecipeDetailsType {
  ingredients: string[];
  instructions: string;
}

export interface User {
  id: number;
  name: string;
}
