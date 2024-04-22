import React, { useState } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Linking,
} from "react-native";
import { CustomText } from "./CustomText";
import { Rating } from "react-native-ratings";
import {
    flowerStatus,
    flowerStatusColor,
    flowerStatusIcon,
} from "../../Utils/constants";
import { ShortenString } from "../../Utils/helper";

const ProductList = ({ title, products, navigation }) => {
    return (
        <View>
            {title && (
                <View className="flex flex-row justify-between">
                    <CustomText
                        style={{
                            color: "black",
                            fontFamily: "Be Vietnam bold",
                        }}
                    >
                        {title}
                    </CustomText>
                    <CustomText
                        style={{
                            color: "#53B6ED",
                        }}
                        onPress={() =>
                            Linking.openURL("https://www.facebook.com/")
                        }
                    >
                        Xem tất cả
                    </CustomText>
                </View>
            )}

            <ScrollView horizontal={true}>
                {products.map((product, id) => {
                    return (
                        <TouchableOpacity
                            className="flex-1 w-36 gap-y-1 bg-white border border-gray-400 rounded-lg mr-2 mt-2 p-1"
                            key={id}
                            onPress={() => navigation.navigate("FlowerDetail")}
                        >
                            <Image
                                className="w-20 h-20 resize-contain self-center"
                                source={product.imageVideoFiles}
                            ></Image>
                            <CustomText>
                                {ShortenString(product.name, 20)}
                            </CustomText>
                            <View className="flex-row items-center">
                                <Rating
                                    className="self-start"
                                    startingValue={product.stars}
                                    readonly={true}
                                    imageSize={15}
                                />
                            </View>
                            <View
                                className={`flex flex-row self-start items-center
                             justify-center p-0.5 rounded-md`}
                                style={{
                                    backgroundColor:
                                        flowerStatusColor[product.status],
                                }}
                            >
                                <Image
                                    className="w-4 h-4 resize-contain"
                                    source={flowerStatusIcon[product.status]}
                                ></Image>
                                <CustomText
                                    className="ml-1"
                                    style={{ fontSize: 12 }}
                                >
                                    {flowerStatus[product.status]}
                                </CustomText>
                            </View>
                            <View className="flex-row flex-grow justify-start items-end">
                                <CustomText
                                    style={{
                                        color: "black",
                                        fontFamily: "Be Vietnam Medium",
                                    }}
                                >
                                    {product.unitPrice}$
                                </CustomText>
                                {product.discount > 0 && (
                                    <View className="bg-gray-200 rounded-md ml-1 px-1 py-0.5">
                                        <CustomText
                                            className="text-black"
                                            style={{ fontSize: 10 }}
                                        >
                                            -{product.discount}%
                                        </CustomText>
                                    </View>
                                )}
                                <TouchableOpacity
                                    className="items-end flex-grow pl-1 pt-1"
                                    onPress={() =>
                                        (product.isHeart = !product.isHeart)
                                    }
                                >
                                    <Image
                                        className="h-5 w-5"
                                        source={
                                            product.isHeart
                                                ? require("../../Public/Images/heart.png")
                                                : require("../../Public/Images/unHeart.png")
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};
export default ProductList;
