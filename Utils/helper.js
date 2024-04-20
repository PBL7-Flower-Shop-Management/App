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
