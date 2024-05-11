import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBCastResponse } from "../../../infrastructure/interfaces/movie.response";
import { CastMapper } from "../../../infrastructure/mappers/cast.mapper";
import { Cast } from "../../entities/cast.entity";



export const getMovieCastUseCase = async( fetcher:HttpAdapter, movieId:number ):Promise<Cast[]> => {


    try {

        const { cast } = await fetcher.get<MovieDBCastResponse>(`/${movieId}/credits`);

        const actors = cast.map( (actor) => CastMapper.fromMovieDBCastToEntity(actor) );



        return actors

    } catch (error) {
        console.log(error);
        throw new Error(`No se puede obtener informacion de la pelicula: ${movieId}`)
        
    }


}