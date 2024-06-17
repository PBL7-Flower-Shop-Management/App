import React, { useContext, useState, useEffect } from "react";
import {
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Modal,
    ActivityIndicator,
    TextInput,
    TouchableWithoutFeedback,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import ImageViewer from "react-native-image-zoom-viewer";
import { CustomText } from "../Components/CustomText";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import { AuthContext } from "../../Context/AuthContext.js";
import * as ImagePicker from "expo-image-picker";
import {
    scale,
    textInputDefaultSize,
    CLOUDINARY_CLOUD_NAME,
    UPLOAD_PRESET,
} from "../../Utils/constants.js";

const Profile = ({ navigation }) => {
    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [userInformation, setUserInformation] = useState(null);
    const { refreshToken, userInfo, SetUserInfo } = useContext(AuthContext);
    const [isLoading, SetIsLoading] = useState(false);
    const [key, setKey] = useState("");
    const [informationType, setInformationType] = useState("");
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required("Name is required")
            .matches(
                /^[ \p{L}]+$/u,
                "Name field only contains unicode characters or spaces!"
            ),
        citizenId: yup
            .string()
            .trim()
            .transform((curr, orig) => (orig === "" ? null : curr))
            .matches(/^[0-9]*$/u, "CitizenId field only contains numbers!"),
        phoneNumber: yup
            .string()
            .trim()
            .transform((curr, orig) => (orig === "" ? null : curr))
            .matches(/^[0-9]*$/u, "Phone number field only contains numbers!"),
        email: yup
            .string()
            .trim()
            .required("Email is required")
            .email("Please provide a valid email!"),
    });

    const getUserInformation = async () => {
        let result = await refreshToken();
        if (!result.isSuccessfully) {
            Toast.show({
                type: "error",
                text1: result.data,
            });
            SetIsLoading(false);
            return;
        }

        const response = await FetchApi(
            UrlConfig.user.getProfile,
            "GET",
            result.data
        );

        if (response.succeeded) {
            SetUserInfo({ ...userInfo, ...response.data });
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
        SetIsLoading(false);
    };

    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            await updateAvatar(result.assets[0].uri);
        }
    };

    const uploadImage = async (image) => {
        if (!image) return;

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", UPLOAD_PRESET);
        data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    // headers: {
                    //     "Content-Type": "multipart/form-data",
                    // },
                    body: data,
                }
            );
            const result = await res.json();

            if (res.ok) return result;
            else {
                Toast.show({
                    type: "error",
                    text1: result.error.message,
                });
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: error.message ?? error,
            });
        }
    };

    const updateAvatar = async (uri) => {
        SetIsLoading(true);
        let result = await refreshToken();
        if (!result.isSuccessfully) {
            Toast.show({
                type: "error",
                text1: result.data,
            });
            SetIsLoading(false);
            return;
        }

        const image = {
            uri: uri,
            type: "image/jpeg",
            name: "photo.jpg",
        };
        const uploadedImage = await uploadImage(image);

        const response = await FetchApi(
            UrlConfig.user.updateProfile,
            "PUT",
            result.data,
            {
                avatarId: uploadedImage.public_id,
                avatarUrl: uploadedImage.url,
                name: userInformation.name,
                email: userInformation.email,
            }
        );
        if (response.succeeded) {
            SetUserInfo({ ...userInfo, avatarUrl: response.data.avatarUrl });
            Toast.show({
                type: "success",
                text1: "Update avatar successfully!",
            });
        } else
            Toast.show({
                type: "error",
                text1: response.message,
            });
        SetIsLoading(false);
    };

    const handleSubmit = async (value) => {
        SetIsLoading(true);
        let result = await refreshToken();
        if (!result.isSuccessfully) {
            Toast.show({
                type: "error",
                text1: result.data,
            });
            SetIsLoading(false);
            return;
        }

        const response = await FetchApi(
            UrlConfig.user.updateProfile,
            "PUT",
            result.data,
            {
                name: userInfo.name,
                citizenId: userInfo.citizenId,
                email: userInfo.email,
                phoneNumber: userInfo.phoneNumber,
                avatarUrl: userInfo.avatarUrl,
                [key]: value,
            }
        );
        if (response.succeeded) {
            SetUserInfo({ ...userInfo, [key]: response.data[key] });
            Toast.show({
                type: "success",
                text1: "Update information successfully!",
            });
            setIsPopUpVisible(false);
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
            setIsPopUpVisible(true);
        }
        SetIsLoading(false);
    };

    useEffect(() => {
        if (userInfo) {
            SetIsLoading(true);
            getUserInformation();
        }
    }, []);

    useEffect(() => {
        if (userInfo) {
            setUserInformation(userInfo);
        }
    }, [userInfo]);

    return (
        <View className="flex-1 bg-gray-100">
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            {isLoading && (
                <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center z-10">
                    <ActivityIndicator size="large" color="green" />
                </View>
            )}
            <View className="relative h-1/4 bg-blue-400">
                <View className="flex-row items-center h-10 mt-10">
                    <TouchableOpacity
                        className="absolute z-10 p-4"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Image
                            className="h-6 w-6"
                            style={{ tintColor: "white" }}
                            source={require("../../Public/Images/leftArrow.png")}
                        />
                    </TouchableOpacity>
                    <View className="flex-grow">
                        <CustomText
                            className="self-center text-white"
                            style={{ fontSize: 14 }}
                        >
                            Account information
                        </CustomText>
                    </View>
                </View>

                <View className="absolute self-center -bottom-20">
                    <TouchableOpacity
                        className="border border-gray-300 rounded-full p-1"
                        onPress={() => SetIsModalVisible(true)}
                    >
                        <Image
                            className="h-40 w-40 rounded-full"
                            source={
                                userInformation?.avatarUrl
                                    ? { uri: userInformation.avatarUrl }
                                    : require("../../Public/Images/notFoundAvatar.png")
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="absolute -bottom-1 right-4 p-1.5 rounded-full bg-gray-300"
                        onPress={async () => await chooseImage()}
                    >
                        <Image
                            className="h-5 w-5"
                            source={require("../../Public/Images/pen.png")}
                        />
                    </TouchableOpacity>
                    {userInfo != null && (
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
                                        url: userInformation?.avatarUrl,
                                    },
                                ]}
                                renderIndicator={() => {}}
                                onClick={() => SetIsModalVisible(false)}
                                enableSwipeDown={true}
                                onSwipeDown={() => SetIsModalVisible(false)}
                            />
                        </Modal>
                    )}
                </View>
            </View>
            <View className="mt-20">
                <View className="gap-y-0.5 pb-4 pt-4">
                    <TouchableOpacity
                        className="bg-white flex-row px-3 py-4 items-center"
                        onPress={() => {
                            setKey("name");
                            setInformationType("Full name");
                            setIsPopUpVisible(true);
                        }}
                    >
                        <Image
                            className="h-5 w-5 ml-1 mr-3"
                            style={{ tintColor: "gray" }}
                            source={require("../../Public/Images/lightUser.png")}
                        />
                        <View>
                            <CustomText>Full name</CustomText>
                            <CustomText className="text-gray-400">
                                {userInformation?.name ?? "Add name"}
                            </CustomText>
                        </View>
                        <View className="flex-grow justify-center items-end">
                            <Image
                                className="h-6 w-6"
                                style={{ tintColor: "#31b1e0" }}
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                    </TouchableOpacity>
                    <View className="-mx-20 h-0.5 bg-gray-100"></View>
                    <TouchableOpacity
                        className="bg-white flex-row px-3 py-4 items-center"
                        onPress={() => {
                            setKey("citizenId");
                            setInformationType("Citizen id");
                            setIsPopUpVisible(true);
                        }}
                    >
                        <Image
                            className="h-7 w-7 mr-2"
                            style={{ tintColor: "gray" }}
                            source={require("../../Public/Images/card.png")}
                        />
                        <View>
                            <CustomText>Citizen id</CustomText>
                            <CustomText className="text-gray-400">
                                {userInformation?.citizenId ?? "Add citizen id"}
                            </CustomText>
                        </View>
                        <View className="flex-grow justify-center items-end">
                            <Image
                                className="h-6 w-6"
                                style={{ tintColor: "#31b1e0" }}
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                    </TouchableOpacity>
                    <View className="-mx-10 h-0.5 bg-gray-100"></View>
                    <TouchableOpacity
                        className="bg-white flex-row px-3 py-4 items-center"
                        onPress={() => {
                            setKey("phoneNumber");
                            setInformationType("Phone number");
                            setIsPopUpVisible(true);
                        }}
                    >
                        <Image
                            className="h-5 w-5 ml-1 mr-3"
                            style={{ tintColor: "gray" }}
                            source={require("../../Public/Images/phone.png")}
                        />
                        <View>
                            <CustomText>Phone number</CustomText>
                            <CustomText className="text-gray-400">
                                {userInformation?.phoneNumber ??
                                    "Add phone number"}
                            </CustomText>
                        </View>
                        <View className="flex-grow justify-center items-end">
                            <Image
                                className="h-6 w-6"
                                style={{ tintColor: "#31b1e0" }}
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                    </TouchableOpacity>
                    <View className="-mx-10 h-0.5 bg-gray-100"></View>
                    <TouchableOpacity
                        className="bg-white flex-row px-3 py-4 items-center"
                        onPress={() => {
                            setKey("email");
                            setInformationType("Email");
                            setIsPopUpVisible(true);
                        }}
                    >
                        <Image
                            className="h-7 w-7 mr-2"
                            style={{ tintColor: "gray" }}
                            source={require("../../Public/Images/email.png")}
                        />
                        <View>
                            <CustomText>Email</CustomText>
                            <CustomText className="text-gray-400">
                                {userInformation?.email ?? "Thêm email"}
                            </CustomText>
                        </View>
                        <View className="flex-grow justify-center items-end">
                            <Image
                                className="h-6 w-6"
                                style={{ tintColor: "#31b1e0" }}
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                    </TouchableOpacity>
                    <View className="-mx-10 h-0.5 bg-gray-100"></View>
                    <TouchableOpacity
                        className="bg-white flex-row px-3 py-4 items-center"
                        onPress={() => navigation.navigate("ChangePassword")}
                    >
                        <Image
                            className="h-6 w-6 ml-0.5 mr-2"
                            style={{ tintColor: "gray" }}
                            source={require("../../Public/Images/darkLock.png")}
                        />
                        <CustomText>Change password</CustomText>
                        <View className="flex-grow justify-center items-end">
                            <Image
                                className="h-6 w-6"
                                style={{ tintColor: "#31b1e0" }}
                                source={require("../../Public/Images/rightArrow.png")}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Formik
                enableReinitialize={true}
                initialValues={
                    userInformation
                        ? {
                              name: userInformation.name,
                              citizenId: userInformation.citizenId,
                              phoneNumber: userInformation.phoneNumber,
                              email: userInformation.email,
                          }
                        : {
                              name: "",
                              citizenId: "",
                              phoneNumber: "",
                              email: "",
                          }
                }
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    handleSubmit(values[key]);
                }}
                validateOnChange
            >
                {({
                    setFieldValue,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                }) => (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isPopUpVisible}
                        onRequestClose={() => {
                            setIsPopUpVisible(!isPopUpVisible);
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPressOut={() => {
                                setIsPopUpVisible(false);
                            }}
                        >
                            <View className="flex-1 justify-center items-center">
                                <TouchableWithoutFeedback>
                                    <View
                                        className="items-center bg-white rounded-lg py-5 w-5/6"
                                        style={{
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowOpacity: 0.25,
                                            elevation: 5,
                                        }}
                                    >
                                        <View className="flex-row w-full items-center justify-center mb-4">
                                            <TouchableOpacity
                                                className="absolute left-1 p-2"
                                                onPress={() =>
                                                    setIsPopUpVisible(false)
                                                }
                                            >
                                                <Image
                                                    source={require("../../Public/Images/darkCancel.png")}
                                                />
                                            </TouchableOpacity>
                                            <CustomText
                                                style={{
                                                    fontSize: 15 * scale,
                                                }}
                                            >
                                                Edit information
                                            </CustomText>
                                        </View>
                                        <View className="flex-row w-full gap-2 px-3">
                                            <View className="h-10 justify-center">
                                                <CustomText>
                                                    {informationType}
                                                </CustomText>
                                            </View>
                                            <View className="flex-column flex-initial flex-grow mb-3">
                                                <TextInput
                                                    className="h-10 w-full border rounded-md p-3"
                                                    style={{
                                                        borderColor: "#43BDD4",
                                                        fontSize:
                                                            textInputDefaultSize *
                                                            scale,
                                                        color: "#5C5D60",
                                                        opacity: 1,
                                                    }}
                                                    placeholder={
                                                        informationType
                                                    }
                                                    value={values[key]}
                                                    onChangeText={handleChange(
                                                        key
                                                    )}
                                                    onBlur={handleBlur(key)}
                                                ></TextInput>
                                                {errors[key] && (
                                                    <CustomText
                                                        style={{
                                                            color: "red",
                                                            fontWeight: "bold",
                                                            marginTop: 5,
                                                        }}
                                                    >
                                                        {errors[key]}
                                                    </CustomText>
                                                )}
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                gap: 20,
                                            }}
                                        >
                                            <TouchableOpacity
                                                className="items-center justify-center rounded-md p-3 w-2/5 bg-blue-400"
                                                onPress={async (e) => {
                                                    if (!errors[key]) {
                                                        setIsPopUpVisible(
                                                            false
                                                        );
                                                        handleSubmit(
                                                            values[key]
                                                        );
                                                    }
                                                }}
                                            >
                                                <CustomText
                                                    style={{
                                                        color: "white",
                                                        fontFamily:
                                                            "Be Vietnam bold",
                                                    }}
                                                >
                                                    Edit
                                                </CustomText>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                className="items-center justify-center rounded-md p-3 w-2/5"
                                                style={{
                                                    backgroundColor: "#F1F1F1",
                                                }}
                                                onPress={() => {
                                                    setIsPopUpVisible(false);
                                                    setFieldValue(
                                                        key,
                                                        userInformation[key]
                                                    );
                                                }}
                                            >
                                                <CustomText
                                                    style={{
                                                        color: "#4F4F4F",
                                                        fontFamily:
                                                            "Be Vietnam bold",
                                                    }}
                                                >
                                                    Cancel
                                                </CustomText>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                )}
            </Formik>
            <Toast config={toastConfig} />
        </View>
    );
};

export default Profile;
