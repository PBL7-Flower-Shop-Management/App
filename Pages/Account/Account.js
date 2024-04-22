import React, { useState } from "react";
import {
    StatusBar,
    View,
    Image,
    Modal,
    TouchableOpacity,
    Pressable,
    ScrollView,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { CustomText } from "../Components/CustomText.js";
import {
    orderStatus,
    orderStatusIcon,
    userRole,
} from "../../Utils/constants.js";
import ProductList from "../Components/ProductList.js";
import Cart from "../Components/Cart.js";

const Account = ({ navigation }) => {
    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);
    const user = {
        name: "Nguyễn Thế Đăng Hoan",
        citizenId: "049202013212",
        email: "nguyenthedanghoan@gmail.com",
        phoneNumber: "0852556258",
        role: "Customer",
        avatar: "https://th.bing.com/th/id/OIP.ebPexDgG2kic7e_ubIhaqgHaEK?rs=1&pid=ImgDetMain",
    };
    const favoriteFlowers = [
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
    return (
        <View className="flex-1 bg-white p-3">
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <View className="flex-row justify-between mt-10">
                <CustomText
                    style={{ color: "black", fontFamily: "Be Vietnam bold" }}
                >
                    Tài khoản
                </CustomText>
                <View className="flex-row gap-x-2">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Setting")}
                    >
                        <Image
                            className="h-5 w-5"
                            source={require("../../Public/Images/setting.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCartVisible(true)}>
                        <Image
                            className="h-5 w-5"
                            source={require("../../Public/Images/shopping-cart.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-row mt-4">
                <View className="relative">
                    <TouchableOpacity
                        className="border border-gray-300 rounded-full p-1"
                        onPress={() => SetIsModalVisible(true)}
                    >
                        <Image
                            className="h-20 w-20 rounded-full"
                            source={
                                user.avatar
                                    ? { uri: user.avatar }
                                    : require("../../Public/Images/notFoundAvatar.png")
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className="absolute -bottom-1 right-1 p-1.5 rounded-full bg-gray-300">
                        <Image
                            className="h-5 w-5"
                            source={require("../../Public/Images/pen.png")}
                        />
                    </TouchableOpacity>
                    {user != null && (
                        <Modal
                            visible={isModalVisible}
                            transparent={true}
                            onRequestClose={() => {
                                SetIsModalVisible(!isModalVisible);
                            }}
                            onBackdropPress={() => SetIsModalVisible(false)}
                        >
                            <ImageViewer
                                index={0}
                                imageUrls={[
                                    {
                                        url: user.avatar,
                                    },
                                ]}
                                renderIndicator={() => {}}
                                onClick={() => SetIsModalVisible(false)}
                                enableSwipeDown={true}
                                onSwipeDown={() => SetIsModalVisible(false)}
                            />
                        </Modal>
                    )}
                </View>
                <View className="justify-evenly">
                    <TouchableOpacity
                        className="flex-row"
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <CustomText
                            style={{
                                fontSize: 16,
                                color: "black",
                                fontFamily: "Be Vietnam bold",
                            }}
                        >
                            {user.name}
                        </CustomText>
                        <View>
                            <Image
                                className="w-6 h-6"
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                    </TouchableOpacity>
                    <View className="bg-gray-300 items-center self-start p-1.5 px-4 rounded-full">
                        <CustomText>{userRole[user.role]}</CustomText>
                    </View>
                </View>
            </View>
            <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
            <Pressable
                onPress={() =>
                    navigation.navigate("Order", (params = { orderType: 1 }))
                }
            >
                <View className="flex-row justify-between mt-3">
                    <CustomText
                        style={{
                            fontSize: 16,
                            color: "black",
                            fontFamily: "Be Vietnam bold",
                        }}
                    >
                        Đơn hàng của tôi
                    </CustomText>
                    <Image
                        className="w-6 h-6"
                        source={require("../../Public/Images/rightArrow.png")}
                    />
                </View>
                <ScrollView
                    className="mt-3 gap-x-4"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {Object.entries(orderStatusIcon).map(
                        ([status, icon], id) => (
                            <TouchableOpacity
                                key={id}
                                className="items-center gap-y-2"
                                onPress={() =>
                                    navigation.navigate(
                                        "Order",
                                        (params = { orderType: id + 2 })
                                    )
                                }
                            >
                                <View className="bg-blue-100 rounded-full p-3.5">
                                    <Image
                                        className="w-7 h-7"
                                        style={{ tintColor: "#045eda" }}
                                        source={icon}
                                    />
                                </View>
                                <View className="w-20 items-center">
                                    <CustomText>
                                        {orderStatus[status]}
                                    </CustomText>
                                </View>
                            </TouchableOpacity>
                        )
                    )}
                </ScrollView>
            </Pressable>
            <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
            <Pressable onPress={() => console.log("click my order")}>
                <View className="flex-row justify-between mt-3">
                    <CustomText
                        style={{
                            fontSize: 16,
                            color: "black",
                            fontFamily: "Be Vietnam bold",
                        }}
                    >
                        Sản phẩm ưa thích
                    </CustomText>
                    <Image
                        className="w-6 h-6"
                        source={require("../../Public/Images/rightArrow.png")}
                    />
                </View>
                <ProductList
                    products={favoriteFlowers}
                    navigation={navigation}
                />
            </Pressable>
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
                visible={cartVisible}
                closeModal={() => setCartVisible(false)}
            />
        </View>
    );
};

export default Account;
