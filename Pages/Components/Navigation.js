import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../Context/AuthContext";
import BottomTab from "./BottomTab.js";
import Login from "../Login/index.js";
// import ForgotPassword from "../FogotPassword/index.js";
import Splash from "../SplashScreen/SplashScreen.js";
import ForgotPassword from "../FogotPassword/index.js";
import ResetPassword from "../ResetPassword/index.js";
import { PopupContext } from "../../Context/PopupContext.js";
import { CartProvider } from "../../Context/CartContext.js";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { splashLoading } = useContext(AuthContext);
    const { visible } = useContext(PopupContext);

    return (
        <NavigationContainer>
            <CartProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {splashLoading ? (
                        <Stack.Screen name="Splash" component={Splash} />
                    ) : !visible ? (
                        <Stack.Screen name="Bottom" component={BottomTab} />
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen
                                name="ForgotPassword"
                                component={ForgotPassword}
                            />
                            <Stack.Screen
                                name="ResetPassword"
                                component={ResetPassword}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </CartProvider>
        </NavigationContainer>
    );
};

export default Navigation;
