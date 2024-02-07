import { useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCharacter } from "../../shared/CharacterContext";
import Tile from "../../shared/Tile";
import { globalStyles } from "../../styles/global";
import { useCallback, useEffect, useState } from "react";
import { socket } from "../../socket";
import { CharacterHead } from "../../utils/types";

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const { character, leaderboard } = useCharacter();
  if (!character) return;

  const { uid, name, level, exp, gold, inventory } = character;

  useFocusEffect(
    useCallback(() => {
      console.log("emit");
      socket.emit("getLeaderboard");
    }, [])
  );

  useEffect(() => {
    if (leaderboard) setLoading(false);
  }, [leaderboard]);

  const renderLeaderboardRow = ({
    item,
    index,
  }: {
    item: CharacterHead;
    index: number;
  }) => (
    <Tile
      colors={["#777", "#555"]}
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
      }}
    >
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.level}</Text>
    </Tile>
  );

  if (loading)
    return (
      <Tile style={globalStyles.container}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={100} />
        </View>
      </Tile>
    );

  return (
    <Tile style={globalStyles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Place</Text>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Level</Text>
      </View>
      <FlatList
        data={leaderboard}
        renderItem={renderLeaderboardRow}
        keyExtractor={(item) => item.uid}
      />
    </Tile>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "black", // Header background color
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
