import React, { useEffect, useState } from "react";
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
import { Rating } from "react-native-ratings";
import { ConvertToShortSoldQuantity } from "../../Utils/helper.js";
import {
    flowerStatus,
    flowerStatusColor,
    flowerStatusIcon,
} from "../../Utils/constants";
import DetailInformation from "../Components/DetailInformation.js";
import Information from "../Components/Information.js";
import ReviewList from "../Components/ReviewList.js";
import ImageSlide from "../Components/ImageSlide.js";
import { IncrementCounter } from "../Components/IncrementCounter.js";
import Cart from "../Components/Cart.js";
import Toast from "react-native-toast-message";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";

const FlowerDetail = ({ navigation, route }) => {
    const [value, setValue] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [flowerId, setFlowerId] = useState(null);
    const [flowerInformation, setFlowerInformation] = useState();
    const [reviews, setReviews] = useState();
    const [isLoading, SetIsLoading] = useState(false);
    const [refresh, SetRefresh] = useState(false);

    const getFlowerDetail = async (flowerId) => {
        const response = await FetchApi(
            UrlConfig.flower.getById.replace("{id}", flowerId),
            "GET",
            null
        );

        if (response.succeeded) {
            setFlowerInformation(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
        SetIsLoading(false);
        SetRefresh(false);
    };

    const getFlowerReview = async (flowerId) => {
        const response = await FetchApi(
            UrlConfig.flower.getFeedbacksOfFlower.replace("{id}", flowerId),
            "GET",
            null
        );

        if (response.succeeded) {
            setReviews(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
    };

    useEffect(() => {
        if (route.params?._id) {
            SetIsLoading(true);
            setFlowerId(route.params?._id);
            getFlowerDetail(route.params?._id);
            getFlowerReview(route.params?._id);
        }
    }, [route.params]);

    useEffect(() => {
        if (refresh) {
            getFlowerDetail(route.params?._id);
            getFlowerReview(route.params?._id);
        }
    }, [refresh]);

    return (
        <View className="flex-1 bg-white" style={{ flex: 1 }}>
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
            <View className="absolute z-10 top-10 flex-row w-full justify-between px-3">
                <TouchableOpacity
                    className="p-2 bg-gray-400 rounded-full"
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        className="h-5 w-5"
                        style={{ tintColor: "white" }}
                        source={require("../../Public/Images/leftArrow.png")}
                    />
                </TouchableOpacity>
                <View className="flex-row gap-x-1">
                    <TouchableOpacity
                        className="p-2 bg-gray-400 rounded-full"
                        onPress={() => setModalVisible(true)}
                    >
                        <Image
                            className="h-5 w-5"
                            style={{ tintColor: "white" }}
                            source={require("../../Public/Images/shopping-cart.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="p-2 bg-gray-400 rounded-full"
                        // onPress={() => SetModalVisible(true)}
                    >
                        <Image
                            className="h-5 w-5"
                            style={{ tintColor: "white" }}
                            source={require("../../Public/Images/more.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        style={{ tintColor: "green" }}
                        refreshing={refresh}
                        onRefresh={() => SetRefresh(true)}
                    />
                }
            >
                {flowerInformation && (
                    <View className="gap-y-2 px-2 mb-80">
                        {flowerInformation.imageVideoFiles ? (
                            <ImageSlide
                                imageList={flowerInformation.imageVideoFiles}
                            />
                        ) : (
                            <View className="h-2/6">
                                <Image
                                    className="h-full w-full"
                                    resizeMode="contain"
                                    source={require("../../Public/Images/default_avatar.png")}
                                />
                            </View>
                        )}
                        <CustomText
                            style={{
                                // color: "black",
                                fontFamily: "Be Vietnam bold",
                            }}
                        >
                            {flowerInformation.name}
                        </CustomText>
                        <View className="flex-row gap-x-1 items-center">
                            <CustomText
                                style={{ fontFamily: "Be Vietnam bold" }}
                            >
                                {flowerInformation.starsTotal}
                            </CustomText>
                            <Rating
                                startingValue={flowerInformation.starsTotal}
                                readonly={true}
                                imageSize={15}
                            />
                            <CustomText>
                                ({flowerInformation.feedbacksTotal})
                            </CustomText>
                            <CustomText>
                                | Đã bán{" "}
                                {ConvertToShortSoldQuantity(
                                    flowerInformation.soldQuantity
                                )}
                            </CustomText>
                        </View>
                        <View className="flex-row flex-grow justify-start items-end">
                            <CustomText
                                style={{
                                    fontFamily: "Be Vietnam bold",
                                }}
                            >
                                {flowerInformation.unitPrice}$
                            </CustomText>
                            {flowerInformation.discount > 0 && (
                                <View className="bg-gray-200 rounded-md ml-1 px-1 py-0.5">
                                    <CustomText
                                        className="text-black"
                                        style={{ fontSize: 10 }}
                                    >
                                        -{flowerInformation.discount}%
                                    </CustomText>
                                </View>
                            )}
                        </View>
                        <View
                            className={`flex flex-row self-start items-center
                             justify-center p-0.5 rounded-md`}
                            style={{
                                backgroundColor:
                                    flowerStatusColor[flowerInformation.status],
                            }}
                        >
                            <Image
                                className="w-4 h-4 resize-contain"
                                source={
                                    flowerStatusIcon[flowerInformation.status]
                                }
                            ></Image>
                            <CustomText
                                className="ml-1"
                                style={{ fontSize: 12 }}
                            >
                                {flowerStatus[flowerInformation.status]}
                            </CustomText>
                        </View>
                        <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                        <IncrementCounter
                            value={value}
                            setValue={setValue}
                            max={
                                flowerInformation.quantity -
                                flowerInformation.soldQuantity
                            }
                            unitPrice={flowerInformation.unitPrice}
                            discount={flowerInformation.discount}
                        />
                        <View className="flex-row justify-between p-1 px-2">
                            <TouchableOpacity
                                className="bg-white border-blue-500 border p-2 px-8 rounded-md"
                                onPress={() => setModalVisible(true)}
                            >
                                <CustomText className="text-blue-500">
                                    Thêm vào giỏ
                                </CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-red-500 p-2 px-12 rounded-md">
                                <CustomText className="text-white">
                                    Mua ngay
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                        <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                        <View className="p-2 gap-y-1">
                            <CustomText
                                style={{
                                    color: "black",
                                    fontFamily: "Be Vietnam bold",
                                }}
                            >
                                Thông tin vận chuyển
                            </CustomText>
                            <View className="flex-row gap-x-1">
                                <Image
                                    className="h-4 w-4"
                                    source={require("../../Public/Images/location.png")}
                                ></Image>
                                <CustomText>Giao đến</CustomText>
                                <CustomText
                                    style={{
                                        color: "black",
                                        fontFamily: "Be Vietnam bold",
                                    }}
                                >
                                    Q. Thanh Khê, P. An Khê, Đà Nẵng
                                </CustomText>
                            </View>
                        </View>
                        <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                        <View className="p-2 gap-y-1">
                            <DetailInformation
                                title="Tổng quan"
                                data={{
                                    "Danh mục": flowerInformation.category
                                        .map((c) => c.categoryName)
                                        .join(", "),
                                    "Xuất sứ": flowerInformation.origin,
                                    "Thời gian sinh trưởng":
                                        flowerInformation.growthTime,
                                }}
                            />
                        </View>
                        <View className="p-2 gap-y-1">
                            <Information
                                title="Thông tin chi tiết"
                                data={{
                                    "Mô tả sản phẩm":
                                        flowerInformation.description,
                                    "Môi trường": flowerInformation.habitat,
                                    "Cách chăm sóc": flowerInformation.care,
                                    "Cách phòng bệnh":
                                        flowerInformation.diseasePrevention,
                                }}
                            />
                        </View>
                        {reviews && (
                            <View className="p-2 gap-y-1">
                                <ReviewList
                                    title="Khách hàng đánh giá"
                                    overview={{
                                        starsTotal:
                                            flowerInformation.starsTotal,
                                        feedbacksTotal:
                                            flowerInformation.feedbacksTotal,
                                    }}
                                    reviews={reviews}
                                />
                            </View>
                        )}
                        <View className="mb-40"></View>
                    </View>
                )}
            </ScrollView>
            <Cart
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
            />
        </View>
    );
};
export default FlowerDetail;
