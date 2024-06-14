import React, { useState, useRef, useEffect, useContext } from "react";
import {
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Pressable,
    TextInput,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { CustomText } from "../Components/CustomText";
import {
    orderStatus,
    scale,
    textInputDefaultSize,
} from "../../Utils/constants";
import { ConvertToShipDate, ShortenString } from "../../Utils/helper";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import { AuthContext } from "../../Context/AuthContext.js";

const Order = ({ navigation, route }) => {
    const inputRef = useRef(null);
    const scrollRef = useRef(null);
    const [txtSearch, SetTxtSearch] = useState(null);
    const [index, setIndex] = useState();
    const [cords, setCords] = useState([]);
    const [orders, setOrders] = useState([]);
    const [tmpOrders, setTmpOrders] = useState([]);
    const [isLoading, SetIsLoading] = useState(false);
    const [refresh, SetRefresh] = useState(false);
    const { refreshToken } = useContext(AuthContext);

    const getOrders = async () => {
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
            UrlConfig.user.getAllOrder,
            "GET",
            result.data
        );

        if (response.succeeded) {
            setOrders(response.data);
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
        if (route.params && scrollRef && cords.length > index - 1) {
            scrollRef.current.scrollTo({
                x: cords[index - 1],
                y: 0,
                animated: true,
            });
        }
    }, [route.params, scrollRef, cords]);

    useEffect(() => {
        if (index) {
            setTmpOrders(
                orders.filter(
                    (o) =>
                        index === 1 ||
                        o.status === Object.keys(orderStatus)[index - 2]
                )
            );
        }
    }, [index, orders]);

    useEffect(() => {
        if (route.params?.orderType) {
            setIndex(route.params?.orderType);
        }
    }, [route.params]);

    useEffect(() => {
        SetIsLoading(true);
        getOrders();
    }, []);

    useEffect(() => {
        if (refresh) {
            getOrders();
        }
    }, [refresh]);

    return (
        <View className="flex-1 bg-gray-100">
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            {isLoading && (
                <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center z-10">
                    <ActivityIndicator size="large" color="green" />
                </View>
            )}
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
                        My orders
                    </CustomText>
                </View>
            </View>
            {/* <View className="items-center p-3 opacity-100 flex-row bg-white">
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
                        placeholder="Find order code, product name,..."
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
                        // onPress={() => setCartVisible(true)}
                    >
                        <Image
                            className="h-5 w-5"
                            source={require("../../Public/Images/filter.png")}
                        />
                    </TouchableOpacity>
                </Pressable>
            </View> */}
            <View className="-mx-10 h-1 bg-gray-100"></View>
            <View>
                <ScrollView
                    ref={scrollRef}
                    horizontal={true}
                    className="bg-white"
                    refreshControl={
                        <RefreshControl
                            style={{ tintColor: "green" }}
                            refreshing={refresh}
                            onRefresh={() => SetRefresh(true)}
                        />
                    }
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
                            All orders
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
            <ScrollView
                className="flex-grow"
                refreshControl={
                    <RefreshControl
                        style={{ tintColor: "green" }}
                        refreshing={refresh}
                        onRefresh={() => SetRefresh(true)}
                    />
                }
            >
                {tmpOrders && tmpOrders.length > 0 ? (
                    <View>
                        {tmpOrders.map((o, id) => (
                            <View key={id}>
                                {o.orderDetails &&
                                    o.orderDetails.length > 0 && (
                                        <>
                                            <View className="-mx-10 h-4 bg-gray-100"></View>
                                            <View className="gap-y-2 py-2 bg-white">
                                                <CustomText
                                                    className="text-lime-500 ml-2"
                                                    style={{
                                                        fontFamily:
                                                            "Be Vietnam bold",
                                                    }}
                                                >
                                                    Ship on{" "}
                                                    {ConvertToShipDate(
                                                        o.shipDate
                                                    )}
                                                </CustomText>
                                                <View className="-mx-10 h-0.5 bg-gray-100"></View>
                                                <View className="flex-row gap-x-2 px-2">
                                                    <Image
                                                        className="h-20 w-20 rounded-lg"
                                                        source={{
                                                            uri: o
                                                                .orderDetails[0]
                                                                .image,
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
                                                                o.orderDetails
                                                                    .map(
                                                                        (od) =>
                                                                            od.name
                                                                    )
                                                                    .join(", "),
                                                                30
                                                            )}
                                                        </CustomText>
                                                        <CustomText>
                                                            {
                                                                o.orderDetails
                                                                    .length
                                                            }{" "}
                                                            product(s) |{" "}
                                                            {o.totalPrice}$
                                                        </CustomText>
                                                    </View>
                                                </View>
                                                <View className="flex-row justify-evenly gap-x-1 px-1">
                                                    <TouchableOpacity
                                                        className="items-center border border-blue-400 p-2 w-5/12 rounded-lg"
                                                        onPress={() =>
                                                            navigation.navigate(
                                                                "OrderDetail",
                                                                (params = {
                                                                    orderId:
                                                                        o._id,
                                                                })
                                                            )
                                                        }
                                                    >
                                                        <CustomText>
                                                            View detail
                                                        </CustomText>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity className="items-center border border-red-500 p-2 w-5/12 px-4 rounded-lg">
                                                        <CustomText>
                                                            Cancel order
                                                        </CustomText>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </>
                                    )}
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
                            No orders yet!
                        </CustomText>
                    </View>
                )}
                <View className="mb-40"></View>
            </ScrollView>
            <Toast config={toastConfig} />
        </View>
    );
};

export default Order;
