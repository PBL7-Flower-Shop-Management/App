import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { CustomText } from "../Components/CustomText";
import { GetFileType } from "../../Utils/helper";
import { ResizeMode, Video } from "expo-av";

const ImageSlide = ({ imageList }) => {
    const [active, setActive] = useState(0);
    const [status, setStatus] = useState({});
    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );

        if (slide !== active) setActive(slide);
    };

    return (
        <View className="flex-1">
            <ScrollView
                scrollEventThrottle={16}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                className="h-72 w-56 self-center"
                onScroll={change}
            >
                {imageList.map((image, index) => (
                    <View key={index}>
                        {GetFileType(image) === "image" ? (
                            <Image
                                source={{
                                    uri: image,
                                }}
                                className="h-72 w-56"
                            />
                        ) : (
                            <Video
                                className="h-72 w-56"
                                source={{ uri: image }}
                                useNativeControls
                                resizeMode={ResizeMode.CONTAIN}
                                isLooping
                                isMuted={false}
                                rate={1.0}
                                volume={1.0}
                                shouldPlay={true}
                                onPlaybackStatusUpdate={setStatus}
                            />
                        )}
                    </View>
                ))}
            </ScrollView>
            <View className="flex-row absolute bottom-0 self-center">
                {imageList.map((image, index) => (
                    <CustomText
                        key={index}
                        className="ml-1 mb-1"
                        style={{
                            fontSize: 6,
                            color: index === active ? "#fff" : "#888",
                        }}
                    >
                        ⬤
                    </CustomText>
                ))}
            </View>
        </View>
    );
};
export default ImageSlide;
