//  client send message
const formSendData = document.querySelector(".chat .chat-form")

if (formSendData) {
    formSendData.addEventListener("submit", (event) => {
        event.preventDefault();
        const content = event.target.elements.content.value;
        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content);
            event.target.elements.content.value = ""
        }
    })
}

// END client send message