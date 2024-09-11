// BUTTON EVENT

const buttonStatus = document.querySelectorAll("[button-status]");
// console.log(buttonStatus);
if(buttonStatus.length > 0) {
    buttonStatus.forEach(button => {
        button.addEventListener('click', ()=> {
            const status = button.getAttribute("button-status");
            console.log(status);
        })
    })

    
}
// END BUTTON EVENT