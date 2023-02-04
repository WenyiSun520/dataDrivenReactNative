import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Animated,
} from 'react-native';

export const Home = ({navigation}) => {
  const [text, onChangeText] = useState('');
  return (
    <View style={AppStyle.header}>
      <Animated.Text>Data Drive React-native App</Animated.Text>
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
          if (text !== '') {
            let query = text;
            onChangeText('');
            navigation.navigate('List', {
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
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    textAlign: 'center',
  },
});
