import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AlertPopup from "../../components/alert/alert";
import { useRouter } from "expo-router";
import Top from "../../components/top/top"
import CardOptions from "../../components/cardOptions/cardOptions"

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  type MIName = React.ComponentProps<typeof MaterialIcons>["name"];
  const options = ["Administração", "Acadêmico", "Docência", "Pessoas", "Secretaria"]
  const IconoOptions: MIName[] = ["admin-panel-settings", "school", "menu-book", "people-outline", "description",]
  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString("pt-BR", {
    weekday: "long",  
    day: "numeric",    
    month: "long",     
  });

  return (
    <View style={styles.container}>
      {/* Popup de alerta */}
      <AlertPopup visible={showModal} onClose={() => setShowModal(false)} />

      <Top title="GeAcad"/>

      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Olá, Ingrid!</Text>
        <Text style={styles.dateText}>{dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1)}</Text>
      </View>

      {/* Grid de botões */}
      <View style={styles.grid}>
        {options.map((i, index)=>(
          <CardOptions key={index} title={i} icon={IconoOptions[index]} onClick={i == "Pessoas" ? () => router.push("../pessoas") : ()=>setShowModal(true)}/>
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
  welcome: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    color: "#a056eb",
    marginTop: 4,
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
  card: {
    width: "40%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
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
})
