import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface UserType {
  // id: number;
  name: string;
  favourites?: number[];
}

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

export interface RecipeDBAllType {
  pictures: string[];
  id: number;
  idDetails: number;
  ingredients: string[];
  instructions: string;
}

export interface User {
  id: number;
  name: string;
}

type Props = NativeStackScreenProps<RootStackParamList>;
export type NavigationProp = Props["navigation"];

type RecipeDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "RecipeDetails"
>;
export type ToRecipeDetailsRouteProp = RecipeDetailsProps["route"];
