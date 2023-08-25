import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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

type RecipesProps = NativeStackScreenProps<RootStackParamList, "Recipes">; //  todo proveriti jel ovo ok forma
export type ToRecipesNavigationProp = RecipesProps["navigation"];

type RecipeDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "RecipeDetails"
>;
export type ToRecipeDetailsRouteProp = RecipeDetailsProps["route"];
export type ToRecipeDetailsNavigationProp = RecipeDetailsProps["navigation"];
