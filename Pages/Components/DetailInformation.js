import React from "react";
import { View } from "react-native";
import { CustomText } from "./CustomText";

const DetailInformation = ({ title, data }) => {
    return (
        <>
            <View className="flex gap-y-2 pt-1">
                <CustomText
                    style={{
                        color: "black",
                        fontFamily: "Be Vietnam bold",
                    }}
                >
                    {title}
                </CustomText>
                {Object.entries(data).map(([key, value], id) => (
                    <View key={id}>
                        {value && (
                            <View className="gap-y-2">
                                <View className="flex-row">
                                    <CustomText className="w-4/12 text-gray-400">
                                        {key}
                                    </CustomText>
                                    <CustomText
                                        className="w-8/12"
                                        style={{
                                            fontFamily: "Be Vietnam Medium",
                                        }}
                                    >
                                        {value}
                                    </CustomText>
                                </View>
                                <View className="border h-0.1 border-gray-400" />
                            </View>
                        )}
                    </View>
                ))}
            </View>
            <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
        </>
    );
};

export default DetailInformation;
