import React from "react";
import { View, ScrollView } from "react-native";
import { CustomText } from "./CustomText";
import CartItem from "./CartItem";

const Cart = ({ route }) => {
    return (
        <View className="mt-20 px-10">
            {route.params.products ? (
                <>
                    <View className="mt-2 -mx-5 h-0.5 bg-gray-200"></View>
                    <ScrollView>
                        {route.params.products.map((p, id) => (
                            <CartItem key={id} product={p} />
                        ))}
                    </ScrollView>
                    <View className="mt-2 -mx-5 h-0.5 bg-gray-200"></View>
                </>
            ) : (
                <>
                    <CustomText>
                        Chưa có sản phẩm nào được thêm vào giỏ hàng!
                    </CustomText>
                </>
            )}
        </View>
    );
};

export default Cart;
