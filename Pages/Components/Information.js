import React from "react";
import { View } from "react-native";
import { CustomText } from "./CustomText";

const Information = ({ title, data }) => {
    return (
        <>
            <View className="flex gap-y-2">
                <CustomText
                    style={{
                        color: "black",
                        fontFamily: "Be Vietnam bold",
                    }}
                >
                    {title.toUpperCase()}
                </CustomText>
                {Object.entries(data).map(([key, value], id) => (
                    <View key={id}>
                        {value && (
                            <View className="gap-y-2">
                                <CustomText
                                    style={{
                                        color: "black",
                                        fontFamily: "Be Vietnam bold",
                                    }}
                                >
                                    {key}
                                </CustomText>
                                <CustomText>{value}</CustomText>
                            </View>
                        )}
                    </View>
                ))}
            </View>
            <View className="mt-5 -mx-10 h-2 bg-gray-100"></View>
        </>
    );
};

export default Information;
