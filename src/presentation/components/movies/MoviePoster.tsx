import { Image, Pressable, StyleSheet, View } from "react-native"
import { Movie } from "../../../core/entities/movie.entity"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParams } from "../../navigation/Navigation";

//Creamos la props que requerimos
interface Props {
    movie: Movie,
    height?:number,
    width?:number,
}


export const MoviePoster = ( { movie, width=300, height=420 }:Props ) => {


    //Navegación lo tipamos para poder tener la ayuda
   const navegation = useNavigation<NavigationProp<RootStackParams>>();

  return (

    <Pressable
        onPress={ () =>  navegation.navigate('Details', { movieId: movie.id })} //hcaemos la navegacion a details
        style={ ( {pressed} )=>({ //obtenemos el press
            width,
            height,
            marginHorizontal: 4,
            paddingBottom:20,
            paddingHorizontal: 10,
            opacity: pressed ? 0.9 : 1, //cambiamos la opacidad al momento de presionar
        })
        }
    >           
    
        {/* <View style={{...styles.imageContainer,  width:width, height: height  }} >  */}
        <View style={{...styles.imageContainer, }} > 
            <Image
                style={ styles.image }
                source={{uri: movie.poster  }}
            />
        </View>
    </Pressable>    
  )
}




//Creamos los estilos de nuestra imagen y del contenedor, para que funcione necesitamos pasar el widht y el height
const styles = StyleSheet.create({

    image:{
        flex:1,
        borderRadius: 18
    },
    imageContainer: {
        flex:1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
    }

})