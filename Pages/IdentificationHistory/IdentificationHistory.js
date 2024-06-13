import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Image,
    StatusBar,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from "react-native";
import { CustomText } from "../Components/CustomText";
import { Result } from "../Components/Result";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { PopupContext } from "../../Context/PopupContext.js";

function IdentificationHistory() {
    const [identificationHistories, setIdentificationHistories] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, SetIsLoading] = useState(false);
    const { refreshToken, userInfo } = useContext(AuthContext);
    const { setVisible } = useContext(PopupContext);

    const getHistories = async () => {
        SetIsLoading(true);
        let result = await refreshToken();
        if (!result.isSuccessfully) {
            Toast.show({
                type: "error",
                text1: result.data,
            });
        } else {
            const response = await FetchApi(
                UrlConfig.user.getAllIdentification,
                "GET",
                result.data
            );

            if (response.succeeded) {
                setIdentificationHistories(response.data);
            } else {
                Toast.show({
                    type: "error",
                    text1: response.message,
                });
            }
        }
        SetIsLoading(false);
        setRefresh(false);
    };

    useEffect(() => {
        if (userInfo) {
            SetIsLoading(true);
            getHistories();
        }
    }, []);

    useEffect(() => {
        if (refresh && userInfo) {
            getHistories();
        }
    }, [refresh]);

    return (
        <View className="flex-1 bg-white">
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <View className="flex-row items-end justify-center pt-12 pb-3 bg-blue-400">
                <View className="">
                    <CustomText className="text-white" style={{ fontSize: 16 }}>
                        Flower detect history
                    </CustomText>
                </View>
            </View>
            {userInfo ? (
                <ScrollView
                    className="m-0"
                    refreshControl={
                        <RefreshControl
                            style={{ tintColor: "green" }}
                            refreshing={refresh}
                            onRefresh={() => setRefresh(true)}
                        />
                    }
                >
                    {identificationHistories &&
                    identificationHistories.length > 0 ? (
                        <View className="pt-2 px-2">
                            {identificationHistories.map((ih, id) => (
                                <Result key={id} data={ih} />
                            ))}
                            <View className="mb-52"></View>
                        </View>
                    ) : (
                        <View>
                            <View className="gap-y-3 items-center justify-center mt-28">
                                <Image
                                    className="h-32 w-32 ml-4"
                                    source={require("../../Public/Images/not-detect.png")}
                                />
                                <CustomText style={{ fontSize: 14 }}>
                                    You have not identified flowers yet!
                                </CustomText>
                            </View>
                        </View>
                    )}
                </ScrollView>
            ) : (
                <View className="items-center justify-center h-4/6">
                    <CustomText>Sign in to see your detect history!</CustomText>
                    <TouchableOpacity
                        className="rounded-md p-2 mt-4 w-32 items-center justify-center"
                        style={{ backgroundColor: "#60A5FA" }}
                        onPress={() => {
                            setVisible(true);
                        }}
                    >
                        <CustomText style={{ color: "white" }}>
                            Login
                        </CustomText>
                    </TouchableOpacity>
                </View>
            )}
            <Toast config={toastConfig} />
        </View>
    );
}

export default IdentificationHistory;
