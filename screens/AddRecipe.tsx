import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { QueryFunctionContext, UseQueryResult, useQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../store/store";
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
import Input from "../components/Input";
import ImagePicker from "../components/ImagePicker";
import Button from "../components/Button";
//Utils
import { Colors } from "../utils/colors";
// import { fetchUser } from "../utils/database";
import { RecipeType, User, NavigationProp } from "../utils/types";
import ScreenMessage from "../components/ScreenMessage";
import { addRecipes } from "../utils/functions/addRecipes";
import { editRecipes } from "../utils/functions/editRecipes";
import { useUser } from "../store/user";

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
}

const AddRecipe: React.FC<AddRecipe> = (props) => {
  const { recipeToEdit } = props;
  const [images, setImages] = useState<string[]>([]);
  const [newRecipe, setNewRecipe] = useState<RecipeType | undefined>(undefined);
  const [user, setUser] = useState<string>("");

  const clearRecentRecipes = useStore((state) => state.clearRecentRecipes);

  const users = useUser((state) => state.users);

  const navigation = useNavigation<NavigationProp>(); // todo ovo bi trebalo da dolazi automatski kao prop (na svim stranama), ali zbog ts ne moze nesto... ({ navigation }: NavigationProp)

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

  useEffect(() => {
    if (users.length !== 0) setUser((users[0] as User).name); // todo ovaj use eff nema poente, u storu moze da bude i sa,o jedan user, onda nema potrebe za set user i ovim useeff
    //   fetchUser()
    //     .then((res) => {
    //       setUser((res.rows._array[0] as User).name);
    //     })
    //     .catch(() => {});
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecipeType>({
    defaultValues: recipeToEdit ?? {
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

  const onSubmit = (data: RecipeType) => {
    if (images.length === 0) return;
    data.pictures = images;
    data.author = user;
    setNewRecipe(data);
  };

  useEffect(() => {
    if (recipeToEdit) {
      reset(recipeToEdit);
      setImages(recipeToEdit?.pictures ?? []);
      clearRecentRecipes();
    }
  }, [recipeToEdit]);

  if (isLoading) {
    return <ScreenMessage msg={"Loading..."} />;
  }

  if (isError) {
    return <ScreenMessage msg="Error fetching data" />;
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        // behavior={"position"} //TODO not working
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <Input label="Title" error={errors.title?.message}>
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
                  />
                )}
                name="title"
              />
            </Input>
            <View style={styles.shorterInputsContainer}>
              <Input label="Cooking time" error={errors.cookTime?.message}>
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
                    />
                  )}
                  name="cookTime"
                />
              </Input>
              <Input label="Difficulty" error={errors.difficulty?.message}>
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
                    />
                  )}
                  name="difficulty"
                />
              </Input>
            </View>
            <Input label="Description" error={errors.description?.message}>
              <Controller
                control={control}
                rules={{ required: "Description is required" }}
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
            <Input label="Instructions" error={errors.instructions?.message}>
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
                  />
                )}
                name="instructions"
              />
            </Input>
            <Input
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
            </Input>
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
