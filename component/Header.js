import { View, Text, StyleSheet } from "react-native";


const Header = () => {

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerText} >Leaguex</Text>
            </View>
        </>
    );
};


export default Header;


const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 60,
        backgroundColor: "#FF8C91",
        justifyContent: "center",
        marginTop:"15%"
    },
    headerText: {
        fontWeight: "600",
        fontSize: 20,
        alignSelf: "center",
        color:"white"
    }
})
