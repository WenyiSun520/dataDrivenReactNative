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

export const SongItemDetail = props => {
  let song = props.detail;
  console.log('song: ', song);
  return (
    <View style={SongItemStyles.item}>
      <TouchableOpacity onPress={props.onBack}>
        <Text style={SongItemStyles.button}>Back to list</Text>
      </TouchableOpacity>
      <Image
        source={{
          uri: song.artworkUrl100,
        }}
        style={SongItemStyles.image}
      />

      <View>
        <Text
          style={SongItemStyles.text}
          onPress={() => Linking.openURL(song.artistViewUrl)}>
          Singer: {song.artistName}
        </Text>
        <Text
          style={SongItemStyles.text}
          onPress={() => Linking.openURL(song.trackViewUrl)}>
          Belong to Track: {song.trackName}
        </Text>
        <Text>Release Date: {song.releaseDate.substring(0, 10)}</Text>
        <Text>Genre: {song.primaryGenreName}</Text>
        <Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
  },
  text: {
    color: 'black',
  },
  button: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
export default SongItemDetail;
