import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export const Skeleton = ({ style }) => {
  const { width } = useWindowDimensions();
  const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);
  const x = useSharedValue(0);

  useEffect(() => {
    x.value = withRepeat(withTiming(1, { duration: 1000 }), -1);
  }, []);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(x.value, [0, 1], [-width, width]) }],
  }));

  return (
    <View style={style}>
      <View style={styles.container}>
        <AnimatedLG
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
            rStyle,
          ]}
          colors={["#ececec", "white", "#ececec"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    overflow: "hidden",
    borderRadius: 8,
  },
});
