import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Button,
  TouchableOpacity,
} from 'react-native';

export const SongItem = props => {
  let song = props.item;
  console.log('song: ', song);
  const handlePress = () => {
    props.onPress(song.index);
  };
  return (
    <TouchableOpacity style={SongItemStyles.item} onPress={handlePress}>
      <Image
        source={{
          uri: song.item.artworkUrl100,
        }}
        style={SongItemStyles.image}
      />
      <View>
        <Text style={SongItemStyles.text}>{song.item.artistName}</Text>
        <Text style={SongItemStyles.text}>{song.item.trackName}</Text>
        <Button
          title="Preview"
          style={SongItemStyles.button}
          onPress={() => Linking.openURL(song.item.previewUrl)}
        />
      </View>
    </TouchableOpacity>
  );
};
const SongItemStyles = StyleSheet.create({
  item: {
    alignItems: 'center',
    backgroundColor: 'grey',
    marginTop: 20,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  text: {
    color: 'black',
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: '5px',
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
});
export default SongItem;
