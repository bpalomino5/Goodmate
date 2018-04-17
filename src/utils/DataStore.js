/* eslint class-methods-use-this:0 */
import { AsyncStorage } from 'react-native';

class DataStore {
  async storeData(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  async getData(key) {
    let data = null;
    try {
      data = await AsyncStorage.getItem(key);
    } catch (error) {
      // Error retrieving data
      console.log('Error retrieving data');
    }
    return data != null ? JSON.parse(data) : null;
  }
}

export default new DataStore();
