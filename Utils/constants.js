import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

// export const API_URL = "http://192.168.101.13:5678/api/"; //local host server
// export const API_URL = "http://192.168.1.5:5678/api/"; //local host server
export const API_URL = "https://criminalmanagementapi.azurewebsites.net/api/";
//Note: if demo aspnet backend at localhost, change this API_URL and applicationUrl field
//in launchSettings.json file of aspnet to your wifi ip on computer (only http (not https) that working at localhost)
//(keep port 5678)
//else aspnet deployed then change API_URL to your server url
//https://criminalmanagementapi.azurewebsites.net/api/
//https://webapi20240103001211.azurewebsites.net/api/

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
    Admin: "Quản trị viên",
    Employee: "Nhân viên",
    Customer: "Khách hàng",
};
export const flowerStatus = {
    "Out of stock": "Hết hàng",
    Available: "Có sẵn",
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
    0: "Tệ",
    1: "Không ổn",
    2: "Tốt",
    3: "Tuyệt vời",
    4: "Xuất sắc",
};

export const orderStatus = {
    "Pending payment processing": "Chờ thanh toán",
    Processing: "Đang xử lý",
    Shipped: "Đã vận chuyển",
    Delivered: "Đã giao",
    Cancelled: "Huỷ",
};

export const orderStatusIcon = {
    "Pending payment processing": require("../Public/Images/wallet.png"),
    Processing: require("../Public/Images/process.png"),
    Shipped: require("../Public/Images/shipping.png"),
    Delivered: require("../Public/Images/delivered.png"),
    Cancelled: require("../Public/Images/cancelOrder.png"),
};
