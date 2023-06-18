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

    // <>
    //   <View
    //     style={[
    //       {
    //         flexDirection: "row",
    //         alignItems: "center",
    //         marginTop: 30,
    //       },
    //     ]}
    //   >
    //     <View
    //       style={[styles.container, { height: 60, width: 60, marginRight: 10 }]}
    //     >
    //       <AnimatedLG
    //         style={[
    //           {
    //             ...StyleSheet.absoluteFillObject,
    //           },
    //           rStyle,
    //         ]}
    //         colors={["#ececec", "white", "#ececec"]}
    //         start={{ x: 0, y: 0 }}
    //         end={{ x: 1, y: 0 }}
    //       />
    //     </View>
    //     <View>
    //       <View
    //         style={[
    //           styles.container,
    //           {
    //             height: 10,
    //             width: 110,
    //           },
    //         ]}
    //       >
    //         <AnimatedLG
    //           style={[
    //             {
    //               ...StyleSheet.absoluteFillObject,
    //             },
    //             rStyle,
    //           ]}
    //           colors={["#ececec", "#f1f1f1", "#ececec"]}
    //           start={{ x: 0, y: 0 }}
    //           end={{ x: 1, y: 0 }}
    //         />
    //       </View>
    //       <View style={[styles.container, { height: 8, width: 110 }]}>
    //         <AnimatedLG
    //           style={[
    //             {
    //               ...StyleSheet.absoluteFillObject,
    //             },
    //             rStyle,
    //           ]}
    //           colors={["#ececec", "white", "#ececec"]}
    //           start={{ x: 0, y: 0 }}
    //           end={{ x: 1, y: 0 }}
    //         />
    //       </View>
    //     </View>
    //   </View>
    //   <View>
    //     <View style={[styles.container, { height: 240, marginTop: 45 }]}>
    //       <AnimatedLG
    //         style={[
    //           {
    //             ...StyleSheet.absoluteFillObject,
    //           },
    //           rStyle,
    //         ]}
    //         colors={["#ececec", "white", "#ececec"]}
    //         start={{ x: 0, y: 0 }}
    //         end={{ x: 1, y: 0 }}
    //       />
    //     </View>
    //     <View
    //       style={[
    //         styles.container,
    //         {
    //           height: 10,
    //           width: 80,
    //         },
    //       ]}
    //     >
    //       <AnimatedLG
    //         style={[
    //           {
    //             ...StyleSheet.absoluteFillObject,
    //           },
    //           rStyle,
    //         ]}
    //         colors={["#ececec", "#f1f1f1", "#ececec"]}
    //         start={{ x: 0, y: 0 }}
    //         end={{ x: 1, y: 0 }}
    //       />
    //     </View>
    //     <View style={[styles.container, { height: 20 }]}>
    //       <AnimatedLG
    //         style={[
    //           {
    //             ...StyleSheet.absoluteFillObject,
    //           },
    //           rStyle,
    //         ]}
    //         colors={["#ececec", "white", "#ececec"]}
    //         start={{ x: 0, y: 0 }}
    //         end={{ x: 1, y: 0 }}
    //       />
    //     </View>
    //   </View>
    //   <View>
    //     <View style={[styles.container, { height: 240, marginTop: 45 }]}>
    //       <AnimatedLG
    //         style={[
    //           {
    //             ...StyleSheet.absoluteFillObject,
    //           },
    //           rStyle,
    //         ]}
    //         colors={["#ececec", "white", "#ececec"]}
    //         start={{ x: 0, y: 0 }}
    //         end={{ x: 1, y: 0 }}
    //       />
    //     </View>
    //     <View
    //       style={[
    //         styles.container,
    //         {
    //           height: 10,
    //           width: 80,
    //         },
    //       ]}
    //     >
    //       <AnimatedLG
    //         style={[
    //           {
    //             ...StyleSheet.absoluteFillObject,
    //           },
    //           rStyle,
    //         ]}
    //         colors={["#ececec", "#f1f1f1", "#ececec"]}
    //         start={{ x: 0, y: 0 }}
    //         end={{ x: 1, y: 0 }}
    //       />
    //     </View>
    //     <View style={[styles.container, { height: 20 }]}>
    //       <AnimatedLG
    //         style={[
    //           {
    //             ...StyleSheet.absoluteFillObject,
    //           },
    //           rStyle,
    //         ]}
    //         colors={["#ececec", "white", "#ececec"]}
    //         start={{ x: 0, y: 0 }}
    //         end={{ x: 1, y: 0 }}
    //       />
    //     </View>
    //   </View>
    // </>
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
