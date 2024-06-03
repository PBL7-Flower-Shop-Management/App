import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import TakeImage from "./TakeImage";
import FlowerDetect from "./FlowerDetect";
import SuccessDetect from "./SuccessDetect";

const tab = createNativeStackNavigator();

function FlowerDetectTab({ navigation, SetIsNavBarShow }) {
    useFocusEffect(
        useCallback(() => {
            SetIsNavBarShow(false);

            return () => {
                SetIsNavBarShow(true);
            };
        }, [SetIsNavBarShow])
    );

    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="TakeImage" component={TakeImage} />
            <tab.Screen name="FlowerDetect" component={FlowerDetect} />
            <tab.Screen name="SuccessDetect" component={SuccessDetect} />
        </tab.Navigator>
    );
}

export default FlowerDetectTab;
