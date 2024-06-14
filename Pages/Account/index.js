import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../Setting";
import Account from "./Account";
import Profile from "../Profile";
import Order from "../Order";
import OrderDetail from "../OrderDetail";
import FlowerDetail from "../FlowerDetail";
import ChangePassword from "../ChangePassword";
import Login from "../Login";
import Search from "../Search";
const tab = createNativeStackNavigator();

function AccountTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="Account" component={Account} />
            <tab.Screen name="Setting" component={Setting} />
            <tab.Screen name="Profile" component={Profile} />
            <tab.Screen name="Order" component={Order} />
            <tab.Screen name="OrderDetail" component={OrderDetail} />
            <tab.Screen name="FlowerDetail" component={FlowerDetail} />
            <tab.Screen name="Search" component={Search} />
        </tab.Navigator>
    );
}

export default AccountTab;
