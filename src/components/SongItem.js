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
} from "react-native";

export const SongItem = (props) => {
  let song = props.item;

  const handlePress = () => {
    props.onPress(song.index);
  };
  return (
    <TouchableOpacity style={SongItemStyles.item} onPress={handlePress}>
      <View>
        <Image
          source={{
            uri: song.item.artworkUrl100,
          }}
          style={SongItemStyles.image}
        />
        <View style={SongItemStyles.circle}></View>
      </View>
      <View style={SongItemStyles.textView}>
        <Text style={SongItemStyles.text}>{song.item.artistName}</Text>
        <Text style={SongItemStyles.text}>{song.item.trackName}</Text>
        <Icon
          name="play-circle-o"
          size={35}
          color="black"
          onPress={() => Linking.openURL(song.item.previewUrl)}
        />
        <Text stye={SongItemStyles.button}>View Track Detail</Text>
      </View>
    </TouchableOpacity>
  );
};
const SongItemStyles = StyleSheet.create({
  item: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    marginTop: 20,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  textView: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  circle: {
    position: "absolute",
    backgroundColor: "#ddd",
    width: 80,
    height: 80,
    borderRadius: 100,
    left: 60,
    top: 60,
    borderWidth: 5,
    borderColor: "dimgrey",
  },
});
export default SongItem;
