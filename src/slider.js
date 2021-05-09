import * as React from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import { View, StyleSheet, Text, Alert, TextInput } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import CircularProgress from "./CircularProgress";

const HANDLE_WIDTH = 20;

export const Slider = ({ progress, sliderWidth }) => {
  const animatedHandleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value - HANDLE_WIDTH / 2 }],
    };
  });

  const onDraggedSuccess = () => {
    progress.value = withSpring(sliderWidth.value);
    Alert.alert(`dragged to end position: ${Math.round(progress.value)}`);
  };

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startProgress = progress.value;
    },
    onActive: (event, ctx) => {
      progress.value = ctx.startProgress + event.translationX;
    },

    onEnd: () => {
      if (progress.value > sliderWidth.value) {
        runOnJS(onDraggedSuccess)();
        progress.value = withSpring(sliderWidth.value);
      } else if (progress.value < 0) {
        progress.value = withSpring(0);
      }
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CircularProgress sliderWidth={sliderWidth} progress={progress} />
      <View
        style={styles.container}
        onLayout={(e) => {
          sliderWidth.value = e.nativeEvent.layout.width;
        }}
      >
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={[styles.handle, animatedHandleStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    position: "absolute",
    bottom: 80,
    height: 50,
    width: "80%",
    backgroundColor: "grey",
    borderRadius: 10,
  },
  handle: {
    width: HANDLE_WIDTH,
    backgroundColor: "green",
    borderRadius: 10,
    position: "absolute",
    bottom: -20,
    top: -20,
  },
});
