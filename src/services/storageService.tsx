
import SInfo from 'react-native-sensitive-info';

export class StorageService{

    async setItem(key: string, value: any, options = {}){
      await SInfo.setItem(key, value, options);
    }

    async getItem(key: string, options = {}){
      await SInfo.getItem(key, options);
    }

    async deleteItem(key: string, options = {}){
      await SInfo.deleteItem(key, options);
    }
    
}