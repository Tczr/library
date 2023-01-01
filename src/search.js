const searchInput = document.querySelector("[name=searchInput]");
const form = searchInput.parentNode;
let keywords;
const searchResult = document.getElementById("search-result");
const viewdBooks = document.querySelectorAll(".book-card");


form.addEventListener(
    "submit",(ev)=>{
        ev.preventDefault();
        const founded = []
        // console.log(books)
        books.forEach(
            (value)=>{
                const index = BoyerMoore(value.title,keywords);
                // console.log("keyword",keywords);
                // console.log("how heigh does mathe:",strength)
                if(index>=0){
                    founded.push(value);
                }
           }
        )
        console.log(founded);
        
        for(let out = 0, n=viewdBooks.length; out<n; out++){
            let r=0;
            for(let inr=0, m=founded.length; inr<m; inr++){
                if(founded[inr]!=undefined&&viewdBooks.item(out).id == founded[inr].id ){
                    console.log(viewdBooks.item(out))
                    console.log(viewdBooks.item(out).id, founded[inr].id)
                    r=1;
                    if(viewdBooks.item(out).classList.contains("hide")){
                        viewdBooks.item(out).classList.remove("hide");
                    }
                    break;
                    // break;
                }else r=-1;
                
            }
            if(r<0){ 
                console.log(viewdBooks.item(out))
                viewdBooks.item(out).className+=" hide";
            }
        }

        
        //do matching algorithm;
    }
)
searchInput.addEventListener(
    "change",(ev)=>{
        keywords= ev.target.value;
    }
)


/*function findMatch(txt, pattern){
    const keywords = txt.split(" ");
    // console.log(keywords);
    const patternKeywords=pattern.split(" ");
    let strength=0;
    for(let io=0, n=keywords.length, m=patternKeywords.length; io<n; io++){
        for(let ip=0; ip<m; ip++){
            // console.log(keywords[io], patternKeywords[ip]);
            if(keywords[io].toLowerCase()==patternKeywords[ip].toLowerCase()) {
                strength+=1;
                // console.log("equals");
            }
        }
    }
    return strength;
}
*/


function computeOcc(pattern){
    const table=[];
    for(let index=0,n=pattern.length; index<128; index++){
        if (index < n) {
            table[pattern[index].charCodeAt(0)] = index;
        }else if(index>n && table[index]>0){continue;}
        else
        table[index] = -1;
    }
    return table;
}

function findMatch(txt,pat){
    txt=txt.toLowerCase();
    pat=pat.toLowerCase();
    const occTable = computeOcc(pat);
    const nT=txt.length, nP=pat.length;
    let start = 0, last;
    console.log("occurrence table :",occTable[txt[start+last]]);
    while(start <= (nT-nP)){
        last=nP-1;
        console.log( "start at:",start, "letter:",txt[start]);
        
        console.log( "last at:",last, "\ntxt letter comparing:",txt[start+last], "pattern letter:",pat[last])
        while(pat[last]==txt[start+last]){
            last--;
            if(last<0)return start;
        }
        if(last<occTable[txt[start+last]]) { start++; }// look for the index or the movement of the character of the txt aligned with the last charactrer of pattern :: simply it says yes character in the range and search for its index to silde the pattern
        else {start = start + (last-occTable[txt[start+last].charCodeAt(0)]);} // slide the or get it return-back
    }
    return -1; 
}