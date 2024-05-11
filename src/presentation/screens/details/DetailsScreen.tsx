import { useRoute } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { RootStackParams } from '../../navigation/Navigation';
import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../components/movie/MovieHeader';
import { MovieDetails } from '../../components/movie/MovieDetails';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';


interface Props extends StackScreenProps<RootStackParams, 'Details'>{};


export const DetailsScreen = ( { route }:Props) => {
  // const { movieId } = useRoute().params;
  const { movieId } = route.params;
  console.log(movieId);
  

  //uso de nuestro hook movie
  const { isLoading, movie, cast=[] } =  useMovie(movieId)


  //Validamos cuaandoesta cargando la infomracion
  if( isLoading ){
    return <FullScreenLoader/>
  }



  return (
    <ScrollView>
       {/* Header */}
        {/* <MovieHeader movie={movie} /> */}
          <MovieHeader
              originalTitle= {movie!.originalTitle}
              title={movie!.title} // Ponemos ! porque siempre vendra
              poster={movie!.poster}

          />

        {/* detalles */}
        <MovieDetails
            movie={movie!}
            cast= {cast}
        />



    </ScrollView>
  )
}
