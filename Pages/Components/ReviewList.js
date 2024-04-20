import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { CustomText } from "./CustomText";
import { Rating, AirbnbRating } from "react-native-ratings";
import { ratingReview } from "../../Utils/constants";
import ImageVideoViewer from "./ImageVideoViewer";

const ReviewList = ({ title, overview, reviews }) => {
    return (
        <>
            <View className="flex gap-y-2">
                <CustomText
                    style={{
                        color: "black",
                        fontFamily: "Be Vietnam bold",
                    }}
                >
                    {title}
                </CustomText>
                {!reviews ? (
                    <View>
                        <CustomText>Chưa có lượt đánh giá nào!</CustomText>
                    </View>
                ) : (
                    <View>
                        <View className="flex-row gap-x-3 items-center justify-center pb-5">
                            <CustomText
                                style={{
                                    color: "black",
                                    fontSize: 23,
                                    fontFamily: "Be Vietnam bold",
                                }}
                            >
                                {overview.starsTotal}
                            </CustomText>
                            <Rating
                                startingValue={overview.starsTotal}
                                readonly={true}
                                imageSize={25}
                            />
                            <CustomText className="text-gray-400">
                                {overview.feedbacksTotal} đánh giá
                            </CustomText>
                        </View>
                        {reviews.map((review, id) => (
                            <View key={id} className="gap-y-2 pb-5">
                                <View className="h-0.5 bg-gray-100"></View>
                                <View className="items-start">
                                    <AirbnbRating
                                        count={5}
                                        reviews={ratingReview}
                                        defaultRating={review.numberOfStars}
                                        size={18}
                                        ratingContainerStyle={{
                                            flexDirection: "row-reverse",
                                            height: 40,
                                        }}
                                        starStyle={{
                                            marginHorizontal: 1,
                                        }}
                                        reviewColor={"black"}
                                        reviewSize={15}
                                    />
                                </View>
                                <View className="flex-row gap-x-1">
                                    <CustomText
                                        style={{
                                            fontFamily: "Be Vietnam Medium",
                                        }}
                                    >
                                        {review.feedbackBy}
                                    </CustomText>
                                    <CustomText className="text-gray-400">
                                        - {review.commentDate}
                                    </CustomText>
                                </View>
                                <CustomText>{review.content}</CustomText>
                                <ImageVideoViewer
                                    imageVideoList={review.imageVideoFiles}
                                />
                                <TouchableOpacity className="flex-row gap-x-1">
                                    <Image
                                        className="h-5 w-5"
                                        source={require("../../Public/Images/like.png")}
                                    />
                                    <CustomText>
                                        Hữu ích ({review.numberOfLikes})
                                    </CustomText>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </>
    );
};

export default ReviewList;
