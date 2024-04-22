import React, { useState } from "react";
import { View, StatusBar, TouchableOpacity, Image, Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { CustomText } from "../Components/CustomText";

const Profile = ({ navigation }) => {
    const [isModalVisible, SetIsModalVisible] = useState(false);
    const user = {
        name: "Nguyễn Thế Đăng Hoan",
        citizenId: "049202013212",
        email: "nguyenthedanghoan@gmail.com",
        phoneNumber: "0852556258",
        role: "Customer",
        avatar: "https://th.bing.com/th/id/OIP.ebPexDgG2kic7e_ubIhaqgHaEK?rs=1&pid=ImgDetMain",
    };
    return (
        <View className="flex-1 bg-gray-100">
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <View className="relative h-1/4 bg-blue-400">
                <View className="flex-row items-center h-10 mt-10">
                    <TouchableOpacity
                        className="absolute z-10 p-4"
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            className="h-6 w-6"
                            style={{ tintColor: "white" }}
                            source={require("../../Public/Images/leftArrow.png")}
                        />
                    </TouchableOpacity>
                    <View className="flex-grow">
                        <CustomText
                            className="self-center text-white"
                            style={{ fontSize: 14 }}
                        >
                            Thông tin tài khoản
                        </CustomText>
                    </View>
                </View>

                <View className="absolute self-center -bottom-20">
                    <TouchableOpacity
                        className="border border-gray-300 rounded-full p-1"
                        onPress={() => SetIsModalVisible(true)}
                    >
                        <Image
                            className="h-40 w-40 rounded-full"
                            source={
                                user.avatar
                                    ? { uri: user.avatar }
                                    : require("../../Public/Images/notFoundAvatar.png")
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className="absolute -bottom-1 right-4 p-1.5 rounded-full bg-gray-300">
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
            </View>
            <View className="mt-20">
                <View className="gap-y-0.5 pb-4 pt-4">
                    <TouchableOpacity
                        className="bg-white flex-row px-3 py-4 items-center"
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <Image
                            className="h-5 w-5 ml-1 mr-3"
                            style={{ tintColor: "gray" }}
                            source={require("../../Public/Images/lightUser.png")}
                        />
                        <View>
                            <CustomText>Họ và tên</CustomText>
                            <CustomText className="text-gray-400">
                                {user.name ?? "Thêm họ tên"}
                            </CustomText>
                        </View>
                        <View className="flex-grow justify-center items-end">
                            <Image
                                className="h-6 w-6"
                                style={{ tintColor: "#31b1e0" }}
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                    </TouchableOpacity>
                    <View className="-mx-20 h-0.5 bg-gray-100"></View>
                    <TouchableOpacity
                        className="bg-white flex-row px-3 py-4 items-center"
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <Image
                            className="h-7 w-7 mr-2"
                            style={{ tintColor: "gray" }}
                            source={require("../../Public/Images/card.png")}
                        />
                        <View>
                            <CustomText>CCCD/CMND</CustomText>
                            <CustomText className="text-gray-400">
                                {user.citizenId ?? "Thêm CCCD/CMND"}
                            </CustomText>
                        </View>
                        <View className="flex-grow justify-center items-end">
                            <Image
                                className="h-6 w-6"
                                style={{ tintColor: "#31b1e0" }}
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                    </TouchableOpacity>
                    <View className="-mx-10 h-0.5 bg-gray-100"></View>
                    <TouchableOpacity
                        className="bg-white flex-row px-3 py-4 items-center"
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <Image
                            className="h-5 w-5 ml-1 mr-3"
                            style={{ tintColor: "gray" }}
                            source={require("../../Public/Images/phone.png")}
                        />
                        <View>
                            <CustomText>Số điện thoại</CustomText>
                            <CustomText className="text-gray-400">
                                {user.phoneNumber ?? "Thêm số điện thoại"}
                            </CustomText>
                        </View>
                        <View className="flex-grow justify-center items-end">
                            <Image
                                className="h-6 w-6"
                                style={{ tintColor: "#31b1e0" }}
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                    </TouchableOpacity>
                    <View className="-mx-10 h-0.5 bg-gray-100"></View>
                    <TouchableOpacity
                        className="bg-white flex-row px-3 py-4 items-center"
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <Image
                            className="h-7 w-7 mr-2"
                            style={{ tintColor: "gray" }}
                            source={require("../../Public/Images/email.png")}
                        />
                        <View>
                            <CustomText>Email</CustomText>
                            <CustomText className="text-gray-400">
                                {user.email ?? "Thêm email"}
                            </CustomText>
                        </View>
                        <View className="flex-grow justify-center items-end">
                            <Image
                                className="h-6 w-6"
                                style={{ tintColor: "#31b1e0" }}
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                    </TouchableOpacity>
                    <View className="-mx-10 h-0.5 bg-gray-100"></View>
                    <TouchableOpacity
                        className="bg-white flex-row px-3 py-4 items-center"
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <Image
                            className="h-6 w-6 ml-0.5 mr-2"
                            style={{ tintColor: "gray" }}
                            source={require("../../Public/Images/darkLock.png")}
                        />
                        <CustomText>Thiết lập mật khẩu</CustomText>
                        <View className="flex-grow justify-center items-end">
                            <Image
                                className="h-6 w-6"
                                style={{ tintColor: "#31b1e0" }}
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Profile;
