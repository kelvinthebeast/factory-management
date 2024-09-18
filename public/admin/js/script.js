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

// Form search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); // ngăn không load lại trang
        // console.log(e.target.elements.keyword.value);
        const keyword = e.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
            

        }
        window.location.href = url.href;
    })
}
//end form search

//button pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");

if(buttonPagination){
    buttonPagination.forEach(button => {
        let url = new URL(window.location.href);
        button.addEventListener("click", ()=> {
            page = button.getAttribute("button-pagination");
            // console.log(page);

            url.searchParams.set("page", page);

            window.location.href = url.href;


        })
    })

}
//button pagination