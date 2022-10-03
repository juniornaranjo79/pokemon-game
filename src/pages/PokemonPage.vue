<template>
    <div>
        <h1 v-if="!pokemon"> Espere por favor... </h1>
        <div v-else>
            <h1>¿Quien es este pokemon?</h1>
            <!-- TODO: POKEMON IMAG -->
            <PokemonImage :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    
    
            <!-- TODO: POKEMON OPTIONS -->
            <PokemonOption :pokemons="pokemonArr" @selection="checkAnswer" />

            <template v-if="showAnswer">
                <h2 class="fade-in"> {{ message }}</h2>
                <button class="fade-in" @click="newGame">
                    Nuevo Juego
                </button>
            </template>
        </div>
    </div>
</template>

<script>
import PokemonImage from '@/components/PokemonImage';
import PokemonOption from '@/components/PokemonOption';
import getPokemonsOptions from '@/helpers/getPokemonOptions'

export default {
    components: { 
        PokemonImage, 
        PokemonOption 
    },
    data(){
        return{
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        async mixPokemonsArray(){
            this.pokemonArr = await getPokemonsOptions()

            const rndInt = Math.floor ( Math.random() * 4 )
            this.pokemon = this.pokemonArr[ rndInt ]
        },
        checkAnswer( pokemonId ) {
            this.showPokemon = true;
            this.showAnswer = true;
            if(this.pokemon.id === pokemonId){
                this.message = `Correcto, ${ this.pokemon.name }`
            }
            else{
                this.message = `Incorrecto era ${ this.pokemon.name }`
            }
        },
        newGame(){
            this.pokemonArr = []
            this.pokemon = null
            this.showPokemon = false
            this.showAnswer = false
            this.mixPokemonsArray()
        }
    },
    mounted() {
        this.mixPokemonsArray()
    }
}
</script>
