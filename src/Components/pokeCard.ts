import { Mypokemon } from "../Adapters/PokeAdapter";
import getPokemon from "../Services/getPokemons";
import PokeStats from "./PokeStats";

class PokeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        if (this.shadowRoot) {
            const pokemons: Mypokemon[]= await getPokemon() 
            console.log(pokemons);
            
            this.shadowRoot.innerHTML = `
            
            <style>
            .card {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                padding: 2rem;
                background: #f5f5f5;
                border-radius: 20px;
                font-family: Arial;
                box-shadow: inset 0 0 25px rgba(0,0,0,0.05);
            }

            .poke-card {
                background: linear-gradient(135deg, #FFCB05, #f866af);
                color: white;
                border-radius: 20px;
                padding: 1rem;
                text-align: center;
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease;
            }

            .poke-card:hover {
                transform: scale(1.05);
            }

            .poke-card img {
                width: 100px;
                height: 100px;
                object-fit: contain;
                margin-bottom: 1rem;
                border-radius: 50%;
                background: white;
                padding: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }

            .poke-card h1 {
                font-size: 1.2rem;
                margin: 0.5rem 0;
                text-transform: capitalize;
            }

            .poke-card p {
                font-size: 0.9rem;
                margin: 0.3rem 0;
            }

            .poke-btn {
                margin-top: 0.7rem;
                background-color: white;
                color: #3B4CCA;
                font-weight: bold;
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .poke-btn:hover {
                background-color: #FFCB05;
                color: #2b2b2b;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            }

            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 1000;
                justify-content: center;
                align-items: center;
            }

            .modal-content {
                background-color: white;
                padding: 2rem;
                border-radius: 20px;
                max-width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            }

            .close-btn {
                position: absolute;
                top: 1rem;
                right: 1rem;
                font-size: 1.5rem;
                cursor: pointer;
                background: none;
                border: none;
                color: #3B4CCA;
            }
        </style>

        <div class="card">
            ${pokemons.map(pokemon => `
                <div class="poke-card">
                    <img src="${pokemon.sprite}" alt="${pokemon.name}">
                    <h1>${pokemon.name}</h1>
                    <p>Pokedex: ${pokemon.pokedexId}</p>
                    <button class="poke-btn" data-pokemon='${JSON.stringify(pokemon)}'>Estadísticas</button>
                </div>
            `).join('')}
        </div>

        <div class="modal" id="statsModal">
            <div class="modal-content">
                <button class="close-btn">&times;</button>
                <poke-stats></poke-stats>
            </div>
        </div>
            `;

            // Add event listeners
            const modal = this.shadowRoot.querySelector('#statsModal') as HTMLDivElement;
            const closeBtn = this.shadowRoot.querySelector('.close-btn') as HTMLButtonElement;
            const pokeBtns = this.shadowRoot.querySelectorAll('.poke-btn');
            const pokeStats = this.shadowRoot.querySelector('poke-stats') as PokeStats;

            pokeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (modal && pokeStats) {
                        const pokemonData = JSON.parse(btn.getAttribute('data-pokemon') || '{}');
                        pokeStats.setPokemon(pokemonData);
                        modal.style.display = 'flex';
                    }
                });
            });

            if (closeBtn && modal) {
                closeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }

            // Close modal when clicking outside
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            }
        }
    }
}

export default PokeCard;