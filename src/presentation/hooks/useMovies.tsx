

import React, { useEffect, useState } from 'react'
import { Movie } from '../../core/entities/movie.entity'
// import { moviesNowPlayingUseCase, moviesUpcomingUseCase } from '../../core/use-cases';
import * as Usecases from '../../core/use-cases/';
import { movieDBFetcher } from '../../config/adapters/http/movieDB.adapter';


//cargar pagina 1 por dececto
let popularPageNumber = 1;

export const useMovies = () => {
  
    //petcion http para obtener las peliculas

   const [isLoading, setIsLoading] = useState(true);

   const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
   const [popular, setPopular]       = useState<Movie[]>([]);
   const [topRated, setTopRated]     = useState<Movie[]>([]);
   const [upcoming, setUpcoming]     = useState<Movie[]>([]);
   
   //estado para el loading
   

   //tan pronto el componente se monta disparamos un useEffect  
   useEffect(() => {

    //ejecutamos el initalload
    initialLoad();


   }, [])


   //funcion que llamaremos dentro del useEffect
   const initialLoad = async() => {

    //Para poder cargar todas simulateamente resolvemos
    const nowPlayingPromise = Usecases.moviesNowPlayingUseCase(movieDBFetcher);
    const popularPromise = Usecases.moviesPopularUseCase(movieDBFetcher);
    const topRatedPromise = Usecases.moviesTopRatedUseCase(movieDBFetcher);
    const upcomingPromise = Usecases.moviesUpcomingUseCase(movieDBFetcher);

    //Resolvemos todas las promesas con Promise.all
    const [ //las asignamos a estas constantes
        nowPlayingMovies, 
        popularMovies, 
        topRatedMovies, 
        upcomingMovies
    ] = await Promise.all([ 
                nowPlayingPromise, 
                popularPromise, 
                topRatedPromise, 
                upcomingPromise ])

    //Establecemos los estados 
         setNowPlaying(nowPlayingMovies);      
         setPopular(popularMovies);
         setTopRated(topRatedMovies);
         setUpcoming(upcomingMovies);

    //Ya que establecimos pasamos loading a false
    setIsLoading(false);

        // console.log({
        //     nowPlayingMovies,
        //     popularMovies,
        //     topRatedMovies,
        //     upcomingMovies,
        // });
        

    //hacemos uso de nuestro caso de uso   y le pasamos el fecther de movie db que viene de http
        // const nowPlayingMovies = await Usecases.moviesNowPlayingUseCase(movieDBFetcher);
        // console.log(nowPlayingMovies[0]);
        
        // const upcomingMovies = await Usecases.moviesUpcomingUseCase(movieDBFetcher);
        // console.log(upcomingMovies[0]);

        // const topRatedMovies = await Usecases.moviesTopRatedUseCase(movieDBFetcher);
        // console.log(topRatedMovies[0]);
        
        // const popularMovies = await Usecases.moviesPopularUseCase(movieDBFetcher);
        // console.log(popularMovies[0]);
        



   } 

   //MEtodo para cargar las siguientes peliculas populares
   const popularNextPage = async()=> {

     //incrementamos el valor de la pagina actual
     popularPageNumber++

     //cargamos las peliculas y le pasamos en las opciones el page incrementado
     const popularMovies = await Usecases.moviesPopularUseCase(movieDBFetcher, {
        page: popularPageNumber
     });


     //Actualizamos el estado de las peloiculas populares
     setPopular( prev => [...prev, ...popularMovies] ) ; //tenemos las peliculas previas y agregamos las nuevas

   }
   


    return {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upcoming,
        
        //Metodos
        popularNextPage
    }
}
