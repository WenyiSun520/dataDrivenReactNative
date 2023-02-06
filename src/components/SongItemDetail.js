import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Button,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";

export const SongItemDetail = (props) => {
  const [imgIndex, setImgIndex] = useState(0);
  let song = props.detail;
  console.log("song: ", song);
  let images = [song.artworkUrl100, song.artworkUrl30, song.artworkUrl60];

  let songXposition = new Animated.Value(0);
  const width = Dimensions.get("window").width;

  const songResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      songXposition.setValue(gesture.dx);
      // console.log("moving", gesture.dx)
    },
    onPanResponderRelease: (event, gesture) => {
      if (Math.abs(gesture.dx) > width * 0.4) {
        const direction = Math.sign(gesture.dx);
        // -1:swipe left; 1:swipe right
        Animated.timing(songXposition, {
          toValue: direction * width,
          duration: 250,
          useNativeDriver: false,
        }).start(() => handleSwipe(-1 * direction));
      } else {
        Animated.spring(songXposition, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
      // console.log("realease")
    },
  });
  const handleSwipe = (indexDireaction) => {
    if (!images[imgIndex + indexDireaction]) {
      Animated.spring(songXposition, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      return;
    }
    setImgIndex(imgIndex + indexDireaction);
    songXposition.setValue(width);
    Animated.spring(songXposition, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={[SongItemStyles.item]} {...songResponder.panHandlers}>
      <TouchableOpacity onPress={props.onBack}>
        <Text style={SongItemStyles.button}>Back to list</Text>
      </TouchableOpacity>
      <Animated.Image
        source={{
          uri: images[imgIndex],
        }}
        style={[SongItemStyles.image, { left: songXposition }]}
      />

      <View>
        <Text style={[SongItemStyles.text]}>
          Artist:
          <Text
            style={[SongItemStyles.hyperlink]}
            onPress={() => Linking.openURL(song.artistViewUrl)}
          >
            {song.artistName}
            <Icon name="external-link" size={15} color="#900" />
          </Text>
        </Text>
        <Text style={[SongItemStyles.text]}>
          Belong to Track:
          <Text
            style={[SongItemStyles.hyperlink]}
            onPress={() => Linking.openURL(song.trackViewUrl)}
          >
            {song.trackName}
            <Icon name="external-link" size={15} color="#900" />
          </Text>
        </Text>
        <Text style={[SongItemStyles.text]}>
          Release Date: {song.releaseDate.substring(0, 10)}
        </Text>
        <Text style={[SongItemStyles.text]}>
          Genre: {song.primaryGenreName}
        </Text>
        <Text style={[SongItemStyles.text]}>
          Collection Price: {song.collectionPrice}
          {song.currency}
        </Text>

        <Button
          title="Preview"
          style={SongItemStyles.button}
          onPress={() => Linking.openURL(song.previewUrl)}
        />
      </View>
    </View>
  );
};
const SongItemStyles = StyleSheet.create({
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
  },
  text: {
    color: "black",
    font: 24,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#ddd",
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  hyperlink: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
});
export default SongItemDetail;
