import React, { useState, useEffect, useContext } from "react";
import {
    View,
    StatusBar,
    TouchableOpacity,
    Pressable,
    Image,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import ProductList from "../Components/ProductList.js";
import { CustomText } from "../Components/CustomText";
import { scale, textInputDefaultSize } from "../../Utils/constants.js";
import FeedbackList from "../Components/FeedbackList.js";
import SuggestedProductList from "../Components/SuggestedProductList.js";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import { CartContext } from "../../Context/CartContext.js";

const Home = ({ navigation }) => {
    const [flowerBestSeller, setFlowerBestSeller] = useState([]);
    const [decorativeFlowers, setDecorativeFlowers] = useState([]);
    const [flowersAsGifts, setFlowersAsGifts] = useState([]);
    const [feedbackList, setFeedbackList] = useState([]);
    const [suggestedProductList, setSuggestedProductList] = useState([]);
    const [isLoading, SetIsLoading] = useState(false);
    const [refresh, SetRefresh] = useState(false);
    const { setCartVisible } = useContext(CartContext);

    const getFLowerBestSeller = async () => {
        const response = await FetchApi(
            UrlConfig.flower.getBestSeller + "?limit=10",
            "GET",
            null
        );

        if (response.succeeded) {
            setFlowerBestSeller(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
    };

    const getDecorativeFlowers = async () => {
        const response = await FetchApi(
            UrlConfig.flower.getDecoration + "?limit=10",
            "GET",
            null
        );

        if (response.succeeded) {
            setDecorativeFlowers(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
    };

    const getFlowerAsGift = async () => {
        const response = await FetchApi(
            UrlConfig.flower.getGift + "?limit=10",
            "GET",
            null
        );

        if (response.succeeded) {
            setFlowersAsGifts(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
        SetIsLoading(false);
        SetRefresh(false);
    };

    const getFeedbackList = async () => {
        const response = await FetchApi(
            UrlConfig.feedback.getRecentlyAll + "?limit=10",
            "GET",
            null
        );

        if (response.succeeded) {
            setFeedbackList(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
    };

    const getSuggestedProductList = async () => {
        const response = await FetchApi(
            UrlConfig.flower.getSuggest,
            "GET",
            null
        );

        if (response.succeeded) {
            setSuggestedProductList(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
    };

    const getAllDataFromApi = () => {
        getFLowerBestSeller();
        getDecorativeFlowers();
        getFlowerAsGift();
        getFeedbackList();
        getSuggestedProductList();
    };

    useEffect(() => {
        SetIsLoading(true);
        getAllDataFromApi();
    }, []);

    useEffect(() => {
        if (refresh) {
            getAllDataFromApi();
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
            {isLoading && (
                <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
                    <ActivityIndicator size="large" color="green" />
                </View>
            )}
            <View className="px-4">
                <View className="mt-10 w-full">
                    <CustomText className="text-blue-500">
                        FLOWER SHOP
                        <CustomText className="text-yellow-500">
                            {" "}
                            | Best choice
                        </CustomText>
                    </CustomText>
                    <View className="opacity-100 flex-row bg-white mt-1 pl-2">
                        <Pressable
                            onPress={() => navigation.navigate("Search")}
                            className="flex-row flex-grow w-4/5 bg-DFE0E2 text-black rounded-md items-center pl-2 py-1 border border-gray-400"
                        >
                            <Image
                                className="w-5 h-5 mr-2"
                                source={require("../../Public/Images/search.png")}
                            />
                            <View className="w-4/5 text-#5C5D60 opacity-100 border-#c9c3c3">
                                <CustomText
                                    style={{
                                        fontSize: textInputDefaultSize * scale,
                                    }}
                                >
                                    Search
                                </CustomText>
                            </View>
                            <TouchableOpacity
                                className="p-1 flex-row flex-end"
                                // onPress={() => setCartVisible(true)}
                            >
                                <Image
                                    className="h-5 w-5"
                                    source={require("../../Public/Images/filter.png")}
                                />
                            </TouchableOpacity>
                        </Pressable>
                        <TouchableOpacity
                            className="w-10 p-1 flex-row flex-end items-center justify-center"
                            onPress={() => setCartVisible(true)}
                        >
                            <Image
                                className="h-6 w-6"
                                source={require("../../Public/Images/shopping-cart.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView
                className="px-4 mt-5"
                refreshControl={
                    <RefreshControl
                        style={{ tintColor: "green" }}
                        refreshing={refresh}
                        onRefresh={() => SetRefresh(true)}
                    />
                }
            >
                <View className="">
                    <ProductList
                        title={"Best seller"}
                        products={flowerBestSeller}
                        navigation={navigation}
                        url={UrlConfig.flower.getBestSeller}
                    />
                </View>
                <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                <View className="mt-5">
                    <ProductList
                        title={"Home decoration"}
                        products={decorativeFlowers}
                        navigation={navigation}
                        url={UrlConfig.flower.getDecoration}
                    />
                </View>
                <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                <View className="mt-5">
                    <ProductList
                        title={"For the gift"}
                        products={flowersAsGifts}
                        navigation={navigation}
                        url={UrlConfig.flower.getGift}
                    />
                </View>
                <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                <View className="mt-5">
                    <FeedbackList
                        title={"Recent feedback"}
                        feedbacks={feedbackList}
                        navigation={navigation}
                    />
                </View>
                <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                <View className="mt-5">
                    <SuggestedProductList
                        title={"Suggestions for you"}
                        products={suggestedProductList}
                        navigation={navigation}
                    />
                </View>
            </ScrollView>
            <Toast config={toastConfig} />
        </View>
    );
};
export default Home;
