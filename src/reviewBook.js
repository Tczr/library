const url = new URL(window.location.href);
const bookList = JSON.parse(localStorage.getItem("books") || "[]");
const cartItems=JSON.parse(localStorage.getItem("cartItems") || "[]");

const id = url.searchParams.get("book-id");


const iamgeSection = document.querySelector(".image-section");

const title = document.getElementById("title");

const authoer = document.querySelector(".aouther");

const price = document.querySelector(".price");

const avliableQuantity = document.getElementById("avliable-quantity");

const addToCartBtn = document.querySelector(".add-btn");

if(bookList.length >0){
    
    const book = bookList[id];
    setIamge(book);
    setDescription(book);
    setPriceAndQuantity(book);
}

function setIamge(book){
    const image = document.createElement("img");
    image.className="picture";
    image.src=book.imageUrl;
    image.alt=book.title;
    iamgeSection.appendChild(image);
}

function setDescription(book){
    title.textContent=book.title;
    authoer.textContent=book.authoer;
}

function setPriceAndQuantity(book){
    price.textContent=book.price;
    const quantity = book.quantity;
    let n = 2;
    while(n<=quantity){
        const option = document.createElement("option");
        option.value=n
        option.textContent=n;
        avliableQuantity.appendChild(option);
        n++;
    }
}

addToCartBtn.addEventListener("click",()=>{
    const book = bookList[id];
    const quantity =Number.parseInt(avliableQuantity.value);
    const totalPrice =book.price*quantity;
    if(cartItems.length<=0){
       
        localStorage.setItem("cartItems", JSON.stringify(
            {
                books:[{"bookId":id, quantity:quantity}],
                totalElement:quantity,
                totalPrice:totalPrice
            }
        ));
    }
    else{
        cartItems.books.push({"bookId":id, quantity:quantity});
        cartItems.totalElement+=quantity;
        cartItems.totalPrice+=totalPrice;
        localStorage.setItem("cartItems", JSON.stringify(cartItems))

    }

}
)