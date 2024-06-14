import React, { useState, useRef, useEffect, useContext } from "react";
import {
    TextInput,
    View,
    StatusBar,
    TouchableOpacity,
    Pressable,
    Image,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { CustomText } from "../Components/CustomText";
import { scale, textInputDefaultSize } from "../../Utils/constants.js";
import SuggestedProductList from "../Components/SuggestedProductList.js";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import { CartContext } from "../../Context/CartContext.js";

const Search = ({ navigation, route }) => {
    const [txtSearch, SetTxtSearch] = useState(null);
    const inputRef = useRef(null);
    const [flowerList, SetFlowerList] = useState([]);
    const [isLoading, SetIsLoading] = useState(false);
    const [refresh, SetRefresh] = useState(false);
    const [url, SetUrl] = useState();
    const [isViewAll, SetViewAll] = useState(false);
    const [title, SetTitle] = useState("Flowers");
    const { setCartVisible } = useContext(CartContext);

    const getFlowers = async () => {
        SetIsLoading(true);
        const response = await FetchApi(url, "GET", null);

        if (response.succeeded) {
            SetFlowerList(response.data);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
        SetIsLoading(false);
    };

    useEffect(() => {
        if (txtSearch) {
            SetUrl(
                `${UrlConfig.flower.getAll}?keyword=${encodeURIComponent(
                    txtSearch
                )}&isExport=${true}`
            );
        }
    }, [txtSearch]);

    useEffect(() => {
        if (refresh) {
            getFlowers();
        }
    }, [refresh]);

    useEffect(() => {
        if (route.params?.url) {
            SetUrl(route.params?.url);
            SetTitle(route.params?.title);
            SetViewAll(true);
        } else if (route.params?.flowerList) {
            SetFlowerList(route.params?.flowerList);
            SetTitle(route.params?.title);
            SetViewAll(true);
        } else if (route.params?.txtSearch) {
            SetTxtSearch(route.params?.txtSearch);
            inputRef.current.focus();
        }
    }, [route.params]);

    useEffect(() => {
        if (url) getFlowers();
    }, [url]);

    useEffect(() => {
        if (!isViewAll) {
            inputRef.current.focus();
            // SetUrl(UrlConfig.flower.getAll);
        }
    }, [isViewAll]);

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
            <View className="pr-4">
                <View className="mt-10 w-full">
                    <View
                        className="opacity-100 flex-row bg-white mt-1"
                        style={{
                            justifyContent: isViewAll
                                ? "space-between"
                                : undefined,
                        }}
                    >
                        <TouchableOpacity
                            className="p-2 ml-1"
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                className="w-5 h-5"
                                source={require("../../Public/Images/back.png")}
                            />
                        </TouchableOpacity>
                        {!isViewAll && (
                            <Pressable
                                onPress={() => inputRef.current.focus()}
                                className="flex-row flex-grow w-4/5 bg-DFE0E2 text-black rounded-md items-center pl-2 py-1 border border-gray-400"
                            >
                                <Image
                                    className="w-5 h-5 mr-2"
                                    source={require("../../Public/Images/search.png")}
                                />
                                <TextInput
                                    ref={inputRef}
                                    placeholder="Search by flower name, habitat, category and description"
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
                        )}
                        <TouchableOpacity
                            className="w-10 p-1 flex-row flex-end items-center justify-center"
                            onPress={() => setCartVisible(true)}
                        >
                            <Image
                                className="h-6 w-6"
                                source={require("../../Public/Images/shopping-cart.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <CustomText
                style={{
                    marginLeft: 20,
                    marginVertical: 10,
                    fontFamily: "Be Vietnam bold",
                }}
            >
                {title}
            </CustomText>

            <ScrollView
                className="px-4"
                refreshControl={
                    <RefreshControl
                        style={{ tintColor: "green" }}
                        refreshing={refresh}
                        onRefresh={() => SetRefresh(true)}
                    />
                }
            >
                <View className="">
                    <SuggestedProductList
                        products={flowerList}
                        navigation={navigation}
                    />
                </View>
            </ScrollView>
            <Toast config={toastConfig} />
        </View>
    );
};
export default Search;
