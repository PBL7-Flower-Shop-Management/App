import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IdentificationHistory from "./IdentificationHistory";
import Search from "../Search";
import FlowerDetail from "../FlowerDetail";
const tab = createNativeStackNavigator();

function IdentificationHistoryTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen
                name="IdentificationHistory"
                component={IdentificationHistory}
            />
            <tab.Screen name="Search" component={Search} />
            <tab.Screen name="FlowerDetail" component={FlowerDetail} />
        </tab.Navigator>
    );
}

export default IdentificationHistoryTab;
