import React, { createContext, useEffect, useState } from "react";
import { addMinutes, isAfter } from "date-fns";
import axios from "axios";
import { API_URL } from "../Utils/constants.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchApi } from "../Utils/FetchApi.js";
import UrlConfig from "../Config/UrlConfig.js";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google.js";
import { ResponseType } from "expo-auth-session";

export const AuthContext = createContext();

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children }) => {
    const [isFirst, SetIsFirst] = useState(true);
    const [username, SetUsername] = useState(null);
    const [userInfo, SetUserInfo] = useState(null);
    const [isLoading, SetIsLoading] = useState(false);
    const [splashLoading, SetSplashLoading] = useState(false);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId:
            "471873188950-ag1117jeje29otsdbjhvt2gg304h9m7u.apps.googleusercontent.com",
        iosClientId:
            "471873188950-h3uuv48rtjnq3247jdp3f1o09isufju9.apps.googleusercontent.com",
        androidClientId:
            "471873188950-s00cju1jddoofngml7tton6ck9q31uk5.apps.googleusercontent.com",
        redirectUri: "com.danghoanexpo.Mobile:/",
        scopes: ["profile", "email"],
        responseType: ResponseType.IdToken,
    });
    const [accessToken, setAccessToken] = useState();
    const [message, SetMessage] = useState("");

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            setAccessToken(id_token);
            accessToken && handleGoogleLogin();
        }
    }, [response, accessToken]);

    useEffect(() => {
        const setItem = async () => {
            if (isFirst) return;
            if (username != null)
                await AsyncStorage.setItem("username", username);
            else await AsyncStorage.removeItem("username");
        };
        setItem();
    }, [username]);

    useEffect(() => {
        const setItem = async () => {
            if (isFirst) return;
            if (userInfo != null)
                await AsyncStorage.setItem(
                    "userInfo",
                    JSON.stringify(userInfo)
                );
            else await AsyncStorage.removeItem("userInfo");
        };
        setItem();
    }, [userInfo]);

    const register = (username, password) => {
        SetIsLoading(true);
        axios
            .post(API_URL + "auth/register", {
                username: username,
                password: password,
            })
            .then((res) => {
                let userInfo = res.data;
                SetUsername(username);
                SetUserInfo(userInfo);
                SetIsLoading(false);
                console.log(userInfo);
            })
            .catch((e) => {
                console.log(`register error ${e}`);
                SetIsLoading(false);
            });
    };

    const login = async (username, password, isRememberLogin) => {
        SetIsLoading(true);
        let message = "";
        const response = await FetchApi(
            UrlConfig.authentication.login,
            "POST",
            null,
            {
                username: username,
                password: password,
            }
        );

        if (response.succeeded) {
            let userInfo = response.data.user;
            userInfo.token = response.data.token.accessToken;
            userInfo.refreshToken = response.data.token.refreshToken;
            userInfo.tokenExpiryTime = response.data.token.accessTokenExpiresAt;
            userInfo.refreshTokenExpiryTime =
                response.data.token.refreshTokenExpireAt;

            const username = response.data.user.username;
            SetUserInfo(userInfo);
            SetUsername(username);
            AsyncStorage.setItem("isRememberLogin", isRememberLogin.toString());
            message = "Login successfully!";
        } else {
            message = response.message;
        }

        SetIsLoading(false);
        return message;
    };

    const googleLogin = async () => await promptAsync();

    const handleGoogleLogin = async () => {
        SetIsLoading(true);
        let message = "";
        const response = await FetchApi(
            UrlConfig.authentication.google,
            "POST",
            null,
            { accessToken }
        );

        if (response.succeeded) {
            let userInfo = response.data.user;
            userInfo.token = response.data.token.accessToken;
            userInfo.refreshToken = response.data.token.refreshToken;
            userInfo.tokenExpiryTime = response.data.token.accessTokenExpiresAt;
            userInfo.refreshTokenExpiryTime =
                response.data.token.refreshTokenExpireAt;

            const username = response.data.user.username;
            SetUserInfo(userInfo);
            SetUsername(username);
            AsyncStorage.setItem("isRememberLogin", isRememberLogin.toString());
            message = "Login successfully!";
        } else {
            message = response.message;
        }

        SetIsLoading(false);
        SetMessage(message);
    };

    const logout = async () => {
        SetIsLoading(true);
        let isRememberLogin = await AsyncStorage.getItem("isRememberLogin");
        if (
            isRememberLogin == null ||
            isRememberLogin.toLowerCase() == "false"
        ) {
            SetUsername(null);
        }
        SetUsername(null);
        SetUserInfo(null);
        SetIsLoading(false);
        // axios.post(API_URL + '/logout',
        // {},
        // {
        //     headers: {Authorization: `Bearer ${userInfo.access_token}`},
        // }
        // ).then(res => {
        //     console(res.data)
        //     SetUserInfo(null)
        //     SetIsLoading(false)
        // }).cacht(e => {
        //     console.log(`logout error: ${e}`)
        //     SetIsLoading(false)
        // })
    };

    const isLoggedIn = async () => {
        try {
            let isRememberLogin = await AsyncStorage.getItem("isRememberLogin");
            if (
                isRememberLogin == null ||
                isRememberLogin.toLowerCase() == "false"
            )
                return;

            SetSplashLoading(true);

            let username = await AsyncStorage.getItem("username");
            if (username) {
                SetUsername(username);
            }

            let userInfo = await AsyncStorage.getItem("userInfo");

            SetIsFirst(false);

            if (userInfo == null) {
                SetSplashLoading(false);
                return;
            } else {
                userInfo = JSON.parse(userInfo);
                let refreshTokenExpiryTime = new Date(
                    userInfo.refreshTokenExpiryTime
                );

                if (
                    refreshTokenExpiryTime !== undefined &&
                    refreshTokenExpiryTime !== null &&
                    refreshTokenExpiryTime <= new Date()
                ) {
                    SetSplashLoading(false);
                    SetUsername(null);
                    SetUserInfo(null);
                    return;
                }
            }

            if (userInfo) {
                SetUserInfo(userInfo);
            }

            SetSplashLoading(false);
        } catch (e) {
            SetSplashLoading(false);
            console.log("check logged in error: ", e);
        }
    };

    const refreshToken = async () => {
        try {
            let tokenExpiryTime = new Date(userInfo.tokenExpiryTime);
            if (
                tokenExpiryTime != null &&
                !isAfter(tokenExpiryTime, addMinutes(new Date(), 3)) //refresh trc khi hết hạn 3 phút
            ) {
                let refreshTokenExpiryTime = new Date(
                    userInfo.refreshTokenExpiryTime
                );
                if (
                    refreshTokenExpiryTime != null &&
                    refreshTokenExpiryTime > new Date()
                ) {
                    const isRefreshing = AsyncStorage.getItem("isRefreshing");
                    if (!isRefreshing) {
                        AsyncStorage.setItem("isRefreshing", "true");
                    } else if (isRefreshing === "true") {
                        return {
                            isSuccessfully: false,
                            data: `Đang trong quá trình refresh token, vui lòng đợi vài giây!`,
                        };
                    }

                    const response = await FetchApi(
                        UrlConfig.authentication.refreshToken,
                        "POST",
                        null,
                        {
                            token: userInfo.token,
                            refreshToken: userInfo.refreshToken,
                        }
                    );

                    if (response.succeeded) {
                        let userInfo = response.data.user;
                        userInfo.token = response.data.token.accessToken;
                        userInfo.refreshToken =
                            response.data.token.refreshToken;
                        userInfo.tokenExpiryTime =
                            response.data.token.accessTokenExpiresAt;
                        userInfo.refreshTokenExpiryTime =
                            response.data.token.refreshTokenExpireAt;

                        const username = response.data.user.username;
                        SetUserInfo(userInfo);
                        SetUsername(username);
                        AsyncStorage.removeItem("isRefreshing");

                        return {
                            isSuccessfully: true,
                            data: userInfo.token,
                        };
                    } else {
                        AsyncStorage.removeItem("isRefreshing");
                        return {
                            isSuccessfully: false,
                            data: `Refresh token thất bại: ${res.messages}`,
                        };
                    }
                } else {
                    console.log("Refresh token hết hạn");
                    SetUsername(null);
                    SetUserInfo(null);
                    return {
                        isSuccessfully: false,
                        data: "Refresh token hết hạn! Vui lòng đăng nhập lại!",
                    };
                }
            }
            return { isSuccessfully: true, data: userInfo.token };
        } catch (error) {
            AsyncStorage.removeItem("isRefreshing");
            console.log("Lỗi khi refresh token:", error);
            return {
                isSuccessfully: false,
                data: `Lỗi khi refresh token: ${error}`,
            };
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                request,
                message,
                username,
                userInfo,
                splashLoading,
                register,
                login,
                googleLogin,
                logout,
                refreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
