import React, { useState, useContext, useEffect } from "react";
import {
    TouchableOpacity,
    View,
    Image,
    StatusBar,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import { CustomText } from "../Components/CustomText";
import styles from "./styles.js";
import { scale } from "../../Utils/constants";
import { AuthContext } from "../../Context/AuthContext.js";
import { PopupContext } from "../../Context/PopupContext.js";

function Setting({ navigation }) {
    const [isWarningShow, SetIsWarningShow] = useState(false);
    const { userInfo, logout } = useContext(AuthContext);
    const { setVisible } = useContext(PopupContext);

    useEffect(() => {
        if (!userInfo) setVisible(true);
    }, [userInfo]);

    return (
        <View className="flex-1 bg-white">
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <View className="flex-row items-center h-10 mt-10">
                <TouchableOpacity
                    className="absolute z-10 p-4"
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        className="h-6 w-6"
                        source={require("../../Public/Images/leftArrow.png")}
                    />
                </TouchableOpacity>
                <View className="flex-grow">
                    <CustomText
                        className="self-center"
                        style={{ fontSize: 14 }}
                    >
                        Reset account
                    </CustomText>
                </View>
            </View>
            <View className="gap-y-4 pb-4 pt-4">
                <TouchableOpacity
                    className="flex-row justify-between px-2"
                    onPress={() => navigation.navigate("Profile")}
                >
                    <CustomText>Account information</CustomText>
                    <Image
                        className="h-6 w-6"
                        style={{ tintColor: "#31b1e0" }}
                        source={require("../../Public/Images/rightArrow.png")}
                    />
                </TouchableOpacity>
                <View className="-mx-10 h-0.5 bg-gray-100"></View>
                <TouchableOpacity className="flex-row justify-between px-2">
                    <CustomText>Address notebook</CustomText>
                    <Image
                        className="h-6 w-6"
                        style={{ tintColor: "#31b1e0" }}
                        source={require("../../Public/Images/rightArrow.png")}
                    />
                </TouchableOpacity>
                <View className="-mx-10 h-0.5 bg-gray-100"></View>
                <TouchableOpacity className="flex-row justify-between px-2">
                    <CustomText>Payment information</CustomText>
                    <Image
                        className="h-6 w-6"
                        style={{ tintColor: "#31b1e0" }}
                        source={require("../../Public/Images/rightArrow.png")}
                    />
                </TouchableOpacity>
            </View>
            <View className="flex-grow bg-gray-100 p-2 justify-end">
                <TouchableOpacity
                    className="bg-white items-center border rounded-lg border-red-400 p-2"
                    onPress={() => SetIsWarningShow(true)}
                >
                    <CustomText
                        style={{
                            color: "#FF6666",
                        }}
                    >
                        Logout
                    </CustomText>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isWarningShow}
                onRequestClose={() => {
                    SetIsWarningShow(!isWarningShow);
                }}
            >
                <TouchableWithoutFeedback
                    onPressOut={() => SetIsWarningShow(false)}
                >
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <View style={styles.modalHead}>
                                    <TouchableOpacity
                                        style={styles.iconCancel}
                                        onPress={() => SetIsWarningShow(false)}
                                    >
                                        <Image
                                            source={require("../../Public/Images/darkCancel.png")}
                                        />
                                    </TouchableOpacity>
                                    <CustomText style={styles.modalTitle}>
                                        Warning
                                    </CustomText>
                                </View>
                                <View style={styles.modalContent}>
                                    <CustomText
                                        style={{
                                            fontSize: 14 * scale,
                                            width: 270,
                                        }}
                                    >
                                        Are you sure you want to sign out?
                                    </CustomText>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 20,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            SetIsWarningShow(false);
                                            logout();
                                        }}
                                        style={styles.btnConfirm}
                                    >
                                        <CustomText
                                            style={{
                                                color: "white",
                                                fontFamily: "Be Vietnam bold",
                                            }}
                                        >
                                            Log out
                                        </CustomText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => SetIsWarningShow(false)}
                                        style={styles.btnCancel}
                                    >
                                        <CustomText
                                            style={{
                                                color: "#4F4F4F",
                                                fontFamily: "Be Vietnam bold",
                                            }}
                                        >
                                            Cancel
                                        </CustomText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <View className="mb-32"></View>
        </View>
    );
}

export default Setting;
