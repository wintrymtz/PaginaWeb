<?php 
$css = getFile('/comprarCurso', 'css');
include('partials/head.php');
include('partials/nav.php');
 ?>
    <div class="container">
        <!-- Menú lateral con los niveles del curso -->
        <aside class="sidebar">
            <h2 class="course-title">Título del Curso</h2>
            <ul class="course-menu">
                <li><a href="#" class="active"> Nivel 1: Introducción <label>$10</label> <input type="checkbox"></a>
                </li>
                <li><a href="#">Nivel 2: Conceptos Básicos <label>$20</label> <input type="checkbox"></a></li>
                <li><a href="#">Nivel 3: Aplicaciones <label>$20</label> <input type="checkbox"></a></li>
                <li><a href="#">Nivel 4: Avanzado <label>$30</label> <input type="checkbox"></a></li>
                <li><a href="#">Nivel 5: Conclusión <label>$50</label> <input type="checkbox"></a></li>
            </ul>
        </aside>

        <!-- Contenido principal del curso -->
        <main class="main-content">
            <!-- Video o imagen del curso -->
            <div class="course-video">
                <img src="img/FrontEnd.jpg" alt="Imagen del Curso" class="course-image">
            </div>

            <!-- Descripción general del curso -->
            <div class="course-description">
                <p>DESCRIPCION.</p>
                <p>Costo del curso completo: <strong>$450.00</strong></p>
                <p>Calificación general: ★★★★☆ (4.5/5)</p>
            </div>

            <!-- Comentarios de los usuarios -->
            <div class="user-comments">
                <h3>Comentarios de los usuarios:</h3>
                <ul>
                    <li name="comentario"><label>Usuario1: "Curso muy completo y bien explicado."</label><label
                            class="fecha">10-sep-2012
                            12:35</label>
                    </li>
                    <li name="comentario"><label>Usuario2: "Me gustó mucho la sección de [tema
                            específico]."</label><label class="fecha">10-sep-2012
                            12:35</label></li>
                    <li name="comentario"><i>Mensaje Eliminado por un Administrador</i></li>

                </ul>
            </div>

            <!-- Botones para compra o acceso -->
            <div class="course-actions">
                <button class="buy-button" onclick="buyCourse()">Comprar Curso Completo</button>
                <!-- Botón para niveles individuales con hover -->
                <div class="dropdown">
                    <button class="buy-level-button" onclick="buyCourse()">Comprar Niveles Individuales</button>
                    <div class="dropdown-content">
                        <ul>
                            <li>Nivel 1: Introducción - $10</li>
                            <li>Nivel 2: Conceptos Básicos - $20</li>
                            <li>Nivel 3: Aplicaciones - $20</li>
                            <li>Nivel 4: Avanzado - $30</li>
                        </ul>
                    </div>
                </div>
                <button class="eliminate-button" onclick="eliminarCurso()">DAR DE BAJA</button>

                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
            </div>
        </main>
    </div>

    <script src="<?=getFile('/comprarCurso','js')?>"></script>
</body>

</html>