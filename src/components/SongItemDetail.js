import React from "react";
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
  let song = props.detail;
  console.log("song: ", song);
  let songXposition = new Animated.Value(0);
  const songResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      songXposition.setValue(gesture.dx);
      // console.log("moving", gesture.dx)
    },
    onPanResponderRelease: (event, gesture) => {
      let width = Dimensions.get("window").width;
      if(Math.abs(gesture.dx ) > width*0.4){
        const direction = Math.sign(gesture.dx)
        // -1:swipe left; 1:swipe right
        Animated.timing(songXposition, {
          toValue: direction * width,
          duration: 250,
        }).start(()=>handleSwipe());
      }
      // console.log("realease")
    },
  });
  const handleSwipe = ()=>{
    
  }
  return (
    <View
      style={[SongItemStyles.item]}
      {...songResponder.panHandlers}
    >
      <TouchableOpacity onPress={props.onBack}>
        <Text style={SongItemStyles.button}>Back to list</Text>
      </TouchableOpacity>
      <Animated.Image
        source={{
          uri: song.artworkUrl100,
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
