import React, { useContext, useEffect, useState } from "react";
import {
    StatusBar,
    View,
    Image,
    Modal,
    TouchableOpacity,
    Pressable,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { CustomText } from "../Components/CustomText.js";
import {
    orderStatus,
    orderStatusIcon,
    userRole,
} from "../../Utils/constants.js";
import ProductList from "../Components/ProductList.js";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { CartContext } from "../../Context/CartContext.js";
import { PopupContext } from "../../Context/PopupContext.js";
import * as ImagePicker from "expo-image-picker";
import { appendJsonToFormData } from "../../Utils/helper.js";

const Account = ({ navigation, route }) => {
    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [favoriteFlowers, setFavoriteFlowers] = useState([]);
    const [userInformation, setUserInformation] = useState(null);
    const { refreshToken, userInfo, SetUserInfo } = useContext(AuthContext);
    const [isLoading, SetIsLoading] = useState(false);
    const { setCartVisible } = useContext(CartContext);
    const { setVisible } = useContext(PopupContext);

    const getUserInformation = async () => {
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
            UrlConfig.user.getProfile,
            "GET",
            result.data
        );

        if (response.succeeded) {
            SetUserInfo({ ...userInfo, ...response.data });
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
    };

    const getFavouriteFlowers = async () => {
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
            UrlConfig.user.getFavouriteFlower,
            "GET",
            result.data
        );

        if (response.succeeded) {
            setFavoriteFlowers(response.data);
        } else {
            console.log(response.message);
            // Toast.show({
            //     type: "error",
            //     text1: response.message,
            // });
        }
        SetIsLoading(false);
    };

    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            await updateAvatar(result.assets[0].uri);
        }
    };

    const updateAvatar = async (uri) => {
        SetIsLoading(true);
        let result = await refreshToken();
        if (!result.isSuccessfully) {
            Toast.show({
                type: "error",
                text1: result.data,
            });
            SetIsLoading(false);
            return;
        }

        const formData = new FormData();
        const image = {
            uri: uri,
            type: "image/jpeg",
            name: "photo.jpg",
        };
        formData.append("avatar", image);

        const response = await FetchApi(
            UrlConfig.user.updateProfile,
            "PUT",
            result.data,
            appendJsonToFormData(formData, {
                name: userInformation.name,
                email: userInformation.email,
            }),
            true
        );
        if (response.succeeded) {
            SetUserInfo({ ...userInfo, avatarUrl: response.data.avatarUrl });
            Toast.show({
                type: "success",
                text1: "Update avatar successfully!",
            });
        } else
            Toast.show({
                type: "error",
                text1: response.message,
            });
        SetIsLoading(false);
    };

    useEffect(() => {
        if (userInfo) {
            SetIsLoading(true);
            getUserInformation();
            getFavouriteFlowers();
        }
    }, []);

    useEffect(() => {
        if (userInfo) {
            setUserInformation(userInfo);
        }
    }, [userInfo]);

    useEffect(() => {
        if (route.params?.changePasswordSuccess) {
            Toast.show({
                type: "success",
                text1: "Change password successfully! Let's login!",
            });
        }
    }, [route.params]);

    return (
        <View className="flex-1 bg-white p-3">
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
            <View className="flex-row justify-between mt-10">
                <CustomText
                    style={{ color: "black", fontFamily: "Be Vietnam bold" }}
                >
                    Account
                </CustomText>
                <View className="flex-row gap-x-2">
                    {userInfo && (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Setting")}
                        >
                            <Image
                                className="h-5 w-5"
                                source={require("../../Public/Images/setting.png")}
                            />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => setCartVisible(true)}>
                        <Image
                            className="h-5 w-5"
                            source={require("../../Public/Images/shopping-cart.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {userInfo ? (
                <>
                    <View className="flex-row mt-4">
                        <View className="relative">
                            <TouchableOpacity
                                className="border border-gray-300 rounded-full p-1"
                                onPress={() => SetIsModalVisible(true)}
                            >
                                <Image
                                    className="h-20 w-20 rounded-full"
                                    source={
                                        userInformation?.avatarUrl
                                            ? { uri: userInformation.avatarUrl }
                                            : require("../../Public/Images/notFoundAvatar.png")
                                    }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="absolute -bottom-1 right-1 p-1.5 rounded-full bg-gray-300"
                                onPress={async () => await chooseImage()}
                            >
                                <Image
                                    className="h-5 w-5"
                                    source={require("../../Public/Images/pen.png")}
                                />
                            </TouchableOpacity>
                            {userInformation != null && (
                                <Modal
                                    visible={isModalVisible}
                                    transparent={true}
                                    onRequestClose={() => {
                                        SetIsModalVisible(!isModalVisible);
                                    }}
                                    onBackdropPress={() =>
                                        SetIsModalVisible(false)
                                    }
                                >
                                    <ImageViewer
                                        index={0}
                                        imageUrls={[
                                            {
                                                url: userInformation.avatarUrl,
                                            },
                                        ]}
                                        renderIndicator={() => {}}
                                        onClick={() => SetIsModalVisible(false)}
                                        enableSwipeDown={true}
                                        onSwipeDown={() =>
                                            SetIsModalVisible(false)
                                        }
                                    />
                                </Modal>
                            )}
                        </View>
                        <View className="justify-evenly ml-1">
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
                                    {userInformation?.name}
                                </CustomText>
                                <View>
                                    <Image
                                        className="w-6 h-6"
                                        source={require("../../Public/Images/rightArrow.png")}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View className="bg-gray-300 items-center self-start p-1.5 px-4 rounded-full">
                                <CustomText>
                                    {userInformation &&
                                        userRole[userInformation.role]}
                                </CustomText>
                            </View>
                        </View>
                    </View>
                    <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
                    <Pressable
                        onPress={() =>
                            navigation.navigate(
                                "Order",
                                (params = { orderType: 1 })
                            )
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
                                My orders
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
                                        <View className="w-42 items-center">
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
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Search", {
                                title: "Favourite flower",
                                flowerList: favoriteFlowers,
                            });
                        }}
                    >
                        <View className="flex-row justify-between mt-3">
                            <CustomText
                                style={{
                                    fontSize: 16,
                                    color: "black",
                                    fontFamily: "Be Vietnam bold",
                                }}
                            >
                                Favourite flowers
                            </CustomText>
                            <Image
                                className="w-6 h-6"
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                        {favoriteFlowers && favoriteFlowers.length > 0 ? (
                            <ProductList
                                products={favoriteFlowers}
                                navigation={navigation}
                            />
                        ) : (
                            <CustomText>
                                You don't have any favorite products yet
                            </CustomText>
                        )}
                    </Pressable>
                </>
            ) : (
                <View className="items-center justify-center h-4/6">
                    <CustomText>Login to view your profile!</CustomText>
                    <TouchableOpacity
                        className="rounded-md p-2 mt-4 w-32 items-center justify-center"
                        style={{ backgroundColor: "#60A5FA" }}
                        onPress={() => {
                            setVisible(true);
                        }}
                    >
                        <CustomText style={{ color: "white" }}>
                            Login
                        </CustomText>
                    </TouchableOpacity>
                </View>
            )}

            <Toast config={toastConfig} />
        </View>
    );
};

export default Account;
