import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from "react-native";
import { CustomText } from "./CustomText";
import CartItem from "./CartItem";
import Checkbox from "expo-checkbox";

const Cart = ({ products, visible, closeModal }) => {
    const [listCart, setListCart] = useState(products);
    const [selectedCart, setSelectedCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCheckAll, setIsCheckAll] = useState(false);

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

    useEffect(() => {
        var newSelectedCart = listCart.filter((item) => item.selected);
        if (newSelectedCart.length < listCart.length) setIsCheckAll(false);
        if (newSelectedCart.length === listCart.length) setIsCheckAll(true);
        setSelectedCart(newSelectedCart);
    }, [listCart]);

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedCart]);

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
                    <View className="flex-row mt-10 items-center">
                        <TouchableOpacity
                            className="pt-2 pl-2"
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
                        <View className="flex-grow pt-2">
                            <CustomText
                                style={{
                                    fontFamily: "Be Vietnam bold",
                                    color: "black",
                                    alignSelf: "center",
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
                    </View>
                    <View className="my-2 h-0.5 bg-gray-100"></View>
                    {listCart ? (
                        <View className="flex-grow justify-between pb-5">
                            <View>
                                <ScrollView>
                                    {listCart.map((p, id) => (
                                        <CartItem
                                            key={id}
                                            product={p}
                                            handleChangeNumber={(value) => {
                                                handleChangeAmount(p.id, value);
                                            }}
                                            handleCheckItem={() =>
                                                handleCheckItem(p)
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
                                Chưa có sản phẩm nào được thêm vào giỏ hàng!
                            </CustomText>
                        </>
                    )}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default Cart;
