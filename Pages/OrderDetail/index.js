import React, { useState, useEffect, useContext } from "react";
import {
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { CustomText } from "../Components/CustomText";
import { orderStatus } from "../../Utils/constants";
import {
    ConvertToShipDate,
    FixedFloat,
    FormatDate,
    ShortenString,
} from "../../Utils/helper";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import { AuthContext } from "../../Context/AuthContext.js";

const OrderDetail = ({ navigation, route }) => {
    const [order, setOrder] = useState();
    const [isLoading, SetIsLoading] = useState(false);
    const { refreshToken, userInfo: user } = useContext(AuthContext);

    const getOrder = async (orderId) => {
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
            UrlConfig.order.getById.replace("{id}", orderId),
            "GET",
            result.data
        );

        if (response.succeeded) {
            setOrder(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
        SetIsLoading(false);
    };

    useEffect(() => {
        if (route?.params?.orderId) {
            SetIsLoading(true);
            getOrder(route?.params?.orderId);
        }
    }, [route?.params]);

    return (
        <View className="flex-1 bg-gray-100">
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
                        Order detail
                    </CustomText>
                </View>
            </View>
            {order && (
                <ScrollView>
                    <View className="bg-white">
                        <View className="flex-row gap-x-1 p-2 py-4">
                            <Image
                                className="h-6 w-6"
                                source={require("../../Public/Images/order.png")}
                            />
                            <View>
                                <CustomText
                                    style={{
                                        fontSize: 12.5,
                                        fontFamily: "Be Vietnam bold",
                                    }}
                                >
                                    Order code: {order._id}
                                </CustomText>
                                <CustomText
                                    style={{ fontSize: 12, color: "gray" }}
                                >
                                    Order date: {FormatDate(order.orderDate)}
                                </CustomText>
                                <CustomText
                                    className="text-lime-500 mt-1"
                                    style={{
                                        fontSize: 12,
                                        fontFamily: "Be Vietnam bold",
                                    }}
                                >
                                    Ship on {ConvertToShipDate(order.shipDate)}
                                </CustomText>
                            </View>
                        </View>
                        <View className="-mx-10 h-2 bg-gray-100"></View>
                        <View className="flex-row gap-x-1 p-2 py-4">
                            <Image
                                className="h-6 w-6"
                                source={require("../../Public/Images/product.png")}
                            />
                            <View>
                                <CustomText
                                    style={{ fontFamily: "Be Vietnam bold" }}
                                >
                                    Ordered product ({order.orderDetails.length}
                                    )
                                </CustomText>
                                <View>
                                    {order.orderDetails.map((od, id) => (
                                        <TouchableOpacity
                                            className="flex-row items-center mt-2 border rounded-lg p-1 pl-2"
                                            key={id}
                                            style={
                                                od.imageVideoFiles &&
                                                od.imageVideoFiles.length > 0
                                                    ? {
                                                          justifyContent:
                                                              "space-between",
                                                      }
                                                    : { gap: 10 }
                                            }
                                            onPress={() => {
                                                navigation.navigate(
                                                    "FlowerDetail",
                                                    (params = {
                                                        _id: od.flowerId,
                                                    })
                                                );
                                            }}
                                        >
                                            <CustomText>{id + 1}.</CustomText>
                                            <View className="w-3/5 self-start">
                                                <CustomText
                                                    style={{
                                                        fontFamily:
                                                            "Be Vietnam bold",
                                                    }}
                                                >
                                                    {ShortenString(od.name, 20)}
                                                </CustomText>
                                                <CustomText
                                                    style={{
                                                        fontSize: 12,
                                                        color: "gray",
                                                    }}
                                                >
                                                    Unit price: {od.unitPrice}$
                                                </CustomText>
                                                <CustomText
                                                    style={{
                                                        fontSize: 12,
                                                        color: "gray",
                                                    }}
                                                >
                                                    Quantity:{" "}
                                                    {od.numberOfFlowers}
                                                </CustomText>
                                                {od.discount > 0 && (
                                                    <CustomText
                                                        style={{
                                                            fontSize: 12,
                                                            color: "gray",
                                                        }}
                                                    >
                                                        Discount: {od.discount}%
                                                    </CustomText>
                                                )}
                                                <CustomText
                                                    style={{
                                                        fontSize: 12,
                                                        color: "gray",
                                                    }}
                                                >
                                                    Total price:{" "}
                                                    {(
                                                        od.unitPrice *
                                                        od.numberOfFlowers *
                                                        (1 - od.discount / 100)
                                                    ).toFixed(2)}
                                                    $
                                                </CustomText>
                                            </View>
                                            {od.imageVideoFiles &&
                                                od.imageVideoFiles.length >
                                                    0 && (
                                                    <Image
                                                        className="h-20 w-20 rounded-lg"
                                                        source={{
                                                            uri: od
                                                                .imageVideoFiles[0]
                                                                .url,
                                                        }}
                                                    />
                                                )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <View className="-mx-10 h-2 bg-gray-100"></View>
                        <View className="flex-row gap-x-1 p-2 py-4">
                            <Image
                                className="h-6 w-6"
                                source={require("../../Public/Images/tracking.png")}
                            />
                            <View>
                                <CustomText
                                    style={{ fontFamily: "Be Vietnam bold" }}
                                >
                                    Order tracking
                                </CustomText>
                                <CustomText
                                    className="text-blue-400"
                                    style={{
                                        fontSize: 12,
                                        fontFamily: "Be Vietnam italic",
                                    }}
                                >
                                    {orderStatus[order.status]}
                                </CustomText>
                            </View>
                        </View>
                        <View className="-mx-10 h-2 bg-gray-100"></View>
                        <View className="flex-row gap-x-1 p-2 py-4">
                            <Image
                                className="h-6 w-6"
                                source={require("../../Public/Images/location.png")}
                            />
                            <View>
                                <CustomText
                                    style={{ fontFamily: "Be Vietnam bold" }}
                                >
                                    Ship address
                                </CustomText>
                                <CustomText
                                    style={{
                                        fontSize: 12,
                                        fontFamily: "Be Vietnam Medium",
                                    }}
                                >
                                    {user.name}
                                </CustomText>
                                <CustomText
                                    style={{
                                        fontSize: 12,
                                        color: "gray",
                                    }}
                                >
                                    {user.phoneNumber}
                                </CustomText>
                                <CustomText
                                    style={{
                                        fontSize: 12,
                                        color: "gray",
                                    }}
                                >
                                    {order.shipAddress}
                                </CustomText>
                            </View>
                        </View>
                        <View className="-mx-10 h-2 bg-gray-100"></View>
                        <View className="flex-row gap-x-1 p-2 py-4">
                            <Image
                                className="h-5 w-5 mr-1"
                                source={require("../../Public/Images/wallet.png")}
                            />
                            <View>
                                <CustomText
                                    style={{ fontFamily: "Be Vietnam bold" }}
                                >
                                    Payment method
                                </CustomText>
                                <CustomText
                                    style={{
                                        fontSize: 12,
                                        color: "gray",
                                    }}
                                >
                                    {order.paymentMethod}
                                </CustomText>
                            </View>
                        </View>
                        <View className="-mx-10 h-2 bg-gray-100"></View>
                        <View className="px-2">
                            <View className="flex-row justify-between py-2">
                                <CustomText
                                    className="text-gray-400"
                                    style={{ fontSize: 13 }}
                                >
                                    Temporary payment
                                </CustomText>
                                <CustomText
                                    style={{ fontFamily: "Be Vietnam Medium" }}
                                >
                                    {FixedFloat(
                                        (order.totalPrice - order.shipPrice) /
                                            (1 - order.discount / 100),
                                        2
                                    )}
                                    $
                                </CustomText>
                            </View>
                            <View className="-mx-10 h-0.5 bg-gray-100"></View>
                            <View className="flex-row justify-between py-2">
                                <CustomText
                                    className="text-gray-400"
                                    style={{ fontSize: 13 }}
                                >
                                    Discount
                                </CustomText>
                                <CustomText
                                    style={{ fontFamily: "Be Vietnam Medium" }}
                                >
                                    {
                                        -FixedFloat(
                                            (((order.totalPrice -
                                                order.shipPrice) /
                                                (1 - order.discount / 100)) *
                                                order.discount) /
                                                100,
                                            2
                                        )
                                    }
                                    $
                                </CustomText>
                            </View>
                            <View className="-mx-10 h-0.5 bg-gray-100"></View>
                            <View className="flex-row justify-between py-2">
                                <CustomText
                                    className="text-gray-400"
                                    style={{ fontSize: 13 }}
                                >
                                    Ship fee
                                </CustomText>
                                <CustomText
                                    style={{ fontFamily: "Be Vietnam Medium" }}
                                >
                                    {FixedFloat(order.shipPrice, 2)}$
                                </CustomText>
                            </View>
                            <View className="-mx-10 h-0.5 bg-gray-100"></View>
                            <View className="flex-row justify-between py-2">
                                <CustomText
                                    style={{
                                        fontFamily: "Be Vietnam Medium",
                                        fontSize: 13,
                                    }}
                                >
                                    Into money
                                </CustomText>
                                <CustomText
                                    style={{ fontFamily: "Be Vietnam Medium" }}
                                >
                                    {FixedFloat(order.totalPrice, 2)}$
                                </CustomText>
                            </View>
                        </View>
                        <View className="-mx-10 h-2 bg-gray-100"></View>
                    </View>
                    {order.status !== "Cancelled" && (
                        <View className="flex-grow bg-gray-100 p-2 justify-end">
                            <TouchableOpacity className="bg-white items-center border rounded-lg border-red-400 p-2">
                                <CustomText
                                    style={{
                                        color: "#FF6666",
                                    }}
                                >
                                    Cancel order
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View className="mb-40"></View>
                </ScrollView>
            )}
            <Toast config={toastConfig} />
        </View>
    );
};

export default OrderDetail;
