export interface MovieResponse {
    dates:         Dates;
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Dates {
    maximum: Date;
    minimum: Date;
}

export interface Result {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

//Fernando puso este caso de uso en el otro response y solo dejo lo que necsitaba 

//Creamos esta interface de la respuesta al obtener una [pelicula]

export interface MovieDBMovie {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: null;
    budget:                number;
    genres:                Genre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    origin_country:        string[];
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           string;
    production_companies:  ProductionCompany[];
    production_countries:  ProductionCountry[];
    release_date:          Date;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface ProductionCompany {
    id:             number;
    logo_path:      null | string;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}


export interface MovieDBCastResponse {
    id:   number;
    cast: MovieDbCast[];
    crew: MovieDbCast[];
}

export interface MovieDbCast {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for_department: string;
    name:                 string;
    original_name:        string;
    popularity:           number;
    profile_path:         null | string;
    cast_id?:             number;
    character?:           string;
    credit_id:            string;
    order?:               number;
    department?:          string;
    job?:                 string;
}