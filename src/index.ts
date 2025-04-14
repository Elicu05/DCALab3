import getPokemon from "./Services/getPokemons";

import PokeCard from "./Components/pokeCard";
import PokeStats from "./Components/PokeStats";

customElements.define("poke-card",PokeCard)
customElements.define("poke-stats",PokeStats)