import { Movie } from "../../core/entities/movie.entity";
import type{ Result } from "../interfaces/movie-db.responses";
import { MovieDBMovie } from "../interfaces/movie.response";




export class MovieMapper {
                                     //el resultado de la repsuesta de moviedb y regressaremos una Movie
    static fromMovieDBResultToEntity( result:Result ):Movie{


        //Retronamos la trasnormacion, la propiedad e nuestra entidad con el valor que viene de la respuesta.
        return {
            id: result.id,
            title: result.title,
            description: result.overview,
            releaseDate: new Date( result.release_date),
            rating: result.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`  ,
            backdrop:`https://image.tmdb.org/t/p/w500${result.backdrop_path}`  
        }
    };


    //Mapeo para fullmovie
    static formMovieDBToEntity(movie : MovieDBMovie ) {

        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            releaseDate: new Date( movie.release_date),
            rating: movie.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`  ,
            backdrop:`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            genres: movie.genres.map( genre => genre.name ),
            duration: movie.runtime,
            budget: movie.budget,
            originalTitle: movie.original_title,
            productionCompanies: movie.production_companies.map( company => company.name )
        }

    }


}

//Si vienen imagenes sin ningun posterpath aqui manejamos las excepciones 

/*Como es un metodo estatico podemos hacer MovieMappper.fromMovieDBResultToEntity*/