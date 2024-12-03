import './css/footer.css';

const Footer = () => {
    return(
        <div>
            <footer className="footer text-center text-white">
                <div className="container pt-2">
                    <section className="mb-4">
                    
                    <a className="btn btn-outline-light btn-floating mt-1 mx-1" href="#!" role="button"
                        ><i className="fab fa-facebook-f"></i></a>
                    
                    <a className="btn btn-outline-light btn-floating mt-1 mx-1" href="#!" role="button"
                        ><i className="fab fa-twitter"></i></a>

                    
                    <a className="btn btn-outline-light btn-floating mt-1 mx-1" href="#!" role="button"
                        ><i className="fab fa-google"></i></a>

                    
                    <a className="btn btn-outline-light btn-floating mt-1 mx-1" href="#!" role="button"
                        ><i className="fab fa-instagram"></i></a>

                    
                    <a className="btn btn-outline-light btn-floating mt-1 mx-1" href="#!" role="button"
                        ><i className="fab fa-linkedin-in"></i></a>

                    
                    <a className="btn btn-outline-light btn-floating mt-1 mx-1" href="#!" role="button"
                        ><i className="fab fa-github"></i></a>
                    </section>
                </div>

                
                <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                    © 2023 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/"> UniRide Hub</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer;