import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getStorage () {   
  
  const value = await AsyncStorage.getItem('jwt'); 

  return value;
  
};

