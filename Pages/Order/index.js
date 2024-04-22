import React, { useState, useRef, useEffect } from "react";
import {
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Pressable,
    TextInput,
    ScrollView,
} from "react-native";
import { CustomText } from "../Components/CustomText";
import {
    orderStatus,
    scale,
    textInputDefaultSize,
} from "../../Utils/constants";
import { ShortenString } from "../../Utils/helper";

const Order = ({ navigation, route }) => {
    const inputRef = useRef(null);
    const scrollRef = useRef(null);
    const [txtSearch, SetTxtSearch] = useState(null);
    const [index, setIndex] = useState(route.params.orderType);
    const [cords, setCords] = useState([]);
    const [tmpOrders, setTmpOrders] = useState([]);

    useEffect(() => {
        if (route.params && scrollRef && cords.length > index - 1) {
            scrollRef.current.scrollTo({
                x: cords[index - 1],
                y: 0,
                animated: true,
            });
        }
    }, [route.params, scrollRef, cords]);

    useEffect(() => {
        setTmpOrders(
            orders.filter(
                (o) =>
                    index === 1 ||
                    o.status === Object.keys(orderStatus)[index - 2]
            )
        );
    }, [index]);

    const orders = [
        {
            orderDate: "01:30 10/03/2024",
            shipAddress: "123 Main St, Hanoi, Vietnam",
            shipPrice: 2,
            discount: 5,
            totalPrice: 351,
            status: "Processing",
            paymentMethod: "Credit Card",
            note: "Please wrap the flowers carefully.",
            orderDetail: [
                {
                    name: "Hoa hồng",
                    unitPrice: 12,
                    numberOfCrops: 24,
                    image: "https://elead.com.vn/wp-content/uploads/2020/04/anh-hoa-hong-sinh-nhat-2-1.jpg",
                },
                {
                    name: "Hoa tulip Hoa tulip Hoa tulip Hoa tulip Hoa tulip Hoa tulip",
                    unitPrice: 9,
                    numberOfCrops: 30,
                    image: "https://th.bing.com/th/id/OIP.1VOxCUI5Cf5EyFkpDOV-gAHaE7?rs=1&pid=ImgDetMain",
                },
            ],
        },
        {
            orderDate: "11:30 20/04/2024",
            shipAddress: "789 Elm St, Saigon, Vietnam",
            shipPrice: 3,
            discount: 3,
            totalPrice: 302,
            status: "Shipped",
            paymentMethod: "PayPal",
            note: "Delivery must be in the morning.",
            orderDetail: [
                {
                    name: "Hoa lan",
                    unitPrice: 20,
                    numberOfCrops: 15,
                    image: "https://th.bing.com/th/id/OIP.Uz0xFQA9BeSSBA9C_18AIgHaE8?rs=1&pid=ImgDetMain",
                },
            ],
        },
        {
            orderDate: "11:30 22/04/2024",
            shipAddress: "456 Oak St, Danang, Vietnam",
            shipPrice: 4,
            discount: 7,
            totalPrice: 451,
            status: "Delivered",
            paymentMethod: "Bank Transfer",
            note: "Check the flowers for freshness upon arrival.",
            orderDetail: [
                {
                    name: "Hoa ly",
                    unitPrice: 14,
                    numberOfCrops: 20,
                    image: "https://th.bing.com/th/id/OIP.XN3I47ZRSAfa62mzrD58RwHaE8?rs=1&pid=ImgDetMain",
                },
                {
                    name: "Hoa hướng dương",
                    unitPrice: 8,
                    numberOfCrops: 25,
                    image: "https://th.bing.com/th/id/R.7bd78de2e9a16242e2e7c748c74b6a1a?rik=JE0ZLvsQxkRTcw&riu=http%3a%2f%2f4.bp.blogspot.com%2f-EvQYk5Z2ISQ%2fTV1Y6C9VAlI%2fAAAAAAAAADA%2f0PviOUYUjU8%2fs1600%2fSunflower.jpg&ehk=BBsZwBo55K%2f7N3Zj3yzAkLsaw91mTVc0DD7QDg0rfxE%3d&risl=&pid=ImgRaw&r=0",
                },
            ],
        },
    ];

    return (
        <View className="flex-1 bg-gray-100">
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <View className="flex-row items-end justify-center pt-12 pb-3 bg-blue-400">
                <TouchableOpacity
                    className="absolute z-10 p-4 left-0 -bottom-1"
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        className="h-6 w-6"
                        style={{ tintColor: "white" }}
                        source={require("../../Public/Images/leftArrow.png")}
                    />
                </TouchableOpacity>
                <View className="">
                    <CustomText className="text-white" style={{ fontSize: 16 }}>
                        Đơn hàng của tôi
                    </CustomText>
                </View>
            </View>
            <View className="items-center p-3 opacity-100 flex-row bg-white">
                <Pressable
                    onPress={() => inputRef.current.focus()}
                    className="flex-row bg-DFE0E2 text-black rounded-md items-center pl-2 py-1 border border-gray-400"
                >
                    <Image
                        className="w-5 h-5 mr-2"
                        source={require("../../Public/Images/search.png")}
                    />
                    <TextInput
                        ref={inputRef}
                        placeholder="Tìm mã đơn hàng, tên sản phẩm, ..."
                        placeholderTextColor="gray"
                        value={txtSearch}
                        onChangeText={SetTxtSearch}
                        className="w-4/5 opacity-100"
                        style={{
                            fontSize: textInputDefaultSize * scale,
                        }}
                    ></TextInput>
                    <TouchableOpacity
                        className="flex-grow items-center p-1"
                        // onPress={() => SetModalVisible(true)}
                    >
                        <Image
                            className="h-5 w-5"
                            source={require("../../Public/Images/filter.png")}
                        />
                    </TouchableOpacity>
                </Pressable>
            </View>
            <View className="-mx-10 h-1 bg-gray-100"></View>
            <View>
                <ScrollView
                    ref={scrollRef}
                    horizontal={true}
                    className="bg-white"
                >
                    <TouchableOpacity
                        className={`p-4 ${
                            index === 1 && "border-b-2 border-b-blue-400"
                        }`}
                        onPress={() => setIndex(1)}
                        onLayout={(event) => {
                            const layout = event.nativeEvent.layout;
                            var newCords = [...cords];
                            newCords[1] = layout.x;
                            setCords(newCords);
                        }}
                    >
                        <CustomText
                            style={{
                                color: "gray",
                                fontFamily: "Be Vietnam bold",
                            }}
                        >
                            Tất cả đơn
                        </CustomText>
                    </TouchableOpacity>
                    {Object.values(orderStatus).map((value, id) => (
                        <TouchableOpacity
                            key={id}
                            className={`p-4 ${
                                index === id + 2 &&
                                "border-b-2 border-b-blue-400"
                            }`}
                            onPress={() => setIndex(id + 2)}
                            onLayout={(event) => {
                                const layout = event.nativeEvent.layout;
                                var newCords = [...cords];
                                newCords[id + 2] = layout.x;
                                setCords(newCords);
                            }}
                        >
                            <CustomText
                                style={{
                                    color: "gray",
                                    fontFamily: "Be Vietnam bold",
                                }}
                            >
                                {value}
                            </CustomText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <ScrollView className="flex-grow">
                {tmpOrders && tmpOrders.length > 0 ? (
                    <View>
                        {tmpOrders.map((o, id) => (
                            <View key={id}>
                                <View className="-mx-10 h-4 bg-gray-100"></View>
                                <View className="gap-y-2 py-2 bg-white">
                                    <CustomText
                                        className="text-lime-500 ml-2"
                                        style={{
                                            fontFamily: "Be Vietnam bold",
                                        }}
                                    >
                                        Giao vào Thứ hai, 21/09
                                    </CustomText>
                                    <View className="-mx-10 h-0.5 bg-gray-100"></View>
                                    <View className="flex-row gap-x-2 px-2">
                                        <Image
                                            className="h-20 w-20 rounded-lg"
                                            source={{
                                                uri: o.orderDetail[0].image,
                                            }}
                                        />
                                        <View>
                                            <CustomText
                                                style={{
                                                    fontFamily:
                                                        "Be Vietnam bold",
                                                }}
                                            >
                                                {ShortenString(
                                                    o.orderDetail
                                                        .map((od) => od.name)
                                                        .join(", "),
                                                    30
                                                )}
                                            </CustomText>
                                            <CustomText>
                                                {o.orderDetail.length} sản phẩm
                                                | {o.totalPrice}$
                                            </CustomText>
                                        </View>
                                    </View>
                                    <View className="flex-row justify-evenly gap-x-1 px-1">
                                        <TouchableOpacity className="items-center border border-blue-400 p-2 w-5/12 rounded-lg">
                                            <CustomText>
                                                Xem chi tiết
                                            </CustomText>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="items-center border border-yellow-500 p-2 w-5/12 px-4 rounded-lg">
                                            <CustomText>
                                                Theo dõi đơn
                                            </CustomText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View className="gap-y-3 items-center justify-center mt-28">
                        <Image
                            className="h-32 w-32 ml-4"
                            source={require("../../Public/Images/noOrder.png")}
                        />
                        <CustomText style={{ fontSize: 14 }}>
                            Chưa có đơn hàng nào!
                        </CustomText>
                    </View>
                )}
                <View className="mb-40"></View>
            </ScrollView>
        </View>
    );
};

export default Order;
