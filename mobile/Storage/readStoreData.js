import AsyncStorage from '@react-native-async-storage/async-storage';

export default function readStoreData () {

    return getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if(value !== null) {
            // value previously stored
            return value.json()
            }
        } catch(e) {
            // error reading value
        }
        }


};