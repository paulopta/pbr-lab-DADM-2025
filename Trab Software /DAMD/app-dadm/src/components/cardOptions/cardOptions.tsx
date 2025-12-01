import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  title: string,
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  onClick: () => void
}

export default function CardOptions({ title, icon, onClick }: Props) {

    return (
        <View>
            <TouchableOpacity style={styles.card} onPress={onClick}>
                <MaterialIcons name={icon} size={32} color="#7b4dff" />
                <Text style={styles.cardText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 130,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginVertical: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    cardText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
        textAlign: "center",
    },
});