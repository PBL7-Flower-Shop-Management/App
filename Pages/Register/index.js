import React, { useContext, useState } from "react";
import {
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Image,
    Pressable,
    StatusBar,
    useWindowDimensions,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import { AuthContext } from "../../Context/AuthContext.js";

const Register = ({ navigation }) => {
    const { isLoading, register } = useContext(AuthContext);
    const [showPwd, SetShowPwd] = useState(false);
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required("Name is required")
            .matches(
                /^[ \p{L}]+$/u,
                "Name field only contains unicode characters or spaces!"
            ),
        email: yup
            .string()
            .max(100, "Email length can't be greater than 100!")
            .email("Email format is invalid!")
            .required("Email is required"),
        username: yup
            .string()
            .trim()
            .required("Username field is required!")
            .matches(
                /^[a-zA-Z0-9_]+$/,
                "Username only contains a-z characters, numbers and underscore!"
            ),
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
    });

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                username: "",
                password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                const res = await register(values);
                if (res.succeeded)
                    navigation.navigate("Login", {
                        registerSuccess: true,
                    });
                else
                    Toast.show({
                        type: "error",
                        text1: res.message,
                    });
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
                <View
                    style={[
                        styles.container,
                        { minHeight: useWindowDimensions().height },
                    ]}
                >
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
                                Register
                            </CustomText>
                        </View>
                        <KeyboardAvoidingView
                            behavior={
                                Platform.OS === "ios" ? "padding" : "height"
                            }
                            style={{ flex: 1 }}
                        >
                            <ScrollView>
                                <View style={styles.body}>
                                    <View style={styles.formikInput}>
                                        <View style={styles.textInput}>
                                            <CustomText style={{ width: 115 }}>
                                                Full name:
                                            </CustomText>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Full name"
                                                value={values.name}
                                                onChangeText={handleChange(
                                                    "name"
                                                )}
                                                onBlur={handleBlur("name")}
                                            ></TextInput>
                                        </View>
                                        {touched.name && errors.name && (
                                            <CustomText style={styles.error}>
                                                {errors.name}
                                            </CustomText>
                                        )}
                                    </View>
                                    <View style={styles.formikInput}>
                                        <View style={styles.textInput}>
                                            <CustomText style={{ width: 115 }}>
                                                Email:
                                            </CustomText>
                                            <TextInput
                                                style={[
                                                    styles.input,
                                                    { paddingRight: 38 },
                                                ]}
                                                placeholder="Email"
                                                value={values.email}
                                                onChangeText={handleChange(
                                                    "email"
                                                )}
                                                onBlur={handleBlur("email")}
                                            ></TextInput>
                                        </View>
                                        {touched.email && errors.email && (
                                            <CustomText style={styles.error}>
                                                {errors.email}
                                            </CustomText>
                                        )}
                                    </View>
                                    <View style={styles.formikInput}>
                                        <View style={styles.textInput}>
                                            <CustomText style={{ width: 115 }}>
                                                Username:
                                            </CustomText>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Username"
                                                value={values.username}
                                                onChangeText={handleChange(
                                                    "username"
                                                )}
                                                onBlur={handleBlur("username")}
                                            ></TextInput>
                                        </View>
                                        {touched.username &&
                                            errors.username && (
                                                <CustomText
                                                    style={styles.error}
                                                >
                                                    {errors.username}
                                                </CustomText>
                                            )}
                                    </View>
                                    <View style={styles.formikInput}>
                                        <View style={styles.textInput}>
                                            <CustomText style={{ width: 115 }}>
                                                Password:
                                            </CustomText>
                                            <TextInput
                                                style={[
                                                    styles.input,
                                                    { paddingRight: 38 },
                                                ]}
                                                placeholder="Password"
                                                value={values.password}
                                                onChangeText={handleChange(
                                                    "password"
                                                )}
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
                                        {touched.password &&
                                            errors.password && (
                                                <CustomText
                                                    style={styles.error}
                                                >
                                                    {errors.password}
                                                </CustomText>
                                            )}
                                    </View>
                                    <View style={{ gap: 14 }}>
                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={styles.btnRegister}
                                        >
                                            <CustomText
                                                style={styles.txtRegister}
                                            >
                                                Register
                                            </CustomText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                    <Toast config={toastConfig} />
                </View>
            )}
        </Formik>
    );
};
export default Register;
