import "../inicio/inicio.css"
import logo from "../../assets/images/logo.png"
import texto from "../../assets/images/text.svg"
import tutorial from "../../assets/images/imagen.png"

export default function pagina()
{
    return (  
    <div id="Inicio">
        <main>
            <section id="Introduccion">
                <div id="logo">
                    <img src={ logo } style={{width:"30%"}}/>
                    <img src={texto} style={{width:"70%"}}/>
                </div>
                <div id="content">
                    <h1>Bienvenido a BlueSphere Studios</h1>
                    <p>Explora los desafíos más críticos que enfrenta el planeta en relación con el agua. Aprende sobre la contaminación,
                        la escasez y la acidificación de los océanos a través de experiencias inmersivas en 3D. 
                        Nuestro objetivo es educar de manera interactiva ydivertida para que puedas entender mejor estos problemas ambientales y
                         cómo puedes ayudar a solucionarlos.</p>
                    <div id="Tutorial">
                        <div>
                            <img src={tutorial}/>
                            <div>Tutorial</div>
                        </div>
                        <div style={{width: "75%"}}>
                        <p>Este tutorial te guiará a través de los principales problemas ambientales que enfrentan
                             nuestros océanos y cuerpos de agua. Aquí aprenderás de manera interactiva sobre la contaminación,
                              la escasez de agua, y la acidificación de los océanos</p>
                        <b>¿Cómo Funciona?</b>
                        <ol>
                            <li>
                                <b>Explora las Secciones</b>
                                <p>A través de gráficos 3D inmersivos, 
                                    podrás visualizar los impactos de estos problemas en tiempo real. 
                                    Usa el menú para navegar entre los distintos temas:</p>
                                <ul>
                                    <li>
                                        Contaminación del Agua: Aprende sobre las fuentes de contaminación y 
                                        sus efectos en la vida marina.
                                    </li>
                                    <li>
                                        Escasez de Agua: Descubre cómo el cambio climático y la sobreexplotación 
                                        están afectando el acceso al agua dulce.
                                    </li>
                                    <li>
                                        Acidificación de los Océanos: Entiende cómo el CO₂ está alterando el 
                                        equilibrio de los ecosistemas marinos.
                                    </li>
                                </ul>
                            </li>
                            <br/>
                            <li>
                                <b>Interactúa con los Elementos 3D</b>
                                <p>Cada sección incluye elementos visuales 3D que puedes manipular para 
                                    observar los efectos de estos problemas en diferentes escenarios. Haz clic 
                                    y arrastra los gráficos para explorarlos desde distintos ángulos.</p>
                            </li>
                            <br/>
                            <li>
                                <b>Participa en los Quizzes</b>
                                <p>Después de explorar cada tema, pondremos a prueba lo que has aprendido
                                     con un quiz interactivo. Gana trofeos a medida que completas cada sección.</p>
                            </li>
                            <br/>
                            <li>
                                <b>Gana Trofeos y Comparte tus Logros</b>
                                <p>Por cada quiz completado con éxito, recibirás un trofeo que aparecerá en tu 
                                    colección personal. ¡Sigue aprendiendo y comparte tus logros con otros!</p>
                            </li>
                        </ol>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>)
}