import React, { createRef, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { QueryFunctionContext, UseQueryResult, useQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { useRecipes } from "../store/recipes";
import { useUser } from "../store/user";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
//Components
import InputWrapper from "../components/InputWrapper";
import ImagePicker from "../components/ImagePicker";
import Button from "../components/Button";
//Utils
import { Colors } from "../utils/colors";
import { RecipeType, NavigationProp } from "../utils/types";
import ScreenMessage from "../components/ScreenMessage";
import { addRecipes } from "../utils/functions/addRecipes";
import { editRecipes } from "../utils/functions/editRecipes";

type TextInputRef = {
  current: TextInput | null;
};

const addOrEditRecipes: (
  context: QueryFunctionContext<
    [string, RecipeType | undefined, number | undefined]
  >,
) => Promise<void> = async (context) => {
  const isToEdit = context.queryKey[2];

  if (isToEdit) {
    await editRecipes(context);
  } else {
    await addRecipes(context);
  }
};

interface AddRecipe {
  recipeToEdit?: RecipeType;
  edit?: boolean;
}

const AddRecipe: React.FC<AddRecipe> = (props) => {
  const { recipeToEdit, edit } = props;
  const [images, setImages] = useState<string[]>([]);
  const [newRecipe, setNewRecipe] = useState<RecipeType | undefined>(undefined);

  const clearRecentRecipes = useRecipes((state) => state.clearRecentRecipes);
  const recipeTemplate = useRecipes((state) => state.recipeTemplate);
  const addRecipeTemplate = useRecipes((state) => state.addRecipeTemplate);
  const clearRecipeTemplate = useRecipes((state) => state.clearRecipeTemplate);

  const user = useUser((state) => state.user);

  const navigation = useNavigation<NavigationProp>();
  const handleImagesChange = (newValue: string[]) => {
    setImages(newValue);
  };

  const {
    isLoading,
    isError,
  }: UseQueryResult<
    RecipeType[],
    [string, RecipeType | undefined, number | undefined]
  > = useQuery(["recipes", newRecipe, recipeToEdit?.id], addOrEditRecipes, {
    onSuccess() {
      Alert.alert("Added recipe");
      navigation.navigate("Recipes");
    },
    enabled: !!newRecipe,
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RecipeType>({
    defaultValues: recipeToEdit ??
      recipeTemplate ?? {
        title: "",
        pictures: [],
        description: "",
        cookTime: undefined,
        author: "",
        difficulty: 1,
        id: undefined,
        ingredients: [],
        instructions: "",
      },
  });

  useEffect(() => {
    if (edit !== true) {
      const subscription = watch((value, { name, type }) => {
        console.log(value, name, type);
        const sanitizedValue = {
          ingredients: (value.ingredients ?? []) as string[],
          pictures: (value.pictures ?? []) as string[],
          instructions: value.instructions ?? "",
          title: value.title ?? "",
          description: value.description ?? "",
          cookTime: value.cookTime ?? 1,
          difficulty: value.difficulty ?? 1,
        };
        addRecipeTemplate(sanitizedValue);
      });
      return () => subscription.unsubscribe();
    }
  }, [watch]);

  const onSubmit = (data: RecipeType) => {
    if (images.length === 0) return;
    data.pictures = images;
    data.author = user?.name ?? "";
    setNewRecipe(data);
    clearRecipeTemplate();
  };

  useEffect(() => {
    if (recipeToEdit) {
      reset(recipeToEdit);
      setImages(recipeToEdit?.pictures ?? []);
      clearRecentRecipes();
    }
  }, [recipeToEdit]);

  const inputRefs: TextInputRef[] = Array.from({ length: 5 }, () =>
    createRef<TextInput>(),
  );

  const focusNextInput = (index: number) => {
    const nextIndex = index + 1;
    if (inputRefs[nextIndex] && inputRefs[nextIndex].current) {
      inputRefs[nextIndex].current?.focus();
    }
  };

  if (isLoading) {
    return <ScreenMessage msg={"Loading..."} />;
  }

  if (isError) {
    return <ScreenMessage msg="Error fetching data" />;
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}
      >
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <InputWrapper label="Title" error={errors.title?.message}>
              <Controller
                control={control}
                rules={{
                  required: "Title is required",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="next"
                    // blurOnSubmit={false}
                    onSubmitEditing={() => focusNextInput(0)}
                    ref={inputRefs[0]}
                  />
                )}
                name="title"
              />
            </InputWrapper>
            <View style={styles.shorterInputsContainer}>
              <InputWrapper
                label="Cooking time"
                error={errors.cookTime?.message}
              >
                <Controller
                  control={control}
                  rules={{
                    required: "Cooking time is required",
                    pattern: /^[0-9]{0,3}$/,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value?.toString()}
                      keyboardType="numeric"
                      returnKeyType="done"
                      onSubmitEditing={() => focusNextInput(1)}
                      ref={inputRefs[1]}
                    />
                  )}
                  name="cookTime"
                />
              </InputWrapper>
              <InputWrapper
                label="Difficulty"
                error={errors.difficulty?.message}
              >
                <Controller
                  control={control}
                  rules={{
                    required: "Difficulty is required",
                    min: {
                      value: 1,
                      message: "Value must be at least 1.",
                    },
                    max: {
                      value: 5,
                      message: "Value must be at most 5.",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value?.toString()}
                      keyboardType="numeric"
                      maxLength={1}
                      returnKeyType="done"
                      onSubmitEditing={() => focusNextInput(2)}
                      ref={inputRefs[2]}
                    />
                  )}
                  name="difficulty"
                />
              </InputWrapper>
            </View>
            <InputWrapper
              label="Description"
              error={errors.description?.message}
            >
              <Controller
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextInput(3)}
                    ref={inputRefs[3]}
                  />
                )}
                name="description"
              />
            </InputWrapper>
            <InputWrapper
              label="Instructions"
              error={errors.instructions?.message}
            >
              <Controller
                control={control}
                rules={{ required: "Instructions are required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.multiline]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline={true}
                    ref={inputRefs[4]}
                  />
                )}
                name="instructions"
              />
            </InputWrapper>
            <InputWrapper
              label="Ingredients (each in a new line)"
              error={errors.ingredients?.message}
            >
              <Controller
                control={control}
                rules={{ required: "Ingredients are required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.multiline]}
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      const lines = text.split("\n");
                      onChange(lines);
                    }}
                    value={value?.join("\n")}
                    multiline={true}
                  />
                )}
                name="ingredients"
              />
            </InputWrapper>
            <View style={styles.errors}>
              <ImagePicker
                onImagesChange={handleImagesChange}
                recipeToEditPictures={recipeToEdit?.pictures}
              />
              {images.length === 0 && (
                <Text style={{ color: "red" }}>
                  You have to select at least one picture
                </Text>
              )}
            </View>
            <Button
              onPress={handleSubmit(onSubmit)}
              additionalStyles={styles.done}
            >
              Done
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddRecipe;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    width: "100%",
    gap: 20,
    padding: 10,
    flex: 1,
    height: "100%",
  },
  input: {
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
  errors: {
    gap: 5,
  },
});
