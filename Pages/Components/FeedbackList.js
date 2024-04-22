import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Linking,
} from "react-native";
import { CustomText } from "./CustomText";
import { AirbnbRating } from "react-native-ratings";
import { ShortenString } from "../../Utils/helper";

const FeedbackList = ({ title, feedbacks }) => {
    return (
        <View>
            <View className="flex flex-row justify-between">
                <CustomText
                    style={{ color: "black", fontFamily: "Be Vietnam bold" }}
                >
                    {title}
                </CustomText>
                <CustomText
                    style={{
                        color: "#53B6ED",
                    }}
                    onPress={() => Linking.openURL("https://www.facebook.com/")}
                >
                    Xem tất cả
                </CustomText>
            </View>

            <ScrollView horizontal={true}>
                {feedbacks.map((feedback, id) => (
                    <TouchableOpacity
                        className="flex-1 w-36 gap-y-1 bg-white border border-gray-400 rounded-lg mr-2 mt-2 p-1"
                        key={id}
                        onPress={() =>
                            Linking.openURL("https://www.facebook.com/")
                        }
                    >
                        <View className="flex-row w-28">
                            <Image
                                className="w-4 h-4 mt-1 mr-1 resize-contain"
                                source={require("../../Public/Images/comment.png")}
                            ></Image>
                            <CustomText>{feedback.feedbackBy}</CustomText>
                        </View>
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
                        />
                        <CustomText>
                            {ShortenString(feedback.content, 45)}
                        </CustomText>
                        <View className="flex flex-grow items-end justify-end pr-2 pb-2">
                            <Image
                                className="w-4 h-4 resize-contain"
                                style={{ tintColor: "gray" }}
                                source={require("../../Public/Images/right-arrow.png")}
                            ></Image>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
export default FeedbackList;
