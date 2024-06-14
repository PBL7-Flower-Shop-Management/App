import React, { useState, useEffect } from "react";
import {
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { CustomText } from "../Components/CustomText";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import { AirbnbRating } from "react-native-ratings";
import { FormatDate } from "../../Utils/helper.js";
import { scale } from "../../Utils/constants.js";

const Feedback = ({ navigation }) => {
    const [feedbackList, SetFeedbackList] = useState([]);
    const [isLoading, SetIsLoading] = useState(false);
    const [refresh, SetRefresh] = useState(false);

    const getFeedbacks = async () => {
        SetIsLoading(true);
        const response = await FetchApi(
            UrlConfig.feedback.getRecentlyAll,
            "GET",
            null
        );

        if (response.succeeded) {
            SetFeedbackList(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
        SetIsLoading(false);
        SetRefresh(false);
    };

    useEffect(() => {
        if (refresh) {
            getFeedbacks();
        }
    }, [refresh]);

    useEffect(() => {
        getFeedbacks();
    }, []);

    return (
        <View className="flex-1 bg-white">
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            {isLoading && (
                <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
                    <ActivityIndicator size="large" color="green" />
                </View>
            )}
            <View className="pr-4">
                <View className="mt-10 w-full">
                    <View className="opacity-100 flex-row bg-white mt-1">
                        <TouchableOpacity
                            className="p-2 ml-1"
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                className="w-5 h-5"
                                source={require("../../Public/Images/back.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <CustomText
                style={{
                    marginLeft: 20,
                    marginVertical: 10,
                    fontFamily: "Be Vietnam bold",
                }}
            >
                Recent feedback
            </CustomText>

            <ScrollView
                className="px-4"
                refreshControl={
                    <RefreshControl
                        style={{ tintColor: "green" }}
                        refreshing={refresh}
                        onRefresh={() => SetRefresh(true)}
                    />
                }
            >
                <View className="">
                    {feedbackList &&
                        feedbackList.map((feedback, id) => (
                            <TouchableOpacity
                                className="flex-1 gap-y-1 bg-white border border-gray-400 rounded-lg mr-2 mt-2 p-1"
                                key={id}
                                onPress={() =>
                                    navigation.navigate("FlowerDetail", {
                                        _id: feedback.flowerId,
                                    })
                                }
                            >
                                <View className="flex-row">
                                    <Image
                                        className="w-4 h-4 mt-1 mr-1 resize-contain"
                                        source={require("../../Public/Images/comment.png")}
                                    ></Image>
                                    <CustomText>
                                        {feedback.feedbackBy}
                                    </CustomText>
                                </View>
                                <View className="flex-row justify-between px-1">
                                    <AirbnbRating
                                        showRating={false}
                                        count={5}
                                        defaultRating={feedback.numberOfStars}
                                        size={14}
                                        ratingContainerStyle={{
                                            alignSelf: "left",
                                        }}
                                        starStyle={{
                                            marginHorizontal: 1,
                                        }}
                                        isDisabled={true}
                                    />
                                    <CustomText
                                        className="text-gray-400"
                                        style={{ fontSize: 12 * scale }}
                                    >
                                        {FormatDate(feedback.commentDate)}
                                    </CustomText>
                                </View>
                                <CustomText>{feedback.content}</CustomText>
                                <View className="flex flex-grow items-end justify-end pr-2 pb-2">
                                    <Image
                                        className="w-4 h-4 resize-contain"
                                        style={{ tintColor: "gray" }}
                                        source={require("../../Public/Images/right-arrow.png")}
                                    ></Image>
                                </View>
                            </TouchableOpacity>
                        ))}
                </View>
            </ScrollView>
            <Toast config={toastConfig} />
        </View>
    );
};
export default Feedback;
