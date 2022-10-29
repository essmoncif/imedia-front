import axios from "axios";

const PER_PAGE = 20
export const GetPokemonList = async(page: number) => {

    const offset = page * PER_PAGE - PER_PAGE
    try{
        const results: { id: number; name: any; imgURL: string; }[] = []
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${PER_PAGE}&offset=${offset}`)
        console.log("result", page, result)
        result.data.results.forEach((element: any, index: number) => {
            results.push({
                id: index+1,
                name: element.name,
                imgURL: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`                
            })
        });
        return results
    }catch(error){
        return null
    }
}