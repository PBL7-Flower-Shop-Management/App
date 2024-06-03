import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Image,
    StatusBar,
    ScrollView,
    RefreshControl,
} from "react-native";
import { CustomText } from "../Components/CustomText";
import { Result } from "../Components/Result";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { AuthContext } from "../../Context/AuthContext.js";

function IdentificationHistory() {
    const [identificationHistories, setIdentificationHistories] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, SetIsLoading] = useState(false);
    const { refreshToken } = useContext(AuthContext);

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
        SetIsLoading(true);
        getHistories();
    }, []);

    useEffect(() => {
        if (refresh) {
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
                        Lịch sử nhận dạng hoa
                    </CustomText>
                </View>
            </View>
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
                                Bạn chưa nhận dạng hoa lần nào!
                            </CustomText>
                        </View>
                    </View>
                )}
            </ScrollView>
            <Toast config={toastConfig} />
        </View>
    );
}

export default IdentificationHistory;
