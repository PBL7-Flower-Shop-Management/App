import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import FlowerDetail from "../FlowerDetail/index";
import Cart from "../Components/Cart";
const tab = createNativeStackNavigator();

function HomeTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="Home" component={Home} />
            <tab.Screen name="FlowerDetail" component={FlowerDetail} />
            <tab.Screen name="Cart" component={Cart} />
            {/*<tab.Screen name="CriminalDetail" component={CriminalDetail} /> */}
        </tab.Navigator>
    );
}

export default HomeTab;
