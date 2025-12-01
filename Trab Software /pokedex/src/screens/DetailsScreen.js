import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

export default function DetailsScreen({ route }) {
  const { pokemon } = route.params;

  const statColors = {
    hp: "#FF5959",
    attack: "#F5AC78",
    defense: "#FAE078",
    "special-attack": "#9DB7F5",
    "special-defense": "#A7DB8D",
    speed: "#FA92B2",
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: pokemon.imagem }}
          style={{ width: 150, height: 150 }}
        />
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            textTransform: "capitalize",
            marginTop: 10,
          }}
        >
          {pokemon.nome} #{pokemon.id}
        </Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>
          Tipo: {pokemon.tipos.join(", ")}
        </Text>
        <Text>Altura: {pokemon.altura / 10} m</Text>
        <Text>Peso: {pokemon.peso / 10} kg</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
          Habilidades
        </Text>
        {pokemon.habilidades.map((h, index) => (
          <Text key={index} style={{ fontSize: 16 }}>
            • {h}
          </Text>
        ))}
      </View>

      <View style={{ marginTop: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Status Base
        </Text>
        {pokemon.stats.map((s, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, marginBottom: 3, textTransform: "capitalize" }}>
              {s.nome}: {s.valor}
            </Text>
            <View
              style={{
                height: 12,
                backgroundColor: "#e0e0e0",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${Math.min((s.valor / 200) * 100, 100)}%`,
                  backgroundColor: statColors[s.nome] || "#76a5af",
                }}
              />
            </View>
          </View>
        ))}
      </View>

      {pokemon.evolucoes && pokemon.evolucoes.length > 1 && (
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Evoluções
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
            {pokemon.evolucoes.map((evo, index) => (
              <View key={index} style={{ alignItems: "center", marginRight: 15, marginBottom: 10 }}>
                <Image
                  source={{ uri: evo.imagem }}
                  style={{ width: 60, height: 60 }}
                />
                <Text style={{ textTransform: "capitalize" }}>{evo.nome}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
