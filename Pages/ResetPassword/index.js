import React, { useState, useEffect } from "react";
import {
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    StatusBar,
    Image,
    Pressable,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";

const ResetPassword = ({ navigation, route }) => {
    const [isLoading, SetIsLoading] = useState(false);
    const [showPwd, SetShowPwd] = useState(false);

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .max(100, "Email length can't be greater than 100!")
            .email("Email format is invalid!"),
        password: yup
            .string()
            .trim()
            .required("Password field is required!")
            .min(8, "Password length must be greater than 8!")
            .test(
                "has-lower",
                "Password must contain at least one lowercase letter.",
                (value) => /[a-z]/.test(value)
            )
            .test(
                "has-upper",
                "Password must contain at least one uppercase letter.",
                (value) => /[A-Z]/.test(value)
            )
            .test(
                "has-number",
                "Password must contain at least one number.",
                (value) => /\d/.test(value)
            )
            .test(
                "has-special",
                "Password must contain at least one special character (@$!%*?&).",
                (value) => /[\@\$\!\%\*\?\&]/.test(value)
            )
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password only contains allowed characters!"
            ),
        confirmPassword: yup
            .string()
            .trim()
            .required("Confirm password is required")
            .test(
                "passwords-match",
                "Confirm password field must match with password field",
                function (value) {
                    // Check if confirmPassword is not null or undefined
                    if (!value) return false;

                    // Access the 'password' field value via 'this.parent.password'
                    return value === this.parent.password;
                }
            ),
        token: yup.string().trim().required("Token is required"),
    });

    useEffect(() => {
        if (route.params?.forgotSuccess) {
            Toast.show({
                type: "success",
                text1: "The system has sent reset password information to your email! Please check your email to receive reset password token!",
            });
        }
    }, [route.params]);

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
                token: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                // Handle form submission logic here
                console.log(values);
                SetIsLoading(true);

                console.log(route.params?.email);
                const response = await FetchApi(
                    UrlConfig.user.resetPassword,
                    "PATCH",
                    null,
                    { ...values, email: route.params?.email }
                );

                if (response.succeeded) {
                    SetIsLoading(false);
                    navigation.navigate("Login", {
                        resetSuccess: true,
                    });
                } else {
                    Toast.show({
                        type: "error",
                        text1: response.message,
                    });
                }
                SetIsLoading(false);
            }}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
            }) => (
                <View style={styles.container}>
                    <View style={styles.form}>
                        {/*statusbar to set wifi, battery... to white*/}
                        <StatusBar
                            barStyle="light-content"
                            translucent
                            backgroundColor="transparent"
                        />
                        {isLoading && (
                            <View style={styles.waitingCircle}>
                                <ActivityIndicator size="large" color="green" />
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.backContainer}
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                source={require("../../Public/Images/back.png")}
                                style={styles.backBtn}
                            />
                        </TouchableOpacity>
                        <View style={styles.head}>
                            <CustomText style={styles.title}>
                                Reset password
                            </CustomText>
                        </View>
                        <View style={styles.body}>
                            <CustomText
                                style={{
                                    alignSelf: "flex-start",
                                    color: "#19BB50",
                                }}
                            >
                                Please enter new password!
                            </CustomText>
                            <View style={styles.textInput}>
                                <CustomText className="w-5/12">
                                    Password:
                                </CustomText>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    secureTextEntry={!showPwd}
                                ></TextInput>
                                <Pressable
                                    style={styles.icon}
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
                            {touched.password && errors.password && (
                                <CustomText style={styles.error}>
                                    {errors.password}
                                </CustomText>
                            )}
                            <View style={styles.textInput}>
                                <CustomText className="w-5/12">
                                    Confirm password:
                                </CustomText>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm password"
                                    value={values.confirmPassword}
                                    onChangeText={handleChange(
                                        "confirmPassword"
                                    )}
                                    onBlur={handleBlur("confirmPassword")}
                                    secureTextEntry={!showPwd}
                                ></TextInput>
                                <Pressable
                                    style={styles.icon}
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
                            {touched.confirmPassword &&
                                errors.confirmPassword && (
                                    <CustomText style={styles.error}>
                                        {errors.confirmPassword}
                                    </CustomText>
                                )}
                            <View style={styles.textInput}>
                                <CustomText className="w-5/12">
                                    Token:
                                </CustomText>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Token sent to your mail"
                                    value={values.token}
                                    onChangeText={handleChange("token")}
                                    onBlur={handleBlur("token")}
                                ></TextInput>
                            </View>
                            {touched.token && errors.token && (
                                <CustomText style={styles.error}>
                                    {errors.token}
                                </CustomText>
                            )}
                            <View style={{ gap: 14, marginTop: 5 }}>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={styles.btnConfirm}
                                >
                                    <CustomText style={styles.txtConfirm}>
                                        Confirm
                                    </CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Toast config={toastConfig} />
                </View>
            )}
        </Formik>
    );
};
export default ResetPassword;
