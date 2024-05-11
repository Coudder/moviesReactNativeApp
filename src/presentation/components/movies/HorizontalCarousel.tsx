import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { FlatList } from 'react-native-gesture-handler';
import { MoviePoster } from './MoviePoster';
import { useEffect, useRef } from 'react';


//Definomos nuestras props que recibiremos
interface Props {
    movies:Movie[];
    title?:string;

    loadNextPage?: ()=>void
}


export const HorizontalCarousel = ( { movies, title, loadNextPage }: Props ) => {


    //usamos el useRef para determinar cuando estamos cargando para no disparar muichas veces
    const isLoading = useRef(false); //!SI QUEREMOS PONER UN SPINNER NECESITAMOS USAR UN USESTATE ya que el ref no dispara rerenders

    //mediante un useEffect  determinamos  para regresar a su estado normal el isloading
    useEffect(() => {
        //200milesimas de segundo antes de cambiar el estado para que se note
        setTimeout(() => {
            isLoading.current = false;
        }, 200);
    }, [movies]) //cuando las movies cambien se lanza se vuelve a llamar hasta que las peliculas cambien
    

    //implementar infite scroll lo sacamos del event del flatlist onScroll el tipado
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {


        //Antes de hacer todos los calculos
        //si esta en true return para no seguir ejecutando
        if(isLoading.current) return;

        //obtenemos las propiedades de las medidas para medir el final
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        // console.log({contentOffset, layoutMeasurement, contentInset});
        
        //Verificar cuando llegamos al final 
        //En este caso es x porque es horizontal si queremos que sea vertical es y
        const isEndReached =  ( contentOffset.x + layoutMeasurement.width + 600 ) >= contentSize.width
                                                    //sumamos 600 px de gracia si todo es mayor o igual wl idth quiee decir que llegamos al final
    
        //Si no hemos llegado al final no hacemos nada                                            
        if(!isEndReached) return;


        //Tan pronto Sabemos que vamos a cargar
        isLoading.current = true;

        //Si llegamos al final cargamos las  siguientes peliculas
        //Si tenemos el loadnextpage hacemos el llamado de la funcion osea si tiene un valor ejecuta 
        loadNextPage && loadNextPage();


    }

  return (
    <View
       style={{ height: title ? 260 : 220  }} //si tiene e titulo 260 si no 220
    >
        {
            title && (
                <Text
                   style={{
                    fontSize:30,
                    fontWeight:'300',
                    marginLeft: 10,
                    marginBottom:10,
                   }} 
                >
                    {title}
                </Text>
            )
        }

        {/* FLAT LIST  PARA RENDERIZAR ELEMENTOS DE MANERA DINAMICA*/}
        <FlatList
            data={movies} //la data son las movies
            renderItem={ ( {item} )=>(  //renderizamos un componente en este caso nuestro Poster y le pasamoes el item
                <MoviePoster movie={item} width={140} height={200} />
             ) }
             keyExtractor={ (item) => item.id.toString() } //la llave que siempre nos pide
             horizontal={true} // es lo mismo que dejar solo horizontal
             showsHorizontalScrollIndicator={false } //quita la barrita indicadora de abjao
             onScroll={ (event)=> onScroll(event) } //vemos el tiopado que recibe el event para poder tiparlo podemo enviar solo onScroll
        />

       
    </View>
  )
}
