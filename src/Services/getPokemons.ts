import { pokemonsAdapter } from "../Adapters/PokeAdapter"
import type { Mypokemon } from "../Adapters/PokeAdapter"

async function getPokemon(): Promise<Mypokemon[]> {
    try {
        const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon")
        const data = await response.json()
        
        const firstTen = data.slice(0, 12) // Tomamos solo los primeros 10
        const adapted = pokemonsAdapter(firstTen)
        return adapted

    } catch (error) {
        console.error(error)
        return []
    }
}

export default getPokemon
