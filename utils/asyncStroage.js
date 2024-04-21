import AsyncStorage from "@react-native-async-storage/async-storage";

// Karmaşık veri yapılarını saklama (örneğin objeler veya diziler)
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);  // Değeri JSON string'ine çevir
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log('Error storing value: ', error);
  }
};

// Karmaşık veri yapılarını yükleme
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;  // JSON string'ini parse ederek geri dönüş yap
  } catch (error) {
    console.log('Error retrieving value: ', error);
  }
};
