import React, { useState } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { CustomText } from "./CustomText";
import { Rating } from "react-native-ratings";
import {
    flowerStatus,
    flowerStatusColor,
    flowerStatusIcon,
} from "../../Utils/constants";
import { ConvertToShortSoldQuantity, ShortenString } from "../../Utils/helper";

const SuggestedProductList = ({
    title,
    products,
    isShowSoldQuantity = true,
    betweenDistance = 10,
    paddingBottom = 40,
}) => {
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
                </View>
            )}

            <ScrollView className="-mx-1">
                {products.map((product, id) => {
                    if (id % 2 === 0) {
                        return (
                            <View className="flex-row" key={id}>
                                <TouchableOpacity
                                    className="flex-1 w-40 gap-y-1 bg-white border border-gray-400 rounded-lg mt-2 p-1"
                                    style={{ marginEnd: betweenDistance }}
                                    key={id}
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
                                        {isShowSoldQuantity &&
                                            product.soldQuantity > 0 && (
                                                <CustomText
                                                    style={{ fontSize: 9 }}
                                                >
                                                    | Đã bán{" "}
                                                    {ConvertToShortSoldQuantity(
                                                        product.soldQuantity
                                                    )}
                                                </CustomText>
                                            )}
                                    </View>
                                    <View
                                        className={`flex flex-row self-start items-center
                             justify-center p-0.5 rounded-md`}
                                        style={{
                                            backgroundColor:
                                                flowerStatusColor[
                                                    product.status
                                                ],
                                        }}
                                    >
                                        <Image
                                            className="w-4 h-4 resize-contain"
                                            source={
                                                flowerStatusIcon[product.status]
                                            }
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
                                                (product.isHeart =
                                                    !product.isHeart)
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
                                {id + 1 < products.length ? (
                                    <TouchableOpacity
                                        className="flex-1 w-40 gap-y-1 bg-white border border-gray-400 rounded-lg mt-2 p-1"
                                        key={id + 1}
                                    >
                                        <Image
                                            className="w-20 h-20 resize-contain self-center"
                                            source={
                                                products[id + 1].imageVideoFiles
                                            }
                                        ></Image>
                                        <CustomText>
                                            {ShortenString(
                                                products[id + 1].name,
                                                20
                                            )}
                                        </CustomText>
                                        <View className="flex-row items-center">
                                            <Rating
                                                className="self-start"
                                                startingValue={
                                                    products[id + 1].stars
                                                }
                                                readonly={true}
                                                imageSize={15}
                                            />
                                            {isShowSoldQuantity &&
                                                products[id + 1].soldQuantity >
                                                    0 && (
                                                    <CustomText
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        | Đã bán{" "}
                                                        {ConvertToShortSoldQuantity(
                                                            products[id + 1]
                                                                .soldQuantity
                                                        )}
                                                    </CustomText>
                                                )}
                                        </View>
                                        <View
                                            className={`flex flex-row self-start items-center
                             justify-center p-0.5 rounded-md`}
                                            style={{
                                                backgroundColor:
                                                    flowerStatusColor[
                                                        products[id + 1].status
                                                    ],
                                            }}
                                        >
                                            <Image
                                                className="w-4 h-4 resize-contain"
                                                source={
                                                    flowerStatusIcon[
                                                        products[id + 1].status
                                                    ]
                                                }
                                            ></Image>
                                            <CustomText
                                                className="ml-1"
                                                style={{ fontSize: 12 }}
                                            >
                                                {
                                                    flowerStatus[
                                                        products[id + 1].status
                                                    ]
                                                }
                                            </CustomText>
                                        </View>
                                        <View className="flex-row flex-grow justify-start items-end">
                                            <CustomText
                                                style={{
                                                    color: "black",
                                                    fontFamily:
                                                        "Be Vietnam Medium",
                                                }}
                                            >
                                                {products[id + 1].unitPrice}$
                                            </CustomText>
                                            {products[id + 1].discount > 0 && (
                                                <View className="bg-gray-200 rounded-md ml-1 px-1 py-0.5">
                                                    <CustomText
                                                        className="text-black"
                                                        style={{ fontSize: 10 }}
                                                    >
                                                        -
                                                        {
                                                            products[id + 1]
                                                                .discount
                                                        }
                                                        %
                                                    </CustomText>
                                                </View>
                                            )}
                                            <TouchableOpacity
                                                className="items-end flex-grow pl-1 pt-1"
                                                onPress={() => {
                                                    product.isHeart =
                                                        !product.isHeart;
                                                }}
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
                                ) : (
                                    <TouchableOpacity
                                        className="flex-1 w-40 bg-white mt-2 p-1"
                                        key={id + 1}
                                    ></TouchableOpacity>
                                )}
                            </View>
                        );
                    }
                    return null; // Skip rendering if it's not the start of a row
                })}
                <View className={`mb-${paddingBottom}`}></View>
            </ScrollView>
        </View>
    );
};
export default SuggestedProductList;
