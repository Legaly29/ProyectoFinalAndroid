import { RouteProp, useRoute } from "@react-navigation/native";
import { AppTabStackParamList } from "../../stacks/AppStack";
import { View, Text, Image, ActivityIndicator, Dimensions, ScrollView } from "react-native";
import { useEffect, useState } from "react";

const screenHeight = Dimensions.get("window").height;

type NotificationsTabRouteProp = RouteProp<AppTabStackParamList, "NotificationsTab">;

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

const MAX_STATS = {
    hp: 255,
    attack: 190,
    defense: 250,
    "special-attack": 194,
    "special-defense": 250,
    speed: 180,
  };

const getStatColor = (value: number, max: number) => {
    const percentage = value / max;
    const red = Math.max(0, 255 - percentage * 255);
    const green = Math.min(255, percentage * 255);
    return `rgb(${red}, ${green}, 50)`;
};

const StatBar = ({ name, value }: { name: string; value: number }) => {
    const max = MAX_STATS[name as keyof typeof MAX_STATS] || 100;
    const percentage = (value / max) * 100;
    const barColor = getStatColor(value, max);
  
    return (
      <View style={{ marginVertical: 5 }}>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>{name.toUpperCase()}: {value}</Text>
        <View
          style={{
            height: 10,
            width: "100%",
            backgroundColor: "#ccc",
            borderRadius: 5,
            overflow: "hidden",
            marginTop: 4,
          }}
        >
          <View
            style={{
              height: "100%",
              width: `${percentage}%`,
              backgroundColor: barColor,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    );
  };

  export const NotificationsTab: React.FC = () => {
    const route = useRoute<NotificationsTabRouteProp>();
    const { nombre = "bulbasaur" } = route.params || { nombre: "bulbasaur" };

    const [pokemonData, setPokemonData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async (pokemonName: string) => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
                if (!response.ok) throw new Error("No se pudo obtener los datos del Pokémon");
                
                const data = await response.json();

                const speciesResponse = await fetch(data.species.url);
                const speciesData = await speciesResponse.json();

                const evolutionResponse = await fetch(speciesData.evolution_chain.url);
                const evolutionData = await evolutionResponse.json();

                const evolutions = extractEvolutions(evolutionData);

                setPokemonData({
                    id: data.id,
                    image: data.sprites.other["official-artwork"].front_default,
                    types: data.types.map((t: any) => t.type.name),
                    height: data.height / 10, 
                    weight: data.weight / 10, 
                    stats: data.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
                    abilities: data.abilities.map((a: any) => a.ability.name),
                    evolutions,
                });
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonData(nombre);
    }, [nombre]);

    const extractEvolutions = (evolutionData: any) => {
        let evolutions: string[] = [];
        let currentStage = evolutionData.chain;

        while (currentStage) {
            evolutions.push(currentStage.species.name);
            currentStage = currentStage.evolves_to.length ? currentStage.evolves_to[0] : null;
        }
        return evolutions;
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#FFCC00" />
            </View>
        );
    }

    const primaryType = pokemonData?.types[0] || "unknown";
    const backgroundColor = typeColors[primaryType] || "#f4f4f4";

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ 
                height: screenHeight / 3, 
                backgroundColor, 
                justifyContent: "center", 
                alignItems: "center", 
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
            }}>
                {pokemonData && (
                    <>
                        <Image source={{ uri: pokemonData.image }} style={{ width: 200, height: 200 }} />
                        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
                            {nombre.toUpperCase()}
                        </Text>
                        <Text style={{ fontSize: 18, color: "#fff" }}>
                            N° {String(pokemonData.id).padStart(3, "0")}
                        </Text>

                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            {pokemonData.types.map((type: string) => (
                                <View
                                    key={type}
                                    style={{
                                        backgroundColor: typeColors[type] || "#f4f4f4",
                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                        borderRadius: 15,
                                        marginHorizontal: 5,
                                        borderWidth: 1,
                                        borderColor: "#fff",
                                    }}
                                >
                                    <Text style={{ color: "white", fontWeight: "bold", textTransform: "capitalize" }}>
                                        {type}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </>
                )}
            </View>

            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>Información</Text>

                <Text style={{ fontSize: 18 }}>📏 Altura: {pokemonData.height} m</Text>
                <Text style={{ fontSize: 18 }}>⚖️ Peso: {pokemonData.weight} kg</Text>

                <Text style={{ fontSize: 18, marginTop: 10 }}>✨ Habilidades:</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>
                    {pokemonData.abilities.map((ability: string) => (
                        <View key={ability} style={{ backgroundColor: "#ddd", padding: 5, borderRadius: 10, margin: 5 }}>
                            <Text style={{ textTransform: "capitalize" }}>{ability}</Text>
                        </View>
                    ))}
                </View>

                <View>
                <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>Estadísticas Base</Text>
                {pokemonData.stats.map((stat: { name: string; value: number }) => (
                    <StatBar key={stat.name} name={stat.name} value={stat.value} />
                ))}
            </View>

                {pokemonData.evolutions.length > 1 && (
                    <>
                        <Text style={{ fontSize: 18, marginTop: 10 }}>🔄 Evoluciones:</Text>
                        <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
                            {pokemonData.evolutions.join(" ➡ ")}
                        </Text>
                    </>
                )}
            </View>
        </ScrollView>
    );
};
