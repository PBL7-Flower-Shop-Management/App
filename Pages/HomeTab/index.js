import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import FlowerDetail from "../FlowerDetail/index";
import Search from "../Search";
import Feedback from "../Feedback";
const tab = createNativeStackNavigator();

function HomeTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="Home" component={Home} />
            <tab.Screen name="FlowerDetail" component={FlowerDetail} />
            <tab.Screen name="Search" component={Search} />
            <tab.Screen name="Feedback" component={Feedback} />
        </tab.Navigator>
    );
}

export default HomeTab;
