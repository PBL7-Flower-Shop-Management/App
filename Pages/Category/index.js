import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Category from "./Category";
import FlowerDetail from "../FlowerDetail/index";
const tab = createNativeStackNavigator();

function CategoryTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="Category" component={Category} />
            <tab.Screen name="FlowerDetail" component={FlowerDetail} />
        </tab.Navigator>
    );
}

export default CategoryTab;
