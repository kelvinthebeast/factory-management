console.log("ROLES")
// permission
const tablePermissions = document.querySelector("[table-permissions]");

if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
        let permissions = [];
        const rows = tablePermissions.querySelectorAll("[data-name]");

        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input"); // Define inputs here
            //case 1
            if (name == "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    permissions.push({
                        id: id,
                        permissions: []
                    });
                });
                //others
            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked;
                    if (checked) {
                        permissions[index].permissions.push(name);
                    }
                });
            }
        });
        console.log(permissions);
        if(permissions.length > 0) {
            const formChangePermissions = document.querySelector("#form-change-permissions");
            const inputPermissions = document.querySelector("input[name='permissions']");

            inputPermissions.value = JSON.stringify(permissions);
            formChangePermissions.submit();
        }
        
    });

};

// end permission


// permissions defaults
// const dataRecords = document.querySelector("[data-records]");
// if (dataRecords) {
//     const records = JSON.parse(dataRecords.getAttribute("data-records"));
//     const tablePermissions = document.querySelector("[data-permissions]");
//     console.log(records);

//     records.forEach(record => {
//         const permissions = record.getAttribute("data-permissions");
//         console.log(permission);
//         permissions.forEach((permission, index) => {
//             const row = tablePermissions.querySelector(`[data-name='${permission}']`);
//             const inputs = row.querySelectorAll("input")[index];
//             inputs.forEach(input => {
//                 input.checked = true;
//             })
            
//         });
//         console.log("-----")
//     })


// }
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));

    const tablePermissions = document.querySelector("[table-permissions]");

    records.forEach((record, index) => {
        const permissions = record.permissions;

        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];

            input.checked = true;
        });
    });
}

// const dataRecords = document.querySelector("[data-records]");
// if(dataRecords) {
//     const records = JSON.parse(dataRecords.getAttribute("data-records"));
//     const tablePermissions = document.querySelector("[table-permissions]");
//     console.log(tablePermissions);
//     console.log(records);
//     records.forEach(record => {
//         console.log(record.permissions)
//     })
    
// }


// end permissions defaults
