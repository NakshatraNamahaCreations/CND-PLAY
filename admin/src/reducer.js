
// import {
//     FileUploadReducer, 
// } from "./project/reducer/fileuploadreducer";

import {
    ContentsReducer, 
} from "./contents/reducer/contentsreducer";

import {
    IndieMovieReducer, 
} from "./contents/reducer/indiemoviereducer";

import {
    DistrictsReducer, 
} from "./general/reducer/districtsreducer";

import {
    GenresReducer, 
} from "./general/reducer/genresreducer";

import {
    UpcomingReducer, 
} from "./contents/reducer/upcomingreducer";

import {
    TrendingReducer, 
} from "./contents/reducer/trendingreducer";

// import {
//     EpisodesReducer, 
// } from "./project/reducer/episodesreducer";
// import {
//     VideosReducer, 
// } from "./project/reducer/videosreducer";


// import {
//     PagesReducer, 
// } from "./pages/reducer/pagesreducer";
// import {
//     SectionReducer, 
// } from "./pages/reducer/sectionreducer";
// import {
//     BannerReducer, 
// } from "./pages/reducer/bannerreducer";
// import {
//     ContentReducer, 
// } from "./pages/reducer/contentreducer";


import {
    BasicSettingsReducer, 
} from "./settings/reducer/basicsettingsreducer";


import {
    LoginReducer, 
} from "./login/reducer/loginreducer";


import {
    RegisterReducer, 
} from "./register/reducer/registerreducer";


import {
    PaymentCredentialSetupReducer, 
} from "./settings/reducer/paymentcredentialsetupreducer";




import {combineReducers} from "redux";


const rootReducer = combineReducers({
    // PagesReducer: PagesReducer, 
    // SectionReducer: SectionReducer, 
    // BannerReducer: BannerReducer, 
    // ContentReducer: ContentReducer, 

    ContentsReducer: ContentsReducer, 
    IndieMovieReducer: IndieMovieReducer, 

    DistrictsReducer: DistrictsReducer, 
    GenresReducer: GenresReducer, 
    // EpisodesReducer: EpisodesReducer, 
    // VideosReducer: VideosReducer, 

    // FileUploadReducer: FileUploadReducer, 


    BasicSettingsReducer: BasicSettingsReducer, 


    LoginReducer: LoginReducer, 
    RegisterReducer: RegisterReducer, 

    TrendingReducer: TrendingReducer, 
    UpcomingReducer: UpcomingReducer, 


    PaymentCredentialSetupReducer: PaymentCredentialSetupReducer, 
});

export default rootReducer;
