
// update the quantity of products

const inputsQuantity = document.querySelectorAll("input[name='quantity']");
console.log(inputsQuantity)
if (inputsQuantity.length > 0) {
    inputsQuantity.forEach(input => {
        input.addEventListener("change", (e) => {

            console.log(e)
            const productId = input.getAttribute("product-id");
            const quantity = input.value;

            // console.log(`ProductId: ${productId}, Quantity: ${quantity}`);

            window.location.href = `/cart/update/${productId}/${quantity}`;
        });
    });
}

// update the quantity of products