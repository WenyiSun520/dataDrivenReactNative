import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { SongItem } from "./SongItem";
import SongItemDetail from "./SongItemDetail";
const api = "https://itunes.apple.com/search?limit=25&term=";

export const SongList = ({ route }) => {
  const [musicData, setMusicData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [detailId, setDetailId] = useState(null);
  const [text, onChangeText] = useState("");
  const [unfindText, setUnfindText] = useState(
    "  Sorry, we can't find any songs related to the singer"
  );

  const updateDetailId = (songId) => {
    setDetailId(songId);
  };
  const unsetDetailId = () => {
    setDetailId(null);
  };
  const findSongs = () => {
    console.log("musicDara: ",musicData)
    let filteredData = musicData.filter((song) =>
      song.wrapperType === "track" && song.trackName.toLowerCase().includes(text.toLowerCase())
    );
    if (filterData.length === 0) {
    } else {
      setFilterData(filteredData);
    }
  };
  const resetList = () => {
    setFilterData([]);
    onChangeText("");
  };
  const fetchInitialData = async (query) => {
    try {
      let response = await fetch(api + query);
      let responseJson = await response.json();
      console.log(api + `${query}`);
      let top3 = responseJson.results;
      setMusicData(top3);
    } catch (err) {
      console.log("error when fetching data: " + err);
    }
  };

  useEffect(() => {
    fetchInitialData(route.params.query);
  }, [route.params.query]);
  const currentId = () => {
    console.log("musicData.detail: ", musicData[detailId]);
    return musicData[detailId];
  };
  if (detailId == null) {
    return (
      <View style={SongListStyles.view}>
        <View style={SongListStyles.filterBar}>
          <TextInput
            style={SongListStyles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Search a Song"
          />
          <Button title="Find" onPress={findSongs} />
          <Button title="Reset" onPress={resetList} />
        </View>
        <Text style={SongListStyles.query}>
          Search Result: {route.params.query}
        </Text>
          {musicData.length !== 0 ? (
            <FlatList
              data={filterData.length === 0 ? musicData : filterData}
              style={SongListStyles.view}
              renderItem={(song) => (
                <SongItem item={song} onPress={updateDetailId} />
              )}
            />
          ) : (
            <Text style={SongListStyles.query}>{unfindText}</Text>
          )}
      </View>
    );
  } else {
    return <SongItemDetail detail={currentId()} onBack={unsetDetailId} />;
  }
};
export default SongList;
const SongListStyles = StyleSheet.create({
  view: {
    flex: 1,
  },
  query: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
