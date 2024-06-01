import { useEffect, useState } from "react";
import { TouchableOpacity, View, TextInput } from "react-native";
import { CustomText } from "./CustomText";
import { ShowAlert } from "../../Utils/helper";

export const IncrementCounter = ({
    value,
    setValue,
    max,
    unitPrice,
    discount = 0,
    showLabel = true,
}) => {
    const [input, setInput] = useState(value.toString());
    const handleInputChange = (value) => {
        // Replace the initial '0' or prevent leading zeros
        const newValue = value.replace(/^0+/, "");
        if (parseInt(newValue) > max) setInput(max.toString());
        else setInput(newValue); // Set to '0' if newValue is empty
    };
    useEffect(() => {
        setValue(parseInt(input || "0"));
    }, [input]);

    const handleIncrement = () => {
        var newValue = value + 1;
        if (newValue <= max) {
            setInput(newValue.toString());
        } else {
            ShowAlert({
                title: "Cảnh báo",
                alertContent: "Mặt hàng này chỉ còn lại " + max + " sản phẩm!",
                firstBtnName: "Đóng",
                handleFirstBtn: () => {},
            });
        }
    };
    const handleDecrement = () => {
        var newValue = value - 1;
        if (newValue >= 1) {
            setInput(newValue.toString());
        } else {
            ShowAlert({
                title: "Cảnh báo",
                alertContent: "Số lượng sản phẩm mua phải lớn hơn 0!",
                firstBtnName: "Đóng",
                handleFirstBtn: () => {},
            });
        }
    };
    return (
        <View
            className={`flex-row justify-evenly ${
                showLabel ? "items-start pt-2" : "items-center"
            }`}
        >
            <View>
                {showLabel && (
                    <CustomText style={{ fontFamily: "Be Vietnam Medium" }}>
                        Số lượng
                    </CustomText>
                )}
                <View className="flex-row items-center border border-blue-400 rounded-md my-1">
                    <TouchableOpacity
                        className="px-3 border-r border-gray-300"
                        onPress={handleDecrement}
                    >
                        <CustomText
                            className="text-blue-400"
                            style={{ fontSize: 25 }}
                        >
                            -
                        </CustomText>
                    </TouchableOpacity>
                    {/* <CustomText className="p-2 px-4" style={{ fontSize: 15 }}>
                        {value}
                    </CustomText> */}
                    <TextInput
                        className="p-2 px-4"
                        style={{ fontSize: 15 }}
                        keyboardType="number-pad"
                        value={input}
                        onChangeText={handleInputChange}
                        onBlur={() => {
                            if (input === "") setInput("1");
                        }}
                    />
                    <TouchableOpacity
                        className="px-3 border-l border-gray-300"
                        onPress={handleIncrement}
                    >
                        <CustomText
                            className="text-blue-400"
                            style={{ fontSize: 25 }}
                        >
                            +
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
            {unitPrice !== undefined && unitPrice !== null && (
                <View>
                    {showLabel && (
                        <CustomText
                            style={{
                                fontFamily: "Be Vietnam Medium",
                                marginBottom: 5,
                            }}
                        >
                            Tạm tính
                        </CustomText>
                    )}
                    <CustomText style={{ fontSize: 17 }}>
                        {parseFloat(
                            (value * unitPrice * (1 - discount / 100)).toFixed(
                                2
                            )
                        )}
                        $
                    </CustomText>
                </View>
            )}
        </View>
    );
};
