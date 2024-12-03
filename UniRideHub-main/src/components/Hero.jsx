import './css/hero.css';
import { useNavigate, Link } from 'react-router-dom';

const Hero = (props) => {
    const {
        title,
        subtitle,
        link,
        nav
    } = props;

    return (
        <div className="jumbotron shadow mb-5 rounded" style={{ backgroundColor: '#8c8c8c', padding: '20px', borderRadius: '10px' }}>
            <h1 className="display-4" style={{ color: 'white' }}>{title}</h1>
            <p className="lead" style={{ color: 'white' }}>{subtitle}</p>
            <hr className="my-4" style={{ borderColor: 'white' }} />
            <div className="lead buttons-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
                <Link
                    to={nav}
                    className="btn btn-main hero-btn hover-btn"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#FFB703',
                        color: 'white',
                        borderRadius: '5px',
                        width: '45%'  // Adjusts the width to fit both buttons on one line
                    }}
                >
                    {link}
                </Link>

                {props.extraLink &&
                    <Link
                        to={props.extranav}
                        className="btn btn-primary hero-btn hover-btn"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#FFB703',  
                            color: 'white',
                            borderRadius: '5px',
                            width: '45%'  // Same width as the first button
                        }}
                    >
                        {props.extraLink}
                    </Link>
                }
            </div>
        </div>
    );
}

export default Hero;
