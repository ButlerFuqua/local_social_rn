
import SInfo from 'react-native-sensitive-info';

export class StorageService {

  async setItem() {
    // await SInfo.setItem(key, value, options);
    // return SInfo.getItem(key, options);

    SInfo.setItem('key1', 'value1', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    });
  }

  async getItem(): Promise<string | null> {
    return SInfo.getItem('key1', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
  });

    // return SInfo.getItem(key, options);
  }

  async deleteItem(key: string, options = {}) {
    await SInfo.deleteItem(key, options);
  }

}