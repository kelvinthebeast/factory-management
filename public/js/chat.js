// Client gửi tin nhắn
const formSendData = document.querySelector(".chat .chat-form");

if (formSendData) {
    formSendData.addEventListener("submit", (event) => {
        event.preventDefault();
        const content = event.target.elements.content.value.trim();
        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content);
            event.target.elements.content.value = ""; // Xóa nội dung sau khi gửi
        }
    });
}

// Server trả tin nhắn
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    console.log(data);
    const myId = document.querySelector(".chat").getAttribute("my-id"); // Lấy ID người dùng hiện tại
    const body = document.querySelector(".chat-body"); // Vùng chứa tin nhắn
    // console.log(body); 
    // Tạo thẻ div cho tin nhắn mới
    const div = document.createElement("div");
    div.classList.add("chat-incoming");
    // div.innerHTML = `
        //  <div class="chat-name">${data.fullName}</div>
        //  <div class="chat-content">${data.content}</div>
    // `
    let htmlFullName = "";

    if (myId === data.user_id) {
        div.classList.add("chat-outgoing");
    } else {
        htmlFullName = `<div class="chat-name">${data.fullName}</div>`;
        div.classList.add("chat-incoming");
    }

    // Nội dung tin nhắn
    div.innerHTML = `
        ${htmlFullName}
        <div class="chat-content">${data.content}</div>
    `;

    // Thêm tin nhắn vào cuối vùng chứa
    body.appendChild(div);

    // Cuộn xuống cuối vùng chứa
    body.scrollTop = body.scrollHeight;
});


// emoji picker
// const buttonIcon = document.querySelector('.button-icon');
// if (buttonIcon) {
//     const tooltip = document.querySelector('.tooltip');
//     Popper.createPopper(buttonIcon, tooltip);
//     buttonIcon.addEventListener('click', () => {
//         tooltip.classList.toggle('show');
//     });
// }

const buttonIcon = document.querySelector('.button-icon');
if (buttonIcon) {
  const tooltip = document.querySelector('.tooltip');
  
  // Attach popper for positioning (optional, ensure Popper.js is included)
  Popper.createPopper(buttonIcon, tooltip, {
    placement: 'top', // Adjust as needed
  });
  
  // Toggle the emoji picker on touch/click
  buttonIcon.addEventListener('click', () => {
    tooltip.classList.toggle('shown');
  });

  // Optional: Hide when clicking outside
  document.addEventListener('click', (event) => {
    if (!buttonIcon.contains(event.target) && !tooltip.contains(event.target)) {
      tooltip.classList.remove('shown');
    }
  });
}
// end emoji picker