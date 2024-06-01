import React, { useState, useRef, useEffect } from "react";
import {
    TextInput,
    View,
    StatusBar,
    TouchableOpacity,
    Pressable,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import ProductList from "../Components/ProductList.js";
import { CustomText } from "../Components/CustomText";
import { scale, textInputDefaultSize } from "../../Utils/constants.js";
import FeedbackList from "../Components/FeedbackList.js";
import SuggestedProductList from "../Components/SuggestedProductList.js";
import Cart from "../Components/Cart.js";
import Toast from "react-native-toast-message";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";

const Home = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [txtSearch, SetTxtSearch] = useState(null);
    const inputRef = useRef(null);
    const [flowerBestSeller, setFlowerBestSeller] = useState([]);
    const [decorativeFlowers, setDecorativeFlowers] = useState([]);
    const [flowersAsGifts, setFlowersAsGifts] = useState([]);
    const [feedbackList, setFeedbackList] = useState([]);
    const [suggestedProductList, setSuggestedProductList] = useState([]);
    const [isLoading, SetIsLoading] = useState(false);

    const getFLowerBestSeller = async () => {
        const response = await FetchApi(
            UrlConfig.flower.getBestSeller,
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
            UrlConfig.flower.getDecoration,
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
        const response = await FetchApi(UrlConfig.flower.getGift, "GET", null);

        if (response.succeeded) {
            setFlowersAsGifts(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
    };

    const getFeedbackList = async () => {
        const response = await FetchApi(
            UrlConfig.feedback.getRecentlyAll,
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

    useEffect(() => {
        SetIsLoading(true);
        getFLowerBestSeller();
        getDecorativeFlowers();
        getFlowerAsGift();
        getFeedbackList();
        getSuggestedProductList();
        SetIsLoading(false);
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
                <View style="absolute t-0 l-0 r-0 b-0 justify-center items-center">
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
                            onPress={() => inputRef.current.focus()}
                            className="flex-row flex-grow w-4/5 bg-DFE0E2 text-black rounded-md items-center pl-2 py-1 border border-gray-400"
                        >
                            <Image
                                className="w-5 h-5 mr-2"
                                source={require("../../Public/Images/search.png")}
                            />
                            <TextInput
                                ref={inputRef}
                                placeholder="Tìm kiếm"
                                placeholderTextColor="gray"
                                value={txtSearch}
                                onChangeText={SetTxtSearch}
                                className="w-4/5 text-#5C5D60 opacity-100 border-#c9c3c3"
                                style={{
                                    fontSize: textInputDefaultSize * scale,
                                }}
                            ></TextInput>
                            <TouchableOpacity
                                className="p-1 flex-row flex-end"
                                // onPress={() => SetModalVisible(true)}
                            >
                                <Image
                                    className="h-5 w-5"
                                    source={require("../../Public/Images/filter.png")}
                                />
                            </TouchableOpacity>
                        </Pressable>
                        <TouchableOpacity
                            className="w-10 p-1 flex-row flex-end items-center justify-center"
                            onPress={() => setModalVisible(true)}
                        >
                            <Image
                                className="h-6 w-6"
                                source={require("../../Public/Images/shopping-cart.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView className="px-4 mt-5">
                <View className="">
                    <ProductList
                        title={"Bán chạy nhất"}
                        products={flowerBestSeller}
                        navigation={navigation}
                    />
                </View>
                <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                <View className="mt-5">
                    <ProductList
                        title={"Trang trí nhà cửa"}
                        products={decorativeFlowers}
                        navigation={navigation}
                    />
                </View>
                <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                <View className="mt-5">
                    <ProductList
                        title={"Làm quà tặng"}
                        products={flowersAsGifts}
                        navigation={navigation}
                    />
                </View>
                <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                <View className="mt-5">
                    <FeedbackList
                        title={"Phản hồi tích cực"}
                        feedbacks={feedbackList}
                    />
                </View>
                <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                <View className="mt-5">
                    <SuggestedProductList
                        title={"Gợi ý cho bạn"}
                        products={suggestedProductList}
                        navigation={navigation}
                    />
                </View>
            </ScrollView>
            <Cart
                products={[
                    {
                        id: 1,
                        name: "Hoa hướng dương",
                        unitPrice: 123,
                        discount: 12,
                        numberOfFlowers: 12,
                        image: "https://th.bing.com/th/id/R.516e257fdf19eb76477265007bff6f68?rik=yDSJCcpSgFh0aA&riu=http%3a%2f%2fblogcaycanh.vn%2fuploads%2fcaycanh%2f1388107807_hoa-huong-duong.jpg&ehk=y1%2batE2X8bX2zrci35kvSFY7sMbTb%2fpbV5QPR6%2fQ9rI%3d&risl=&pid=ImgRaw&r=0",
                        remainAmount: 23,
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "Hoa đào",
                        unitPrice: 321,
                        discount: 82,
                        numberOfFlowers: 3,
                        image: "https://th.bing.com/th/id/R.88c7ab37edaae90a6a87f992ec449987?rik=RCcIweKARQ%2bqLQ&pid=ImgRaw&r=0",
                        remainAmount: 5,
                        selected: false,
                    },
                    {
                        id: 3,
                        name: "Hoa mừng sinh nhật",
                        unitPrice: 157,
                        discount: 33,
                        numberOfFlowers: 134,
                        image: "https://th.bing.com/th/id/OIP.jd84v1WHL2uhU9Jaz1UmQAHaGA?rs=1&pid=ImgDetMain",
                        remainAmount: 233,
                        selected: false,
                    },
                ]}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
            />
        </View>
    );
};
export default Home;
