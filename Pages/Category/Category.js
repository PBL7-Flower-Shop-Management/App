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
import Toast from "react-native-toast-message";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";

function Category({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [txtSearch, SetTxtSearch] = useState(null);
    const [index, setIndex] = useState(1);
    const [categoriesWithFlowers, setCategoriesWithFlowers] = useState([]);
    const [tmpProducts, setTmpProducts] = useState([]);
    const inputRef = useRef(null);

    const getCategories = async () => {
        const response = await FetchApi(
            UrlConfig.category.getAllWithFlowers,
            "GET",
            null
        );

        if (response.succeeded) {
            setCategoriesWithFlowers(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        console.log(index);
        console.log(categoriesWithFlowers.length > 0);
        if (categoriesWithFlowers.length > 0)
            setTmpProducts(categoriesWithFlowers[index - 1].flowers);
    }, [index, categoriesWithFlowers]);

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
                        {categoriesWithFlowers.map(
                            (categoryWithFlowers, id) => (
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
                                            source={{
                                                uri: categoryWithFlowers.avatar,
                                            }}
                                        />
                                    </View>
                                    <View className="w-20 items-center">
                                        <CustomText>
                                            {categoryWithFlowers.name}
                                        </CustomText>
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
