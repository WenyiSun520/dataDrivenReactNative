import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  Animated,
  Easing,
} from "react-native";

export const Home = ({ navigation }) => {
  const [text, onChangeText] = useState("");
  let titleXposition = new Animated.Value(0);

  const springAnimate = (direction = 1) => {
    let width = Dimensions.get("window").width - 150;
    Animated.timing(titleXposition, {
      toValue: 100 * (width / 2),
      duration: 5000,
      easing: Easing.circle,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        springAnimate(-1 * direction);
      }
    });
  };

  useEffect(() => springAnimate());

  return (
    <View style={AppStyle.header}>
      <Animated.Text style={{ left: titleXposition }}>
        Data Drive React-native App
      </Animated.Text>
      <Text>Welcome!</Text>
      <View>
        <Text style={AppStyle.text}>Search a singer:</Text>
        <TextInput
          style={AppStyle.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search a Singer"
        />
      </View>
      <Button
        title="Submit"
        onPress={() => {
          if (text !== "") {
            let query = text;
            onChangeText("");
            navigation.navigate("List", {
              query: query,
            });
          }
        }}
      />
    </View>
  );
};
export default Home;

const AppStyle = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  songList: {
    flex: 0.5,
  },
  text: {
    textAlign: "center",
  },
});
