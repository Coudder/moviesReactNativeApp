import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapter";



interface Options {
    baseUrl:string,
    params: Record<string,string>;
}


//Creamos la clase AxiosAdapter que implementa nuestro HttpAdapter
export class AxiosAdapter implements HttpAdapter {
    
    //Creamos una instancia de axios para pasarle las opciones
   private axiosInstance:AxiosInstance;
   
   constructor(options:Options){
        //Creamos la instancia y a axios le pasamos las opciones
        this.axiosInstance = axios.create({
            baseURL: options.baseUrl,
            params: options.params,
        })
   }
    
   async get<T>(url: string, options?: Record<string, unknown> | undefined): Promise<T> {
       
        try {
            //Obtenemos la response con axios //axios.get
            const { data } = await this.axiosInstance.get<T>(url, options);

            //retornamos la data
            return data;

        } catch (error) {
            console.log(error);
            throw new Error(`Error fetching get : ${url}`);   
        }
    }


}