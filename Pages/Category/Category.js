import React, { useState, useRef, useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Pressable,
    TextInput,
    Image,
    ScrollView,
    StatusBar,
} from "react-native";
import { CustomText } from "../Components/CustomText";
import { scale, textInputDefaultSize } from "../../Utils/constants";
import Cart from "../Components/Cart";
import SuggestedProductList from "../Components/SuggestedProductList";

function Category({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [txtSearch, SetTxtSearch] = useState(null);
    const [index, setIndex] = useState(0);
    const [tmpProducts, setTmpProducts] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        setTmpProducts(
            products.filter(
                (p) =>
                    index === 0 ||
                    p.category.includes(Object.keys(categories)[index - 1])
            )
        );
    }, [index]);

    const categories = {
        "Hoa trồng vườn":
            "https://th.bing.com/th/id/OIP.f-FXUJ0aDZgeT7USzI7CUgHaKW?rs=1&pid=ImgDetMain",
        "Hoa trưng bày":
            "https://th.bing.com/th/id/OIP.IDIBlRIRqoabOvqKdaToLgHaHg?rs=1&pid=ImgDetMain",
        "Hoa sinh nhật":
            "https://th.bing.com/th/id/R.1110331de5a4c5a98db02fe00f876b4e?rik=IfafVIxyoYdnLw&riu=http%3a%2f%2fhinhnenhd.com%2fwp-content%2fuploads%2f2021%2f11%2fHinh-anh-chuc-mung-sinh-nhat-dep-y-nghia-23.jpg&ehk=NiCTn3VrqMORZ1cxUpmybo4zEekg4tQQ5ozNFUeqqTg%3d&risl=&pid=ImgRaw&r=0",
        "Hoa khai trương":
            "https://juro.com.vn/wp-content/uploads/mau-phong-nen-khai-truong-3.jpg",
        "Hoa cưới":
            "https://th.bing.com/th/id/R.94ced6306675d8e8950bc8dfebb6ba00?rik=9uxw5rY1bzM0kQ&pid=ImgRaw&r=0",
        "Hoa tốt nghiệp":
            "https://file1.hutech.edu.vn/file/news/tot_nghiep_2-1561445014.png",
        "Hoa tang lễ":
            "https://static.wixstatic.com/media/9d8ed5_63efad3fb2594010bd409d19d3ef8aa0~mv2.jpg/v1/fill/w_900,h_600,al_c,q_90/9d8ed5_63efad3fb2594010bd409d19d3ef8aa0~mv2.jpg",
        "Hoa chúc mừng":
            "https://media.istockphoto.com/vectors/party-popper-with-confetti-vector-id1125716911?k=6&m=1125716911&s=170667a&w=0&h=2QJzLxp2RFqt96beEhaWzdHHIrLUD6FOK2h3Ns4WH0s=",
    };
    const products = [
        {
            name: "Đoá hoa hồng",
            stars: 3.5,
            unitPrice: 320,
            status: "Available",
            discount: 20,
            soldQuantity: 123420,
            category: ["Hoa trồng vườn", "Hoa tốt ngiệp", "Hoa cưới"],
            imageVideoFiles: require("../../Public/Images/doa-hoa-hong.jpg"),
        },
        {
            name: "Bó hoa làm quà tặng",
            stars: 3.5,
            unitPrice: 350,
            status: "Out of stock",
            discount: 0,
            soldQuantity: 299222220,
            category: ["Hoa chúc mừng"],
            imageVideoFiles: require("../../Public/Images/doa-hoa.jpg"),
        },
        {
            name: "Hoa mừng sinh nhật",
            stars: 3.5,
            unitPrice: 400,
            status: "Out of stock",
            discount: 10,
            soldQuantity: 1021,
            category: ["Hoa sinh nhật"],
            imageVideoFiles: require("../../Public/Images/hoa-sn.jpg"),
        },
        {
            name: "Đoá hoa hồng",
            stars: 3.5,
            unitPrice: 320,
            status: "Available",
            discount: 20,
            soldQuantity: 123420,
            category: ["Hoa trồng vườn", "Hoa tốt ngiệp", "Hoa cưới"],
            imageVideoFiles: require("../../Public/Images/doa-hoa-hong.jpg"),
        },
        {
            name: "Bó hoa làm quà tặng",
            stars: 3.5,
            unitPrice: 350,
            status: "Out of stock",
            discount: 0,
            soldQuantity: 299222220,
            category: ["Hoa chúc mừng"],
            imageVideoFiles: require("../../Public/Images/doa-hoa.jpg"),
        },
        {
            name: "Hoa mừng sinh nhật",
            stars: 3.5,
            unitPrice: 400,
            status: "Out of stock",
            discount: 10,
            soldQuantity: 1021,
            category: ["Hoa sinh nhật"],
            imageVideoFiles: require("../../Public/Images/hoa-sn.jpg"),
        },
        {
            name: "Đoá hoa hồng",
            stars: 3.5,
            unitPrice: 320,
            status: "Available",
            discount: 20,
            soldQuantity: 123420,
            category: ["Hoa trồng vườn", "Hoa tốt ngiệp", "Hoa cưới"],
            imageVideoFiles: require("../../Public/Images/doa-hoa-hong.jpg"),
        },
        {
            name: "Bó hoa làm quà tặng",
            stars: 3.5,
            unitPrice: 350,
            status: "Out of stock",
            discount: 0,
            soldQuantity: 299222220,
            category: ["Hoa chúc mừng"],
            imageVideoFiles: require("../../Public/Images/doa-hoa.jpg"),
        },
        {
            name: "Hoa mừng sinh nhật",
            stars: 3.5,
            unitPrice: 400,
            status: "Out of stock",
            discount: 10,
            soldQuantity: 1021,
            category: ["Hoa sinh nhật"],
            imageVideoFiles: require("../../Public/Images/hoa-sn.jpg"),
        },
        {
            name: "Đoá hoa hồng",
            stars: 3.5,
            unitPrice: 320,
            status: "Available",
            discount: 20,
            soldQuantity: 123420,
            category: ["Hoa trồng vườn", "Hoa tốt ngiệp", "Hoa cưới"],
            imageVideoFiles: require("../../Public/Images/doa-hoa-hong.jpg"),
        },
        {
            name: "Bó hoa làm quà tặng",
            stars: 3.5,
            unitPrice: 350,
            status: "Out of stock",
            discount: 0,
            soldQuantity: 299222220,
            category: ["Hoa chúc mừng"],
            imageVideoFiles: require("../../Public/Images/doa-hoa.jpg"),
        },
        {
            name: "Hoa mừng sinh nhật",
            stars: 3.5,
            unitPrice: 400,
            status: "Out of stock",
            discount: 10,
            soldQuantity: 1021,
            category: ["Hoa sinh nhật"],
            imageVideoFiles: require("../../Public/Images/hoa-sn.jpg"),
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
            <View className="opacity-100 flex-row bg-blue-400 h-20 items-end pl-4 pb-1">
                <Pressable
                    onPress={() => inputRef.current.focus()}
                    className="flex-row flex-grow w-4/5 bg-white text-black rounded-md items-center pl-2 py-1 border border-gray-400"
                >
                    <Image
                        className="w-5 h-5 mr-2"
                        source={require("../../Public/Images/search.png")}
                    />
                    <TextInput
                        ref={inputRef}
                        placeholder="Tìm kiếm"
                        placeholderTextColor="gray"
                        value={txtSearch}
                        onChangeText={SetTxtSearch}
                        className="w-4/5 text-#5C5D60 opacity-100 border-#c9c3c3"
                        style={{
                            fontSize: textInputDefaultSize * scale,
                        }}
                    ></TextInput>
                    <TouchableOpacity
                        className="p-1 flex-row flex-end"
                        // onPress={() => SetModalVisible(true)}
                    >
                        <Image
                            className="h-5 w-5"
                            source={require("../../Public/Images/filter.png")}
                        />
                    </TouchableOpacity>
                </Pressable>
                <TouchableOpacity
                    className="w-10 p-1 flex-grow items-center justify-center"
                    onPress={() => setModalVisible(true)}
                >
                    <Image
                        className="h-6 w-6"
                        source={require("../../Public/Images/shopping-cart.png")}
                        style={{ tintColor: "white" }}
                    />
                </TouchableOpacity>
            </View>
            <View className="flex-row">
                <View>
                    <ScrollView
                        className="p-0 m-0 bg-[#E2F2FF]"
                        showsVerticalScrollIndicator={false}
                    >
                        <TouchableOpacity
                            key={0}
                            className="self-start bg-blue-100 p-3 items-center justify-center"
                            onPress={() => {
                                setIndex(0);
                            }}
                            style={
                                index === 0
                                    ? {
                                          backgroundColor: "#F8FCFF",
                                          borderLeftColor: "#69A5FF",
                                          borderLeftWidth: 4,
                                      }
                                    : {
                                          backgroundColor: "#E2F2FF",
                                      }
                            }
                        >
                            <View className="">
                                <Image
                                    className="w-12 h-12"
                                    source={{
                                        uri: "https://th.bing.com/th/id/R.d10f6cdbdee788fc31c200a327335357?rik=Eqo%2bzTxQDGQmbg&pid=ImgRaw&r=0",
                                    }}
                                />
                            </View>
                            <View className="w-20 items-center">
                                <CustomText>Tất cả</CustomText>
                            </View>
                        </TouchableOpacity>
                        {Object.entries(categories).map(
                            ([category, icon], id) => (
                                <TouchableOpacity
                                    key={id + 1}
                                    className="self-start bg-blue-100 p-3 items-center justify-center"
                                    onPress={() => {
                                        setIndex(id + 1);
                                    }}
                                    style={
                                        index === id + 1
                                            ? {
                                                  backgroundColor: "#F8FCFF",
                                                  borderLeftColor: "#69A5FF",
                                                  borderLeftWidth: 4,
                                              }
                                            : {
                                                  backgroundColor: "#E2F2FF",
                                              }
                                    }
                                >
                                    <View className="">
                                        <Image
                                            className="w-12 h-12"
                                            source={{ uri: icon }}
                                        />
                                    </View>
                                    <View className="w-20 items-center">
                                        <CustomText>{category}</CustomText>
                                    </View>
                                </TouchableOpacity>
                            )
                        )}

                        <View className="mb-44"></View>
                    </ScrollView>
                </View>

                <View className="flex-grow px-2">
                    {tmpProducts && tmpProducts.length > 0 ? (
                        <SuggestedProductList
                            products={tmpProducts}
                            isShowSoldQuantity={false}
                            betweenDistance={5}
                            paddingBottom={52}
                        />
                    ) : (
                        <View className="flex-grow gap-y-3 items-center justify-center">
                            <Image
                                className="h-24 w-24 ml-4"
                                source={require("../../Public/Images/no-product.png")}
                            />
                            <CustomText style={{ fontSize: 14 }}>
                                Chưa có sản phẩm {"\n"} cho danh mục này!
                            </CustomText>
                            <View className="mb-44"></View>
                        </View>
                    )}
                </View>
            </View>
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
}

export default Category;
