import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import TakeImage from "./TakeImage";
import FlowerDetect from "./FlowerDetect";
import SuccessDetect from "./SuccessDetect";
import Search from "../Search/index";
import FlowerDetail from "../FlowerDetail/index";

const tab = createNativeStackNavigator();

function FlowerDetectTab({ SetIsNavBarShow }) {
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
            <tab.Screen name="Search" component={Search} />
            <tab.Screen name="FlowerDetail" component={FlowerDetail} />
        </tab.Navigator>
    );
}

export default FlowerDetectTab;
