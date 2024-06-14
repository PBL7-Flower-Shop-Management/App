import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { CustomText } from "./CustomText";
import { IncrementCounter } from "./IncrementCounter";
import Checkbox from "expo-checkbox";
import { ShortenString } from "../../Utils/helper";
import HaveNotAvatar from "../../Public/Images/haveNotAvatar.png";

const CartItem = ({
    product,
    handleChangeNumber,
    handleCheckItem,
    handleDeleteItem,
}) => {
    const [value, setValue] = useState(product.numberOfFlowers);

    useEffect(() => {
        handleChangeNumber(value);
    }, [value]);

    return (
        <View className="flex-row items-center mt-2">
            <TouchableOpacity className="p-2" onPress={handleCheckItem}>
                <Checkbox
                    value={product.selected}
                    onValueChange={handleCheckItem}
                    color={product.selected ? "#53B6ED" : "#DFE0E2"}
                />
            </TouchableOpacity>
            <Image
                className="h-24 w-20 mr-2"
                style={{ resizeMode: "contain" }}
                source={
                    product.image
                        ? {
                              uri: product.image,
                          }
                        : HaveNotAvatar
                }
            />
            <View className="flex-grow justify-between">
                <CustomText style={{ fontSize: 16 }}>
                    {ShortenString(product.name, 22)}
                </CustomText>
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
                    <TouchableOpacity
                        className="ml-2"
                        onPress={handleDeleteItem}
                    >
                        <CustomText className="text-blue-400">
                            Delete
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CartItem;
