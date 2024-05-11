import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";



//Funcion para obtener las peliculas now playing en la cual recibimos la prop fecther que es de tipo de la clase abstracta que creamos HttAdapter
export const moviesNowPlayingUseCase = async( fetcher:HttpAdapter ):Promise<Movie[]> => {


    try {
        
       const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing');

        // console.log({nowPlaying});
        
        
       //Necesitamos transformar la data a nuestra entidad poara eso es el Mapper 
       //Antes de implementar el mapper probamos que funciones la peticion
        return nowPlaying.results.map( result =>  MovieMapper.fromMovieDBResultToEntity(result) )



    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - now playing')
        
    }



}

