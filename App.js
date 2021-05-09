import React from "react";
import { StyleSheet, View } from "react-native";
import Slider from "./src/slider";
import Animated, { useSharedValue } from "react-native-reanimated";

export default function App() {
  const sliderWidth = useSharedValue(0);
  const progress = useSharedValue(0);
  return (
    <View style={styles.container}>
      <Slider sliderWidth={sliderWidth} progress={progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
