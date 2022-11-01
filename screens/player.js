import { useState, useEffect } from 'react';
import { StyleSheet, Alert, Text, View, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../component/Header';
import axios from 'axios';


const Player = (props) => {

    const [allBatsman, setAllBatsman] = useState([]);
    const [allWicketKeeper, setAllWicketKeeper] = useState([]);
    const [allAllRounder, setAllAllRounder] = useState([]);
    const [allBowler, setAllBowler] = useState([]);

    const [selectedBatsman, setSelectedBatsman] = useState([{ name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }]);
    const [selectedWicketKeeper, setSelectedWicketKeeper] = useState([{ name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }]);
    const [selectedAllRounder, setSelectedAllRounder] = useState([{ name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }]);
    const [selectedBowler, setSelectedBowler] = useState([{ name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }, { name: false, index: -1 }]);

    const [modalVisible, setModalVisible] = useState(false);
    const [batsmanModal, setBatsmanModal] = useState(false);
    const [wicketKeeperModal, setWicketKeeperManModal] = useState(false);
    const [allRounderModal, setAllRounderModal] = useState(false);

    const [totalPlayer, setTotalPlayer] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [refresh, setRefresh] = useState(false);


    // Batsman

    const addBatsman = (data, id) => {

        if (totalPlayer >= 11) {
            
            Alert.alert(
                "Warning",
                "OOPs, Team is full!",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            );
            return;
        }

        setTotalPlayer(totalPlayer + 1);

        var currentBatsman = selectedBatsman;
        currentBatsman[currentIndex].name = data.name;
        currentBatsman[currentIndex].index = id

        setSelectedBatsman(currentBatsman);

        var batsman = allBatsman;
        batsman[id].add = false;
        setAllBatsman(batsman);


    };

    const removeBatsman = (currentIndex) => {

        if (totalPlayer == 0) {
            return;
        }

        setTotalPlayer(totalPlayer - 1);
        var currentBatsman = selectedBatsman;
        const id = currentBatsman[currentIndex].index;

        currentBatsman[currentIndex].name = false;
        currentBatsman[currentIndex].index = -1;
        setSelectedBatsman(currentBatsman);

        var batsman = allBatsman;
        console.log(batsman[id], id);
        // batsman[id].add = true;
        // setAllBatsman(batsman);
        setRefresh(!refresh);

    };

    // Wicket Keeper

    const addWicketKeeper = (data, id) => {

        if (totalPlayer >= 11) {

            Alert.alert(
                "Warning",
                "OOPs, Team is full!",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            );
            return;
        }

        setTotalPlayer(totalPlayer + 1);

        var currentWicketKeeper = selectedWicketKeeper;
        currentWicketKeeper[currentIndex].name = data.name;
        currentWicketKeeper[currentIndex].index = id

        setSelectedWicketKeeper(currentWicketKeeper);

        var wicketKeeper = allWicketKeeper;
        wicketKeeper[id].add = false;
        setAllWicketKeeper(wicketKeeper);


    };

    const removeWicketKeeper = (currentIndex) => {

        if (totalPlayer == 0) {
            return;
        }

        setTotalPlayer(totalPlayer - 1);
        var currentWicketKeeper = selectedWicketKeeper;

        const id = currentWicketKeeper[currentIndex].index;

        currentWicketKeeper[currentIndex].name = false;
        currentWicketKeeper[currentIndex].index = -1;
        setSelectedWicketKeeper(currentWicketKeeper);

        var wicketKeeper = allWicketKeeper;
        wicketKeeper[id].add = true;
        setAllWicketKeeper(wicketKeeper);
        setRefresh(!refresh);

    };

    // All Rounder

    const addAllRounder = (data, id) => {

        if (totalPlayer >= 11) {
            
            Alert.alert(
                "Warning",
                "OOPs, Team is full!",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            );

            return;
        }

        setTotalPlayer(totalPlayer + 1);

        var currentAllRounder = selectedAllRounder;
        currentAllRounder[currentIndex].name = data.name;
        currentAllRounder[currentIndex].index = id

        setSelectedAllRounder(currentAllRounder);

        var allRounder = allAllRounder;
        allRounder[id].add = false;
        setAllBowler(allRounder);


    };

    const removeAllRounder = (currentIndex) => {

        if (totalPlayer == 0) {
            return;
        }

        setTotalPlayer(totalPlayer - 1);
        var currentAllRounder = selectedAllRounder;

        const id = currentAllRounder[currentIndex].index;

        currentAllRounder[currentIndex].name = false;
        currentAllRounder[currentIndex].index = -1;
        setSelectedAllRounder(currentAllRounder);

        var allRounder = allAllRounder;
        allRounder[id].add = true;
        setAllAllRounder(allRounder);
        setRefresh(!refresh);

    };


    // Bowler

    const addBowler = (data, id) => {

        if (totalPlayer >= 11) {

            Alert.alert(
                "Warning",
                "OOPs, Team is full!",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            );
            return;
        }

        setTotalPlayer(totalPlayer + 1);

        var currentBowler = selectedBowler;
        currentBowler[currentIndex].name = data.name;
        currentBowler[currentIndex].index = id

        setSelectedBowler(currentBowler);

        var bowlers = allBowler;
        bowlers[id].add = false;
        setAllBowler(bowlers);


    };

    const removeBowler = (currentIndex) => {

        if (totalPlayer == 0) {
            return;
        }

        setTotalPlayer(totalPlayer - 1);
        var currentBowler = selectedBowler;

        const id = currentBowler[currentIndex].index;

        currentBowler[currentIndex].name = false;
        currentBowler[currentIndex].index = -1;
        setSelectedBowler(currentBowler);

        var bowlers = allBowler;
        bowlers[id].add = true;
        setAllBowler(bowlers);
        setRefresh(!refresh);

    };



    const getAllPlayers = async () => {

        const url = "https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json";

        var allPlayer = await axios.get(url);
        allPlayer = allPlayer.data;

        var batman = [];
        var bowler = [];
        var wicketKeeper = [];
        var allRounder = [];

        for (var i in allPlayer) {

            var temp = { name: allPlayer[i].name, add: true };

            // console.log(allPlayer[i]);

            if (allPlayer[i].role == "Bowler") {
                bowler.push(temp);
                continue;
            }

            if (allPlayer[i].role == "Batsman") {
                batman.push(temp);
                continue;
            }

            if (allPlayer[i].role == "All-Rounder") {
                allRounder.push(temp);
                continue;
            }

            if (allPlayer[i].role == "Wicket-Keeper") {
                wicketKeeper.push(temp);
            }

        }


        setAllBatsman(batman);
        setAllWicketKeeper(wicketKeeper)
        setAllAllRounder(allRounder);
        setAllBowler(bowler);

    }

    const handleProceedButton = () => {


        var totalBatsman = 0;
        var totalWicketKeeper = 0;
        var totalAllRounder = 0;
        var totalBowler = 0;

        var finalPlayer = [];

        if (totalPlayer > 11) {
            Alert.alert(
                "Warning",
                "Team member can't exceed more than 11",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            );

            return;
        }

        if (totalPlayer < 11) {
            Alert.alert(
                "Warning",
                "Please Select 11 Players",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            );
            return;
        }

        for (var i in selectedBatsman) {
            if (selectedBatsman[i].index != -1) {
                totalBatsman += 1;
                finalPlayer.push(selectedBatsman[i].name);
            }
        };

        if (totalBatsman < 3) {
            Alert.alert(
                "Warning",
                "Minimum batsman should be 3",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            );
            return;
        }

        for (var i in selectedWicketKeeper) {
            if (selectedWicketKeeper[i].index != -1) {
                totalWicketKeeper += 1;
                finalPlayer.push(selectedWicketKeeper[i].name);
            }
        };

        if (totalWicketKeeper < 1) {
            Alert.alert(
                "Warning",
                "Minimum wicket keeper should be 1",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            );
            return;
        }

        for (var i in selectedAllRounder) {
            if (selectedAllRounder[i].index != -1) {
                totalAllRounder += 1;
                finalPlayer.push(selectedAllRounder[i].name);
            }
        };

        for (var i in selectedBowler) {
            if (selectedBowler[i].index != -1) {
                totalBowler += 1;
                finalPlayer.push(selectedBowler[i].name);
            }
        };

        if (totalBowler < 3) {

            Alert.alert(
                "Warning",
                "Minimum bowler should be 3",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            );
            return;
        };

        props.navigation.navigate("FinalPlayer", {Players: finalPlayer});

    };


    useEffect(() => {

        getAllPlayers();

    }, [])

    return (

        <>
            {/* <Header /> */}
            <ScrollView>

                {/* Batsman Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={batsmanModal}
                    onRequestClose={() => {
                        setBatsmanModal(!batsmanModal);
                    }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        borderWidth: 1,
                        alignSelf: "center",
                        backgroundColor: "white",
                        height: "40%"
                    }}>
                        <TouchableOpacity
                            style={{ width: "100%", height: 40, justifyContent: "center", borderRadius: 50, }}
                            onPress={() => { setBatsmanModal(!batsmanModal); }}
                        >
                            <View style={{ width: 30, height: 30, backgroundColor: "white", borderRadius: 100, borderWidth: 1, justifyContent: "center", alignSelf: "center" }} >
                                <Text style={{ alignSelf: "center", color: "red", fontWeight: "600", fontSize: 20 }} >X</Text>
                            </View>

                        </TouchableOpacity>

                        <View style={{ marginTop: "5%" }} ></View>

                        <FlatList
                            data={allBatsman}
                            keyExtractor={item => item.id}
                            extraData={refresh}
                            renderItem={({ item, index }) => (
                                <>
                                    {item.add ? (
                                        <TouchableOpacity
                                            style={{ width: 300, height: 45, justifyContent: "center", backgroundColor: "#FF8C91", marginTop: "2%", borderRadius: 10 }}
                                            onPress={() => { setBatsmanModal(!batsmanModal); addBatsman(item, index); }}
                                        >
                                            <View style={{ width: "100%", alignSelf: "center", height: "100%", borderWidth: 1, justifyContent: "center", borderRadius: 10, }} >
                                                <Text style={{ alignSelf: "center", color: "white", fontWeight: "600", fontSize: 16 }} >{item.name}</Text>
                                            </View>

                                        </TouchableOpacity>
                                    ) : (null)}

                                </>
                            )}
                        />



                    </View>
                </Modal>

                {/* Wicket Keeper Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={wicketKeeperModal}
                    onRequestClose={() => {
                        setWicketKeeperManModal(!wicketKeeperModal);
                    }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        borderWidth: 1,
                        alignSelf: "center",
                        backgroundColor: "white",
                        height: "40%"
                    }}>
                        <TouchableOpacity
                            style={{ width: "100%", height: 40, justifyContent: "center", borderRadius: 50, }}
                            onPress={() => { setWicketKeeperManModal(!wicketKeeperModal); }}
                        >
                            <View style={{ width: 30, height: 30, backgroundColor: "white", borderRadius: 100, borderWidth: 1, justifyContent: "center", alignSelf: "center" }} >
                                <Text style={{ alignSelf: "center", color: "red", fontWeight: "600", fontSize: 20 }} >X</Text>
                            </View>

                        </TouchableOpacity>

                        <View style={{ marginTop: "5%" }} ></View>
                        <FlatList
                            data={allWicketKeeper}
                            keyExtractor={item => item.id}
                            extraData={refresh}
                            renderItem={({ item, index }) => (
                                <>
                                    {item.add ? (
                                        <TouchableOpacity
                                            style={{ width: 300, height: 45, justifyContent: "center", backgroundColor: "#FF8C91", marginTop: "2%", borderRadius: 10 }}
                                            onPress={() => { setWicketKeeperManModal(!wicketKeeperModal); addWicketKeeper(item, index); }}
                                        >
                                            <View style={{ width: "100%", alignSelf: "center", height: "100%", borderWidth: 1, justifyContent: "center", borderRadius: 10, }} >
                                                <Text style={{ alignSelf: "center", color: "white", fontWeight: "600", fontSize: 16 }} >{item.name}</Text>
                                            </View>

                                        </TouchableOpacity>
                                    ) : (null)}

                                </>
                            )}
                        />

                    </View>
                </Modal>

                {/* All Rounder Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={allRounderModal}
                    onRequestClose={() => {
                        setAllRounderModal(!allRounderModal);
                    }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        borderWidth: 1,
                        alignSelf: "center",
                        backgroundColor: "white",
                        height: "40%"
                    }}>
                        <TouchableOpacity
                            style={{ width: "100%", height: 40, justifyContent: "center", borderRadius: 50, }}
                            onPress={() => { setAllRounderModal(!allRounderModal); }}
                        >
                            <View style={{ width: 30, height: 30, backgroundColor: "white", borderRadius: 100, borderWidth: 1, justifyContent: "center", alignSelf: "center" }} >
                                <Text style={{ alignSelf: "center", color: "red", fontWeight: "600", fontSize: 20 }} >X</Text>
                            </View>

                        </TouchableOpacity>

                        <View style={{ marginTop: "5%" }} ></View>
                        <FlatList
                            data={allAllRounder}
                            keyExtractor={item => item.id}
                            extraData={refresh}
                            renderItem={({ item, index }) => (
                                <>
                                    {item.add ? (
                                        <TouchableOpacity
                                            style={{ width: 300, height: 45, justifyContent: "center", backgroundColor: "#FF8C91", marginTop: "2%", borderRadius: 10 }}
                                            onPress={() => { setAllRounderModal(!allRounderModal); addAllRounder(item, index); }}
                                        >
                                            <View style={{ width: "100%", alignSelf: "center", height: "100%", borderWidth: 1, justifyContent: "center", borderRadius: 10, }} >
                                                <Text style={{ alignSelf: "center", color: "white", fontWeight: "600", fontSize: 16 }} >{item.name}</Text>
                                            </View>

                                        </TouchableOpacity>
                                    ) : (null)}

                                </>
                            )}
                        />

                    </View>
                </Modal>


                {/* Bowler Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                        borderWidth: 1,
                        alignSelf: "center",
                        backgroundColor: "white",
                        height: "40%"
                    }}>
                        <TouchableOpacity
                            style={{ width: "100%", height: 40, justifyContent: "center", borderRadius: 50, }}
                            onPress={() => { setModalVisible(!modalVisible); }}
                        >
                            <View style={{ width: 30, height: 30, backgroundColor: "white", borderRadius: 100, borderWidth: 1, justifyContent: "center", alignSelf: "center" }} >
                                <Text style={{ alignSelf: "center", color: "red", fontWeight: "600", fontSize: 20 }} >X</Text>
                            </View>

                        </TouchableOpacity>

                        <View style={{ marginTop: "5%" }} ></View>
                        <FlatList
                            data={allBowler}
                            keyExtractor={item => item.id}
                            extraData={refresh}
                            renderItem={({ item, index }) => (
                                <>
                                    {item.add ? (
                                        <TouchableOpacity
                                            style={{ width: 300, height: 45, justifyContent: "center", backgroundColor: "#FF8C91", marginTop: "2%", borderRadius: 10 }}
                                            onPress={() => { setModalVisible(!modalVisible); addBowler(item, index); }}
                                        >
                                            <View style={{ width: "100%", alignSelf: "center", height: "100%", borderWidth: 1, justifyContent: "center", borderRadius: 10, }} >
                                                <Text style={{ alignSelf: "center", color: "white", fontWeight: "600", fontSize: 16 }} >{item.name}</Text>
                                            </View>

                                        </TouchableOpacity>
                                    ) : (null)}

                                </>
                            )}
                        />

                    </View>
                </Modal>

                <View style={{ marginTop: "5%" }} ></View>

                <Text style={styles.heading} >Pick Players</Text>

                <View style={{ marginTop: "5%" }} ></View>

                <View style={styles.container} >

                    {/* Batsman */}

                    <Text style={styles.title} >Pickup 3-7 Batsman</Text>

                    <View style={{ marginTop: "3%" }} ></View>

                    <FlatList
                        data={selectedBatsman}
                        keyExtractor={item => item.id}
                        extraData={refresh}
                        renderItem={({ item, index }) => (
                            <View style={styles.playerOptions} >

                                <Text style={styles.playerName} >{item.name ? item.name : `Player ${index + 1}`}</Text>

                                {item.name ? (
                                    <TouchableOpacity
                                        style={{ alignSelf: "center", justifyContent: "flex-end", width: "10%" }}
                                        onPress={() => { setCurrentIndex(index); removeBatsman(index); }}
                                    >
                                        <View style={{ width: 30, height: 30, backgroundColor: "white", borderRadius:100, justifyContent: "center", alignSelf: "center" }} >
                                            <Text style={{ alignSelf: "center", color: "red", fontWeight: "600", fontSize: 16 }} >X</Text>
                                        </View>

                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => { setBatsmanModal(true); setCurrentIndex(index); }} style={{ alignSelf: "center", justifyContent: "flex-end", width: "10%" }} >
                                        <AntDesign name="down" size={20} color="black" />
                                    </TouchableOpacity>
                                )}


                            </View>
                        )}
                    />

                    <View style={{ marginTop: "5%" }} ></View>

                    {/* Wicket Keeper */}


                    <Text style={styles.title} >Pickup 1-5 Wicket Picker</Text>

                    <View style={{ marginTop: "3%" }} ></View>

                    <FlatList
                        data={selectedWicketKeeper}
                        keyExtractor={item => item.id}
                        extraData={refresh}
                        renderItem={({ item, index }) => (
                            <View style={styles.playerOptions} >

                                <Text style={styles.playerName} >{item.name ? item.name : `Player ${index + 1}`}</Text>

                                {item.name ? (
                                    <TouchableOpacity
                                        style={{ alignSelf: "center", justifyContent: "flex-end", width: "10%" }}
                                        onPress={() => { setCurrentIndex(index); removeWicketKeeper(index); }}
                                    >
                                        <View style={{ width: 30, height: 30, backgroundColor: "white", borderRadius:100, justifyContent: "center", alignSelf: "center" }} >
                                            <Text style={{ alignSelf: "center", color: "red", fontWeight: "600", fontSize: 16 }} >X</Text>
                                        </View>

                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => { setWicketKeeperManModal(true); setCurrentIndex(index); }} style={{ alignSelf: "center", justifyContent: "flex-end", width: "10%" }} >
                                        <AntDesign name="down" size={20} color="black" />
                                    </TouchableOpacity>
                                )}


                            </View>
                        )}
                    />

                    <View style={{ marginTop: "5%" }} ></View>

                    {/* All Rounder */}

                    <Text style={styles.title} >Pickup 0-4 All Rounders</Text>

                    <View style={{ marginTop: "3%" }} ></View>

                    <FlatList
                        data={selectedAllRounder}
                        keyExtractor={item => item.id}
                        extraData={refresh}
                        renderItem={({ item, index }) => (
                            <View style={styles.playerOptions} >

                                <Text style={styles.playerName} >{item.name ? item.name : `Player ${index + 1}`}</Text>

                                {item.name ? (
                                    <TouchableOpacity
                                        style={{ alignSelf: "center", justifyContent: "flex-end", width: "10%" }}
                                        onPress={() => { setCurrentIndex(index); removeAllRounder(index); }}
                                    >
                                        <View style={{ width: 30, height: 30, backgroundColor: "white", borderRadius:100, justifyContent: "center", alignSelf: "center" }} >
                                            <Text style={{ alignSelf: "center", color: "red", fontWeight: "600", fontSize: 16 }} >X</Text>
                                        </View>

                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => { setAllRounderModal(true); setCurrentIndex(index); }} style={{ alignSelf: "center", justifyContent: "flex-end", width: "10%" }} >
                                        <AntDesign name="down" size={20} color="black" />
                                    </TouchableOpacity>
                                )}


                            </View>
                        )}
                    />

                    <View style={{ marginTop: "5%" }} ></View>

                    {/* Bowler */}

                    <Text style={styles.title} >Pickup 3-7 Bowler</Text>

                    <View style={{ marginTop: "3%" }} ></View>

                    <FlatList
                        data={selectedBowler}
                        keyExtractor={item => item.id}
                        extraData={refresh}
                        renderItem={({ item, index }) => (
                            <View style={styles.playerOptions} >

                                <Text style={styles.playerName} >{item.name ? item.name : `Player ${index + 1}`}</Text>

                                {item.name ? (
                                    <TouchableOpacity
                                        style={{ alignSelf: "center", justifyContent: "flex-end", width: "10%" }}
                                        onPress={() => { setCurrentIndex(index); removeBowler(index); }}
                                    >
                                        <View style={{ width: 30, height: 30, backgroundColor: "white", borderRadius:100, justifyContent: "center", alignSelf: "center" }} >
                                            <Text style={{ alignSelf: "center", color: "red", fontWeight: "600", fontSize: 16 }} >X</Text>
                                        </View>

                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => { setModalVisible(true); setCurrentIndex(index); }} style={{ alignSelf: "center", justifyContent: "flex-end", width: "10%" }} >
                                        <AntDesign name="down" size={20} color="black" />
                                    </TouchableOpacity>
                                )}


                            </View>
                        )}
                    />

                </View>

                <TouchableOpacity
                    onPress={() => { handleProceedButton() }}
                    style={styles.proceedButton} >
                    <Text style={styles.proceedText} >Proceed</Text>
                </TouchableOpacity>

                <View style={{ marginTop: "30%" }} ></View>

            </ScrollView>
        </>

    );
};

export default Player;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },
    title: {
        fontWeight: "600",
        fontSize: 16,
        marginLeft: "5%",
    },
    heading: {
        alignSelf: "center",
        fontSize: 18,
        fontWeight: "600"
    },
    playerOptions: {
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        alignContent: "space-around",
        height: 45,
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: "2%"
    },
    playerName: {
        fontSize: 14,
        fontWeight: "500",
        alignSelf: "center",
        width: "85%",
        marginLeft: "3%"
    },
    proceedButton: {
        width: "30%",
        height: 45,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#FF8C91",
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "white",
        marginTop: "5%"
    },
    proceedText: {
        fontWeight: "600",
        fontSize: 18,
        alignSelf: "center",
        color: "white"
    }

})