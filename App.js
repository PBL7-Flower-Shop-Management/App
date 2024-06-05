import React from "react";
import { useFonts } from "expo-font";

import { AuthProvider } from "./Context/AuthContext.js";
import { PopupProvider } from "./Context/PopupContext.js";
import Navigation from "./Pages/Components/Navigation.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App() {
    let [fontsLoaded] = useFonts({
        "Be Vietnam": require("./Public/Fonts/Be_Vietnam_Pro/BeVietnamPro-Regular.ttf"),
        "Be Vietnam Medium": require("./Public/Fonts/Be_Vietnam_Pro/BeVietnamPro-Medium.ttf"),
        "Be Vietnam italic": require("./Public/Fonts/Be_Vietnam_Pro/BeVietnamPro-Italic.ttf"),
        "Be Vietnam bold": require("./Public/Fonts/Be_Vietnam_Pro/BeVietnamPro-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <PopupProvider>
                    <Navigation />
                </PopupProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}

export default App;
