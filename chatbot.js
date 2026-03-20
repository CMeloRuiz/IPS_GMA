document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.querySelector('.chatbot-body');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatbotToggler = document.getElementById('chatbot-toggler');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbot = document.getElementById('close-chatbot');

    let welcomeMessageSent = false;

    const faq = {
        "direccion": "Nuestra direccion es: Calle 4 #8-84, Edificio Ricaurte / Ubaté",
        "dirección": "Nuestra direccion es: Calle 4 #8-84, Edificio Ricaurte / Ubaté",
        "teléfono": "Te puedes comunicar con nosotros a los telefonos: 3104099029 y 3202046646",
        "teléfonos": "Te puedes comunicar con nosotros a los telefonos: 3104099029 y 3202046646",
        "telefono": "Te puedes comunicar con nosotros a los telefonos: 3104099029 y 3202046646",
        "telefonos": "Te puedes comunicar con nosotros a los telefonos: 3104099029 y 3202046646",
        "telefonico": "Te puedes comunicar con nosotros a los telefonos: 3104099029 y 3202046646",
        "telefónico": "Te puedes comunicar con nosotros a los telefonos: 3104099029 y 3202046646",
        "cita": "Para agendar tu cita, puedes llamar a nuestra línea telefónica o usar el formulario de contacto en nuestra web.",
        "citas": "Para agendar tu cita, puedes llamar a nuestra línea telefónica o usar el formulario de contacto en nuestra web.",
        "horario": "Nuestro horario de atención es de Lunes a Viernes de 8:00 a.m. a 5:00 p.m.",
        "servicio": "Ofrecemos servicios de nutrición, psicología, pediatría, y otros. Puedes ver el listado completo en la sección de 'Servicios'.",
        "servicios": "Ofrecemos servicios de nutrición, psicología, pediatría, y otros. Puedes ver el listado completo en la sección de 'Servicios'.",
        "ubicacion": "Estamos ubicados en [Tu Dirección]. Puedes encontrar el mapa en la sección de 'Contacto'.",
        "seguros": "Trabajamos con [Nombres de seguros]. Por favor, confirma tu plan con tu aseguradora.",
        "hola": "¡Hola! Soy el asistente virtual de la IPS Grupo Medicos Asociados. ¿En qué puedo ayudarte?",
        "gracias": "De nada, estoy para servirte.",
        "ayuda": "Puedo responder preguntas sobre horarios, servicios, ubicaciones y citas. Si necesitas algo más, por favor contáctanos directamente.",
        "defecto": "Lo siento, no entiendo tu pregunta. ¿Podrías ser más específico? Te puedo dar información sobre citas, horarios, o servicios."
    };

    const mainMenu = `
        Hola , soy MediBot GMA, el asistente virtual de GRUPO MEDICOS ASOCIADOS.
        Por favor selecciona una opción:

        1. Citas Médicas.
        2. Ubicación y Horarios.
        3. Servicios y Especialidades.
        4. Otros servicios.
        5. Contacto.
        6. Hablar con un asesor.

        (Escribe 0 para volver a este menú en cualquier momento)`;

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

        if (
            cleanMessage === "0" ||
            cleanMessage === "menu" ||
            cleanMessage === "inicio"
        ) {
            return mainMenu;
        }

        // 👇 NUEVA LÓGICA POR NÚMEROS
        if (cleanMessage === "1") {
            return `CITAS MÉDICAS:

            Agendar cita:
            Puedes agendar tu cita aquí:
            https://agenda.saludtools.com/2XoKI1lA
            O llamando al +57 3104099029.

            Cancelar o reprogramar:
            Mínimo 3 horas antes vía llamada o WhatsApp.

            Requisitos:
            Documento de identidad y órdenes médicas.

            Factura electrónica:
            Se solicita con nombre, documento y fecha de atención.
            
            Escribe 0 para volver al menú principal.`;
        }

        if (cleanMessage === "2") {
            return `UBICACIÓN Y HORARIOS:

            Dirección:
            Ubaté, Cundinamarca
            Calle 4 #8E-84
            https://maps.app.goo.gl/6cAqS9KBC8ikYjMCA

            Horario:
            Lunes a viernes: 7:00 a.m. - 7:00 p.m.
            Sábados: 7:00 a.m. - 1:00 p.m.
            Consulta prioritaria: 24/7
            
            Escribe 0 para volver al menú principal`;
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
            
            Escribe 0 para volver al menú principal`;
        }

        if (cleanMessage === "4") {
            return `OTROS SERVICIOS:

            Laboratorio clínico:
            Lunes a sábado: 7:00 a.m. - 9:00 a.m.

            Imágenes diagnósticas:
            Solo con cita previa.

            Electrocardiograma, HOLTER y MAPA:
            Solo con cita previa.

            Resultados:
            Presencial o por WhatsApp +57 3104099029.
            
            Escribe 0 para volver al menú principal`;
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
            
            Escribe 0 para volver al menú principal`;
        }

        if (cleanMessage === "6") {
            return `Un asesor se pondrá en contacto contigo.

            Puedes escribir directamente a WhatsApp:
            https://wa.me/573104099029
            
            Escribe 0 para volver al menú principal`;
        }

        let response = faq["defecto"];

        for (const keyword in faq) {
            if (cleanMessage.includes(keyword)) {
                response = faq[keyword];
                break;
            }
        }
        return response;
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

        let welcomeMessage = mainMenu;

        if (!chatbotContainer.classList.contains('hidden') && !welcomeMessageSent) {
            addMessage(welcomeMessage, 'bot');
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

