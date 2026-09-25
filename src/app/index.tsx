import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorByType: Record<string, string> = {
  normal: "bg-gray-400/50",
  fire: "bg-orange-500/50",
  water: "bg-blue-500/50",
  electric: "bg-yellow-400/50",
  grass: "bg-green-500/50",
  ice: "bg-cyan-300/50",
  fighting: "bg-red-600/50",
  poison: "bg-purple-500/50",
  ground: "bg-yellow-700/50",
  flying: "bg-indigo-300/50",
  psychic: "bg-pink-500/50",
  bug: "bg-lime-600/50",
  rock: "bg-amber-700/50",
  ghost: "bg-purple-700/50",
  dragon: "bg-indigo-600/50",
  dark: "bg-gray-800/50",
  steel: "bg-slate-500/50",
  fairy: "bg-pink-300/50",
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=30",
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          return {
            id: details.id, // Pulled from details
            name: details.name, // Pulled from details
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        }),
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView className="px-4 ">
      {pokemons.map((pokemon) => (
        <Link
          key={pokemon.name}
          href={{ pathname: "/details", params: { name: pokemon.name } }}
          className="flex items-center justify-center p-2"
        >
          <View
            className={`${colorByType[pokemon.types[0].type.name]}  text-white  py-1 rounded-3xl px-3 w-full flex items-center justify-center`}
          >
            <Text className="text-[38px] font-semibold capitalize">
              {pokemon.name}
            </Text>
            <Text className="text-lg font-bold text-gray-500">
              {pokemon.types[0].type.name}
            </Text>
            <View className="flex flex-row">
              <Image
                source={{ uri: pokemon.image }}
                className="h-37.5 w-37.5"
              />
              <Image
                source={{ uri: pokemon.imageBack }}
                className="h-37.5 w-37.5"
              />
            </View>
            <Text className="font-bold">{pokemon.id}</Text>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
