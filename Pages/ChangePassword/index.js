import React, { useContext, useState } from "react";
import {
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    TextInput,
    Pressable,
} from "react-native";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { CustomText } from "../Components/CustomText";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { scale, textInputDefaultSize } from "../../Utils/constants.js";
import { PopupContext } from "../../Context/PopupContext.js";

const ChangePassword = ({ navigation }) => {
    const { refreshToken, logout } = useContext(AuthContext);
    const [isLoading, SetIsLoading] = useState(false);
    const [showPwd, SetShowPwd] = useState(false);
    const { setVisible } = useContext(PopupContext);

    const validationSchema = yup.object().shape({
        password: yup.string().trim().required("Password field is required!"),
        newPassword: yup
            .string()
            .trim()
            .required("New password field is required!")
            .min(8, "New password length must be greater than 8!")
            .test(
                "has-lower",
                "New password must contain at least one lowercase letter.",
                (value) => /[a-z]/.test(value)
            )
            .test(
                "has-upper",
                "New password must contain at least one uppercase letter.",
                (value) => /[A-Z]/.test(value)
            )
            .test(
                "has-number",
                "New password must contain at least one number.",
                (value) => /\d/.test(value)
            )
            .test(
                "has-special",
                "New password must contain at least one special character (@$!%*?&).",
                (value) => /[\@\$\!\%\*\?\&]/.test(value)
            )
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "New password only contains allowed characters!"
            ),
        confirmNewPassword: yup
            .string()
            .trim()
            .required("Confirm new password is required")
            .test(
                "passwords-match",
                "Confirm new password field must match with new password field",
                function (value) {
                    // Check if confirmPassword is not null or undefined
                    if (!value) return false;

                    // Access the 'password' field value via 'this.parent.password'
                    return value === this.parent.newPassword;
                }
            ),
    });

    const handleSubmit = async (values) => {
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
            UrlConfig.user.changePassword,
            "PATCH",
            result.data,
            values
        );
        if (response.succeeded) {
            logout();
            navigation.navigate("Account", { changePasswordSuccess: true });
        } else {
            Toast.show({
                type: "error",
                text1: response.message,
            });
        }
        SetIsLoading(false);
    };

    return (
        <Formik
            initialValues={{
                password: "",
                newPassword: "",
                confirmNewPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                handleSubmit(values);
            }}
            validateOnChange
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                    <View className="relative bg-blue-400">
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
                                    Change password
                                </CustomText>
                            </View>
                        </View>
                    </View>
                    <View className="gap-y-0.5 bg-white pb-4">
                        <View className="bg-white flex-row px-3 py-2 pt-4 items-center">
                            <View>
                                <CustomText>Old password</CustomText>
                            </View>
                        </View>
                        <View className="px-2">
                            <View className="items-center flex-row relative">
                                <TextInput
                                    className="flex-grow border rounded-md border-gray-400 pr-10"
                                    style={{
                                        padding: 10,
                                        fontSize: textInputDefaultSize * scale,
                                        color: "#5C5D60",
                                        opacity: 1,
                                    }}
                                    placeholder="Password"
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    secureTextEntry={!showPwd}
                                ></TextInput>
                                <Pressable
                                    className="absolute right-1 p-2"
                                    onPress={() => {
                                        SetShowPwd(!showPwd);
                                    }}
                                >
                                    <Image
                                        source={
                                            showPwd
                                                ? require("../../Public/Images/showPwd.png")
                                                : require("../../Public/Images/hidePwd.png")
                                        }
                                    />
                                </Pressable>
                            </View>
                            <ErrorMessage
                                name="password"
                                component={CustomText}
                                style={{ color: "red" }}
                            />
                        </View>
                        <View className="px-2">
                            <View className="bg-white flex-row py-2 items-center">
                                <View>
                                    <CustomText>New password</CustomText>
                                </View>
                            </View>
                            <View className="items-center flex-row">
                                <TextInput
                                    className="flex-grow border rounded-md border-gray-400"
                                    style={{
                                        padding: 10,
                                        fontSize: textInputDefaultSize * scale,
                                        color: "#5C5D60",
                                        opacity: 1,
                                    }}
                                    placeholder="New password"
                                    value={values.newPassword}
                                    onChangeText={handleChange("newPassword")}
                                    onBlur={handleBlur("newPassword")}
                                    secureTextEntry={!showPwd}
                                ></TextInput>
                                <Pressable
                                    className="absolute right-2 p-2"
                                    onPress={() => {
                                        SetShowPwd(!showPwd);
                                    }}
                                >
                                    <Image
                                        source={
                                            showPwd
                                                ? require("../../Public/Images/showPwd.png")
                                                : require("../../Public/Images/hidePwd.png")
                                        }
                                    />
                                </Pressable>
                            </View>
                            <ErrorMessage
                                name="newPassword"
                                component={CustomText}
                                style={{ color: "red" }}
                            />
                        </View>
                        <View className="px-2 mb-4">
                            <View className="bg-white flex-row py-2 items-center">
                                <View>
                                    <CustomText>Confirm password</CustomText>
                                </View>
                            </View>
                            <View className="items-center flex-row">
                                <TextInput
                                    className="flex-grow border rounded-md border-gray-400"
                                    style={{
                                        padding: 10,
                                        fontSize: textInputDefaultSize * scale,
                                        color: "#5C5D60",
                                        opacity: 1,
                                    }}
                                    placeholder="Confirm new password"
                                    value={values.confirmNewPassword}
                                    onChangeText={handleChange(
                                        "confirmNewPassword"
                                    )}
                                    onBlur={handleBlur("confirmNewPassword")}
                                    secureTextEntry={!showPwd}
                                ></TextInput>
                                <Pressable
                                    className="absolute right-2 p-2"
                                    onPress={() => {
                                        SetShowPwd(!showPwd);
                                    }}
                                >
                                    <Image
                                        source={
                                            showPwd
                                                ? require("../../Public/Images/showPwd.png")
                                                : require("../../Public/Images/hidePwd.png")
                                        }
                                    />
                                </Pressable>
                            </View>
                            <ErrorMessage
                                name="confirmNewPassword"
                                component={CustomText}
                                style={{ color: "red" }}
                            />
                        </View>
                        <TouchableOpacity
                            className="bg-blue-400 p-3 self-center rounded-md"
                            onPress={handleSubmit}
                        >
                            <CustomText className="text-white">
                                Change password
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                    <Toast config={toastConfig} />
                </View>
            )}
        </Formik>
    );
};

export default ChangePassword;
