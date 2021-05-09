import * as React from "react";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  interpolate,
} from "react-native-reanimated";
import { Circle, Svg, G } from "react-native-svg";
import { StyleSheet, TextInput, View } from "react-native";
import { clamp } from "./clamp";

const AnimatedInput = Animated.createAnimatedComponent(TextInput);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgress = ({ progress, sliderWidth }) => {
  const radius = 100;
  const strokeWidth = 10;
  const CIRCUMFERENCE = 2 * Math.PI * radius;
  const HALF_WIDTH = radius + strokeWidth;

  const animatedBgProps = useAnimatedProps(() => {
    const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);
    return {
      fillOpacity: interpolate(percentComplete, [0, 1], [0.2, 0.75]),
    };
  });

  const animatedProgressProps = useAnimatedProps(() => {
    const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);
    return {
      strokeDashoffset: (1 - percentComplete) * CIRCUMFERENCE,
    };
  });

  const animatedInputProps = useAnimatedProps(() => {
    const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);
    return {
      text: `${Math.round(100 * percentComplete)} %`,
      color: interpolateColor(
        percentComplete,
        [0, 0.5, 1],
        ["red", "yellow", "green"]
      ),
    };
  });

  return (
    <View>
      <View style={{ width: radius * 2, height: radius * 2 }}>
        <Svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`${-HALF_WIDTH} ${-HALF_WIDTH} ${2 * HALF_WIDTH} ${
            2 * HALF_WIDTH
          }`}
        >
          <G rotation="-90">
            <AnimatedCircle
              cx={0}
              cy={0}
              r={radius}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              animatedProps={animatedProgressProps}
              stroke={"blue"}
            />
            <AnimatedCircle
              cx={0}
              cy={0}
              r={radius}
              stroke="rgb(180,180,180)"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeOpacity="0.1"
              animatedProps={animatedBgProps}
              fill={"#3a3e8c"}
            />
          </G>
        </Svg>

        <AnimatedInput
          editable={false}
          defaultValue="0"
          style={[
            StyleSheet.absoluteFill,
            {
              fontSize: 50 / 2,
              fontWeight: "500",
              textAlign: "center",
              textShadowColor: "black",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
            },
          ]}
          animatedProps={animatedInputProps}
        />
      </View>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
