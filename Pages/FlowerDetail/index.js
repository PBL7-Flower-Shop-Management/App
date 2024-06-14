import React, { useContext, useEffect, useState } from "react";
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
import { ConvertToShortSoldQuantity, ShowAlert } from "../../Utils/helper.js";
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
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import { CartContext } from "../../Context/CartContext.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { PopupContext } from "../../Context/PopupContext.js";

const FlowerDetail = ({ navigation, route }) => {
    const [value, setValue] = useState(1);
    const [flowerId, setFlowerId] = useState(null);
    const [flowerInformation, setFlowerInformation] = useState();
    const [reviews, setReviews] = useState();
    const [isLoading, SetIsLoading] = useState(false);
    const [refresh, SetRefresh] = useState(false);
    const { setCartVisible } = useContext(CartContext);
    const { refreshToken, userInfo } = useContext(AuthContext);
    const { setVisible } = useContext(PopupContext);

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
            console.log(response.message);
            // Toast.show({
            //     type: "error",
            //     text1: response.message,
            // });
        }
    };

    const handleAddToCart = async () => {
        if (userInfo) {
            SetIsLoading(true);

            if (flowerInformation.status === flowerStatus["Available"]) {
                let result = await refreshToken();
                if (!result.isSuccessfully) {
                    Toast.show({
                        type: "error",
                        text1: result.data,
                    });
                    SetIsLoading(false);
                    return;
                }

                const response = await FetchApi(
                    UrlConfig.user.createCart,
                    "POST",
                    result.data,
                    {
                        flowerId: flowerId,
                        numberOfFlowers: value,
                    }
                );

                if (response.succeeded) {
                    setCartVisible(true);
                } else {
                    Toast.show({
                        type: "error",
                        text1: response.message,
                    });
                }
            } else {
                ShowAlert({
                    title: "Warning",
                    alertContent: "This product is out of stock!",
                    firstBtnName: "Close",
                    handleFirstBtn: () => {},
                });
            }

            SetIsLoading(false);
        } else {
            ShowAlert({
                title: "Warning",
                alertContent: "Login to manage your cart!",
                firstBtnName: "Login",
                secondBtnName: "Close",
                handleFirstBtn: () => {
                    setVisible(true);
                },
                handleSecondBtn: () => {},
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
            <View className="flex-row justify-between pt-12 pb-3 px-2 bg-transparent">
                <TouchableOpacity
                    // className="p-2 bg-gray-400 rounded-full"
                    className="p-2 bg-gray-400 rounded-full"
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        className="h-5 w-5"
                        style={{ tintColor: "white" }}
                        source={require("../../Public/Images/leftArrow.png")}
                    />
                </TouchableOpacity>
                <View className="flex-row gap-x-1 bg-transparent">
                    <TouchableOpacity
                        className="p-2 bg-gray-400 rounded-full"
                        onPress={() => setCartVisible(true)}
                    >
                        <Image
                            className="h-5 w-5"
                            style={{ tintColor: "white" }}
                            source={require("../../Public/Images/shopping-cart.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="p-2 bg-gray-400 rounded-full"
                        // onPress={() => setCartVisible(true)}
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
                                imageList={flowerInformation.imageVideoFiles.map(
                                    (image) => image.url
                                )}
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
                                | Sold{" "}
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
                        <View className="flex-row justify-evenly p-1 px-2">
                            <TouchableOpacity
                                className="bg-white border-blue-500 border p-2 px-8 rounded-md"
                                onPress={async () => {
                                    await handleAddToCart();
                                }}
                            >
                                <CustomText className="text-blue-500">
                                    Add to cart
                                </CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-red-500 p-2 px-12 rounded-md">
                                <CustomText className="text-white">
                                    Buy
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
                                Ship information
                            </CustomText>
                            <View className="flex-row gap-x-1">
                                <Image
                                    className="h-4 w-4"
                                    source={require("../../Public/Images/location.png")}
                                ></Image>
                                <CustomText>Ship to</CustomText>
                                <CustomText
                                    style={{
                                        color: "black",
                                        fontFamily: "Be Vietnam bold",
                                    }}
                                >
                                    Hoa Phat, Cam Le, TP Da Nang
                                </CustomText>
                            </View>
                        </View>
                        <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                        <View className="p-2 gap-y-1">
                            <DetailInformation
                                title="Overview"
                                data={{
                                    Category: flowerInformation.category
                                        .map((c) => c.categoryName)
                                        .join(", "),
                                    Origin: flowerInformation.origin,
                                    "Growth time": flowerInformation.growthTime,
                                }}
                            />
                        </View>
                        <View className="p-2 gap-y-1">
                            <Information
                                title="Detail information"
                                data={{
                                    Description: flowerInformation.description,
                                    Habitat: flowerInformation.habitat,
                                    "How to care": flowerInformation.care,
                                    "Disease prevention":
                                        flowerInformation.diseasePrevention,
                                }}
                            />
                        </View>
                        {reviews && (
                            <View className="p-2 gap-y-1">
                                <ReviewList
                                    title="Customer review"
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
            <Toast config={toastConfig} />
        </View>
    );
};
export default FlowerDetail;
