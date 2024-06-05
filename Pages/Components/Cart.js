import React, { useContext, useEffect, useState } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    Modal,
    Image,
    ActivityIndicator,
    Button,
} from "react-native";
import { CustomText } from "./CustomText";
import CartItem from "./CartItem";
import Checkbox from "expo-checkbox";
import { ShowAlert } from "../../Utils/helper";
import Toast from "react-native-toast-message";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { toastConfig } from "../Components/ToastConfig.js";

const Cart = ({ visible, closeModal, onNavigateToLogin }) => {
    const { refreshToken, userInfo } = useContext(AuthContext);
    const [listCart, setListCart] = useState([]);
    const [selectedCart, setSelectedCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isLoading, SetIsLoading] = useState(false);

    const handleChangeAmount = (id, value) => {
        var newListCart = listCart.map((i) => {
            if (i.id === id) i.numberOfFlowers = value;
            return i;
        });
        setListCart(newListCart);
    };

    const handleCheckAllItems = (isChecked) => {
        const listNewCart = listCart.map((i) => {
            return {
                ...i,
                selected: isChecked,
            };
        });

        setListCart(listNewCart);
        setIsCheckAll(isChecked);
    };

    const handleCheckItem = (item) => {
        const listNewCart = listCart.map((i) => {
            if (i.id === item.id) {
                return {
                    ...i,
                    selected: !i?.selected,
                };
            } else {
                return i;
            }
        });

        setListCart(listNewCart);
    };

    const handleDeleteItem = (products) => {
        ShowAlert({
            title: "Cảnh báo",
            alertContent: "Bạn có chắc chắn muốn xoá món hàng này?",
            firstBtnName: "Huỷ",
            secondBtnName: "Xoá",
            handleFirstBtn: () => {},
            handleSecondBtn: () => {
                const listNewCart = listCart.filter(
                    (i) => i.id !== products.id
                );
                setListCart(listNewCart);
            },
        });
    };

    const handleDeleteSelectedItem = () => {
        if (selectedCart.length === 0)
            ShowAlert({
                title: "Thông báo",
                alertContent: "Không có món hàng nào được chọn!",
                firstBtnName: "Đóng",
                handleFirstBtn: () => {},
            });
        else
            ShowAlert({
                title: "Cảnh báo",
                alertContent:
                    "Bạn có chắc chắn muốn xoá tất cả những món hàng đã chọn?",
                firstBtnName: "Huỷ",
                secondBtnName: "Xoá",
                handleFirstBtn: () => {},
                handleSecondBtn: () => {
                    const selectedId = selectedCart.map((sc) => sc.id);
                    const listNewCart = listCart.filter(
                        (i) => !selectedId.some((si) => si === i.id)
                    );
                    setListCart(listNewCart);
                },
            });
    };

    const calculateTotalPrice = () => {
        setTotalPrice(
            parseFloat(
                selectedCart
                    .reduce(
                        (total, value) =>
                            total +
                            value.unitPrice *
                                (value.numberOfFlowers === 0
                                    ? 1
                                    : value.numberOfFlowers) *
                                (1 - value.discount / 100),
                        0
                    )
                    .toFixed(2)
            )
        );
    };

    const getCarts = async () => {
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

        const response = await FetchApi(
            UrlConfig.user.getCarts,
            "GET",
            result.data
        );

        if (response.succeeded) {
            setListCart(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
        SetIsLoading(false);
    };

    useEffect(() => {
        var newSelectedCart = listCart.filter((item) => item.selected);
        if (newSelectedCart.length < listCart.length) setIsCheckAll(false);
        if (newSelectedCart.length === listCart.length) setIsCheckAll(true);
        setSelectedCart(newSelectedCart);
    }, [listCart]);

    useEffect(() => {
        calculateTotalPrice();
        if (selectedCart.length === 0) setIsCheckAll(false);
    }, [selectedCart]);

    useEffect(() => {
        if (userInfo) getCarts();
    }, []);

    return (
        <Modal visible={visible} animationType="slide">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View className="flex-1 px-2 pr-4">
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
                    <View className="flex-row mt-10 items-center justify-center">
                        <TouchableOpacity
                            className="absolute z-10 left-2"
                            onPress={closeModal}
                        >
                            <CustomText
                                style={{
                                    color: "black",
                                    fontSize: 18,
                                }}
                            >
                                X
                            </CustomText>
                        </TouchableOpacity>
                        <View>
                            <CustomText
                                style={{
                                    fontFamily: "Be Vietnam bold",
                                    color: "black",
                                    fontSize: 18,
                                }}
                            >
                                Giỏ hàng
                            </CustomText>
                        </View>
                    </View>
                    <View className="my-2 h-0.5 bg-gray-200"></View>
                    <View className="flex-row gap-x-1 items-center">
                        <TouchableOpacity
                            className="p-2"
                            onPress={() => handleCheckAllItems(!isCheckAll)}
                        >
                            <Checkbox
                                value={isCheckAll}
                                onValueChange={handleCheckAllItems}
                                color={isCheckAll ? "#53B6ED" : "#DFE0E2"}
                            />
                        </TouchableOpacity>
                        <CustomText>
                            Tất cả ({listCart.length} sản phẩm)
                        </CustomText>
                        <TouchableOpacity
                            className="flex-grow items-end"
                            onPress={handleDeleteSelectedItem}
                        >
                            <Image
                                className="h-6 w-6"
                                source={require("../../Public/Images/remove.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="my-2 h-0.5 bg-gray-100"></View>
                    {userInfo ? (
                        <>
                            {listCart && listCart.length > 0 ? (
                                <View className="flex-grow justify-between pb-5">
                                    <View>
                                        <ScrollView>
                                            {listCart.map((p, id) => (
                                                <CartItem
                                                    key={id}
                                                    product={p}
                                                    handleChangeNumber={(
                                                        value
                                                    ) => {
                                                        handleChangeAmount(
                                                            p.id,
                                                            value
                                                        );
                                                    }}
                                                    handleCheckItem={() =>
                                                        handleCheckItem(p)
                                                    }
                                                    handleDeleteItem={() =>
                                                        handleDeleteItem(p)
                                                    }
                                                />
                                            ))}
                                        </ScrollView>
                                        <View className="mt-2 -mx-5 h-0.5 bg-gray-100"></View>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <View>
                                            <CustomText>Tổng tiền</CustomText>
                                            <CustomText
                                                className="text-red-400"
                                                style={{ fontSize: 16 }}
                                            >
                                                {totalPrice}$
                                            </CustomText>
                                        </View>
                                        <TouchableOpacity className="bg-red-400 rounded-md justify-center px-5">
                                            <CustomText className="text-white">
                                                Mua Hàng ({selectedCart.length})
                                            </CustomText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <>
                                    <CustomText>
                                        Chưa có sản phẩm nào được thêm vào giỏ
                                        hàng!
                                    </CustomText>
                                    <Button
                                        title="reload"
                                        onPress={() => getCarts()}
                                    />
                                </>
                            )}
                        </>
                    ) : (
                        <View className="items-center justify-center h-3/5">
                            <CustomText>
                                Đăng nhập để quản lý giỏ hàng của bạn!
                            </CustomText>
                            <TouchableOpacity
                                className="border rounded-md p-2 mt-4 w-32 items-center justify-center"
                                style={{ backgroundColor: "#152259" }}
                                onPress={() => {
                                    onNavigateToLogin();
                                }}
                            >
                                <CustomText style={{ color: "white" }}>
                                    Đăng nhập
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
            <Toast config={toastConfig} />
        </Modal>
    );
};

export default Cart;
