

export abstract class HttpAdapter {
 

    //Definimos el metodo get  que tecibe el url y las opciones  y nos retorna una promesa de tipo T  
    abstract get<T>(url:string, options?:Record<string, unknown>):Promise<T>;

}




/*
El tipo record es 
{
 'llave': valor
}

*/