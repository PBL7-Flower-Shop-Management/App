import React from "react";
import { useFonts } from "expo-font";

import { AuthProvider } from "./Context/AuthContext.js";
import Navigation from "./Pages/Components/Navigation.js";

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
        <AuthProvider>
            <Navigation />
        </AuthProvider>
    );
}

export default App;
