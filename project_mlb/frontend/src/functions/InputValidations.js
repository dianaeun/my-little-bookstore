export const vaildateReviewInput = (title, content) => {
    if (title.trim().length === 0 || content.trim().length === 0){
        return false;
    }
    return true;
}

export const validateISBN = (isbn) => {
    if (isbn.trim().length !== 13 || isNaN(isbn)){
        return false;
    }
    if (isbn.slice(0, 3) !== "978" && isbn.slice(0, 3) !== "979") {
        return false;
    }
    const isbnVal = isbn.slice(0, 12);
    const isbnCheck = parseInt(isbn.slice(12));
    var odd = true;
    var check = 0;
    for (let c of isbnVal) {
        if(odd) {
            check = check + parseInt(c);
        }
        else {
            check = check + 3 * parseInt(c);
        }
        odd = !odd;
    }
    check = check % 10;
    if(check === 0 && isbnCheck === 0) {
        return true;
    }
    else if (check !== (10-isbnCheck)){
        return false;
    }
    return true;
}

export const validateEditbookInput = (title,author,publisher,price) =>{
    if (title.trim().length === 0 || author.trim().length === 0 || publisher.trim().length === 0 || price.trim().length === 0){
        return false;
    }

    return true;
}


//tag.trim().length === 0 || title.trim().length === 0 || content.trim().length === 0