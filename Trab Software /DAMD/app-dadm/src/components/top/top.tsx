import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Menu from "../menu/menu";
import { useRouter } from "expo-router";

type Props = {
  title: string;
};

export default function Top({ title }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnim] = useState(new Animated.Value(-300)); // Posição inicial fora da tela
  const router = useRouter();

  // Função para abrir o menu com animação
  const openMenu = () => {
    setMenuVisible(true); // Torna o modal visível
    Animated.timing(menuAnim, {
      toValue: 0, // Move para a posição visível
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Função para fechar o menu com animação
  const closeMenu = () => {
    Animated.timing(menuAnim, {
      toValue: -300, // Move para fora da tela
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false)); // Fecha o modal após a animação
  };

  return (
    <View>
      <View style={title == "GeAcad" ? styles.headerHome : styles.header}>
        <TouchableOpacity onPress={title == "GeAcad" ? openMenu : () => router.back()}>
          {title == "GeAcad" ? (
            <Ionicons name="menu" size={28} color="white" />
          ) : (
            <Ionicons name="arrow-back-circle-outline" size={32} color="#fff" />
          )}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <Ionicons name="person-circle-outline" size={28} color="white" />
      </View>

      {/* Menu lateral em Modal */}
      <Modal visible={menuVisible} animationType="none" transparent={true}>
        <View style={{ flex: 1, flexDirection: "row" }}> 
          {/* Lado esquerdo → Menu com animação */}
          <Animated.View style={[ styles.menu, { transform: [{ translateX: menuAnim }], }, ]} >
            <Menu onClose={closeMenu} />
          </Animated.View>
          {/* Lado direito → área escura que fecha o menu */}
          <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }} onPress={closeMenu} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerHome: {
    backgroundColor: "#a056eb",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 170,
  },
  header: {
    backgroundColor: "#a056eb",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 100,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "75%", 
    height: "100%",
    backgroundColor: "#a056eb",
    zIndex: 1000,
    padding: 20,
  },
});