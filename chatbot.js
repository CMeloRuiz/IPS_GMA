document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.querySelector('.chatbot-body');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatbotToggler = document.getElementById('chatbot-toggler');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbot = document.getElementById('close-chatbot');

    let welcomeMessageSent = false;

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

    function getBotResponse(userMessage) {
        const cleanMessage = userMessage.toLowerCase().trim();
        // 🔹 SALUDOS
        if (["hola", "buenas", "buenos dias", "buen día"].some(word => cleanMessage.includes(word))) {
            return `¡Hola! 👋
            Soy MediBot GMA, tu asistente virtual.
            ${mainMenu}`;
        }

        // 🔹 DESPEDIDA / FINALIZAR
        if (["adios", "hasta luego", "nos vemos", "chao", "finalizar", "terminar", "ok"].some(word => cleanMessage.includes(word))) {
            return `👋 Gracias por comunicarte con Grupo Médicos Asociados.
            Ha sido un gusto ayudarte.
            Si necesitas algo más, puedes volver a escribir en cualquier momento.`;
        }

        // 🔹 AGRADECIMIENTOS
        if (cleanMessage.includes("gracias")) {
            return `¡Con gusto! 😊  
            Si necesitas algo más, aquí estaré para ayudarte.  
            También puedes escribir 0 para volver al menú.`;
        }

        // 🔹 MENÚ
        if (
            cleanMessage === "0" ||
            cleanMessage === "menu" ||
            cleanMessage === "inicio"
        ) {
            return mainMenu;
        }

        // 🔹 INTENCIÓN → CITAS
        if (cleanMessage.includes("cita")) {
            return getBotResponse("1");
        }

        // 🔹 INTENCIÓN → UBICACIÓN
        if (cleanMessage.includes("ubic") || cleanMessage.includes("direccion")) {
            return getBotResponse("2");
        }

        // 🔹 INTENCIÓN → SERVICIOS
        if (cleanMessage.includes("servicio") || cleanMessage.includes("especialidad")) {
            return getBotResponse("3");
        }

        // 🔹 INTENCIÓN → OTROS
        if (cleanMessage.includes("laboratorio") || cleanMessage.includes("examen")) {
            return getBotResponse("4");
        }

        // 🔹 INTENCIÓN → CONTACTO
        if (
            cleanMessage.includes("telefono") ||
            cleanMessage.includes("contacto") ||
            cleanMessage.includes("whatsapp")
        ) {
            return getBotResponse("5");
        }

        // 🔹 INTENCIÓN → ASESOR
        if (cleanMessage.includes("asesor") || cleanMessage.includes("humano")) {
            return getBotResponse("6");
        }

        // 🔹 OPCIONES NUMÉRICAS
        if (cleanMessage === "1") {
            return `CITAS MÉDICAS:

            Agendar cita:
            Puedes agendar tu cita en línea aquí: https://agenda.saludtools.com/2XoKI1lA , o llamando al +57 3104099029.

            Cancelar o reprogramar:
            Puedes hacerlo mínimo 3 horas antes de tu cita llamando al +57 3104099029, enviando un mensaje vía WhatsApp al +57 3104099029 o por correo electrónico respondiendo al mensaje de confirmación de la cita.

            Requisitos para la cita:
            Debes traer documento de identidad y órdenes médicas si las tienes.

            Escribe 0 para volver al menú.`;
        }

        if (cleanMessage === "2") {
            return `UBICACIÓN:

            Dirección:
            Estamos ubicados en Ubaté, Cundinamarca en la Calle 4 #8E-84 . Mira cómo llegar en Google Maps: https://maps.app.goo.gl/6cAqS9KBC8ikYjMCA .

            Horario de atención:
            Lunes a viernes: 7:00 a.m. - 7:00 p.m. Sábados: 7:00 a.m. - 1:00 p.m. Atención consulta externa Prioritaria 24/7.

            Escribe 0 para volver al menú.`;
        }

        if (cleanMessage === "3") {
            return `SERVICIOS:

            Medicina general
            Pediatría
            Ginecología y Obstetricia
            Nutrición y dietética
            Psicología
            Enfermeria
            Hospitalización domiciliaria
            Cardiología
            Medicina Interna

            Escribe 0 para volver al menú.`;
        }

        if (cleanMessage === "4") {
            return `OTROS SERVICIOS:

            Laboratorio clínico:

            Horarios para toma de laboratorios → De lunes a sábado: 7:00 a.m. - 9:00 a.m.
            Entrega de resultados → Los resultados estarán disponibles de forma presencial o también los puede solicitar al número de WhatsApp +57 3104099029.


            Imágenes diagnósticas:

            Horarios para toma de ecografías y radiografías → únicamente bajo cita previa.
            Entrega de resultados → Los resultados estarán disponibles de forma presencial o también los puede solicitar al número de WhatsApp +57 3104099029.

            Electrocardiograma, HOLTER Y MAPA de tensión arterial:

            Horarios → únicamente bajo cita previa.
            Entrega de resultados → Los resultados estarán disponibles de forma presencial o también los puede solicitar al número de WhatsApp +57 3104099029.

            Escribe 0 para volver al menú.`;
        }

        if (cleanMessage === "5") {
            return `CONTACTO:

            📞 Teléfono recepción y citas: 
            +57 3104099029 - teléfono administración: 3202046646

            📱 WhatsApp: 
            +57 3104099029 - Administrativo: 3202046646

            📧 Correo electrónico: 
            pqrs@grupomedicosasociados.com  
            
            Formulario web: https://www.grupomedicosasociados.com/contacto.html

            Escribe 0 para volver al menú.`;
        }

        if (cleanMessage === "6") {
            return `Un asesor te atenderá 👨‍⚕️

            https://wa.me/573104099029

            Escribe 0 para volver al menú.`;
        }

        // 🔴 DEFAULT
        return `❌ Opcion no valida.

        Puedes escribir una opción (1-6) o algo como:
        "citas", "teléfono", "servicios", etc.

        ${mainMenu}`;
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

