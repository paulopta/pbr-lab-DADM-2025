import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import CardOptions from "../../components/cardOptions/cardOptions"
import AlertPopup from "../../components/alert/alert";
import Top from "../../components/top/top"
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Pessoas() {

    const router = useRouter();
    const options = ["Alunos", "Professores"]
    type MIName = React.ComponentProps<typeof MaterialIcons>["name"];
    const [showModal, setShowModal] = useState(false);
    const IconoOptions: MIName[] = ["backpack", "school"];

    return (
        <View style={styles.container}>
            <Top title="Pessoas"/>
            <AlertPopup visible={showModal} onClose={() => setShowModal(false)} />
            <View style={styles.grid}>
                {options.map((i, index)=>(
                    <CardOptions key={index} icon={IconoOptions[index]} title={i} onClick={i == "Alunos" ? () => router.push("../pessoas/alunos") : ()=>setShowModal(true)}/>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    grid: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 25,
        borderColor: "#000",
        borderStyle: "solid",
        marginTop: 20,
    },
})
