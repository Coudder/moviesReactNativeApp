import { Text, View } from "react-native"
import { Movie } from "../../../core/entities/movie.entity"
import { ScrollView } from "react-native-gesture-handler";
import { MoviePoster } from "./MoviePoster";

//Propiedades que espermos en este componente
 interface Props {
    movies:Movie[];
    height?:number;

 }

export const PosterCarousel = (  {  height = 440, movies }: Props ) => {
  return (
    <View  style={{height:height}}>
       
       <ScrollView
          horizontal //porque queremos que sea horizontal
          showsHorizontalScrollIndicator={ false } //no mostrar el loader
       >
        {
            movies.map( movie =>( <MoviePoster key={movie.id}  movie={movie} />) )
        }
            
       </ScrollView>

    </View>
  )
}
