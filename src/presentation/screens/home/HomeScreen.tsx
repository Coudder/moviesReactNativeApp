import React from 'react'
import { Text, View } from 'react-native'
import { useMovies } from '../../hooks/useMovies'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'
import { PosterCarousel } from '../../components/movies/PosterCarousel'
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel'
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader'

export const HomeScreen = () => {


  //Saber las dimensiones  de arribaa para el safeArea
  const { top } = useSafeAreaInsets()

  //Obtenemos las peliculas de nuestro Hook  useMovies
  const { isLoading, nowPlaying, popular, topRated, upcoming , popularNextPage} = useMovies()

  //Validamos si esta cargando
  if( isLoading ){
    return <FullScreenLoader/>
  }
  


  return (
    <ScrollView>
      <View style={{ marginTop:top + 20, paddingBottom:20 }}  >
          
          {/* Principal */}
          <PosterCarousel movies={nowPlaying}/>

          {/* Peliculas Populares */}
        <HorizontalCarousel 
            movies={popular} 
            title='Populares'
            loadNextPage={popularNextPage  } 
        />
        
        {/* Peliculas upcoming */}
        <HorizontalCarousel movies={upcoming} title='Proximamente' />
        
        {/* Peliculas topRated */}
        <HorizontalCarousel movies={topRated} title='Mejor calificadas' />


      </View>
    </ScrollView>
  )
}
