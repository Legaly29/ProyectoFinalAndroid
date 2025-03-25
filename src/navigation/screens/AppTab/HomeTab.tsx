import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppTabStackParamList } from "../../stacks/AppStack";

type Props = NativeStackScreenProps<AppTabStackParamList, "HomeTab">;

type Pokemon = {
  name: string;
  image: string;
  number: number;
  types: string[];
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

export const HomeTab: React.FC<Props> = ({navigation}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const handlePressPokemon = (pokemon: {nombre: string}) => {
        navigation.navigate("NotificationsTab", pokemon);
    };
  const fetchPokemons = async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`
      );

      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon: { name: string; url: string }, index: number) => {
          const pokemonDetail = await axios.get(pokemon.url);
          const types = pokemonDetail.data.types.map((t: any) => t.type.name);

          return {
            name: pokemon.name,
            image: pokemonDetail.data.sprites.front_default,
            number: `#${pokemonDetail.data.id.toString().padStart(3, "0")}`,
            types: types,
          };
        })
      );

      setPokemons((prev) => [...prev, ...pokemonData]);
      setOffset((prev) => prev + 30);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ffcc00" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        numColumns={3}
        onEndReached={fetchPokemons}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePressPokemon({nombre: item.name})}
            style={{
              flex: 1,
              alignItems: "center",
              margin: 5,
              backgroundColor: typeColors[item.types[0]] || typeColors["unknown"],
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}>{item.number}</Text>
            <Image source={{ uri: item.image }} style={{ width: 80, height: 80 }} />
            <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5, color: "#fff" }}>
              {item.name.toUpperCase()}
            </Text>

            <View style={{ flexDirection: "row", marginTop: 5 }}>
              {item.types.map((type) => (
                <View
                  key={type}
                  style={{
                    backgroundColor: typeColors[type] || typeColors["unknown"],
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 5,
                    marginHorizontal: 2,
                    borderWidth: 1,
                    borderColor: "#fff",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
                    {type.toUpperCase()}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
