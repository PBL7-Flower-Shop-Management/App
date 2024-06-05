import { Alert } from "react-native";
import Moment from "moment";

export const ConvertToShortSoldQuantity = (soldQuantity) => {
    if (soldQuantity < 1000) return soldQuantity;
    var soldQtyStr = soldQuantity.toString();
    switch (Math.ceil(soldQtyStr.length / 3)) {
        case 2:
            return (
                soldQtyStr.substring(0, soldQtyStr.length - 3) +
                (parseInt(soldQtyStr[soldQtyStr.length - 3]) > 0
                    ? "." + soldQtyStr[soldQtyStr.length - 3]
                    : "") +
                "k"
            );
        case 3:
            return (
                soldQtyStr.substring(0, soldQtyStr.length - 3 * 2) +
                (parseInt(soldQtyStr[soldQtyStr.length - 3 * 2]) > 0
                    ? "." + soldQtyStr[soldQtyStr.length - 3 * 2]
                    : "") +
                "tr"
            );
        default:
            return "1 tỷ+";
    }
};

export const GetFileType = (url) => {
    if (!url) return "image";
    if (typeof url !== "string") return "image";
    const extension = url.slice(((url.lastIndexOf(".") - 1) >>> 0) + 2);
    const imageExtensions = ["jpg", "png", "gif", "jpeg"]; // Additional image extensions
    const videoExtensions = ["mp3", "mp4", "mpeg"]; // Additional video extensions

    if (imageExtensions.includes(extension.toLowerCase())) {
        return "image";
    } else if (videoExtensions.includes(extension.toLowerCase())) {
        return "video";
    } else {
        return "video";
    }
};

export const ShowAlert = ({
    title = "Confirmation",
    alertContent = "Are you sure you want to do this?",
    firstBtnName = "Yes",
    secondBtnName = null,
    handleFirstBtn = () => console.log("First Button Is Pressed"),
    handleSecondBtn = null,
} = {}) => {
    const buttons = [
        {
            text: firstBtnName,
            onPress: handleFirstBtn,
        },
    ];

    if (secondBtnName)
        buttons.push({
            text: secondBtnName,
            onPress: handleSecondBtn,
        });

    Alert.alert(
        title,
        alertContent,
        buttons,
        { cancelable: true } // Cho phép người dùng tắt Alert bằng cách nhấn ngoài vùng Alert
    );
};

export const FixedFloat = (number, numberOfDecimalPlaces = 2) => {
    if (numberOfDecimalPlaces >= 0)
        return parseFloat(parseFloat(number).toFixed(numberOfDecimalPlaces));
    else return number;
};

export const ShortenString = (str = "", numberOfCharacters = 10) => {
    if (str.length > numberOfCharacters)
        return str.substring(0, numberOfCharacters) + "...";
    else return str.substring(0, numberOfCharacters);
};

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const FormatDate = (dateStr, formatStr = "DD/MM/YYYY HH:mm") => {
    if (typeof dateStr === "string") dateStr = new Date(dateStr);
    return Moment(dateStr).format(formatStr);
};

export const ConvertToShipDate = (dateStr) => {
    let dayOfWeekIndex = new Date(dateStr).getDay();
    let formatDate = FormatDate(dateStr);
    let dayOfWeek = "";

    if (dayOfWeekIndex === 1) {
        dayOfWeek = "Monday";
    } else if (dayOfWeekIndex === 2) {
        dayOfWeek = "Tuesday";
    } else if (dayOfWeekIndex === 3) {
        dayOfWeek = "Wednesday";
    } else if (dayOfWeekIndex === 4) {
        dayOfWeek = "Thursday";
    } else if (dayOfWeekIndex === 5) {
        dayOfWeek = "Friday";
    } else if (dayOfWeekIndex === 6) {
        dayOfWeek = "Saturday";
    } else {
        dayOfWeek = "Sunday";
    }

    return dayOfWeek + ", " + formatDate;
};
