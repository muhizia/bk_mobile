import AsyncStorage from '@react-native-async-storage/async-storage';

const saveKeyToAsyncStorage = async (keyName, keyValue) => {
  await AsyncStorage.setItem(keyName, keyValue).catch((error) => error);
};

const getKeyFromAsyncStorage = async (keyName) => {
  // await AsyncStorage.removeItem(keyName); // just checking everytime that it comes fresh
  const value = await AsyncStorage.getItem(keyName).catch((error) => error);
  return value;
};

export { saveKeyToAsyncStorage, getKeyFromAsyncStorage };