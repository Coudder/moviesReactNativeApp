import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieResponse } from "../../../infrastructure/interfaces/movie.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";


interface Options {
    page?:number;
    limit?:number;

}

export const moviesPopularUseCase = async( fetcher:HttpAdapter, options?:Options ):Promise<Movie[]> => {


    try {
                             //nuestro fetcher ya tiene configuradas las opciones
        const popular = await fetcher.get<MovieResponse>('/popular',{
            params: {
                page: options?.page ?? 1 //si lo tenemos que lo use si no la pagina 1
            }
        });

        return popular.results.map( result => MovieMapper.fromMovieDBResultToEntity(result) );


    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - upcoming')
        
    }




}