import { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TextInput, ActivityIndicator } from "react-native";
import axios from "axios";

type Pokemon = {
  name: string;
  image: string;
  number: number;
  type: string;
};

const typeColors: { [key: string]: string } = {
  fire: "#FF5733",
  water: "#3399FF",
  grass: "#77DD77",
  electric: "#FFD700",
  ice: "#AEEEEE",
  fighting: "#D56723",
  poison: "#A040A0",
  ground: "#DEB887",
  flying: "#A890F0",
  psychic: "#FF69B4",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878",
  unknown: "#f4f4f4",
};

export const ExploreTab: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAllPokemons = async () => {
    try {
      const countResponse = await axios.get("https://pokeapi.co/api/v2/pokemon-species/");
      const totalPokemons = countResponse.data.count;

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemons}`);

      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon: { name: string; url: string }) => {
          const pokemonDetail = await axios.get(pokemon.url);
          const number = pokemonDetail.data.id;
          const type =
            pokemonDetail.data.types.length > 0 ? pokemonDetail.data.types[0].type.name : "unknown";

          return {
            name: pokemon.name,
            image: pokemonDetail.data.sprites.front_default,
            number,
            type,
          };
        })
      );

      setPokemons(pokemonData);
      setFilteredPokemons(pokemonData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPokemons(filtered);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ffcc00" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
        placeholder="Buscar Pokémon..."
        value={search}
        onChangeText={handleSearch}
      />
      {filteredPokemons.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
            Pokemon no encontrado
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: typeColors[item.type] || typeColors["unknown"],
                padding: 10,
                marginVertical: 5,
                borderRadius: 10,
              }}
            >
              <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                #{item.number} {item.name.toUpperCase()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};
