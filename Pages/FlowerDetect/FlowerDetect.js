import React, { useContext, useState, useEffect } from "react";
import { Image, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../Context/AuthContext.js";
import { toastConfig } from "../Components/ToastConfig.js";
import { CustomText } from "../Components/CustomText.js";
import styles from "./style.js";
import ScanAnimation from "../Components/ScanAnimation.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";

const FlowerDetect = ({ navigation, route }) => {
    const { refreshToken, userInfo } = useContext(AuthContext);

    useEffect(() => {
        if (route.params?.type) {
            SetType(route.params?.type);
        }
        if (route.params?.flashMode) {
            SetFlashMode(route.params?.flashMode);
        }
        if (route.params?.image) {
            SetImage(route.params?.image);
        }
    }, [route.params]);

    const [isLoading, SetIsLoading] = useState(false);
    const [type, SetType] = useState(CameraType.back);
    const [flashMode, SetFlashMode] = useState(FlashMode.off);
    const [image, SetImage] = useState(null);
    const [isShowAnimated, SetIsShowAnimated] = useState(false);
    const [detectDisabled, SetDetectDisabled] = useState(false);
    const [imageHeight, setImageHeight] = useState(100);

    const toggleCameraFlash = () => {
        SetFlashMode((current) =>
            current === FlashMode.off ? FlashMode.torch : FlashMode.off
        );
    };

    const detectImage = async () => {
        SetIsLoading(true);
        SetIsShowAnimated(true);
        SetDetectDisabled(true);

        let token = undefined;
        if (userInfo) {
            let result = await refreshToken();
            if (!result.isSuccessfully) {
                Toast.show({
                    type: "error",
                    text1: result.data,
                });
                SetIsLoading(false);
                SetIsShowAnimated(false);
                SetDetectDisabled(false);
                return;
            } else token = result.data;
        }
        const formData = new FormData();
        formData.append("flowerImage", image);

        const response = await FetchApi(
            UrlConfig.identification.classifyFlower,
            "POST",
            token,
            formData,
            true
        );

        if (response.succeeded) {
            navigation.navigate(
                "SuccessDetect",
                (params = {
                    result: response.data,
                })
            );
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }

        SetIsLoading(false);
        SetIsShowAnimated(false);
        SetDetectDisabled(false);
    };

    return (
        <View style={styles.container}>
            <Camera type={type} flashMode={flashMode} />
            <View style={styles.head}>
                <TouchableOpacity
                    style={styles.btnLight}
                    onPress={toggleCameraFlash}
                >
                    <Image
                        source={
                            flashMode === FlashMode.off
                                ? require("../../Public/Images/lightOff.png")
                                : require("../../Public/Images/lightOn.png")
                        }
                    />
                </TouchableOpacity>
                <CustomText style={styles.title}>Flower detect</CustomText>
                <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Image source={require("../../Public/Images/cancel.png")} />
                </TouchableOpacity>
            </View>
            <View style={styles.centerImage}>
                {isShowAnimated && <ScanAnimation imageHeight={imageHeight} />}
                {isLoading && (
                    <View style={styles.waitingCircle}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
                )}
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    source={{ uri: image?.uri }}
                    onLayout={(event) =>
                        setImageHeight(event.nativeEvent.layout.height)
                    }
                />
            </View>
            <View style={[styles.foot, { justifyContent: "center" }]}>
                <View style={[styles.bodyFoot, { gap: 100 }]}>
                    <TouchableOpacity
                        style={styles.btnDetectImage}
                        onPress={async () => {
                            await detectImage();
                        }}
                        disabled={detectDisabled}
                    >
                        {detectDisabled && <View style={styles.imageOverlay} />}
                        <Image
                            source={require("../../Public/Images/confirm.png")}
                            style={{
                                width: 65,
                                height: 65,
                                resizeMode: "stretch",
                            }}
                        />
                        <CustomText
                            style={{
                                color: "white",
                            }}
                        >
                            Detect
                        </CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnFlipCamera}
                        onPress={() =>
                            navigation.navigate({
                                name: "TakeImage",
                                params: { flashMode: flashMode },
                                merge: true,
                            })
                        }
                    >
                        <Image
                            source={require("../../Public/Images/reSelect.png")}
                            style={{
                                width: 65,
                                height: 65,
                            }}
                        />
                        <CustomText
                            style={{
                                color: "white",
                            }}
                        >
                            Change image
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};
export default FlowerDetect;
