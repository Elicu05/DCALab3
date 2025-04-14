export type Mypokemon = {
    name: string;
    sprite: string;
    pokedexId: number;
    stats: {
        HP: number;
        attack: number;
        defense: number;
        speed: number;
    }
}

export const pokemonAdapter = (pokemon:Mypokemon )=> {
    return {
        name: pokemon.name,
        sprite: pokemon.sprite,
        pokedexId: pokemon.pokedexId,
        stats:{
            HP: pokemon.stats.HP,
            attack:pokemon.stats.attack,
            defense: pokemon.stats.defense,
            speed: pokemon.stats.speed,
        }
    }
}

export const pokemonsAdapter = (pokemons:Mypokemon[])=> {
    return pokemons.map(pokemon=>pokemonAdapter(pokemon))
}