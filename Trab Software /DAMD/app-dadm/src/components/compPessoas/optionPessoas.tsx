import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";

type Props = {
    title: string,
    campo: string
}

export default function OptionPessoas({title, campo}: Props) {

    const [editOption, setEditOption] = useState(false)

    return (
        <View style={styles.option}>
            <View style={{width:"100%", paddingLeft: 10}}>
                <Text>{title}</Text>
            </View>
            <View style={styles.inputOption}>{campo}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    option:{
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
    },
    inputOption:{
        width: "90%",
        height: 20,
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        borderRadius: 10,
    },
});