import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    StatusBar,
    Image,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import { FetchApi } from "../../Utils/FetchApi.js";
import UrlConfig from "../../Config/UrlConfig.js";

const ForgotPassword = ({ navigation }) => {
    const [isLoading, SetIsLoading] = useState(false);

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .max(100, "Email length can't be greater than 100!")
            .email("Email format is invalid!")
            .required("Email is required"),
    });

    return (
        <Formik
            initialValues={{
                email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                // Handle form submission logic here
                console.log(values);
                SetIsLoading(true);

                const response = await FetchApi(
                    UrlConfig.user.forgotPassword,
                    "PATCH",
                    null,
                    values
                );

                if (response.succeeded) {
                    SetIsLoading(false);
                    navigation.navigate("ResetPassword", {
                        forgotSuccess: true,
                        email: values.email,
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
                                Flower shopping
                            </CustomText>
                            <CustomText style={styles.subtitle}>
                                Best price, best flower
                            </CustomText>
                        </View>
                        <View style={styles.body}>
                            <CustomText
                                style={{
                                    alignSelf: "flex-start",
                                    color: "#19BB50",
                                }}
                            >
                                Please enter your account email to reset
                                password!
                            </CustomText>
                            <View style={styles.textInput}>
                                <CustomText style={{ width: 65 }}>
                                    Email:
                                </CustomText>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                ></TextInput>
                            </View>
                            {touched.email && errors.email && (
                                <CustomText style={styles.error}>
                                    {errors.email}
                                </CustomText>
                            )}
                            <View style={{ gap: 14 }}>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={styles.btnForgot}
                                >
                                    <CustomText style={styles.txtForgot}>
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
export default ForgotPassword;
