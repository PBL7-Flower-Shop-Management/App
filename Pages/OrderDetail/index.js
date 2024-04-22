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
import { FixedFloat, ShortenString } from "../../Utils/helper";

const OrderDetail = ({ navigation, route }) => {
    const user = {
        name: "Nguyễn Thế Đăng Hoan",
        citizenId: "049202013212",
        email: "nguyenthedanghoan@gmail.com",
        phoneNumber: "0852556258",
        role: "Customer",
        avatar: "https://th.bing.com/th/id/OIP.ebPexDgG2kic7e_ubIhaqgHaEK?rs=1&pid=ImgDetMain",
    };
    const order = {
        orderId: 12,
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
                discount: 12,
                image: "https://elead.com.vn/wp-content/uploads/2020/04/anh-hoa-hong-sinh-nhat-2-1.jpg",
            },
            {
                name: "Hoa tulip Hoa tulip Hoa tulip Hoa tulip Hoa tulip Hoa tulip",
                unitPrice: 9,
                numberOfCrops: 30,
                discount: 0,
                image: "https://th.bing.com/th/id/OIP.1VOxCUI5Cf5EyFkpDOV-gAHaE7?rs=1&pid=ImgDetMain",
            },
        ],
    };

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
                        Chi tiết đơn hàng
                    </CustomText>
                </View>
            </View>
            <ScrollView>
                <View className="bg-white">
                    <View className="flex-row gap-x-1 p-2 py-4">
                        <Image
                            className="h-6 w-6"
                            source={require("../../Public/Images/order.png")}
                        />
                        <View>
                            <CustomText
                                style={{ fontFamily: "Be Vietnam bold" }}
                            >
                                Mã đơn hàng: {order.orderId}
                            </CustomText>
                            <CustomText style={{ fontSize: 12, color: "gray" }}>
                                Ngày đặt hàng: {order.orderDate}
                            </CustomText>
                            <CustomText
                                className="text-lime-500 mt-1"
                                style={{
                                    fontSize: 12,
                                    fontFamily: "Be Vietnam bold",
                                }}
                            >
                                Giao vào Thứ hai, 21/09
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
                                Sản phẩm đã đặt ({order.orderDetail.length})
                            </CustomText>
                            <View>
                                {order.orderDetail.map((od, id) => (
                                    <TouchableOpacity
                                        className="flex-row items-center justify-between mt-2 border rounded-lg p-1 pl-2"
                                        key={id}
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
                                                Đơn giá: {od.unitPrice}$
                                            </CustomText>
                                            <CustomText
                                                style={{
                                                    fontSize: 12,
                                                    color: "gray",
                                                }}
                                            >
                                                Số lượng: {od.numberOfCrops}
                                            </CustomText>
                                            {od.discount > 0 && (
                                                <CustomText
                                                    style={{
                                                        fontSize: 12,
                                                        color: "gray",
                                                    }}
                                                >
                                                    Giảm giá: {od.discount}%
                                                </CustomText>
                                            )}
                                            <CustomText
                                                style={{
                                                    fontSize: 12,
                                                    color: "gray",
                                                }}
                                            >
                                                Tổng tiền:{" "}
                                                {od.unitPrice *
                                                    od.numberOfCrops *
                                                    (1 - od.discount / 100)}
                                                $
                                            </CustomText>
                                        </View>
                                        <Image
                                            className="h-20 w-20 rounded-lg"
                                            source={{ uri: od.image }}
                                        />
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
                                Theo dõi đơn hàng
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
                                Địa chỉ người nhận
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
                                Hình thức thanh toán
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
                                Tạm tính
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
                                Giảm giá
                            </CustomText>
                            <CustomText
                                style={{ fontFamily: "Be Vietnam Medium" }}
                            >
                                {
                                    -FixedFloat(
                                        (((order.totalPrice - order.shipPrice) /
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
                                Phí vận chuyển
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
                                Thành tiền
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
                                Huỷ đơn
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                )}
                <View className="mb-40"></View>
            </ScrollView>
        </View>
    );
};

export default OrderDetail;
