import React, { useState, useContext } from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeTab from "../HomeTab/index";
import { CustomText } from "./CustomText";
import { AuthContext } from "../../Context/AuthContext.js";
import { API_URL, scale } from "../../Utils/constants";
import FlowerDetectTab from "../FlowerDetect/index.js";
import AccountTab from "../Account/index.js";
import CategoryTab from "../Category/index.js";
import IdentificationHistoryTab from "../IdentificationHistory/index.js";
// import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
// import { HubConnectionBuilder } from "@microsoft/signalr";
// import { setupURLPolyfill } from "react-native-url-polyfill";
// import Notification from "../Notification/Notification.js";

// setupURLPolyfill();

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const BottomTab = ({ navigation }) => {
    const [isNavBarShow, SetIsNavBarShow] = useState(true);
    const [isNotify, SetIsNotify] = useState(false);
    const { logout, userInfo, refreshToken } = useContext(AuthContext);
    // useEffect(() => {
    //     const connection = new HubConnectionBuilder()
    //         .withUrl(API_URL + "notification?userId=" + userInfo.userId)
    //         .build();

    //     connection.start();

    //     connection.on("ReceiveNotification", (message) => {
    //         SetIsNotify(true);
    //     });
    //     return () => {
    //         connection.stop();
    //     };
    // }, [isNotify]);
    return (
        <View
            style={{
                position: "relative",
            }}
        >
            {isNavBarShow && (
                <>
                    {/* <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Notification", {
                                notify: isNotify,
                            });
                            SetIsNotify(false);
                        }}
                        style={styles.btnNotify}
                    >
                        {!isNotify ? (
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                }}
                                source={require("../../Public/Images/bell.png")}
                            />
                        ) : (
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                }}
                                source={require("../../Public/Images/bell-notify.png")}
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnLogout}
                    >
                        <Image
                            style={{
                                height: 25,
                                width: 25,
                            }}
                            source={require("../../Public/Images/logout.png")}
                        />
                    </TouchableOpacity> */}
                </>
            )}
            <View
                style={{
                    width,
                    height: "100%",
                }}
            >
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            position: "absolute",
                            elevation: 0,
                            backgroundColor: "white",
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            height: 96,
                            ...styles.shadow,
                        },
                    }}
                >
                    <Tab.Screen
                        name="HomeTab"
                        component={HomeTab}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        top: 3,
                                    }}
                                >
                                    <Image
                                        source={
                                            focused
                                                ? require("../../Public/Images/home.png")
                                                : require("../../Public/Images/lightHome.png")
                                        }
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused
                                                ? "#386BF6"
                                                : "gray",
                                        }}
                                    />
                                    <CustomText
                                        style={{
                                            color: focused ? "#386BF6" : "gray",
                                            fontSize: 10 * scale,
                                        }}
                                    >
                                        Trang chủ
                                    </CustomText>
                                </View>
                            ),
                        }}
                    />
                    {/* <Tab.Screen
                        name="Notification"
                        component={Notification}
                        options={{ tabBarButton: () => null }}
                    /> */}
                    <Tab.Screen
                        name="CategoryTab"
                        component={CategoryTab}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        top: 3,
                                    }}
                                >
                                    <Image
                                        source={
                                            focused
                                                ? require("../../Public/Images/category.png")
                                                : require("../../Public/Images/lightCategory.png")
                                        }
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused
                                                ? "#386BF6"
                                                : "gray",
                                        }}
                                    />
                                    <CustomText
                                        style={{
                                            color: focused ? "#386BF6" : "gray",
                                            fontSize: 10 * scale,
                                        }}
                                    >
                                        Danh mục
                                    </CustomText>
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="FlowerDetectTab"
                        options={{
                            tabBarIcon: () => (
                                <Image
                                    source={require("../../Public/Images/flowerDetect.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 80,
                                        height: 80,
                                    }}
                                />
                            ),
                            tabBarButton: (props) => (
                                <TouchableOpacity
                                    style={{
                                        top: -10,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // ...styles.shadow
                                    }}
                                    onPress={props.onPress}
                                >
                                    <View
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 100,
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        {props.children}
                                        <View className="items-center mt-1">
                                            <CustomText
                                                style={{
                                                    textAlign: "center",
                                                    color: "gray",
                                                    fontSize: 10 * scale,
                                                }}
                                            >
                                                Nhận dạng hoa
                                            </CustomText>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ),
                            tabBarStyle: {
                                display: "none",
                            },
                        }}
                    >
                        {() => (
                            <FlowerDetectTab
                                SetIsNavBarShow={SetIsNavBarShow}
                            />
                        )}
                    </Tab.Screen>
                    <Tab.Screen
                        name="IdentificationHistoryTab"
                        component={IdentificationHistoryTab}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        top: 3,
                                    }}
                                >
                                    <Image
                                        source={
                                            focused
                                                ? require("../../Public/Images/history.png")
                                                : require("../../Public/Images/lightHistory.png")
                                        }
                                        resizeMode="stretch"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused
                                                ? "#386BF6"
                                                : "gray",
                                        }}
                                    />
                                    <CustomText
                                        style={{
                                            color: focused ? "#386BF6" : "gray",
                                            fontSize: 10 * scale,
                                        }}
                                    >
                                        Lịch sử
                                    </CustomText>
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="AccountTab"
                        component={AccountTab}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        top: 3,
                                    }}
                                >
                                    <Image
                                        source={
                                            focused
                                                ? require("../../Public/Images/user.png")
                                                : require("../../Public/Images/lightUser.png")
                                        }
                                        resizeMode="stretch"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused
                                                ? "#386BF6"
                                                : "gray",
                                        }}
                                    />
                                    <CustomText
                                        style={{
                                            color: focused ? "#386BF6" : "gray",
                                            fontSize: 10 * scale,
                                        }}
                                    >
                                        Tài khoản
                                    </CustomText>
                                </View>
                            ),
                        }}
                    />
                </Tab.Navigator>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.85,
        shadowRadius: 9.5,
        elevation: 5,
    },
    btnLogout: {
        position: "absolute",
        right: 20,
        top: 50,
        paddingBottom: 15,
        paddingLeft: 10,
        zIndex: 1,
    },
    btnNotify: {
        position: "absolute",
        right: 60,
        top: 50,
        paddingBottom: 15,
        paddingLeft: 10,
        zIndex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 310,
    },
    modalHead: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
    },
    iconCancel: {
        position: "absolute",
        left: 10,
        padding: 5,
    },
    modalTitle: {
        fontSize: 15 * scale,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 15 * scale,
    },
    modalContent: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    btnConfirm: {
        width: 130,
        height: 56,
        backgroundColor: "#FF495F",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    btnCancel: {
        width: 130,
        height: 56,
        backgroundColor: "#F1F1F1",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
});

export default BottomTab;
