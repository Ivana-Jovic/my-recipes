import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { QueryFunctionContext, UseQueryResult, useQuery } from "react-query";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
//Components
import Input from "../components/Input";
import ImagePicker from "../components/ImagePicker";
import Button from "../components/Button";
//Utils
import { Colors } from "../utils/colors";
import { fetchUser } from "../utils/database";
import { RecipeType, User } from "../utils/types";

// todo Key "uri" in the image picker result is deprecated and will be removed in SDK 48, you can access selected assets through the "assets" array instead

const addRecipes: (
  context: QueryFunctionContext<[string, RecipeType | undefined]>,
) => Promise<RecipeType[]> = async (context) => {
  console.log("in addRecipes");
  const recipe = context.queryKey[1];
  if (!recipe) console.log("Recipe is undef");
  const response = await fetch(`http://localhost:3000/recipes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
  const jsonData = (await response.json()) as RecipeType[];
  return jsonData;
};

function parseIngredients(inputText: string): string[] {
  const lines = inputText.split("\n"); // Split by newline characters
  const ingredientsArray = lines
    .map((line) => line.trim()) // Remove leading and trailing whitespace
    .filter((line) => line !== ""); // Filter out empty lines
  return ingredientsArray;
}

function AddRecipe() {
  const [images, setImages] = useState<string[]>([]);
  const [newRecipe, setNewRecipe] = useState<RecipeType | undefined>(undefined);
  const [user, setUser] = useState<string>("");

  const handleImagesChange = (newValue: string[]) => {
    setImages(newValue);
  };

  const {
    isLoading,
    isError,
  }: UseQueryResult<RecipeType[], [string, RecipeType | undefined]> = useQuery(
    ["recipes", newRecipe],
    addRecipes,
    {
      onSuccess() {
        console.log("my success");
      },
      enabled: !!newRecipe,
    },
  );
  useEffect(() => {
    fetchUser()
      .then((res) => {
        console.log((res.rows._array[0] as User).name);
        setUser((res.rows._array[0] as User).name);
      })
      .catch(() => {});
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeType>({
    defaultValues: {
      title: "",
      pictures: [],
      description: "",
      cookTime: undefined,
      author: "",
      difficulty: 1,
      id: undefined,
      ingredients: [], // todo srediti input ovoga
      instructions: "",
    },
  });

  const onSubmit = (data: RecipeType) => {
    if (images.length === 0) return;
    data.pictures = images;
    data.author = user;
    data.ingredients = parseIngredients(data.ingredients.toString());
    console.log("Resolved:", data);
    setNewRecipe(data);
    console.log("Resolved2:", data);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        // behavior={"position"}//TODO not working
        style={{ flex: 1 }}
      >
        <ScrollView style={[{ flex: 1 }, styles.container]}>
          <View style={styles.container}>
            <Input label="Title">
              <Controller
                control={control}
                rules={{
                  required: true, // TODO videti da li je moguce kao inace ovde specificirati poruku
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="title"
              />
            </Input>
            <View style={styles.shorterInputsContainer}>
              <Input label="Cooking time">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^[0-9]{0,3}$/,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value?.toString()}
                      keyboardType="numeric"
                    />
                  )}
                  name="cookTime"
                />
              </Input>
              <Input label="Difficulty">
                <Controller
                  control={control}
                  rules={{ required: true, min: 1, max: 5 }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value?.toString()}
                      keyboardType="numeric"
                      maxLength={1}
                    />
                  )}
                  name="difficulty"
                />
              </Input>
            </View>
            <Input label="Description">
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="description"
              />
            </Input>
            <Input label="Instructions">
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.multiline]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline={true}
                  />
                )}
                name="instructions"
              />
            </Input>
            <Input label="Ingredients (each in a new line)">
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.multiline]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.toString()}
                    multiline={true}
                  />
                )}
                name="ingredients"
              />
            </Input>
            <ImagePicker onImagesChange={handleImagesChange} />
            {(errors.cookTime ||
              errors.description ||
              errors.ingredients ||
              errors.instructions ||
              errors.pictures ||
              errors.title) && <Text>This field is required</Text>}
            {errors.difficulty && (
              <Text>Difficulty mus be between 1 and 5</Text>
            )}
            {images.length === 0 && (
              <Text>You have to select at least one picture</Text>
            )}
            {/* //TODO: kako ovo resiti na bolji nacin */}
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <Button
              onPress={handleSubmit(onSubmit)}
              additionalStyle={styles.done}
            >
              Done
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default AddRecipe;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
    padding: 10,
    flex: 1,
    height: "100%",
  },
  input: {
    // height: 200,
    // minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 5,
    padding: 15,
    backgroundColor: "white",
    flex: 1,
  },
  multiline: {
    height: 80,
    paddingTop: 15,
  },
  shorterInputsContainer: {
    flexDirection: "row",
    gap: 15,
  },
  done: {
    marginBottom: 50,
  },
});
