import React from "react";
import { TouchableOpacity, View, Image, StatusBar } from "react-native";
import { CustomText } from "../Components/CustomText";

function Setting({ navigation }) {
    return (
        <View className="flex-1 bg-white">
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <View className="flex-row items-center h-10 mt-10">
                <TouchableOpacity
                    className="absolute z-10 p-4"
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        className="h-6 w-6"
                        source={require("../../Public/Images/leftArrow.png")}
                    />
                </TouchableOpacity>
                <View className="flex-grow">
                    <CustomText
                        className="self-center"
                        style={{ fontSize: 14 }}
                    >
                        Thiết lập tài khoản
                    </CustomText>
                </View>
            </View>
            <View className="gap-y-4 pb-4 pt-4">
                <TouchableOpacity
                    className="flex-row justify-between px-2"
                    onPress={() => navigation.navigate("Profile")}
                >
                    <CustomText>Thông tin tài khoản</CustomText>
                    <Image
                        className="h-6 w-6"
                        style={{ tintColor: "#31b1e0" }}
                        source={require("../../Public/Images/rightArrow.png")}
                    />
                </TouchableOpacity>
                <View className="-mx-10 h-0.5 bg-gray-100"></View>
                <TouchableOpacity className="flex-row justify-between px-2">
                    <CustomText>Sổ địa chỉ</CustomText>
                    <Image
                        className="h-6 w-6"
                        style={{ tintColor: "#31b1e0" }}
                        source={require("../../Public/Images/rightArrow.png")}
                    />
                </TouchableOpacity>
                <View className="-mx-10 h-0.5 bg-gray-100"></View>
                <TouchableOpacity className="flex-row justify-between px-2">
                    <CustomText>Thông tin thanh toán</CustomText>
                    <Image
                        className="h-6 w-6"
                        style={{ tintColor: "#31b1e0" }}
                        source={require("../../Public/Images/rightArrow.png")}
                    />
                </TouchableOpacity>
            </View>
            <View className="flex-grow bg-gray-100 p-2 justify-end">
                <TouchableOpacity className="bg-white items-center border rounded-lg border-red-400 p-2">
                    <CustomText
                        style={{
                            color: "#FF6666",
                        }}
                    >
                        Đăng xuất
                    </CustomText>
                </TouchableOpacity>
            </View>
            <View className="mb-32"></View>
        </View>
    );
}

export default Setting;
