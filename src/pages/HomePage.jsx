import HomeHero from "../components/HomePageComponents/HomeHero"
import MapComponent from "../components/HomePageComponents/MapComponent";
import Questions from "../components/HomePageComponents/Questions/Questions";
import TopDoctors from "../components/HomePageComponents/TopDoctors";
import style from './HomePage.module.css'
function HomePage() {
    return (
        <>
            <HomeHero />
            <Questions />
            <TopDoctors />
            <MapComponent />
        </>
    )
}

export default HomePage;