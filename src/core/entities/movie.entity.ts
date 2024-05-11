
//Como lucira nuestro objeto de pelicula esto ya lo habiuamos visto es como es en nuestra base de datos

export interface Movie {

    //lo que realmente usamos para trabajar
    id:number;
    title:string;
    description:string;
    releaseDate:Date;
    rating:number;
    poster:string;
    backdrop:string;

}

//temnemos la intefrace anterior solo la extendemos
export interface FullMovie extends Movie {
    genres: string[];
    duration:number;
    budget:number;
    originalTitle:string;
    productionCompanies: string[]
}


