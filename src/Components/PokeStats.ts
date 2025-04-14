import { Mypokemon } from "../Adapters/PokeAdapter";

class PokeStats extends HTMLElement {
    private pokemon: Mypokemon | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ['pokemon-name'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'pokemon-name' && oldValue !== newValue) {
            this.render();
        }
    }

    setPokemon(pokemon: Mypokemon) {
        this.pokemon = pokemon;
        this.setAttribute('pokemon-name', pokemon.name);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot && this.pokemon) {
            this.shadowRoot.innerHTML = `
            <style>
                .poke-stats {
                    padding: 2rem;
                    background: #f5f5f5;
                    border-radius: 20px;
                    box-shadow: inset 0 0 25px rgba(0,0,0,0.05);
                    font-family: Arial;
                }

                h1 {
                    text-align: center;
                    font-size: 2rem;
                    margin-bottom: 1.5rem;
                    color: #3B4CCA;
                }

                .poke-stats-card {
                    background: linear-gradient(135deg, #FFCB05, #f866af);
                    color: white;
                    border-radius: 20px;
                    padding: 1rem;
                    text-align: center;
                    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
                }

                .poke-stats-card h2 {
                    font-size: 1.4rem;
                    text-transform: capitalize;
                    margin-bottom: 0.5rem;
                }

                .poke-stats-card p {
                    font-size: 0.95rem;
                    margin: 0.3rem 0;
                }

                .pokemon-image {
                    width: 150px;
                    height: 150px;
                    object-fit: contain;
                    margin: 0 auto 1rem;
                    display: block;
                    background: white;
                    padding: 10px;
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
            </style>

            <div class="poke-stats">
                <div class="poke-stats-card">
                    <img src="${this.pokemon.sprite}" alt="${this.pokemon.name}" class="pokemon-image">
                    <h2>${this.pokemon.name}</h2>
                    <p>Ataque: ${this.pokemon.stats.attack}</p>
                    <p>Defensa: ${this.pokemon.stats.defense}</p>
                    <p>HP: ${this.pokemon.stats.HP}</p>
                    <p>Velocidad: ${this.pokemon.stats.speed}</p>
                </div>
            </div>
            `;
        }
    }
}

export default PokeStats;
