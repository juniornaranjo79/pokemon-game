import pokemonApi from "@/api/pokemonApi"
//Name f: getPokemons
//Descripcion: Esta funcion crea el array de 1 a 650
const getPokemons = () => {
    const pokemonsArr = Array.from( Array(650) )
    return pokemonsArr.map( (_, index ) => index + 1 )
    
}
//Name f: getPokemonsOptions
//Descripcion: Esta funcion apartir del array creado con getPokemons combina el array
const getPokemonsOptions = async () => {

    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 )
    
    const pokemons = await getPokemonsNames( mixedPokemons.splice(0,4) )

    return pokemons
}
//Name f: getPokemonsNames
//Descripcion: Esta funcion apartir de la seleccion de los 4 primeros hecha en getPokemonsOptions me debe dar los nombres conrrespondientes de los pokemones
const getPokemonsNames = async ( [a,b,c,d]= [] ) => {

    /* const resp = await pokemonApi.get(`/1`)
    console.log(resp.data.name); */
    const arrPromises = [
        pokemonApi.get(`/${ a }`),
        pokemonApi.get(`/${ b }`),
        pokemonApi.get(`/${ c }`),
        pokemonApi.get(`/${ d }`),
    ]

    const [ p1, p2, p3, p4 ] = await Promise.all( arrPromises )

    return [
        { name: p1.data.name, id: p1.data.id },
        { name: p2.data.name, id: p2.data.id },
        { name: p3.data.name, id: p3.data.id },
        { name: p4.data.name, id: p4.data.id },
    ]
}
export default getPokemonsOptions