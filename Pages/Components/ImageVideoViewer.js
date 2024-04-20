import React, { useState } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    StyleSheet,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { Video, ResizeMode, Audio } from "expo-av";
import { GetFileType } from "../../Utils/helper";

const ImageVideoViewer = ({ imageVideoList }) => {
    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [imageIndex, SetImageIndex] = useState(0);
    const [status, setStatus] = useState({});
    const fileList = imageVideoList
        ? imageVideoList
              .filter((file) => file != "" && file != null && file != undefined)
              .map((file) => ({
                  url: file,
              }))
        : null;

    return (
        <View className="flex-1 bg-white mt-1">
            {fileList && (
                <>
                    <ScrollView
                        snapToInterval={200}
                        decelerationRate={"fast"}
                        alwaysBounceHorizontal={true}
                        horizontal
                        className="gap-x-2"
                    >
                        {fileList.map((file, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    SetImageIndex(index);
                                    SetIsModalVisible(true);
                                }}
                            >
                                {GetFileType(file.url) === "image" ? (
                                    <Image
                                        className="h-20 w-20"
                                        source={{
                                            uri: file.url,
                                        }}
                                    />
                                ) : (
                                    <View
                                        className="h-20 w-20"
                                        style={{
                                            overflow: "hidden",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Video
                                            className="absolute h-20 w-20"
                                            source={{ uri: file.url }}
                                            useNativeControls
                                            resizeMode={ResizeMode.CONTAIN}
                                            isLooping
                                            isMuted={false}
                                            rate={1.0}
                                            volume={1.0}
                                            onPlaybackStatusUpdate={setStatus}
                                        />
                                        <View
                                            style={{
                                                ...StyleSheet.absoluteFill,
                                            }}
                                        />
                                        <Image
                                            style={{
                                                width: 50,
                                                height: 50,
                                                tintColor: "white",
                                            }}
                                            source={require("../../Public/Images/start.png")}
                                        />
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </>
            )}
            <Modal
                visible={isModalVisible}
                transparent={true}
                onRequestClose={() => {
                    SetIsModalVisible(!isModalVisible);
                }}
                onBackdropPress={() => SetIsModalVisible(false)}
            >
                <ImageViewer
                    index={imageIndex}
                    imageUrls={fileList}
                    // onClick={() =>
                    //     SetIsModalVisible(
                    //         false
                    //     )
                    // }
                    enableSwipeDown={true}
                    onSwipeDown={() => SetIsModalVisible(false)}
                    renderImage={(file) => {
                        if (GetFileType(file.source.uri) === "image") {
                            return (
                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    <Image
                                        style={{
                                            flex: 1,
                                        }}
                                        source={{ uri: file.source.uri }}
                                    />
                                </View>
                            );
                        } else
                            return (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Video
                                        style={{
                                            height: 562.2254758418741,
                                            width: 375,
                                        }}
                                        source={{ uri: file.source.uri }}
                                        useNativeControls
                                        resizeMode={ResizeMode.CONTAIN}
                                        isLooping
                                        isMuted={false}
                                        rate={1.0}
                                        volume={1.0}
                                        shouldPlay={true}
                                        onPlaybackStatusUpdate={setStatus}
                                    />
                                </View>
                            );
                    }}
                />
            </Modal>
        </View>
    );
};
export default ImageVideoViewer;
