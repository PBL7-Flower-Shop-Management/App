import React, { useState, useRef } from "react";
import {
    TextInput,
    View,
    StatusBar,
    TouchableOpacity,
    Pressable,
    Image,
    ScrollView,
} from "react-native";
import ProductList from "../Components/ProductList.js";
import { CustomText } from "../Components/CustomText";
import { scale, textInputDefaultSize } from "../../Utils/constants.js";
import FeedbackList from "../Components/FeedbackList.js";
import SuggestedProductList from "../Components/SuggestedProductList.js";

const Home = ({ navigation, route }) => {
    const [txtSearch, SetTxtSearch] = useState(null);
    const inputRef = useRef(null);

    const flowerBestSeller = [
        {
            name: "Hoa hướng dương",
            stars: 3.5,
            unitPrice: 200,
            status: "Available",
            discount: 20,
            imageVideoFiles: require("../../Public/Images/flower1.jpg"),
        },
        {
            name: "Hoa hồng",
            stars: 4.5,
            unitPrice: 180,
            status: "Available",
            discount: 18,
            imageVideoFiles: require("../../Public/Images/hoa-hong-1.jpg"),
        },
        {
            name: "Hoa ly vàng",
            stars: 5,
            unitPrice: 400,
            status: "Out of stock",
            discount: 10,
            imageVideoFiles: require("../../Public/Images/hoa-ly-vang.jpg"),
        },
    ];

    const decorativeFlowers = [
        {
            name: "Hoa mai",
            stars: 4,
            unitPrice: 1200,
            status: "Available",
            discount: 0,
            imageVideoFiles: require("../../Public/Images/hoa-mai.png"),
        },
        {
            name: "Hoa đào",
            stars: 2.5,
            unitPrice: 1800,
            status: "Out of stock",
            discount: 18,
            imageVideoFiles: require("../../Public/Images/hoa-dao.jpg"),
        },
        {
            name: "Hoa lan",
            stars: 4.5,
            unitPrice: 800,
            status: "Available",
            discount: 10,
            imageVideoFiles: require("../../Public/Images/hoa-lan.jpg"),
        },
    ];

    const flowersAsGifts = [
        {
            name: "Đoá hoa hồng",
            stars: 3.5,
            unitPrice: 320,
            status: "Available",
            discount: 20,
            imageVideoFiles: require("../../Public/Images/doa-hoa-hong.jpg"),
        },
        {
            name: "Bó hoa làm quà tặng",
            stars: 3.5,
            unitPrice: 350,
            status: "Out of stock",
            discount: 0,
            imageVideoFiles: require("../../Public/Images/doa-hoa.jpg"),
        },
        {
            name: "Hoa mừng sinh nhật",
            stars: 3.5,
            unitPrice: 400,
            status: "Out of stock",
            discount: 10,
            imageVideoFiles: require("../../Public/Images/hoa-sn.jpg"),
        },
    ];

    const feedbackList = [
        {
            content: "Giao hàng nhanh! Chất lượng sản phẩm khá là ưng ý!!!",
            numberOfStars: 4.5,
            feedbackBy: "Nguyễn Thế Đăng Hoan",
        },
        {
            content:
                "Đã mua hoa rồi còn được tặng kèm cả chậu nữa, shop tận tâm thật.",
            numberOfStars: 4,
            feedbackBy: "Trần Thị Xuân",
        },
        {
            content:
                "Hoa shop làm rất đẹp, người yêu tôi rất thích nó, cảm ơn shop nhiều nhé!",
            numberOfStars: 5,
            feedbackBy: "Lê Thành Long",
        },
        {
            content:
                "Kích cỡ đa dạng lại còn vừa túi tiền nữa, k mua thì phí lắm hehe",
            numberOfStars: 3.5,
            feedbackBy: "Trịnh Văn Dũng",
        },
    ];

    const suggestedProductList = [
        {
            name: "Đoá hoa hồng",
            stars: 3.5,
            unitPrice: 320,
            status: "Available",
            discount: 20,
            soldQuantity: 123420,
            imageVideoFiles: require("../../Public/Images/doa-hoa-hong.jpg"),
        },
        {
            name: "Bó hoa làm quà tặng",
            stars: 3.5,
            unitPrice: 350,
            status: "Out of stock",
            discount: 0,
            soldQuantity: 299222220,
            imageVideoFiles: require("../../Public/Images/doa-hoa.jpg"),
        },
        {
            name: "Hoa mừng sinh nhật",
            stars: 3.5,
            unitPrice: 400,
            status: "Out of stock",
            discount: 10,
            soldQuantity: 1021,
            imageVideoFiles: require("../../Public/Images/hoa-sn.jpg"),
        },
        {
            name: "Đoá hoa hồng",
            stars: 3.5,
            unitPrice: 320,
            status: "Available",
            discount: 20,
            soldQuantity: 123420,
            imageVideoFiles: require("../../Public/Images/doa-hoa-hong.jpg"),
        },
        {
            name: "Bó hoa làm quà tặng",
            stars: 3.5,
            unitPrice: 350,
            status: "Out of stock",
            discount: 0,
            soldQuantity: 299222220,
            imageVideoFiles: require("../../Public/Images/doa-hoa.jpg"),
        },
        {
            name: "Hoa mừng sinh nhật",
            stars: 3.5,
            unitPrice: 400,
            status: "Out of stock",
            discount: 10,
            soldQuantity: 1021,
            imageVideoFiles: require("../../Public/Images/hoa-sn.jpg"),
        },
        {
            name: "Đoá hoa hồng",
            stars: 3.5,
            unitPrice: 320,
            status: "Available",
            discount: 20,
            soldQuantity: 123420,
            imageVideoFiles: require("../../Public/Images/doa-hoa-hong.jpg"),
        },
        {
            name: "Bó hoa làm quà tặng",
            stars: 3.5,
            unitPrice: 350,
            status: "Out of stock",
            discount: 0,
            soldQuantity: 299222220,
            imageVideoFiles: require("../../Public/Images/doa-hoa.jpg"),
        },
        {
            name: "Hoa mừng sinh nhật",
            stars: 3.5,
            unitPrice: 400,
            status: "Out of stock",
            discount: 10,
            soldQuantity: 1021,
            imageVideoFiles: require("../../Public/Images/hoa-sn.jpg"),
        },
        {
            name: "Hoa mừng sinh nhật",
            stars: 3.5,
            unitPrice: 400,
            status: "Out of stock",
            discount: 10,
            soldQuantity: 1021,
            imageVideoFiles: require("../../Public/Images/hoa-sn.jpg"),
        },
    ];

    return (
        <View className="flex-1 bg-white">
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
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
                            className="flex-row flex-grow w-4/5 bg-DFE0E2 text-black rounded-md items-center pl-2 py-1 border"
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
                                className="flex-grow text-#5C5D60 opacity-100 border-#c9c3c3"
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
                            // onPress={() => SetModalVisible(true)}
                        >
                            <Image
                                className="h-5 w-5"
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
                <View className="mt-5 -mx-10 h-2.5 bg-gray-300"></View>
                <View className="mt-5">
                    <ProductList
                        title={"Trang trí nhà cửa"}
                        products={decorativeFlowers}
                        navigation={navigation}
                    />
                </View>
                <View className="mt-5 -mx-10 h-2.5 bg-gray-300"></View>
                <View className="mt-5">
                    <ProductList
                        title={"Làm quà tặng"}
                        products={flowersAsGifts}
                        navigation={navigation}
                    />
                </View>
                <View className="mt-5 -mx-10 h-2.5 bg-gray-300"></View>
                <View className="mt-5">
                    <FeedbackList
                        title={"Phản hồi tích cực"}
                        feedbacks={feedbackList}
                    />
                </View>
                <View className="mt-5 -mx-10 h-2.5 bg-gray-300"></View>
                <View className="mt-5">
                    <SuggestedProductList
                        title={"Gợi ý cho bạn"}
                        products={suggestedProductList}
                    />
                </View>
                <View className="mb-40"></View>
            </ScrollView>
        </View>
    );
};
export default Home;
