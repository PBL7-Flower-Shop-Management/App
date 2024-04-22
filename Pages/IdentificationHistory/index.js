import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IdentificationHistory from "./IdentificationHistory";
const tab = createNativeStackNavigator();

function IdentificationHistoryTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen
                name="IdentificationHistory"
                component={IdentificationHistory}
            />
        </tab.Navigator>
    );
}

export default IdentificationHistoryTab;
