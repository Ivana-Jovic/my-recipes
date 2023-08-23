//todo da li je ovo ok mesto za ovaj fajl
export interface RecipeDetailsType {
  title: string;
  picture: string[];
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
