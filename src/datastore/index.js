import { AsyncStorage } from "react-native";

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getData = async key => {
  let data = null;
  try {
    data = await AsyncStorage.getItem(key);
  } catch (error) {
    // Error retrieving data
    console.log("Error retrieving data");
  }
  return data != null ? JSON.parse(data) : null;
};
