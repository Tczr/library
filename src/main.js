const bill=
    {
        book:[],
        quantity:0
    }


const books=[
    {id:0, "authoer":"authoer's Name", title:"The One Book Title", imageUrl:"../public/images/World_history_book.jpg", price:132.98, quantity:10},
    {id:1, "authoer":"authoer's Name", title:"The One Book subtotation", imageUrl:"../public/images/the_psychology_of_money.jpg", price:89, quantity:10},
    {id:2, "authoer":"authoer's Name", title:"The One Book fire", imageUrl:"../public/images/The_science_book.jpg", price:99, quantity:10},
]

const cart = {
    books:[],
    totalElement:0,
    totalPrice:0
}

localStorage.setItem("books",JSON.stringify(books));

const bookSection = document.querySelector(".books-section");


displayBooks(books);

bookSection.addEventListener('click',(ev)=>{
    console.log(ev);
    let target = ev.target;
    let id=0;
    while(
        (target.className!=null && target.className!="card-footer")
        &&
        (target.className!=null && target.className!="book-card")){
            // console.log(target.className);
            // console.log(target.parentElement);
            
            target=target.parentElement;
    }
    console.log("target now:",target)
    if(ev.target.localName != "div"){
    id=ev.target.parentElement.parentElement.id;}
    
    if(ev.target.localName == "button"){ //  so the book been added to cart
        
        console.log("button clicked"," book #"+id, "added to cart");
        
        const items=JSON.parse(localStorage.getItem("cartItems") || "[]");

        console.log(items.books)
        if(items.books!=undefined && items.books.length>0){
            
            cart.books=items.books;
            cart.totalElement=items.totalElement;
            cart.totalPrice=items.totalPrice;

            const index = items.books.findIndex(
                book=> book.bookId==id
                
            )

            if(index>-1){
                cart.books[index].quantity+=1;
            }
            else{
                cart.books.push({bookId:id,quantity:1})
                
            }
            cart.totalElement+=1;
            cart.totalPrice+=books[id].price;
            // cart.totalElement+=items.totalElement;
            // cart.totalPrice+=items.totalPrice;
        }
        else{
            cart.books.push({bookId:id,quantity:1})
            cart.totalElement+=1;
            cart.totalPrice+=books[id].price;
        }
        console.log(cart,"=>",items.length);
        
        localStorage.setItem("cartItems", JSON.stringify(cart));


        // TODO: add carting features;
    }
    else if(target.className=="book-card"){ // the card got clicked
        
        console.log("it's not a button")
        window.location.href="../public/book-details.html?book-id="+id;
    
    }
    
})
function displayBooks(books){
    try{
        books.forEach(
            (element,index) => { 
                const div = document.createElement("div")
                div.className="book-card"
                div.id=index;

                const picture = document.createElement("img");

                const pictureContainer = document.createElement("div");
                pictureContainer.className="book-picture";

                const cardInfoConatiner = document.createElement("div");
                cardInfoConatiner.className="card-info";

                const authoerArea = document.createElement("p")
                authoerArea.className='authoer'

                const title = document.createElement("p")
                title.className="book-title";

                const priceArea = document.createElement("div"); 
                priceArea.className="flex card-footer";

                const price= document.createElement("p")
                price.className="price"
            
                const addToCartBtn = document.createElement("button");
                addToCartBtn.textContent="Add to cart";
                console.log(element.price+'\t'+index);
                picture.src=element.imageUrl
            
                authoerArea.textContent=element.authoer

                title.textContent=element.title
                
                price.textContent=element.price

            pictureContainer.appendChild(picture);
            
            cardInfoConatiner.append(authoerArea, title);

            priceArea.append(price,addToCartBtn);

            div.append(pictureContainer, cardInfoConatiner, priceArea);

            bookSection.appendChild(div)
            
            
        });
    }catch(err){/*console.log(err)*/}
}


/*displayRighContent();*/

/*function changingViews(viewName){
    if(currentView.id!==viewName){
        const oldView = currentView;
        currentView = find(viewName);
        console.log("view name =", viewName, currentView)
        // console.log("chainging view from ",oldView," to ",currentView);
        
        currentView.setAttribute("data-active",true);
        oldView.removeAttribute("data-active");
        
    }else return;
}

function navigateTo(viewName){
        changingViews(viewName);
        if(currentView.children.length>0){
            refreshPage()
        }
        displayRighContent();

}

/*function refreshPage(){
    if(currentView.id=="cart-page"){
       let childe = cartItemSection.lastElementChild;
       while(childe){
        cartItemSection.removeChild(childe);
        childe=cartItemSection.lastElementChild;
       }
        console.log(cartItemSection.children)
    }else if(currentView.id=="home-page"){
        let childe = bookSection.lastElementChild;
        while(childe){
         bookSection.removeChild(childe);
         childe=bookSection.lastElementChild;
        }
         console.log(bookSection.children)
    }
}*/
/*function displayRighContent(){
    if(currentView.id=="cart-page"){
        displayCartInfo()
    }else if(currentView.id=="home-page"){
        displayBooks();
    }
}*/

/*function find(viewName){
    for(let index=0, length=views.length; index<length; index++){
        if(views.item(index).id==viewName)
         return views.item(index);
    }
    return null;
}*/