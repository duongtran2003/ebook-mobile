import AsyncStorage from "@react-native-async-storage/async-storage"

export const getAccessToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
}

export const setAccessToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
}

export const removeAccessToken = async () => {
  await AsyncStorage.removeItem('token')
}
