const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }

    addBook () {
        const container = document.querySelector('.main-container');
        const bookCard = document.createElement('ul');
        bookCard.classList.add('book-info');
        const bookContent = document.createElement ('li');
        const button = document.createElement('button');
        bookCard.classList.add('book-card');
            bookContent.textContent = `${this.title}`;
            bookContent.classList.add('title');
            bookCard.appendChild(bookContent.cloneNode(1));
            bookContent.classList.remove('title');
        bookContent.textContent = `Author: ${this.author}`;
            bookCard.appendChild(bookContent.cloneNode(1));
            bookContent.textContent = `Pages: ${this.pages}`;
            bookCard.appendChild(bookContent.cloneNode(1));
        button.classList.add('read');
            button.textContent = this.read ? `Read` : `Unread`;
            bookCard.appendChild(button.cloneNode(1));
        button.classList.add('delete');
            button.classList.remove('read');
            button.textContent = 'Delete Book';
            bookCard.appendChild(button.cloneNode(1));
        container.appendChild(bookCard);
     const bookIndex = myLibrary.findIndex((element)=> {
        return element.title === `${this.title}`;   
     });   

    bookCard.dataset.indexNumber = bookIndex;
        const cardData = document.querySelector('[data-index-number=\"' + bookIndex +'\"]')
        const deleteBtn = cardData.querySelector('.delete');
        eventListener(deleteBtn);
        const readBtn = cardData.querySelector(".read");
        readBtn.addEventListener('click', (e) =>{
        const indexNum = parseInt(e.target.parentNode.dataset.indexNumber);
            myLibrary[indexNum].changeRead();
         })         
    
    }


    deleteBook() {
    const bookIndex = myLibrary.findIndex((element)=> {
        return element.title === `${this.title}`;
        });
    const container = document.querySelector('.main-container');
    const bookCard = document.querySelector('[data-index-number=\"' + bookIndex +'\"]')
   container.removeChild(bookCard);
    myLibrary.splice(bookIndex, 1);
   }

   changeRead = function () {
    this.read ? this.read = false : this.read = true;
    const bookIndex = myLibrary.findIndex((element)=> {
        return element.title === `${this.title}`;
        });
    const bookCard = document.querySelector('[data-index-number=\"' + bookIndex +'\"]')
    const readBtn = bookCard.querySelector('.read');
    readBtn.textContent = this.read ? `Read` : `Unread`;
    


}



}




function changeIndex (book) {
    let bookTitle = Array.from(document.querySelectorAll('.title'))
    const titleArray = bookTitle.map((books) => {
        return books.textContent;
    }); 

    const bookIndex = myLibrary.findIndex((element)=> {
        return element.title === `${book.title}`;
        });
    for (i=0; i <titleArray.length; i++) {
        if (titleArray[i] === book.title) {
        bookTitle[i].parentNode.dataset.indexNumber = bookIndex;
        } else {

        };

    }

}



function addBooktoLibrary(book) {
    const newbook = new Book(book[0], book[1], book[2], book[3]);
    myLibrary.push(newbook);
    newbook.addBook();


}

addBooktoLibrary(['The Hobbit', 'J.R.R. Tolkein', '295', 'read']);

const newBook = document.querySelector('.add-book');
const bookForm = document.querySelector('.book-form');
newBook.addEventListener('click',  () => {
    bookForm.showModal();
});


const submitBtn = document.querySelector('.submit');
submitBtn.addEventListener('click', (event) => {
    formCheck(event);
});

const cancelBtn = document.querySelector('.cancel');
cancelBtn.addEventListener('click', (event) =>{
    const inputs = document.querySelector('#bookForm');
        event.preventDefault(); 
        bookForm.close(event.value);
        inputs.reset();
})

function getInput(event) {
   const inputs = document.querySelector('#bookForm');
   const formResults = inputs.elements;
    const bookDetails = [];
    bookDetails.push(formResults[0].value, formResults[1].value, formResults[2].value, formResults[3].checked)
    event.preventDefault();
    bookForm.close(event.value)
    inputs.reset();

    return bookDetails;
}



function eventListener(e) {
    e.addEventListener('click', (event) => {
const indexNum = parseInt(event.target.parentNode.dataset.indexNumber);
        myLibrary[indexNum].deleteBook();
        for(t=0; t < myLibrary.length; t++) {
            changeIndex(myLibrary[t]);
           }
    });
}

function formCheck (event) {
    const title = checkTitle();
    const author = checkAuthor();
    const pages = checkPages();
    

 if(title && author && pages) {
    const bookDetails = getInput(event);
        addBooktoLibrary(bookDetails);
 }
   
}


function checkTitle() {
    const title = document.querySelector('#title');
    if (title.validity.valueMissing) {
        console.log('wrong');
        title.setCustomValidity('Please Include A Title');
    }
    else {
        console.log('right');
        title.setCustomValidity('');
        return true;
    }
}

function checkAuthor() {
    const author = document.querySelector('#author');

    if (author.validity.valueMissing) {
        console.log('wrong');
        author.setCustomValidity('Please Include An Author');
    }
    else {
        console.log('right');
        author.setCustomValidity('');
        return true;
         }
    }

    function checkPages() {
        const pages = document.querySelector('#pages');

        if(pages.validity.valueMissing){
            pages.setCustomValidity('Please Include Pages');
            
        }
        else {
            pages.setCustomValidity('');
            return true;
        }
    }
