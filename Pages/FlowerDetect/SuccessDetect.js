import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import { scale } from "../../Utils/constants";
import { Result } from "../Components/Result";

const SuccessDetect = ({ navigation, route }) => {
    const [flowerInfo, SetFlowerInfo] = useState(null);

    useEffect(() => {
        if (route.params?.result) {
            SetFlowerInfo(route.params?.result);
        }
    }, [route.params]);

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: "#F1F2F2",
                },
            ]}
        >
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <View
                style={[
                    styles.content,
                    {
                        alignItems: "center",
                        height: "100%",
                    },
                ]}
            >
                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                    }}
                >
                    <TouchableOpacity
                        style={styles.backContainer}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require("../../Public/Images/back.png")}
                            style={styles.backBtn}
                        />
                    </TouchableOpacity>
                    <CustomText
                        style={{
                            fontFamily: "Be Vietnam bold",
                            color: "black",
                            fontSize: 20 * scale,
                        }}
                    >
                        Kết quả
                    </CustomText>
                </View>
                {flowerInfo && (
                    <View className="pt-2" style={{ height: "80%" }}>
                        <ScrollView className="m-0">
                            <Result data={flowerInfo} showHideOption={false} />
                            {/* <View className="mb-52"></View> */}
                        </ScrollView>
                    </View>
                )}
            </View>
        </View>
    );
};
export default SuccessDetect;
