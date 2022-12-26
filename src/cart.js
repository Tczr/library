// let book = [];
// let category= [];
// let categories = [];


// let books2= [
//     {title:"title1" ,description:"description", images:[
//         "pictuer1","picture2","picture3"
//     ] ,category:"category",auother:"auother1",rate:"rate", price:150},
//     {title:"title2" ,description:"description", images:[
//         "pictuer2.1","picture2.2","picture2.3"
//     ] ,category:"category2",auother:"auother2",rate:"rate", price:200},
//     {title:"title3" ,description:"description", images:[
//         "pictuer3.1","picture3.2","picture3.3"
//     ] ,category:"category",auother:"auother2",rate:"rate", price:125}
// ]
// let inventory = [
//     {quantity:20},
//     {quantity:29},
//     {quantity:15}
// ]
// let cart2 = [];

// let  comments=[
//     ["comment1","comment2","comment3"],
//     ["comment1","comment2","comment3"],
//     ["comment1","comment2","comment3"],
// ]

// let n=books2.length;
// let i=0;

// while(i<n){
//     console.log("book #"+i);
//     console.log(books2[i]);
//     i++;
// }

// searchForSubTextOrFull("title");
// addToCart(1,2);//=> book number 2 quantity:29 -2= 28
// addToCart(2,3)
// getCartItems();

// function searchBy(txt){
//     for(let parentIndex=0;parentIndex<n; parentIndex++){
        
//         for(let childndex=0, listSize=books2[parentIndex].length; childndex<listSize; childndex++)
//         {
           
//             if(txt==books2[parentIndex][childndex]){
                
//                 console.log("book @",parentIndex);
//                 console.log(books2[parentIndex]);
//             }
//         }
//     }
// }

// function searchForSubTextOrFull(txt){
//     for(let parentIndex=0;parentIndex<n; parentIndex++){
        
//         for(let childndex=0, listSize=books2[parentIndex].length; childndex<listSize; childndex++)
//         {
//            const target = books2[parentIndex][childndex];
           
//             if(target.includes(txt)){
                
//                 console.log("book @",parentIndex);
//                 console.log(books2[parentIndex]);
//             }
//         }
//     }
// }

// function addToCart(bookId, n){
//     cart2.push({book:books2[bookId],"quantity":n});
//     inventory[bookId].quantity-=n;
//     console.log("inventory now is",inventory[bookId].quantity);

// }


// function getCartItems(){
//     if(cart2.length<=0) return "sorry cart is empty";

//     let totalElement=0;
//     let total=0;

//     cart2.forEach(element => {
//         console.log("book:",element);
//         totalElement+=element.quantity;
//         total+=element.book.price;
//     });
    
//     console.log("the total elements is:", totalElement);

    
//     console.log("the total price is:", total);
// }
const cartItemSection = document.querySelector(".cart-items");

const cart=JSON.parse(localStorage.getItem("cartItems") || "[]");
const books = JSON.parse(localStorage.getItem("books") || "[]");

if(cart!=undefined){
displayCartInfo();}
const deleteButtons =cartItemSection.querySelectorAll(".delete-item");


deleteButtons.forEach( (btn)=>
    btn.addEventListener('click',(event)=>{
        console.log("delete");
        console.log(event.target.parentElement);
        const element =event.target.parentElement.parentElement;
        const id = element.id;
        console.log(id);

        cart.books= cart.books.filter((book)=>{
            if(book.bookId==id){
                cart.totalElement-=book.quantity;
                cart.totalPrice-=books[id].price;
            }
            else return book;
       })
        console.log(cart);
        // cart.books.splice(id,1);
        // cart.totalElement-=item.quantity;
        // cart.totalPrice-=books[id].price;
        localStorage.setItem("cartItems",JSON.stringify(cart));
        window.location.reload();
    })
)

function displayCartInfo(){
    try{
    const totalbooksContainer= document.createElement("div");
    const totalbooks =  document.createElement("p");

    const title=document.createElement("span");
    title.className="title";
    title.textContent="total books : ";

    totalbooksContainer.className="total-books";

    const totalbooksTxt = (cart.totalElement<=0 || cart.totalElement==undefined )? "no books added" : cart.totalElement ;

    
    totalbooks.textContent= totalbooksTxt ;
    totalbooks.appendChild(title);


    totalbooksContainer.appendChild(totalbooks);


    cartItemSection.appendChild(totalbooksContainer)
        
    cart.books.forEach(
        (element)=>{
            const book = books[element.bookId];
           
            const bookContainer = document.createElement("div");
            bookContainer.className="book-container flex";
            bookContainer.id=element.bookId;
            

            const imageContainer = document.createElement("div");
            imageContainer.className="image-container";
            const imageElement =  document.createElement("img");
            imageElement.src=book.imageUrl;

            imageContainer.appendChild(imageElement)

            const bookInfo = document.createElement("div");
            bookInfo.className="book-info";
            const bookTitle =  document.createElement("p");
            bookTitle.textContent=book.title;
            bookTitle.className="book-title";
            const bookAothuer =  document.createElement("p");
            bookAothuer.textContent=book.authoer;
            bookAothuer.className="book-aothuer";
            bookInfo.append(bookTitle,bookAothuer);

            const bookPrice=document.createElement("div");
            const price = document.createElement("p");
            const priceSapn = document.createElement("span");

            price.textContent="price: ";
            priceSapn.className="book-price"
            priceSapn.textContent=book.price;
            price.appendChild(priceSapn);
            bookPrice.appendChild(price);

            const quantitySection = document.createElement("div");
            const quantity =  document.createElement("p");
            const quantitySpan = document.createElement("span");
            
            quantity.textContent="quantity: ";
            quantitySpan.className="book-quantity";
            quantitySpan.textContent=element.quantity;
            quantity.appendChild(quantitySpan);
            quantitySection.appendChild(quantity);
            

            bookContainer.append(imageContainer,bookInfo,bookPrice,quantitySection);

            const deleteDiv = document.createElement("div");
            const deleteBtn = document.createElement("button");
            deleteBtn.className="delete-item";
            deleteBtn.textContent="delete";
            deleteDiv.append(deleteBtn);
            bookContainer.appendChild(deleteDiv);
            cartItemSection.appendChild(bookContainer);
        }
    )
    const cartInfoSection = document.createElement("div");
    cartInfoSection.className="cart-footer";

    const totalPriceSection=  document.createElement("div");
    totalPriceSection.className="price-area"
    const price =  document.createElement("p"); 
    price.textContent =cart.totalElement<=0 ?"": "total price: "+cart.totalPrice;
    totalPriceSection.appendChild(price);

    const calculationInfo = document.createElement("div");
    calculationInfo.className="calculation-info";
    const titleCalculation = document.createElement("p").textContent="How to calculate total price with The Vat"; 
    const calculationDescription=document.createElement("p").textContent="product price * quantity + .. * Vat=15%";
    calculationInfo.append(titleCalculation,calculationDescription);


    const orderSection = document.createElement("div");
    const orderBtn = document.createElement("button");
    orderSection.className="order-section";

    orderBtn.textContent="pay";
    orderSection.appendChild(orderBtn);

    const discountSection = document.createElement("div");
    const discountCode = document.createElement("input");
    discountSection.className="discount-section";
    discountCode.placeholder="enter a discount codde";
    discountSection.appendChild(discountCode);


    cartInfoSection.append(totalPriceSection,calculationInfo,orderSection, discountSection);

    cartItemSection.appendChild(cartInfoSection);
    }catch(err){console.log(err)};

}