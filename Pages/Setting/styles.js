import { StyleSheet } from "react-native";
import { scale } from "../../Utils/constants";

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 310,
    },
    modalHead: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
    },
    iconCancel: {
        position: "absolute",
        left: 10,
        padding: 5,
    },
    modalTitle: {
        fontSize: 15 * scale,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 15 * scale,
    },
    modalContent: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    btnConfirm: {
        width: 130,
        height: 56,
        backgroundColor: "#FF495F",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    btnCancel: {
        width: 130,
        height: 56,
        backgroundColor: "#F1F1F1",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
});

export default styles;
