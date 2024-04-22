import { useState } from "react";
import { TouchableOpacity, View, Image, Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { CustomText } from "./CustomText";

export const Result = ({ data }) => {
    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState();
    const [showAnotherResult, setShowAnotherResult] = useState(false);

    return (
        <View className="mb-2 border border-gray-200 border-t-blue-400 border-t-4 p-2 bg-white rounded-lg mx-2">
            <CustomText style={{ fontFamily: "Be Vietnam bold" }}>
                Kết quả nhận dạng:{" "}
                <TouchableOpacity
                    className="-mb-0.5"
                    onPress={() => {
                        console.log("Search similar products");
                    }}
                >
                    <CustomText className="text-blue-400 underline">
                        {data.results[0].flowerName}
                    </CustomText>
                </TouchableOpacity>
            </CustomText>
            <View className="flex-row justify-between mb-2">
                <CustomText
                    style={{
                        color: "green",
                    }}
                >
                    Độ chính xác: {data.results[0].accuracy * 100}%
                </CustomText>
                <CustomText
                    className="text-gray-400"
                    style={{
                        fontFamily: "Be Vietnam italic",
                    }}
                >
                    {data.date}
                </CustomText>
            </View>
            <View className="flex-row items-center gap-x-2 justify-center mb-2">
                <TouchableOpacity
                    className="items-center"
                    onPress={() => {
                        SetIsModalVisible(true);
                        setCurrentImage(data.inputImage);
                    }}
                >
                    <Image
                        className="h-32 w-32 rounded-lg"
                        source={{
                            uri: data.inputImage,
                        }}
                    />
                </TouchableOpacity>
                <View className="items-center">
                    <CustomText>Dự đoán</CustomText>
                    <Image
                        className="h-12 w-12 rounded-full"
                        source={require("../../Public/Images/infer.png")}
                    />
                </View>
                <TouchableOpacity
                    className="items-center"
                    onPress={() => {
                        SetIsModalVisible(true);
                        setCurrentImage(data.results[0].image);
                    }}
                >
                    <Image
                        className="h-32 w-32 rounded-lg"
                        source={{
                            uri: data.results[0].image,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View className="mb-1">
                <CustomText
                    style={{
                        paddingLeft: 10,
                    }}
                >
                    Kết quả dự đoán khác:
                </CustomText>
                <View>
                    {data.results.length > 1 && (
                        <>
                            {!showAnotherResult ? (
                                <TouchableOpacity
                                    className="items-center"
                                    onPress={() => {
                                        setShowAnotherResult(true);
                                    }}
                                >
                                    <CustomText className="text-blue-400 underline">
                                        Xem thêm
                                    </CustomText>
                                </TouchableOpacity>
                            ) : (
                                <View className="pt-2">
                                    <View className="flex-row justify-between">
                                        <View className="w-6/12 items-center">
                                            <CustomText
                                                style={{
                                                    fontFamily:
                                                        "Be Vietnam bold",
                                                }}
                                            >
                                                Tên hoa
                                            </CustomText>
                                        </View>
                                        <View className="flex-grow items-center">
                                            <CustomText
                                                style={{
                                                    fontFamily:
                                                        "Be Vietnam bold",
                                                }}
                                            >
                                                Độ chính xác
                                            </CustomText>
                                        </View>
                                    </View>
                                    {data.results.slice(1).map((r, id) => (
                                        <View
                                            className="flex-row justify-between mt-2"
                                            key={id}
                                        >
                                            <View className="flex-grow items-center">
                                                <TouchableOpacity
                                                    className="items-center"
                                                    onPress={() => {
                                                        SetIsModalVisible(true);
                                                        setCurrentImage(
                                                            r.image
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        className="h-16 w-16 rounded-lg"
                                                        source={{
                                                            uri: r.image,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <CustomText
                                                    className="mt-1"
                                                    style={{
                                                        fontSize: 12,
                                                        color: "gray",
                                                    }}
                                                >
                                                    {r.flowerName}
                                                </CustomText>
                                            </View>
                                            <View className="justify-center items-center pb-5 w-6/12">
                                                <CustomText
                                                    style={{ color: "green" }}
                                                >
                                                    {r.accuracy * 100}%
                                                </CustomText>
                                            </View>
                                        </View>
                                    ))}
                                    <TouchableOpacity
                                        className="items-center"
                                        onPress={() => {
                                            setShowAnotherResult(false);
                                        }}
                                    >
                                        <CustomText className="text-blue-400 underline">
                                            Ẩn bớt
                                        </CustomText>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </>
                    )}
                </View>
            </View>
            <Modal
                visible={isModalVisible}
                transparent={true}
                onRequestClose={() => {
                    SetIsModalVisible(!isModalVisible);
                }}
                onBackdropPress={() => SetIsModalVisible(false)}
            >
                <ImageViewer
                    index={0}
                    imageUrls={[
                        {
                            url: currentImage,
                        },
                    ]}
                    renderIndicator={() => {}}
                    onClick={() => SetIsModalVisible(false)}
                    enableSwipeDown={true}
                    onSwipeDown={() => SetIsModalVisible(false)}
                />
            </Modal>
        </View>
    );
};
