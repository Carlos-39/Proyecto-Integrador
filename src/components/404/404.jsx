import './404.css'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return(
        <>
            <Header />
            <div className="page-404">
                <h1 className="title">Esta ruta no fue encontrada</h1>
                <p className="message">Parece que esta página no existe.</p>
                <button className="back-button" onClick={goHome}>
                    Volver al inicio
                </button>
            </div>
        </>  
    )
}

export default Page404