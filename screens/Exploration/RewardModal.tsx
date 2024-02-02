import React, { Fragment } from "react";
import {
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCharacter } from "../../shared/CharacterContext";
import MyButton from "../../shared/MyButton";
import Tile from "../../shared/Tile";
import ItemFrame from "../../shared/ItemFrame";
import mapImages from "../../assets/maps/mapImages";

type Props = {
  visible: boolean;
  setRewardVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RewardModal({ visible, setRewardVisible }: Props) {
  const { rewards, setRewards, character } = useCharacter();

  const handleClose = () => {
    setRewards(undefined);
    setRewardVisible(false);
  };

  if (!rewards) return null;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.background} onPress={handleClose}>
        <Pressable style={{ width: "80%" }}>
          <ImageBackground
            source={mapImages[rewards.mapId]}
            style={{
              height: 100,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "yellow", fontSize: 30, fontWeight: "bold" }}>
              SUCCESS!
            </Text>
          </ImageBackground>
          <Tile colors={["#666", "#444"]} style={styles.modal}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                Reward:
              </Text>
              <Text style={{ color: "gold", fontSize: 20, fontWeight: "bold" }}>
                {"Gold: " + Math.floor(rewards.gold)}
              </Text>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                {"Exp: " + Math.floor(rewards.exp)}
              </Text>
            </View>
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              Items found:
            </Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              {rewards.items ? (
                rewards.items.map((item) => (
                  <ItemFrame key={item.id} item={item} />
                ))
              ) : (
                <Text>No items found</Text>
              )}
            </View>

            <MyButton onPress={handleClose}>Collect</MyButton>
          </Tile>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    padding: 10,
    alignItems: "center",
    display: "flex",
    gap: 20,
  },
});
