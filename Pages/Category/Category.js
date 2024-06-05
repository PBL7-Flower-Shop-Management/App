import React, { useState, useRef, useEffect, useContext } from "react";
import {
    View,
    TouchableOpacity,
    Pressable,
    TextInput,
    Image,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { CustomText } from "../Components/CustomText";
import { scale, textInputDefaultSize } from "../../Utils/constants";
import SuggestedProductList from "../Components/SuggestedProductList";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import { CartContext } from "../../Context/CartContext.js";

function Category({ navigation }) {
    const [txtSearch, SetTxtSearch] = useState(null);
    const [index, setIndex] = useState(1);
    const [categoriesWithFlowers, setCategoriesWithFlowers] = useState([]);
    const [tmpProducts, setTmpProducts] = useState([]);
    const inputRef = useRef(null);
    const [isLoading, SetIsLoading] = useState(false);
    const [refresh, SetRefresh] = useState(false);
    const { setCartVisible } = useContext(CartContext);

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
        SetIsLoading(false);
        SetRefresh(false);
    };

    const handleRefresh = () => {
        SetRefresh(true);
        getCategories();
    };

    useEffect(() => {
        SetIsLoading(true);
        getCategories();
    }, []);

    useEffect(() => {
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
            {isLoading && (
                <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
                    <ActivityIndicator size="large" color="green" />
                </View>
            )}
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
                        // onPress={() => setCartVisible(true)}
                    >
                        <Image
                            className="h-5 w-5"
                            source={require("../../Public/Images/filter.png")}
                        />
                    </TouchableOpacity>
                </Pressable>
                <TouchableOpacity
                    className="w-10 p-1 flex-grow items-center justify-center"
                    onPress={() => setCartVisible(true)}
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
                        refreshControl={
                            <RefreshControl
                                style={{ tintColor: "green" }}
                                refreshing={refresh}
                                onRefresh={() => handleRefresh()}
                            />
                        }
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
                            navigation={navigation}
                            refreshing={refresh}
                            onRefresh={() => handleRefresh()}
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
            <Toast config={toastConfig} />
        </View>
    );
}

export default Category;
