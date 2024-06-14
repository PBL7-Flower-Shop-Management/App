import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

// export const API_URL = "http://172.16.0.165:3000"; //local host server
export const API_URL = "https://flower-shop-management-web-server.vercel.app"; //deploy server

export const ACCESS_TOKEN_NAME = "accessToken";

export const scale = 1;
export const textInputDefaultSize = 13;

export const COLORS = {
    primary: "#2A4D50",
    secondary: "#DDF0FF",
    tertiary: "#FF7754",

    gray: "#83829A",
    gray2: "#C1C0C8",

    offwhite: "#F3F4F8",
    white: "#FFFFFF",
    black: "#000000",
    red: "#e81e4d",
    green: "#00C135",
    lightWhite: "#FAFAFC",
};

export const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 44,
    height,
    width,
};

export const userRole = {
    Admin: "Admin",
    Employee: "Employee",
    Customer: "Customer",
};
export const flowerStatus = {
    "Out of stock": "Out of stock",
    Available: "Available",
};

export const flowerStatusIcon = {
    "Out of stock": require("../Public/Images/out-of-stock.png"),
    Available: require("../Public/Images/confirm.png"),
};

export const flowerStatusColor = {
    "Out of stock": "#fc8181",
    Available: "#68d391",
};

export const ratingReview = {
    0: "Poor",
    1: "Fair",
    2: "Good",
    3: "Excellent",
    4: "Outstanding",
};

export const orderStatus = {
    Processing: "Processing",
    Shipped: "Shipped",
    Delivered: "Delivered",
    Cancelled: "Cancelled",
    "Pending payment processing": "Pending payment processing",
};

export const orderStatusIcon = {
    Processing: require("../Public/Images/process.png"),
    Shipped: require("../Public/Images/shipping.png"),
    Delivered: require("../Public/Images/delivered.png"),
    Cancelled: require("../Public/Images/cancelOrder.png"),
    "Pending payment processing": require("../Public/Images/wallet.png"),
};
