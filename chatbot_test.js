document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.querySelector('.chatbot-body');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatbotToggler = document.getElementById('chatbot-toggler');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbot = document.getElementById('close-chatbot');

    let welcomeMessageSent = false;
    let currentMenu = "main";
    let menuHistory = [];

    const mainMenu = `
        Por favor selecciona una opción:

        1. Citas Médicas.
        2. Ubicación y Horarios.
        3. Servicios y Especialidades.
        4. Otros servicios.
        5. Contacto.
        6. Hablar con un asesor.

        (Escribe 0 para volver a este menú en cualquier momento)`;

    const welcomeMessage = `
        Hola, soy MediBot GMA, el asistente virtual de GRUPO MEDICOS ASOCIADOS.

        ${mainMenu}`;

    function goToMenu(menuName) {
        menuHistory.push(currentMenu);
        currentMenu = menuName;
    }

    function formatMessage(text) {
        // Detectar URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        return text.replace(urlRegex, (url) => {
            return `<a href="${url}" target="_blank">${url}</a>`;
        });
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`, 'chatbot-message');
        messageDiv.innerHTML = formatMessage(text);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function goBack() {
        if (menuHistory.length === 0) {
            currentMenu = "main";
            return;
        }
        currentMenu = menuHistory.pop();
    }

    function getMenuMessage(menu) {

        if (menu === "main") {
            return mainMenu;
        }

        if (menu === "citas") {
            return `CITAS MÉDICAS:

            1. Agendar cita
            2. Cancelar o reprogramar
            3. Requisitos para la cita
            4. Solicitar factura electrónica

            9. Volver al menú anterior
            0. Volver al menú principal`;
        }

        if (menu === "ubicacion") {
            return `UBICACIÓN Y HORARIOS:

            1. Dirección
            2. Horario de atención

            9. Volver al menú anterior
            0. Volver al menú principal`;
        }

        if (menu === "otros") {
            return `OTROS SERVICIOS:

            1. Laboratorio clínico
            2. Imágenes diagnósticas
            3. Electrocardiograma, HOLTER y MAPA

            9. Volver al menú anterior
            0. Volver al menú principal`;
        }

        if (menu === "laboratorio") {
            return `LABORATORIO CLÍNICO:

            1. Horarios para toma de laboratorios
            2. Entrega de resultados

            9. Volver al menú anterior
            0. Volver al menú principal`;
        }

        if (menu === "imagenes") {
            return `IMÁGENES DIAGNÓSTICAS:

            1. Horarios para toma
            2. Entrega de resultados

            9. Volver al menú anterior
            0. Volver al menú principal`;
        }

        if (menu === "electro") {
            return `ELECTROCARDIOGRAMA, HOLTER Y MAPA:

            1. Horarios
            2. Entrega de resultados

            9. Volver al menú anterior
            0. Volver al menú principal`;
        }

        return mainMenu;
    }

    function getBotResponse(userMessage) {
        const cleanMessage = userMessage.toLowerCase().trim();

        // SALUDOS
        if (["hola", "buenas", "buenos dias", "buen día"].some(word => cleanMessage.includes(word))) {
            currentMenu = "main";
            return `¡Hola! 👋

            Soy MediBot GMA, tu asistente virtual.

            ${mainMenu}`;
        }

        // DESPEDIDAS
        if (["adios", "hasta luego", "nos vemos", "chao", "finalizar", "terminar"].some(word => cleanMessage.includes(word))) {
            return `👋 Gracias por comunicarte con Grupo Médicos Asociados.

            Ha sido un gusto ayudarte.`;
        }

        // AGRADECIMIENTO
        if (cleanMessage.includes("gracias")) {
            return `¡Con gusto! 😊

            Si necesitas algo más, aquí estaré para ayudarte.

            (Escribe 0 para volver al menú principal)`;
        }

        // VOLVER AL MENÚ PRINCIPAL
        if (
            cleanMessage === "0" ||
            cleanMessage === "menu" ||
            cleanMessage === "inicio"
        ) {
            currentMenu = "main";
            menuHistory = [];
            return mainMenu;
        }

        // VOLVER AL MENÚ ANTERIOR
        if (cleanMessage === "9" || cleanMessage === "volver") {
            goBack();
            return getMenuMessage(currentMenu);
        }

        /*
        =========================
        MENU PRINCIPAL
        =========================
        */

        if (currentMenu === "main") {

            if (cleanMessage === "1") {
                goToMenu("citas");
                return `CITAS MÉDICAS:

                1. Agendar cita
                2. Cancelar o reprogramar
                3. Requisitos para la cita
                4. Solicitar factura electrónica

                0. Volver al menú principal`;
            }

            if (cleanMessage === "2") {
                goToMenu("ubicacion");
                return `UBICACIÓN Y HORARIOS:

                1. Dirección
                2. Horario de atención

                0. Volver al menú principal`;
            }

            if (cleanMessage === "3") {
                return `SERVICIOS Y ESPECIALIDADES:

                - Medicina general
                - Pediatría
                - Ginecología y Obstetricia
                - Nutrición y dietética
                - Psicología
                - Enfermería
                - Hospitalización domiciliaria
                - Cardiología
                - Medicina Interna

                0. Volver al menú principal`;
            }

            if (cleanMessage === "4") {
                goToMenu("otros");
                return `OTROS SERVICIOS:

                1. Laboratorio clínico
                2. Imágenes diagnósticas
                3. Electrocardiograma, HOLTER y MAPA

                0. Volver al menú principal`;
            }

            if (cleanMessage === "5") {
                return `CONTACTO:

                Teléfono:
                3104099029 / 3202046646

                WhatsApp:
                +57 3104099029

                Correo:
                pqrs@grupomedicosasociados.com

                Formulario web:
                https://www.grupomedicosasociados.com/contacto.html

                0. Volver al menú principal`;
            }

            if (cleanMessage === "6") {
                return `Un asesor se pondrá en contacto contigo.

                https://wa.me/573104099029

                0. Volver al menú principal`;
            }
        }

        /*
        =========================
        MENU CITAS
        =========================
        */

        if (currentMenu === "citas") {

            if (cleanMessage === "1") {
                goToMenu("citas_resultado");

                return `AGENDAR CITA:

                Puedes agendar tu cita aquí:
                https://agenda.saludtools.com/2XoKI1lA

                O llamando al +57 3104099029.

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }

            if (cleanMessage === "2") {
                goToMenu("citas_resultado");

                return `CANCELAR O REPROGRAMAR:

                Puedes hacerlo mínimo 3 horas antes:

                - Llamando al +57 3104099029
                - Enviando un mensaje vía WhatsApp
                - O respondiendo el correo de confirmación.

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }

            if (cleanMessage === "3") {
                goToMenu("citas_resultado");

                return `REQUISITOS:

                Debes traer:

                - Documento de identidad
                - Órdenes médicas

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }

            if (cleanMessage === "4") {
                goToMenu("citas_resultado");

                return `FACTURA ELECTRÓNICA:

                Se solicitará:

                - Nombre del paciente
                - Tipo y número de documento
                - Fecha de la atención

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }
        }

        if (currentMenu === "citas_resultado") {
            // estado intermedio
        }

        /*
        =========================
        MENU UBICACION
        =========================
        */

        if (currentMenu === "ubicacion") {

            if (cleanMessage === "1") {
                goToMenu("ubicacion_resultado");

                return `DIRECCIÓN:

                Calle 4 #8E-84
                Ubaté, Cundinamarca

                https://maps.app.goo.gl/6cAqS9KBC8ikYjMCA

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }

            if (cleanMessage === "2") {
                goToMenu("ubicacion_resultado");

                return `HORARIO:

                Lunes a viernes:
                7:00 a.m. - 7:00 p.m.

                Sábados:
                7:00 a.m. - 1:00 p.m.

                Consulta prioritaria 24/7.

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }
        }

        if (currentMenu === "ubicacion_resultado") {
            // estado intermedio
        }

        /*
        =========================
        MENU OTROS SERVICIOS
        =========================
        */

        if (currentMenu === "otros") {

            if (cleanMessage === "1") {
                goToMenu("laboratorio");

                return `LABORATORIO CLÍNICO:

                1. Horarios para toma de laboratorios
                2. Entrega de resultados

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }

            if (cleanMessage === "2") {
                goToMenu("imagenes");

                return `IMÁGENES DIAGNÓSTICAS:

                1. Horarios para toma
                2. Entrega de resultados

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }

            if (cleanMessage === "3") {
                goToMenu("electro");

                return `ELECTROCARDIOGRAMA, HOLTER Y MAPA:

                1. Horarios
                2. Entrega de resultados
                
                9. Volver al menú anterior
                0. Volver al menú principal`;
            }
        }

        if (currentMenu === "otros_resultado") {
            // estado intermedio
        }

        /*
        SUBMENU LABORATORIO
        */

        if (currentMenu === "laboratorio") {

            if (cleanMessage === "1") {
                goToMenu("laboratorio_resultado");

                return `HORARIOS:

                De lunes a sábado:
                7:00 a.m. - 9:00 a.m.

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }

            if (cleanMessage === "2") {
                goToMenu("laboratorio_resultado");

                return `ENTREGA DE RESULTADOS:

                Disponible:

                - De forma presencial
                - O vía WhatsApp al +57 3104099029

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }
        }

        if (currentMenu === "laboratorio_resultado") {
        }

        /*
        SUBMENU IMAGENES
        */

        if (currentMenu === "imagenes") {

            if (cleanMessage === "1") {
                goToMenu("imagenes_resultado");
                return `HORARIOS:

                Ecografías y radiografías:

                Únicamente bajo cita previa.

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }

            if (cleanMessage === "2") {
                return `ENTREGA DE RESULTADOS:

                Disponible:

                - De forma presencial
                - O vía WhatsApp al +57 3104099029

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }
        }

        if (currentMenu === "imagenes_resultado") {
        }

        /*
        SUBMENU ELECTRO
        */

        if (currentMenu === "electro") {

            if (cleanMessage === "1") {
                goToMenu("electro_resultado");
                return `HORARIOS:

                Únicamente bajo cita previa.

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }

            if (cleanMessage === "2") {
                goToMenu("electro_resultado");
                return `ENTREGA DE RESULTADOS:

                Disponible:

                - De forma presencial
                - O vía WhatsApp al +57 3104099029

                9. Volver al menú anterior
                0. Volver al menú principal`;
            }
        }

        if (currentMenu === "electro_resultado") {
        }

        return `❌ Opción inválida.

        Por favor selecciona una opción válida.

        (Escribe 0 para volver al menú principal)`;
    }

    function handleUserInput() {
        const userMessage = userInput.value;
        if (userMessage.trim() === "") return;

        addMessage(userMessage, 'user');
        userInput.value = '';

        const typingElement = showTyping();

        const delay = Math.random() * 1000 + 800;

        setTimeout(() => {
            typingElement.remove(); // quitar los punticos

            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, 'bot');
        }, delay); // puedes ajustar el tiempo
    }

    function toggleChatbot() {
        chatbotContainer.classList.toggle('hidden');

        let welcome = welcomeMessage;

        if (!chatbotContainer.classList.contains('hidden') && !welcomeMessageSent) {
            addMessage(welcome, 'bot');
            welcomeMessageSent = true; 
        }
    }

    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'typing');

        typingDiv.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        return typingDiv; // importante para luego eliminarlo
    }

    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    chatbotToggler.addEventListener('click', toggleChatbot);
    closeChatbot.addEventListener('click', toggleChatbot);
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
    closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"))
});

