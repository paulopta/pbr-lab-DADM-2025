import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, TextInput } from "react-native";

export default function HomeScreen({ navigation }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    carregarPokemons();
  }, []);

  const carregarPokemons = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
      const data = await response.json();

      const detalhes = await Promise.all(
        data.results.map(async (poke) => {
          const pokeResponse = await fetch(poke.url);
          const pokeData = await pokeResponse.json();
          
          const speciesResponse = await fetch(pokeData.species.url);
          const speciesData = await speciesResponse.json();

          let evolucoes = [];
          if (speciesData.evolution_chain) {
            const evoResponse = await fetch(speciesData.evolution_chain.url);
            const evoData = await evoResponse.json();

            const getEvolucoes = async (evo) => {
              if (!evo) return;
              const name = evo.species.name;
              const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
              const pokeInfo = await pokeRes.json();
              evolucoes.push({
                nome: name,
                imagem: pokeInfo.sprites.front_default,
                id: pokeInfo.id,
              });
              if (evo.evolves_to.length > 0) {
                for (let next of evo.evolves_to) {
                  await getEvolucoes(next);
                }
              }
            };

            await getEvolucoes(evoData.chain);
          }

          return {
            id: pokeData.id,
            nome: pokeData.name,
            imagem: pokeData.sprites.front_default,
            tipos: pokeData.types.map((t) => t.type.name),
            altura: pokeData.height,
            peso: pokeData.weight,
            habilidades: pokeData.abilities.map((a) => a.ability.name),
            stats: pokeData.stats.map((s) => ({
              nome: s.stat.name,
              valor: s.base_stat,
            })),
            evolucoes,
          };
        })
      );

      setPokemons(detalhes);
    } catch (error) {
      console.error("Erro ao buscar pokémons:", error);
    } finally {
      setLoading(false);
    }
  };

  const pokemonsFiltrados = pokemons.filter((poke) =>
    poke.nome.toLowerCase().includes(search.toLowerCase()) ||
    poke.id.toString() === search
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 10, backgroundColor: "#ff0000" }}>

        <TextInput
          placeholder="Buscar Pokémon..."
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 8,
          }}
        />
      </View>

      <FlatList
        data={pokemonsFiltrados}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detalhes", { pokemon: item })}
            style={{
              flex: 1,
              margin: 5,
              padding: 10,
              backgroundColor: "#f4f4f4",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.imagem }}
              style={{ width: 80, height: 80 }}
            />
            <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {item.nome}
            </Text>
            <Text>{item.tipos.join(", ")}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
