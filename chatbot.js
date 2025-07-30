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
        "telefono": "Te puedes comunicar con nosotros a los telefonos: 3104099029 y 3044110839",
        "cita": "Para agendar tu cita, puedes llamar a nuestra línea telefónica o usar el formulario de contacto en nuestra web.",
        "citas": "Para agendar tu cita, puedes llamar a nuestra línea telefónica o usar el formulario de contacto en nuestra web.",
        "horario": "Nuestro horario de atención es de Lunes a Viernes de 8:00 a.m. a 5:00 p.m.",
        "servicio": "Ofrecemos servicios de nutrición, psicología, pediatría, y otros. Puedes ver el listado completo en la sección de 'Servicios'.",
        "servicios": "Ofrecemos servicios de nutrición, psicología, pediatría, y otros. Puedes ver el listado completo en la sección de 'Servicios'.",
        "ubicacion": "Estamos ubicados en [Tu Dirección]. Puedes encontrar el mapa en la sección de 'Contacto'.",
        "seguros": "Trabajamos con [Nombres de seguros]. Por favor, confirma tu plan con tu aseguradora.",
        "hola": "¡Hola! Soy el asistente virtual de la IPS. ¿En qué puedo ayudarte?",
        "gracias": "De nada, estoy para servirte.",
        "ayuda": "Puedo responder preguntas sobre horarios, servicios, ubicaciones y citas. Si necesitas algo más, por favor contáctanos directamente.",
        "defecto": "Lo siento, no entiendo tu pregunta. ¿Podrías ser más específico? Te puedo dar información sobre citas, horarios, o servicios."
    };

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotResponse(userMessage) {
        const cleanMessage = userMessage.toLowerCase().trim();
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

        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, 'bot');
        }, 500);
    }

    function toggleChatbot() {
        chatbotContainer.classList.toggle('hidden');

        if (!chatbotContainer.classList.contains('hidden') && !welcomeMessageSent) {
            addMessage("¡Hola! Soy el asistente virtual de la IPS. ¿En qué puedo ayudarte hoy?", 'bot');
            welcomeMessageSent = true; 
        }
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

