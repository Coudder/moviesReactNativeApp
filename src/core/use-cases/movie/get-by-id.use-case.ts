import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMovie } from "../../../infrastructure/interfaces/movie.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { FullMovie,} from "../../entities/movie.entity";



export const getMovieByIdUseCase = async( fetcher: HttpAdapter, movieId:number ):Promise<FullMovie> => {


    try {
        
        //fetcher
        const movie = await fetcher.get<MovieDBMovie>(`/${movieId}`);

        //mapeo
        const fullMovie = MovieMapper.formMovieDBToEntity(movie);

        return fullMovie;

    
        


    } catch (error) {
        console.log(error);
        throw new Error(`No se puee obtener la pelicula con el id: ${movieId}`)
    }


}