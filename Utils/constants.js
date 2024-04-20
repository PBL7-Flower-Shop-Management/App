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

export const roleEnum = {
    0: "Quản trị viên",
    1: "Nhân viên",
    2: "Điều tra viên",
};

export const wantedType = {
    0: "Bình thường",
    1: "Nguy hiểm",
    2: "Đặc biệt",
};

export const criminalStatus = {
    0: "Đang ngồi tù",
    1: "Đã được thả",
    2: "Bị truy nã",
    3: "Chưa kết án",
    4: "Án treo",
    5: "Đã bị bắt",
};

export const typeOfViolation = {
    0: "Dân sự",
    1: "Hình sự",
};

export const gender = {
    0: "Nữ",
    1: "Nam",
};
export const caseStatus = {
    0: "Chưa xét xử",
    1: "Đang điều tra",
    2: "Đã xét xử",
};
export const reportStatus = {
    0: "Chưa xử lý",
    1: "Đang xử lý",
    2: "Đã xử lý",
};
