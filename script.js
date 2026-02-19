document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    chatMessages.innerHTML = `
        <div class="chat-msg bot">
            <p>¡Hola! Soy el asistente virtual de Manuel.</p>
            <p>Conozco bastante bien su experiencia técnica, en qué proyectos se ensucia las manos y su forma de trabajar con equipos. ¿Qué necesitas saber sobre su perfil?</p>
        </div>
    `;

    setTimeout(() => {
        if (chatWindow.style.display === 'none') {
            chatWindow.style.display = 'flex';
            chatToggle.style.display = 'none';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }, 2000);

    chatToggle.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
        chatToggle.style.display = 'none';
        chatInput.focus();
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
        chatToggle.style.display = 'flex';
    });

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender);
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = chatInput.value.trim();
        if (!userText) return;

        addMessage(userText, 'user');
        chatInput.value = '';

        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('chat-typing');
        typingIndicator.textContent = '> Procesando...';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            chatMessages.removeChild(typingIndicator);
            const response = getBotResponse(userText.toLowerCase());
            addMessage(response, 'bot');
        }, 600 + Math.random() * 500);
    });

    function getBotResponse(input) {
        const i = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        // 1. Saludos iniciales
        if (/\b(hola|buenas|buenos|dia|tarde)\b/.test(i)) {
            return "¡Buenas! Aquí estoy. Dime, ¿qué necesitas ver sobre su manera de trabajar, sus estudios o sus proyectos técnicos?";
        }

        // 2. Despedidas / Agradecimientos
        if (/\b(gracias|vale|bien|perfecto|adios)\b/.test(i)) {
            return "¡Genial! Tienes sus datos de contacto en la web (LinkedIn o manuellezamap@gmail.com) por si quieres hablar un rato con él directamente.";
        }

        // 3. Sputnik
        if (i.includes('sputnik') || i.includes('300')) {
            return "Sputnik es un programa intensivo sobre tecnologías exponenciales y creación de empresas donde entró seleccionado entre miles de candidatos. Ahí se empapó bastante de la cultura de montar proyectos ágiles y viables aportando desde el día 1.";
        }

        // 4. Idiomas
        if (i.includes('idioma') || i.includes('ingle') || i.includes('frances') || i.includes('bilingue')) {
            return "El inglés lo tiene liquidado: certificación C2 (Proficiency). Aparte, tiene un B1 en francés y anda aprendiendo italiano en su estancia en Milán. Se mueve bien en manuales técnicos o software en otro idioma.";
        }

        // 5. Herramientas, Stack y Programación pura
        if (i.includes('programa') || i.includes('software') || i.includes('herramienta') || i.includes('stack') || i.includes('codigo') || i.includes('c++') || i.includes('matlab') || i.includes('python')) {
            return "En la carrera tira muchísimo de MATLAB y C++ para programación de sistemas de control industrial y robótica. Aún así, si un proyecto requiere levantar algo rápido en Python u otro lenguaje, se lee la documentación, se apoya en IA y lo monta sin problemas.";
        }

        // 6. Inteligencia Artificial / LLMs  (usando REGEX para evitar matching por error en "estud-ia")
        if (/\bia\b/.test(i) || i.includes('inteligencia artificial') || i.includes('agente') || /\bllm\b/.test(i) || i.includes('chatgpt') || i.includes('modelo') || /\bgpt\b/.test(i) || /\bai\b/.test(i)) {
            return "Usa la IA a diario de forma práctica para picar código más rápido y entender documentación compleja. Además, por su especialidad en automática, entiende de verdad la lógica matemática detrás de una red neuronal o arquitectura de agentes, no es solo un usuario que copia prompts.";
        }

        // 7. Liderazgo, Presión, C-Level
        if (i.includes('presion') || i.includes('lider') || i.includes('equipo') || i.includes('estres') || /\bceo\b/.test(i) || /\bcto\b/.test(i) || i.includes('rugby') || i.includes('soft skill') || i.includes('comunica')) {
            return "La presión la gestiona muy bien. Al final, ser capitán de un equipo de rugby senior significa mantener la calma y liderar a 30 personas físicamente agotadas los fines de semana. Trabajar mano a mano con fundadores exigentes no le intimida, al revés, le motiva.";
        }

        // 8. Actitud, Adaptación y Solucionar fracasos
        if (i.includes('resolutiv') || i.includes('actitud') || i.includes('adapt') || i.includes('cambio') || i.includes('fracas') || i.includes('error') || i.includes('agil')) {
            return "Es súper pragmático. Sabe que al construir cosas desde cero (startups, mvps) siempre hay errores. Su enfoque es no bloquearse, pivotar rápido y ver qué se puede arreglar. Tiene cabeza de ingeniero pero ritmo de alguien que quiere emprender.";
        }

        // 9. Mayores logros u orgullo
        if (i.includes('logro') || i.includes('exito') || i.includes('hito') || i.includes('orgullo') || i.includes('mejor')) {
            return "Académicamente, su 28/30 en Milán en Robótica Industrial es muy buen ejemplo de su capacidad técnica. A nivel práctico, programar que un dron reconozca caras e interaccione de forma autónoma usando visión por computadora fue un reto bastante duro que supo finiquitar.";
        }

        // 10. Movilidad / Localización
        if (i.includes('mudar') || i.includes('viaja') || i.includes('movilidad') || i.includes('ubicacion') || i.includes('donde') || i.includes('vivir')) {
            return "Ha vivido en Sevilla, Irlanda y ahora está terminando el Erasmus en Milán. El moverse o el entorno internacional es su zona de confort, aunque sabe que con foco y un buen portátil rinde de manera brutal desde cualquier sitio.";
        }

        // 11. Remoto, Teletrabajo, Flexibilidad
        if (i.includes('remoto') || i.includes('teletrabajo') || i.includes('horario') || i.includes('flexibilidad') || i.includes('disponibilidad') || i.includes('oficina') || i.includes('incorpor')) {
            return "Es autónomo organizándose. El teletrabajo asíncrono le funciona muy bien porque se mueve por objetivos claros: si sabe qué hay que entregar, se sienta y lo hace. Busca sumar valor rápidamente en su incorporación a un equipo de trabajo.";
        }

        // 12. Estudios / CV / Nota General
        if (i.includes('estudia') || i.includes('carrera') || i.includes('universidad') || i.includes('nota') || /\bgpa\b/.test(i) || i.includes('sevilla') || i.includes('milan') || i.includes('polimi') || i.includes('academico') || i.includes('robotica') || i.includes('cv') || i.includes('curriculum')) {
            return "Está rematando Ingeniería de Tecnologías Industriales (con la especialidad de Robótica) en la Universidad de Sevilla. Lleva un 7.3 de media ahora mismo, que es una nota sólida en ingeniería. Haciendo el cuarto año de movilidad en el Politécnico de Milán.";
        }

        // 13. Edad / Tiempo Libre / Qué es de su vida
        if (i.includes('edad') || i.includes('tiempo libre') || i.includes('hobby') || i.includes('deporte') || i.includes('maraton') || i.includes('aficion')) {
            return "Además de los estudios y el cacharreo tecnológico constante, le echa muchas horas al deporte. Juega al rugby a nivel competitivo y le gusta correr maratones. Eso es una clara muestra de aguante físico y control mental sostenido en el tiempo.";
        }

        // 14. Experiencia, YLIO, Drones y Proyectos de Construir
        if (i.includes('experiencia') || i.includes('proyecto') || i.includes('dron') || i.includes('ylio') || i.includes('startup') || i.includes('empresa') || i.includes('trabajo') || i.includes('construi')) {
            return "Ojo que es perfil junior, pero no se ha limitado a los libros. Construyó la navegación autónoma de un dron integrado con IA, y también voló y recogió datos térmicos reales en empresas como YLIO Sustainable Engineering. Sabe cómo desenvolverse pasando del paper a la vida real.";
        }

        // 15. Aportar / Por qué contratarle / El Valor / AURORA
        if (i.includes('contratar') || i.includes('perfil') || i.includes('busc') || i.includes('aurora') || i.includes('aportar') || i.includes('diferente') || i.includes('fuerte')) {
            return "Lo principal es que mezcla una base analítica pesada por la ingeniería, con la predisposición de aprender cualquier herramienta nueva al vuelo. Si a eso le sumas liderazgo demostrado, es un candidato que en vez de darte problemas, te va a escalar las soluciones.";
        }

        // 16. Fallback final / Respuesta Honesta y Natural
        return "Con ese detalle tan específico me pillas, no me ha programado respuesta para eso y me parece fatal inventarme un dato que desconozco. Si es importante, escríbele directo a manuellezamap@gmail.com o búscalo por LinkedIn. Se lo preguntas tú de primera mano.";
    }
});
