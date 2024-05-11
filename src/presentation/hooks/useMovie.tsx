import { useEffect, useState } from "react"
import * as UseCases from '../../core/use-cases/';
import { movieDBFetcher } from "../../config/adapters/http/movieDB.adapter";
import { FullMovie } from '../../core/entities/movie.entity';
import { Cast } from "../../core/entities/cast.entity";


export const useMovie = ( movieId:number ) => {


    const [isLoading, setIsLoading] = useState(true);

    const [movie, setMovie] = useState<FullMovie>();

    const [cast, setCast] = useState<Cast[]>()


    useEffect(() => {
    
        //loadmovie
        loadMovie();

    }, [movieId])
    

    const loadMovie = async()=> {

        setIsLoading(true);
        //llamar caso de uso
        // const fullMovie = await UseCases.getMovieByIdUseCase(movieDBFetcher, movieId) 
        const fullMoviePromise =  UseCases.getMovieByIdUseCase(movieDBFetcher, movieId); 
        const castMoviePromise =  UseCases.getMovieCastUseCase(movieDBFetcher, movieId); 

        //Cast usecases
        // const castMovie = await UseCases.getMovieCastUseCase(movieDBFetcher, movieId)

        const[fullMovie, castMovie  ] = await Promise.all([fullMoviePromise, castMoviePromise])


        //establecemos la movie en un estado
        setMovie(fullMovie);

        setCast(castMovie);

        setIsLoading(false);

        // console.log({cast});
        

    }


    return {
        isLoading,
        movie, 
        cast
    }

}
