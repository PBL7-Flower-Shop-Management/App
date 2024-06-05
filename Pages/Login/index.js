import React, { useContext, useState, useEffect } from "react";
import {
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Image,
    Pressable,
    StatusBar,
    useWindowDimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import { AuthContext } from "../../Context/AuthContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PopupContext } from "../../Context/PopupContext.js";

const Login = ({ navigation, route }) => {
    const {
        isLoading,
        login,
        userInfo,
        request,
        message: googleMessage,
        googleLogin,
    } = useContext(AuthContext);

    const { setVisible } = useContext(PopupContext);

    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");
    const [showPwd, SetShowPwd] = useState(false);
    const [message, SetMessage] = useState("");
    const [isRememberLogin, SetRememberLogin] = useState(false);

    useEffect(() => {
        fetchData = async () => {
            let isRememberLogin = await AsyncStorage.getItem("isRememberLogin");

            if (
                isRememberLogin == null ||
                isRememberLogin.toLowerCase() == "false"
            )
                SetRememberLogin(false);
            else {
                SetUsername(await AsyncStorage.getItem("username"));
                SetRememberLogin(true);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (route?.params?.resetSuccess) {
            Toast.show({
                type: "success",
                text1: "Reset your password successfully! Let's login!",
            });
        }
    }, [route?.params]);

    useEffect(() => {
        SetMessage(googleMessage);
    }, [googleMessage]);

    useEffect(() => {
        if (userInfo) setVisible(false);
    }, [userInfo]);

    const checkLogic = () => {
        if (
            username == null ||
            username === "" ||
            password == null ||
            password === ""
        ) {
            SetMessage("Tên đăng nhập hoặc mật khẩu không được để trống");
            return false;
        }
        return true;
    };

    return (
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
                <View className="absolute top-6 left-6">
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <CustomText
                            style={{
                                color: "black",
                                fontSize: 18,
                            }}
                        >
                            X
                        </CustomText>
                    </TouchableOpacity>
                </View>
                <View style={styles.head}>
                    <CustomText style={styles.title}>
                        Flower shopping
                    </CustomText>
                    <CustomText style={styles.subtitle}>
                        Best price, best flower
                    </CustomText>
                </View>
                <View style={styles.body}>
                    <View style={styles.textInput}>
                        <CustomText style={{ width: 115 }}>
                            Username:
                        </CustomText>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={SetUsername}
                        ></TextInput>
                    </View>
                    <View style={styles.textInput}>
                        <CustomText style={{ width: 115 }}>
                            Password:
                        </CustomText>
                        <TextInput
                            style={[styles.input, { paddingRight: 38 }]}
                            placeholder="Password"
                            value={password}
                            onChangeText={SetPassword}
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
                    {message && (
                        <CustomText
                            style={{
                                color: "red",
                                alignSelf: "flex-start",
                            }}
                        >
                            {message}
                        </CustomText>
                    )}
                    <Pressable
                        style={{
                            flexDirection: "row",
                            alignSelf: "flex-start",
                            marginStart: 115,
                            paddingStart: 10,
                        }}
                        onPress={() => SetRememberLogin(!isRememberLogin)}
                    >
                        <Checkbox
                            value={isRememberLogin}
                            onValueChange={SetRememberLogin}
                            style={{
                                borderColor: "#DFE0E2",
                                borderRadius: 3,
                            }}
                        />
                        <CustomText> Remember me</CustomText>
                    </Pressable>
                    <View style={{ gap: 14 }}>
                        <TouchableOpacity
                            onPress={async () => {
                                if (checkLogic())
                                    SetMessage(
                                        await login(
                                            username,
                                            password,
                                            isRememberLogin
                                        )
                                    );
                            }}
                            style={styles.btnLogin}
                        >
                            <CustomText style={styles.txtLogin}>
                                Login
                            </CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={!request}
                            onPress={async () => {
                                await googleLogin();
                            }}
                            style={styles.btnLoginWithGoogle}
                        >
                            <Image
                                className="w-5 h-5"
                                source={require("../../Public/Images/google.png")}
                            />
                            <CustomText style={styles.txtLoginWithGoogle}>
                                Login with google
                            </CustomText>
                        </TouchableOpacity>
                        <CustomText
                            style={{
                                color: "#53B6ED",
                                textDecorationLine: "underline",
                                alignSelf: "flex-end",
                            }}
                            onPress={() =>
                                navigation.navigate("ForgotPassword")
                            }
                        >
                            Forgot password?
                        </CustomText>
                        <CustomText
                            style={{
                                color: "#53B6ED",
                                textDecorationLine: "underline",
                                alignSelf: "flex-end",
                            }}
                            onPress={() => navigation.navigate("Register")}
                        >
                            Don't have an account yet?
                        </CustomText>
                    </View>
                </View>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};
export default Login;
