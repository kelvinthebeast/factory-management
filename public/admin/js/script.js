// BUTTON EVENT

const buttonStatus = document.querySelectorAll("[button-status]");
// console.log(buttonStatus);

let url = new URL(window.location.href);
if(buttonStatus.length > 0) {
    
    buttonStatus.forEach(button => {
        button.addEventListener('click', ()=> {
            const status = button.getAttribute("button-status");
            // console.log(status);

            if(status) {
                url.searchParams.set("status", status);

            } else {
                url.searchParams.delete("status");
            }
            // console.log(url.href);

            // chuyển hướng lên thanh search của win dow
            window.location.href = url.href
        })
    })

    
}
// END BUTTON EVENT