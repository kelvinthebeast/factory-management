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

// checkbox multi

const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputIds = checkboxMulti.querySelectorAll("input[name='id']");

    // console.log(inputCheckAll);
    // console.log(inputIds);

    inputCheckAll.addEventListener("click", () => {
        // console.log(inputCheckAll.checked);
        if(inputCheckAll.checked) {
            inputIds.forEach(input => {
                input.checked = true;
            });
        } else {
            inputIds.forEach(input => {
                input.checked = false;
            })
            
        }
        
    })


    // logic single input
    inputIds.forEach(input => {
        input.addEventListener("click", ()=> {
            let countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            // console.log(countChecked);
            // console.log(inputIds.length);
            if(countChecked == inputIds.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
    // end logic single input
}
// end checkbox multi

// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked") ;
        
        const typeChange = event.target.elements.type.value;

        // console.log(typeChange);
        if (typeChange == "delete-all") {
            const isComfirm = confirm("bạn có chắc muốn xóa những sản phẩm này? ")
            if (!isComfirm) {
                return;
            }
        }



        if(inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector('input[name="ids"]');
            inputsChecked.forEach(input => {
                // const id = input.getAttribute("value");
                const id = input.value;
                
                // console.log("Type Change: ", typeChange);  // Kiểm tra giá trị typeChange
                if(typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    // console.log(`ID: ${id}, Position: ${position}`);  // Kiểm tra id và position trước khi push
                    ids.push(`${id}-${position}`);
                    
                } else {
                    ids.push(id);  // Nếu không phải change-position, chỉ push id
                }

                
                

            })
            console.log(ids.join(", "))
            inputIds.value = ids.join(", ")
            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất 1 bản ghi");
        }
    });
}



// end form change multi


//show alert
const showAlert = document.querySelector("[show-alert]");


if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time)
    closeAlert.addEventListener("click", ()=> {
        showAlert.classList.add("alert-hidden");
    })
}
// end show alert
