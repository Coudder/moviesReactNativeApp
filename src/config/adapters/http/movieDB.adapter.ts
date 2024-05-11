import { THE_MOVIEDBA_KEY } from "@env";
import { AxiosAdapter } from "./axios.adapter";



//Creamos el Fetcher para movidebb coon nuestro adaptador de Axios
export const movieDBFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
        // api_key: '64034a0888c79818cf2ffd3f89bdb041',
        api_key: THE_MOVIEDBA_KEY ?? 'no-key',
        language: 'es'
    }
})