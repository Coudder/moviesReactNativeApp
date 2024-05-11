# MOVIES APP CON REACTNATIVE

1. Iniciar proyecto con `npx react-native init moviesApp`

2. IMPORTANTE!!. Despues de que se creo e proyecto al echarlo andar me marcaba errores del `gradle` para corregirlo esta vez en la terminal entre a la carpeta de `android` Y ejcetute `./gradle clean` espere a que terminara el proceso y volvi a ejecutar la aplicacion y ya inicio correctamente

## CONFIGURACION DE PANTALLAS Y DIRECTORIOS

1. Configuracion de Directorios

        = [src]
            -[config]
                -[helpers]
                -[adapters]
            - [core] 
            - [infrastructure]   
            - [presentation]
                -[components]
                -[hooks]
                -[navigations]
                -[screens]
                    -[details]
                    -[home]
                        - HomeScreen.tsx
                    -[details]
                        - DetailsScreen.tsx

2. Movemos `App.tsx` dentro de la carpeta `src` y arreglamos las importaciones en `index.js`

## NAVEGACION ENTRE PANTALLAS

1. Documentacion oficial:  <https://reactnavigation.org/>

2. Instalamos `npm install @react-navigation/native`

3. Instalamos `npm install react-native-screens react-native-safe-area-context`

4. En `MainActivity.kt` agregamos el codigo de la documentacion y `import android.os.Bundle` abajo del package

5. En nuestro `App.tsx` envolvemos la aplicacion con `<NavigationContainer>`

6. Configuramos el `StackNavigation tmb de la documentacion` todooo

7. Creamos en la carpeta `navigation` y dentro `Navigation.tsx` y lo cofiguramos con en la documentacion

8. En nestro `App.jsx` Dentro del `NavigationContainer` metemos nuestro `Navigation`

NOTA.- Tuve que volver crear la aplicacion ya que sin querer en la otra instale cosas que no se necesitaban y me dio errores que no pude solucionar, hay que poner mucha atencion al momento de configurar la navegacion,

## OBTENER PELICULAS DE THEMOVIEDB

1. Dcoumentacion <https://www.themoviedb.org/>

2. Nos registramos y obtenemos la `apikey`

3. Creamos nuestro `.env` y ahi ponemos nuestro apikey

4. En Postman obtenemos las peliculas `https://api.themoviedb.org/3/movie/now_playing?api_key=64034a0888c79818cf2ffd3f89bdb041&language=es` a la cual le pasamos nuestr apikey, y el lenguage.

## PATRON ADAPTADOR HTTPADAPTER

1. Dentro de la carpeta `config > adapters` cremaos la carpeta `http` y dentro el archivo `http.adapter.ts`

2. El objetivo del Patron adaptador  por ejemplo para hacer peticiones http hay muchas maneras del lado de javascript tenemos `fetch, axios y mas`, esto se hace para evita que nuestro codigo se vea afectado cuando una libreria cambie.

3. En nuestro archvio creado creamos la clase `export abstract class HttAdapter {}`, abstracta porque n=o queremos crear instancias de esta clase, es decir solo definiremos las reglas de los metodos y propiedades de las clases que extiendan de  nuestro adaptador, en un ejemplo mas fisico es como cuando `TENEMOS  UN ADAPTADOR DE CORRIENTE Y NOS VAMOS A EUROPA, NECESITAMOS UN ADAPTADOR EUROPEO PARA PODERLO USAR`

4. Dentro de la clase creamos definimos el metodo `get` que recibira la url y las opciones como propiedades

5. Instalamos axios `npm i axios`

6. Dentro de la carpta `http` creamos `axios.adapter.ts` el cual sera una clase que usara nuestro `httpAdapter`

7. Aqui adaptamos Axios a nuestro httAdapter  y dentro del metodo get a implementar  adaptamos axios

## CASO DE USO - NOW PLAYING

1. Dentro de la carpeta core creamos `use-cases > movies > now-playing.usec-case.ts` que sera el caso de uso de las peliculas en cartelera

2. En ese caso de uso creamos una funcion para obtener las pelioculas, recibibiomos el fetcher que sera del tipo de nuestra clase HTTPadapet que contiene losm metods get

3. Copiamos la respuesta de postman y dentro de `infrastructure` creamos `interfaces` y dentro `movie-db.response.ts` la cual con `PasteAsJson` creamos la response `NowPlayingResponse`

4. Tambien dentro de la carpeta core creamos la carpetas `entities` que contendra nuestras entidades en este caso la de `movie.entity.ts` la cual se basara en nuestro modelo de pelicula, los datos que nostros queremos usar que viene siendo como esta en la base de datos.

5. Ahora en nuestro caso de uso la respuesta que retornara sera una promesa de tipo `Movie[]`

## CUSTOM HOOK USE MOVIES

1. Creamos dentro de la carpeta de `Hooks` el archivo `useMovie.tsx`

2. Creamos dos `useState` uno para `nowPlaying` y otro para `isLoading`

3. Creamos una funcion  para la carga inicial `initialLoad` la cual se encargar de ejecutar nuestro caso de uso y como nuestro caso de uso nos pide un fecther entonces

4. Creamos dentro de la carpeta `http` el adaptador para `MovieDb` `movieDB.adapter.ts` la cual creara una fetcher con nueestro `AxiosAdapter` donde la `baseUrl:` y le pasamos los `params`

5. Esta funcion de `initialLoad` la llamaremos dentro de un `ùseEffect` que no tendra ninguna dependencia

6. Ahora en nuestro `HomeScreen` probaremos para mostrar por consola si todo esta bien  llamamos nuestro `useMovies` y checamos en consola, tuve que reiniciar la aplicacion para que tome los cambios de `axios`

## PATRON MAPPER MOVIEMAPPER

1. Se trata de mapear los valores que vienen de la respuesta a nuestra entidad que nosotros manejamos

2. Dentro de la carpeta `infrastructure` creamos la carpetas `mappers` y dentro el archivo `movie.mapper.ts`

3. Dentro del archivo creamos una clase llamada `MovieMapper` que contendra una funcion statica `static fromMovieDBResultToEntity(  result:Result ):Movie{}` el tipo Result viene de nuestra moviedbResponse.

4. Retornamos un objeto que de las propiedades de la respuesta Result se adapte a nuestra entidad Movie id: result.id etc

5. Ahora nuestro caso de uso pasamos por el mapper los resultados de la peticion.

## TAREA CASOS DE USOS RESTANTES

1. Veamos si lo podemos hacer caso de uso para `/upcoming : moviesUpcomingUseCase`, `/top_rated :movieTopRatedUseCase`, `popular : moviesPopularUseCase`

2. Si me salio solo que el ra respuesta de respoonse el lo hizo en la misma respuesta ojoooooo

## SECCION 11 - DISEÑO

## CARRUSEL DE POSTERS

1. En la pantalla de `HomeScreen` usamos el `ScrollView`

2. Obtenemos el top del cel con el `useSafeAreaInets su prop top`

3. Hacemos uso de nuestro hook `useMovies` para obtener el `loading` y el `nowPlaying`

4. Creamos un nuevo componente para nuestro Carrusel, dentro de componjentes `PosterCarousel.tsx`

5. Importamos el Carrusel a nuestro `HomeScreen`

6. Empezamos a trabajar en el `PosterCarousel.tsx` una recomendacion es instalar `npm i react-native-reanimated-carousel`

7. En este caso lo trabajaremos manualmente sin instalar dependencias ya que nos comenta que la dependencia anterior da muchos problemas con el reanimated y si ya lo comprobe jeje

8. En `PosterCorusel.tsx` creamos las props que esperamos en el componente  y empezamos a desarrollar toda su logica

9. Creamos otro componente que tendra el diseño de como queremos el Poster `MoviePoster.tsx` el cual importaremos en nuestro `PosterCarousel.tsx` al momemnto de iterar nuestras movies

## TERMINAR CARRUSEL Y SU NAVEGACION

1. Siguiendo trabajando ene l componente de `MoviePoster`, envolvemos el `View` en un `Pressable`

2. Añadimos estilos al pressable para que se vea mas bonito y listo.

## CARRUSEL DE PELICULAS CON FLATLIST

1. Primero aprendimos a crear snippet para agilizar mas al momento de crear pantallas o componentes en react native para esto instalamos `easy snippet` despues seleccionamos un componente de reac nativ y buscamos add snippet from selection y le damos el nombre, en este caso `rn-component` enter  y envolvemos entre llaves el nombre del componente  ${1:nombreComponente}.

2. Creamos un nuevo comnponente `HorizontalCarousel.tsx` que este contendra las peliculas populares

3. Definimos las Props donde recibiremos las movies y el tite opcional

4. Dentro del `View` ponemos el `style` y si viene el `title` manejamos un `<Text>` con su estilo personalizado para cuando si venga el titulo

5. Despues implementmaose lel `<FlatList>` que este lo usamos para renderizar elementos de forma dinamica el cual nos pide `data` que en este casos serian las `movies`, tambien nos pide el `renderItem` que aqui es el componente que renderizaremos, en la funcion desestrucuramos el `item` que sera la movie, y dentro renderizamos nuestrom componente de `MoviePoster` que nos pide la movie que es el item y le pasamos las medidas que necesitamos.

6. Hacemos lo mismo con `topRated, upcoming` que ya solo seria cambiar el titulo ya que usaremos el mismo componente de de `HorizontalCarousel.tsx`

## INFINITE SCROLL HORIZONTAL

1. Implementaremos en el `HorizontalCarousel.tsx` para poderlo implementar necesitamos saber  casic uando el scroll llegue al final para poder disparar la peticion de las siguientes peliculas.

2. Al `FlatList` le agregamos la propiedad de `onScroll` 

3. Creamos una funcion `onScroll` que el tipado lo sacamos de ver la informacion del evento del `onScroll`

4. Agregamos a nuestras props `loadNEsxtPage` que es una funcion

5. Dentro de nuestra funcion `onScroll` obtenemos las propiedades para poder saber cuando llegamos al final  del scroll , esto lo obtenemmos del `event.nativeEvent` y hacemos lo necesario para saber cuando llegamos al final de las peliculas para lanzar la aplicacion de `loadNextPage`

6. Terminamos la logica para que no se dispare muchas veces la funcion

## ININITE SCROLL PARTE 2

1. En nuestro hook de `useMovies` creamos un metodo que se llama `popularNextPage` y tmb crearemos antes de nuestro hook una variable con la pagina inicial `let popularPage = 1`

2. Ahora en nuestra funcion antes mencionada incrementamos la pagina `popularPage++` y tmb cargamos las peliculas con `const popularMovies = await Usecases.moviesPopularUseCase(movieDBFetcher)` , solo nos falta mandar la siguiente pagina

3. Para poder mandar la siguiente pagina nos vamos al caso de uso y creamos una interface `interrface Options{page?:number; limit?:number}`

4. Estas opciones se las pasamos al fetcher que ya esta listo para recibier las opciones.

5. Ahora de nuevo en nuestro hook `useMovies` pasamos las opciones la pagina 

6. Por ultimo actualizamos el estado del `setPopula` obteniendo las peliculas previas y esparciendo las siguientes peliculas populares

7. Ahora ennuestro `HomeScreen` desestructuramos la funcion `popularNextPage`

8. No se pudo corregir el erro de llaves duplicadas!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

## INFORMACION DE PELICULAS POR ID

1. En nuestro `ScreenDetails` creamos `interface Props extends StackScreenProps<RootStackParams, 'Details'>{};` de la cual desestructuramos el `route` y para obtener el id de los paramoetros  `const { movieId } = route.params`

2. Creamos otro hook `useMovie.tsx` que sera parecido al que ya habiamos creado

3. A nuestra entidad extendemos el `FullMovie` que son datos que viene cuando nos manda una sola pleicula la petricon por el id

## GET MOVIE - CASO DE USO

1. Dentro de l carpeta de caso de uso creamos la carpeta `movie` y dentro `get-by-id.use-case.ts`

2. Creamos  `getMovieByIdUseCase` , primero hacemos el fetcher, creamos la response con postman al obtener una movie solamente

3. Creamos la interface que es la respuesta de arriba antes mencionada

4. Creamos el mapper `static fromMovieDBToEntity(movie:MovieDBMovie)`

5. Terminamos el caso de uso implementanto el fetche, el mapeo y retornando la fullmovie

6. Ahora en nuestro hook `useMovie` creamos dos `useState` uno para guardar cuando este cargando y otro para el estado de la movie

7. en la funcion `loadMovie` hacemos uso de nuestro caso de uso pasandole el fetcher y el movieId

8. Actualiozamos el `setMovie` y el `setLoading(false)`

## PANTALLA DE DETALLES - HEADER

1. Hacemo uso de nuestro hook `useMovie` para obtener la movie y el isLoading

2. Creamos un nuevo componente dentro de la carpeta de componentes creamos la carpetra `movie` y dentro el componente que se llama`MovieHeader.tsx`

3. Creamos con el snipet `rn-component` con nombre `MovieHeader`

4. Creamoslas props que necesitaremos que solo sera `poster, originalTitle, title`

5. obtenemos las props en nuestro componente.

6. Haacemos uso del hook `useWindowDimension` para obtener el hegihgt de la pantalla y pode obtener el 70 % de la pantalla del celular

7. Tmb hacemos uso del hook `navigation` para poder hacer uso de la navegacion y salir de esta pantalla

8. Creamos los estilos para este componente y hacemos el dise;o

9. LLamamos este componente en la pagina de `DetailsScreen` pasandole las props que nos pide las cuales vienen de m nuestra `movie` que viene del `useMovie`

## DETALLES DE LA PELICULA

1. Creamos un nuevo componente `MovieDetails.tsx` el cual pedira en las props la movie:FullMovie

2. Creamos el estilo de los detalles pasandole los dattos de la movie.

3. Creamos un helper llamado `formatter.ts` este para poder convertir el presupuesto a una cantidad leible

## ESTRUCTURA DE DATOS PARA LOS ACTORES

1. Creamos un nuevo caso de uso para obtener los actores, `get-cast.use-case.ts` el cual pedira el fetcher y el movieId

2. Creamos nuestra interface con ayuda de la peticon de postman para obtener le Cast creamos la `MovieDbCastResponse`

3. Creamos nuestra entidad que son los datos que nosotrso solo necesitaremos `cast.entity.ts`

4. Creamos nuestro mapper  (se hace un mapper x entidad creada) `cast.mapper.ts`

5. LLamamos el caso de uso en el hook y establecemos el estado con el `useState` para el Cast

## NMOSTRAR ACTORES EN PANTALLA

1. DEntro del componente  `MovieDetails` agregamos las props de cast:CAst[]

2. Dentro de un `FlatList` mostramos la informacion de los actores pero para renderizar creamos un nuevo componente que se encargara del diseño de los actores

3. Dentro de componentes creamos una nueva carptea `cast` y dentro `CastActor.tsx` y diseñamos el componente para como lucira el diseño de la informacion del actor

4. LLamamos este componente en `MovieDetails` y listo

## VARIABLES DE ENTORNO

1. instalamos la dependencia <https://www.npmjs.com/package/react-native-dotenv> npm install -D react-native-dotenv

2. en `babel.config.js` pegamos :  ['module:react-native-dotenv'] y agregamos las configuraciones

3. Creamos en el root de la aplicacion la carpeta `types` y dentro el archivo `env.d.ts` y pegamos el codigo

        declare module '@env' {
                export const API_BASE: string;
                }

        cambioamos API_BASE POR  THE_MOVIEDBA_KEY

4. Cancelamos la aplicacion y la volvemos a echar andar , si no funciona tenemos que reiniciar la computadora

5. No funciono reiniciando la PC funciono limpiando el CACHE:`npm start -- --reset-cache`

## FULLSCREEN LOADER

1. Creamos una nuevas carpeta dentro de `components` llamada `loaders` y dentro `FullScreenLoader.tsx`

2. Configuramos el loader y lo llavamos en donde usamos el `isLoading`

FIN!!!!!