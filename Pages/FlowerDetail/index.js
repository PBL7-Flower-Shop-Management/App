import React, { useState } from "react";
import {
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { CustomText } from "../Components/CustomText";
import { Rating } from "react-native-ratings";
import { ConvertToShortSoldQuantity } from "../../Utils/helper.js";
import {
    flowerStatus,
    flowerStatusColor,
    flowerStatusIcon,
} from "../../Utils/constants";
import DetailInformation from "../Components/DetailInformation.js";
import Information from "../Components/Information.js";
import ReviewList from "../Components/ReviewList.js";
import ImageSlide from "../Components/ImageSlide.js";
import { IncrementCounter } from "../Components/IncrementCounter.js";
import Cart from "../Components/Cart.js";

const FlowerDetail = ({ navigation, route }) => {
    const [value, setValue] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    const flowerInformation = {
        name: "Hoa Hướng Dương",
        category: "Cây cảnh, Hoa trồng trực tiếp ngoài vườn, Hoa hàng năm",
        origin: "Bắc Mỹ",
        habitat: "Các vùng có khí hậu ôn đới",
        care: "Cần nhiều ánh sáng mặt trời và tưới nước đều đặn",
        diseasePrevention:
            "Phòng chống sâu bệnh bằng cách kiểm tra thường xuyên và sử dụng thuốc trừ sâu khi cần",
        growthTime: "3 tháng",
        starsTotal: 4.5,
        feedbacksTotal: 150,
        unitPrice: 200,
        discount: 20,
        quantity: 5,
        soldQuantity: 2,
        description:
            "Hoa hướng dương tượng trưng cho sự lạc quan và tinh thần vươn lên",
        status: "Available",
        imageVideoFiles: [
            "https://phunugioi.com/wp-content/uploads/2020/04/nhung-hinh-anh-dep-nhat-ve-hoa-huong-duong-va-y-nghia.jpg",
            "https://qflower.vn/wp-content/uploads/2022/06/Bo-hoa-mat-troi-400.jpg",
            "https://hoatuoi360.vn/uploads/file/bo-hoa-1-bong-huong-duong.jpg",
            "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        ],
    };

    const reviews = [
        {
            content: "Giao hàng nhanh! Chất lượng sản phẩm khá là ưng ý!!!",
            numberOfStars: 5,
            numberOfLikes: 0,
            feedbackBy: "Nguyễn Thế Đăng Hoan",
            commentDate: "12/12/2024",
            imageVideoFiles: [
                "https://phunugioi.com/wp-content/uploads/2020/04/nhung-hinh-anh-dep-nhat-ve-hoa-huong-duong-va-y-nghia.jpg",
                "https://phunugioi.com/wp-content/uploads/2020/04/nhung-hinh-anh-dep-nhat-ve-hoa-huong-duong-va-y-nghia.jpg",
                "https://phunugioi.com/wp-content/uploads/2020/04/nhung-hinh-anh-dep-nhat-ve-hoa-huong-duong-va-y-nghia.jpg",
                "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                "https://phunugioi.com/wp-content/uploads/2020/04/nhung-hinh-anh-dep-nhat-ve-hoa-huong-duong-va-y-nghia.jpg",
                "https://phunugioi.com/wp-content/uploads/2020/04/nhung-hinh-anh-dep-nhat-ve-hoa-huong-duong-va-y-nghia.jpg",
            ],
        },
        {
            content:
                "Đã mua hoa rồi còn được tặng kèm cả chậu nữa, shop tận tâm thật.",
            numberOfStars: 4,
            numberOfLikes: 4,
            feedbackBy: "Trần Thị Xuân",
            commentDate: "11/07/2024",
            imageVideoFiles: [
                "https://qflower.vn/wp-content/uploads/2022/06/Bo-hoa-mat-troi-400.jpg",
                "https://qflower.vn/wp-content/uploads/2022/06/Bo-hoa-mat-troi-400.jpg",
                "https://qflower.vn/wp-content/uploads/2022/06/Bo-hoa-mat-troi-400.jpg",
            ],
        },
        {
            content:
                "Hoa shop làm rất đẹp, người yêu tôi rất thích nó, cảm ơn shop nhiều nhé!",
            numberOfStars: 5,
            numberOfLikes: 2,
            feedbackBy: "Lê Thành Long",
            commentDate: "09/05/2024",
        },
        {
            content:
                "Kích cỡ đa dạng lại còn vừa túi tiền nữa, k mua thì phí lắm hehe",
            numberOfStars: 3,
            numberOfLikes: 1356,
            feedbackBy: "Trịnh Văn Dũng",
            commentDate: "08/03/2024",
            imageVideoFiles: [
                "https://hoatuoi360.vn/uploads/file/bo-hoa-1-bong-huong-duong.jpg",
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
            <View className="absolute z-10 top-10 flex-row w-full justify-between px-3">
                <TouchableOpacity
                    className="p-2 bg-gray-400 rounded-full"
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        className="h-5 w-5"
                        style={{ tintColor: "white" }}
                        source={require("../../Public/Images/leftArrow.png")}
                    />
                </TouchableOpacity>
                <View className="flex-row gap-x-1">
                    <TouchableOpacity
                        className="p-2 bg-gray-400 rounded-full"
                        onPress={() => setModalVisible(true)}
                    >
                        <Image
                            className="h-5 w-5"
                            style={{ tintColor: "white" }}
                            source={require("../../Public/Images/shopping-cart.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="p-2 bg-gray-400 rounded-full"
                        // onPress={() => SetModalVisible(true)}
                    >
                        <Image
                            className="h-5 w-5"
                            style={{ tintColor: "white" }}
                            source={require("../../Public/Images/more.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View className="gap-y-2 px-2">
                    <ImageSlide imageList={flowerInformation.imageVideoFiles} />
                    <CustomText
                        style={{
                            // color: "black",
                            fontFamily: "Be Vietnam bold",
                        }}
                    >
                        {flowerInformation.name}
                    </CustomText>
                    <View className="flex-row gap-x-1 items-center">
                        <CustomText style={{ fontFamily: "Be Vietnam bold" }}>
                            {flowerInformation.starsTotal}
                        </CustomText>
                        <Rating
                            startingValue={flowerInformation.starsTotal}
                            readonly={true}
                            imageSize={15}
                        />
                        <CustomText>
                            ({flowerInformation.feedbacksTotal})
                        </CustomText>
                        <CustomText>
                            | Đã bán{" "}
                            {ConvertToShortSoldQuantity(
                                flowerInformation.soldQuantity
                            )}
                        </CustomText>
                    </View>
                    <View className="flex-row flex-grow justify-start items-end">
                        <CustomText
                            style={{
                                fontFamily: "Be Vietnam bold",
                            }}
                        >
                            {flowerInformation.unitPrice}$
                        </CustomText>
                        {flowerInformation.discount > 0 && (
                            <View className="bg-gray-200 rounded-md ml-1 px-1 py-0.5">
                                <CustomText
                                    className="text-black"
                                    style={{ fontSize: 10 }}
                                >
                                    -{flowerInformation.discount}%
                                </CustomText>
                            </View>
                        )}
                    </View>
                    <View
                        className={`flex flex-row self-start items-center
                             justify-center p-0.5 rounded-md`}
                        style={{
                            backgroundColor:
                                flowerStatusColor[flowerInformation.status],
                        }}
                    >
                        <Image
                            className="w-4 h-4 resize-contain"
                            source={flowerStatusIcon[flowerInformation.status]}
                        ></Image>
                        <CustomText className="ml-1" style={{ fontSize: 12 }}>
                            {flowerStatus[flowerInformation.status]}
                        </CustomText>
                    </View>
                    <View className="mt-5 -mx-10 h-2 bg-gray-200"></View>
                    <IncrementCounter
                        value={value}
                        setValue={setValue}
                        max={
                            flowerInformation.quantity -
                            flowerInformation.soldQuantity
                        }
                        unitPrice={flowerInformation.unitPrice}
                        discount={flowerInformation.discount}
                    />
                    <View className="flex-row justify-between p-1 px-2">
                        <TouchableOpacity
                            className="bg-white border-blue-500 border p-2 px-8 rounded-md"
                            onPress={() => setModalVisible(true)}
                        >
                            <CustomText className="text-blue-500">
                                Thêm vào giỏ
                            </CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-red-500 p-2 px-12 rounded-md">
                            <CustomText className="text-white">
                                Mua ngay
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                    <View className="mt-5 -mx-10 h-2 bg-gray-200"></View>
                    <View className="p-2 gap-y-1">
                        <CustomText
                            style={{
                                color: "black",
                                fontFamily: "Be Vietnam bold",
                            }}
                        >
                            Thông tin vận chuyển
                        </CustomText>
                        <View className="flex-row gap-x-1">
                            <Image
                                className="h-4 w-4"
                                source={require("../../Public/Images/location.png")}
                            ></Image>
                            <CustomText>Giao đến</CustomText>
                            <CustomText
                                style={{
                                    color: "black",
                                    fontFamily: "Be Vietnam bold",
                                }}
                            >
                                Q. Thanh Khê, P. An Khê, Đà Nẵng
                            </CustomText>
                        </View>
                    </View>
                    <View className="mt-5 -mx-10 h-2 bg-gray-200"></View>
                    <View className="p-2 gap-y-1">
                        <DetailInformation
                            title="Tổng quan"
                            data={{
                                "Danh mục": flowerInformation.category,
                                "Xuất sứ": flowerInformation.origin,
                                "Thời gian sinh trưởng":
                                    flowerInformation.growthTime,
                            }}
                        />
                    </View>
                    <View className="p-2 gap-y-1">
                        <Information
                            title="Thông tin chi tiết"
                            data={{
                                "Mô tả sản phẩm": flowerInformation.description,
                                "Môi trường": flowerInformation.habitat,
                                "Cách chăm sóc": flowerInformation.care,
                                "Cách phòng bệnh":
                                    flowerInformation.diseasePrevention,
                            }}
                        />
                    </View>
                    <View className="p-2 gap-y-1">
                        <ReviewList
                            title="Khách hàng đánh giá"
                            overview={{
                                starsTotal: flowerInformation.starsTotal,
                                feedbacksTotal:
                                    flowerInformation.feedbacksTotal,
                            }}
                            reviews={reviews}
                        />
                    </View>
                    <View className="mb-40"></View>
                </View>
            </ScrollView>
            <Cart
                products={[
                    {
                        id: 1,
                        name: "Hoa hướng dương",
                        unitPrice: 123,
                        discount: 12,
                        numberOfFlowers: 12,
                        image: "https://th.bing.com/th/id/R.516e257fdf19eb76477265007bff6f68?rik=yDSJCcpSgFh0aA&riu=http%3a%2f%2fblogcaycanh.vn%2fuploads%2fcaycanh%2f1388107807_hoa-huong-duong.jpg&ehk=y1%2batE2X8bX2zrci35kvSFY7sMbTb%2fpbV5QPR6%2fQ9rI%3d&risl=&pid=ImgRaw&r=0",
                        remainAmount: 23,
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "Hoa đào",
                        unitPrice: 321,
                        discount: 82,
                        numberOfFlowers: 3,
                        image: "https://th.bing.com/th/id/R.88c7ab37edaae90a6a87f992ec449987?rik=RCcIweKARQ%2bqLQ&pid=ImgRaw&r=0",
                        remainAmount: 5,
                        selected: false,
                    },
                    {
                        id: 3,
                        name: "Hoa mừng sinh nhật",
                        unitPrice: 157,
                        discount: 33,
                        numberOfFlowers: 134,
                        image: "https://th.bing.com/th/id/OIP.jd84v1WHL2uhU9Jaz1UmQAHaGA?rs=1&pid=ImgDetMain",
                        remainAmount: 233,
                        selected: false,
                    },
                ]}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
            />
        </View>
    );
};
export default FlowerDetail;
