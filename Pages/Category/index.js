import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Category from "./Category";
const tab = createNativeStackNavigator();

function CategoryTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="Category" component={Category} />
        </tab.Navigator>
    );
}

export default CategoryTab;
