import Navbar from "./Navbar";
import bgHeaderImg from '../assets/car.png'

const Header = (props) => {

    return (
        <>
            <Navbar />
            <div className="d-flex align-items-center justify-content-center w-100">
                <img src={bgHeaderImg} alt="Carpool Background" className="img-fluid" />
            </div>
        </>
    )
}

export default Header;