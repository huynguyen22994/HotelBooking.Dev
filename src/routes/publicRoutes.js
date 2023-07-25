import HomePage from '../pages/Home/Home'
import HotelDetail from '../pages/HotelDetail/HotelDetail'

import LandingPage from "../views/examples/LandingPage.js";
import RegisterPage from "../views/examples/RegisterPage.js";
import ProfilePage from "../views/examples/ProfilePage.js";
import Comopents from "../views/examples/Components.js"

const PublicRoutes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/hotel',
        component: HotelDetail
    },
    {
        path: '/components',
        component: Comopents,
        layout: null
    },
    {
        path: '/landing-page',
        component: LandingPage
    },
    {
        path: '/register-page',
        component: RegisterPage
    },
    {
        path: '/profile-page',
        component: ProfilePage
    }
]

export default PublicRoutes;