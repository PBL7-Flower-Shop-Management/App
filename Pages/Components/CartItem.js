import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { CustomText } from "./CustomText";
import { IncrementCounter } from "./IncrementCounter";

const CartItem = ({ product }) => {
    const [value, setValue] = useState(product.numberOfFlowers);
    useEffect(() => {
        product.numberOfFlowers = value;
    }, [value]);

    return (
        <View className="flex-row gap-x-2 mt-2">
            <Image
                className="h-28 w-20"
                source={{
                    uri: product.image,
                }}
            />
            <View className="flex-grow justify-between">
                <CustomText style={{ fontSize: 16 }}>{product.name}</CustomText>
                <CustomText style={{ color: "black", fontSize: 15 }}>
                    {product.unitPrice}$
                </CustomText>
                <View className="flex-row items-center justify-between">
                    <IncrementCounter
                        value={value}
                        setValue={setValue}
                        max={product.remainAmount}
                        showLabel={false}
                    />
                    <TouchableOpacity className="ml-2">
                        <CustomText className="text-blue-400">Xoá</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CartItem;
