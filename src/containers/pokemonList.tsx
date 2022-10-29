import { capitalize, Card, CardContent, CardMedia, Grid, makeStyles, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemonListAction } from "../actions/PokemonList"


const useStyles = makeStyles({
    pokemonCardsArea: {
      paddingTop: "30px",
      paddingLeft: "15%",
      paddingRight: "15%",
      width: "100%"
    },
    pokemonImage: {
      height: "160px",
      width: "160px"
    },
    progress: {
      position: "fixed",
      top: "50%",
      left: "50%",
      marginTop: "-100px",
      marginLeft: "-100px"
    }
  });

type pokemon = {
    id: number,
    name: string,
    imgURL: string
}



export const PokemonList = () => {
    const [pokemons, setPokemons] = useState<pokemon[]>([])
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const classes = useStyles();
    const dispatch = useDispatch()
    const PokemonList = useSelector((state: any) => state.PokemonList)
    const [scrollPosition, setScrollPosition] = useState<Set<number>>(new Set());

    const handleScroll = () => {
        const position = window.pageYOffset;
        scrollPosition.add(position)
        setScrollPosition(scrollPosition);
        if(lastElement(scrollPosition) >= position) {
            setPage(page+1)
        }
    };

    const lastElement = (set: Set<number>): number => {
        const arr: number[] = Array.from(set)
        return arr[arr.length - 1]
    }
    
    useEffect(() => {
        fetchPokes(page)
    }, [page])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect( () => {
        fetchPokes(page)
    }, [page])

    useEffect(() => {
        if(PokemonList.data && PokemonList.data.length > 0) {
            setPokemons(pokemons.concat(PokemonList.data))
        }
    }, [PokemonList.data])

    const fetchPokes = (page = 1) => {
        dispatch<any>(getPokemonListAction(page))
    }

    

    if(PokemonList.data){
        return (
        
            <div>
                <Grid container spacing={4} className={classes.pokemonCardsArea}>
                  {pokemons.map((data: any) => PokemonCard({data, classes}))}
                </Grid>
            </div>
        )
    }else{
        return <p>Loading...</p>
    }

}



const PokemonCard = ({data, classes}: {data: any, classes: any}) => {
    

    if(data){
        return (
    
            <Grid key={data.id} item xs={12} sm={6} md={4} lg={3}>
            <Card elevation={20} className={classes.pokemonCardsArea}>
              <CardContent>
                <Typography>{"Name: " + capitalize(`${data.name}`)}</Typography>
                <Typography>{`ID: ${data.id}`}</Typography>
                <CardMedia>
                  <div
                    style={{
                      borderRadius: "50%"
                    }}
                  >
                    <img className={classes.pokemonImage} alt="" src={data.imgURL} />
                    
                  </div>
                </CardMedia>
              </CardContent>
            </Card>
          </Grid>
        )
    }else{
        <div>Loading again...</div>
    }
    
}