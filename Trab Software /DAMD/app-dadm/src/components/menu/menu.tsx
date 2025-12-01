import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  onClose: () => void
}

export default function Menu({ onClose }: Props) {
  // Estados de cada categoria
  const [expanded, setExpanded] = useState({
    administracao: false,
    academico: false,
    docencia: false,
    pessoas: false,
    secretaria: false,
  });
  const router = useRouter();

  // Função para alternar
  const toggleExpand = (key: string) => {
    setExpanded((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View style={styles.container}>
      {/* Botão de fechar */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={28} color="white" />
      </TouchableOpacity>

      {/* Menu */}
      <View style={styles.menu}>
        {/* Administração */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => toggleExpand("administracao")}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.menuText}>Administração</Text>
            <Ionicons
              name={expanded.administracao ? "chevron-down" : "chevron-forward"}
              size={20}
              color="white"
            />
          </View>
        </TouchableOpacity>

        {expanded.administracao && (
          <>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Turno</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Departamento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Campus</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Universidade</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Usuários & Perfis</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Acadêmico */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => toggleExpand("academico")}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.menuText}>Acadêmico</Text>
            <Ionicons
              name={expanded.academico ? "chevron-down" : "chevron-forward"}
              size={20}
              color="white"
            />
          </View>
        </TouchableOpacity>
        {expanded.academico && (
          <>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Cursos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Disciplinas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Ofertas de Disciplinas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Períodos letivos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Plano de Ensimo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Turma</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Docência */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => toggleExpand("docencia")}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.menuText}>Docência</Text>
            <Ionicons
              name={expanded.docencia ? "chevron-down" : "chevron-forward"}
              size={20}
              color="white"
            />
          </View>
        </TouchableOpacity>
        {expanded.docencia && (
          <>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Alocações e Dedicações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Avaliações e Notas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Frequência</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Pessoas */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => toggleExpand("pessoas")}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.menuText}>Pessoas</Text>
            <Ionicons
              name={expanded.pessoas ? "chevron-down" : "chevron-forward"}
              size={20}
              color="white"
            />
          </View>
        </TouchableOpacity>
        {expanded.pessoas && (
          <>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Professores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem} onPress={()=>router.push("../../app/pessoas/alunos")}>
              <Text style={styles.subText}>Alunos</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Secretaria */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => toggleExpand("secretaria")}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.menuText}>Secretaria</Text>
            <Ionicons
              name={expanded.secretaria ? "chevron-down" : "chevron-forward"}
              size={20}
              color="white"
            />
          </View>
        </TouchableOpacity>
        {expanded.secretaria && (
          <>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Matriculas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Históricos</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Sobre */}
        <TouchableOpacity
          style={styles.menuItem} onPress={()=>router.push("../../sobre")}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
            <Text style={styles.menuText}>Sobre</Text>
          </View>
          </TouchableOpacity>

        {/* Botão de logout */}
        <TouchableOpacity 
        style={styles.logout}>
          <Ionicons name="log-out-outline" size={22} color="white" />
          <Text style={styles.logoutText}>Deslogar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

  const styles = StyleSheet.create({  
    container: {
      flex: 1,
      backgroundColor: "#a056eb",
      paddingTop: 40,
      paddingHorizontal: 15,
    },
    closeButton: {
      alignSelf: "flex-end",
      marginBottom: 20,
    },
    menu: {
      flex: 1,
    },
    menuItem: {
      paddingVertical: 15,
    },
    menuText: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
    },
    subItem: {
      paddingLeft: 20,
      paddingVertical: 10,
    },
    subText: {
      fontSize: 15,
      color: "#e0d7ff",
    },
    logout: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "auto",
      marginBottom: 30,
    },
    logoutText: {
      color: "white",
      marginLeft: 10,
      fontSize: 16,
    },
  });