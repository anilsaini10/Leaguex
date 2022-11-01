import { View, Text, FlatList } from "react-native";


const FinalPlayer = (props) => {

    console.log(props.route.params.Players)



    return (
        <>

            <Text style={{ fontSize: 22, color: "black", fontWeight: "600", alignSelf: "center", marginTop: "7%" }} >Selected Players:</Text>

            <View style={{ marginTop: "5%" }} ></View>
            <FlatList
                data={props.route.params.Players}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    
                    <View style={{ width: "40%", marginTop: "2%", alignSelf: "center", height: 45, borderWidth: 1, justifyContent: "center", borderRadius: 10, }} >
                        <Text style={{ alignSelf: "center", color: "black", fontWeight: "600", fontSize: 16 }} >{item}</Text>
                    </View>

                )}
            />
        </>
    );
};


export default FinalPlayer;