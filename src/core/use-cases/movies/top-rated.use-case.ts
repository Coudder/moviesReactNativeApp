import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieResponse } from "../../../infrastructure/interfaces/movie.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";



// CAso de uso para las mejores valoradas
export const moviesTopRatedUseCase = async( fetcher:HttpAdapter ):Promise<Movie[]> => {


    try {
        
        const topRated = await fetcher.get<MovieResponse>('/top_rated');

        return topRated.results.map( result => MovieMapper.fromMovieDBResultToEntity(result) );


    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - topRated')
        
    }




}