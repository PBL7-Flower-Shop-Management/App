import React from "react";
import { View, Image, StatusBar, ScrollView } from "react-native";
import { CustomText } from "../Components/CustomText";
import { Result } from "../Components/Result";

function IdentificationHistory() {
    const identificationHistories = [
        {
            date: "12-03-2024",
            inputImage: "https://i.ytimg.com/vi/jZvWxUmUCmA/maxresdefault.jpg",
            results: [
                {
                    flowerName: "Hoa hồng",
                    accuracy: 0.6,
                    image: "https://th.bing.com/th/id/OIP.2iHVeDyqdDF1zlUXEseDMgHaFd?rs=1&pid=ImgDetMain",
                },
                {
                    flowerName: "Hoa cẩm chướng",
                    accuracy: 0.4,
                    image: "https://www.caycauvang.com/sites/default/files/news/cam-chuong-do_0.jpg",
                },
            ],
        },
        {
            date: "15-04-2024",
            inputImage:
                "https://i.pinimg.com/originals/b4/45/a7/b445a7dd910aa6422ad25f693fc90324.jpg",
            results: [
                {
                    flowerName: "Hoa tulip",
                    accuracy: 0.5,
                    image: "https://th.bing.com/th/id/OIP.NgHBaLOmFdAoEVe7DJaPTAHaFk?rs=1&pid=ImgDetMain",
                },
                {
                    flowerName: "Hoa hướng dương",
                    accuracy: 0.3,
                    image: "https://th.bing.com/th/id/OIP.GkFWYhvj98mrH63jTBIGkwHaEK?rs=1&pid=ImgDetMain",
                },
                {
                    flowerName: "Hoa dã quỳ",
                    accuracy: 0.2,
                    image: "https://myphoto.com.vn/uploads/edd/2015/12/hoa-Da-Quy_DSC7431.jpg",
                },
            ],
        },
        {
            date: "22-04-2024",
            inputImage: "https://i.ytimg.com/vi/KxgkeWdEoA8/maxresdefault.jpg",
            results: [
                {
                    flowerName: "Hoa lan",
                    accuracy: 0.8,
                    image: "https://th.bing.com/th/id/OIP.1Ge95dy85jSACr6fUFPx3AHaEW?rs=1&pid=ImgDetMain",
                },
                {
                    flowerName: "Hoa loa kèn",
                    accuracy: 0.2,
                    image: "https://flowershop.com.vn/wp-content/uploads/2020/09/y-nghia-hoa-loa-ken-8.jpg",
                },
            ],
        },
    ];
    return (
        <View className="flex-1 bg-white">
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <View className="flex-row items-end justify-center pt-12 pb-3 bg-blue-400">
                <View className="">
                    <CustomText className="text-white" style={{ fontSize: 16 }}>
                        Lịch sử nhận dạng hoa
                    </CustomText>
                </View>
            </View>
            {identificationHistories && identificationHistories.length > 0 ? (
                <View className="pt-2">
                    <ScrollView className="m-0">
                        {identificationHistories.map((ih, id) => (
                            <Result key={id} data={ih} />
                        ))}
                        <View className="mb-52"></View>
                    </ScrollView>
                </View>
            ) : (
                <View>
                    <View className="gap-y-3 items-center justify-center mt-28">
                        <Image
                            className="h-32 w-32 ml-4"
                            source={require("../../Public/Images/not-detect.png")}
                        />
                        <CustomText style={{ fontSize: 14 }}>
                            Bạn chưa nhận dạng hoa lần nào!
                        </CustomText>
                    </View>
                </View>
            )}
        </View>
    );
}

export default IdentificationHistory;
