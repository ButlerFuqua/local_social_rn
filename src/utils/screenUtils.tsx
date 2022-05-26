import { Alert } from "react-native";

export const showAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Close",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ]
    );
  }