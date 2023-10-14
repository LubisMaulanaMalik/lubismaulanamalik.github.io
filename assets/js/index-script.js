const arrBook = [];
const STORAGE_KEY = "list_book";
const RELOAD_DATA = "reload_data";
let ID_FOR_EDIT;
let NUMBER_MENU = 1;

const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul')

menuToggle.addEventListener('click', function(){
    nav.classList.toggle('slide'); 
});

function makeBook(id, title, author, year, isCompleted){
    return{
        id, title, author, year, isCompleted
    }
}

function generateId(){
    return +new Date();
}

function saveData(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arrBook));
}

function findIdIndex(id){
    for (let index in arrBook){
        if (id === arrBook[index].id){
            return index;
        }
    }
    return-1;
}

function findId(id){
    for (let book of arrBook){
        if (id === book.id){
            return book;
        }
    }
    return null;
}

function loadHal(){
    const books = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (books !== null){
        for (let book of books){
            arrBook.push(book);
        }
    }

    hideElemenEdit();
    hideElemenTambah();

    document.getElementById("card-books-container").style.display = "flex";
    document.getElementById("card-books-container").style.flexWrap = "wrap";
    document.getElementById("card-unread-container").style.display = "none";
    document.getElementById("card-unread-container").style.flexWrap = "wrap";
    document.getElementById("card-read-container").style.display = "none";
    document.getElementById("card-read-container").style.flexWrap = "wrap";

    document.dispatchEvent(new Event(RELOAD_DATA));
}

document.addEventListener(RELOAD_DATA, function(){
    const listBooks = document.getElementById("card-books-container");
    const unreadBooks = document.getElementById("card-unread-container");
    const readBooks = document.getElementById("card-read-container");

    listBooks.innerHTML = "";
    unreadBooks.innerHTML = "";
    readBooks.innerHTML = "";

    for (let book of arrBook){
        const {bookCard1, bookCard2} = makeCard(book);
        if(!book.isCompleted){
            listBooks.append(bookCard1);
            unreadBooks.append(bookCard2);
        }else{
            listBooks.append(bookCard1);
            readBooks.append(bookCard2);
        }
    }
    refreshHal();
});

function makeCard(book){
    const bookCard1 = document.createElement("div");
    bookCard1.setAttribute("class", "card");
    const bookCard2 = document.createElement("div");
    bookCard2.setAttribute("class", "card");

    const h2Card1 = document.createElement("h2");
    h2Card1.setAttribute("class", "title-book");
    h2Card1.innerText = book.title;
    const h2Card2 = document.createElement("h2");
    h2Card2.setAttribute("class", "title-book");
    h2Card2.innerText = book.title;

    const divAuthor1 = document.createElement("div");
    divAuthor1.style.display = "flex";
    const divAuthor2 = document.createElement("div");
    divAuthor2.style.display = "flex";

    const pAuthorTab1 = document.createElement("p");
    pAuthorTab1.setAttribute("class", "p-author");
    pAuthorTab1.innerText = "Author";
    const pAuthorName1 = document.createElement("p");
    pAuthorName1.innerText = ": "+book.author;

    const pAuthorTab2 = document.createElement("p");
    pAuthorTab2.setAttribute("class", "p-author");
    pAuthorTab2.innerText = "Author";
    const pAuthorName2 = document.createElement("p");
    pAuthorName2.innerText = ": "+book.author;

    divAuthor1.append(pAuthorTab1, pAuthorName1);
    divAuthor2.append(pAuthorTab2, pAuthorName2);

    const divYear1 = document.createElement("div");
    divYear1.style.display = "flex";
    const divYear2 = document.createElement("div");
    divYear2.style.display = "flex";

    const pYearTab1 = document.createElement("p");
    pYearTab1.setAttribute("class", "p-year");
    pYearTab1.innerText = "Year";
    const pYear1 = document.createElement("p");
    pYear1.innerText = ": "+book.year;

    const pYearTab2 = document.createElement("p");
    pYearTab2.setAttribute("class", "p-year");
    pYearTab2.innerText = "Year";
    const pYear2 = document.createElement("p");
    pYear2.innerText = ": "+book.year;

    divYear1.append(pYearTab1, pYear1);
    divYear2.append(pYearTab2, pYear2);

    const divStatus = document.createElement("div");
    divStatus.style.display = "flex";
    const pStatusTab = document.createElement("p");
    pStatusTab.setAttribute("class", "p-isCompleted")
    pStatusTab.innerText = "Status";
    const pStatus = document.createElement("p");

    const divButton1 = document.createElement("div");
    divButton1.style.display = "flex";
    divButton1.style.gap = "35px";
    const divButton2 = document.createElement("div");
    divButton2.style.display = "flex";
    divButton2.style.gap = "35px";

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.innerText = "Edit";
    editButton.addEventListener('click', function(){
        ID_FOR_EDIT = book.id;
        hideElemenBookList();
        document.querySelector(".edit_section").style.display = "flex";

        document.querySelector(".title-edit").value = book.title;
        document.querySelector(".author-edit").value = book.author;
        document.querySelector(".year-edit").value = book.year;
        document.querySelector(".check-edit").checked = book.isCompleted;
    });

    const trashButton = document.createElement('button');
    const trash2Button = document.createElement('button');
    trashButton.classList.add('delete-button');
    trashButton.innerText = "Delete";
    trash2Button.classList.add('delete-button');
    trash2Button.innerText = "Delete";
    trashButton.addEventListener('click', function () {
        removeBook(book.id);
    });
    trash2Button.addEventListener('click', function () {
        removeBook(book.id);
    });

    divButton1.append(editButton, trashButton);

    if(book.isCompleted){
        pStatus.innerText = ": Buku Sudah Dibaca";
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');
        undoButton.innerText = "Undo";
        undoButton.addEventListener('click', function () {
            undoBookFromCompleted(book);
        });

        divButton2.append(undoButton, trash2Button);
    }else{
        pStatus.innerText = ": Buku Sedang Dibaca";
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
        checkButton.innerText = "Selesai";
        checkButton.addEventListener('click', function () {
            addBookToCompleted(book);
        });

        divButton2.append(checkButton, trash2Button);
    }

    divStatus.append(pStatusTab,pStatus);

    bookCard1.append(h2Card1, divAuthor1, divYear1, divStatus, divButton1);
    bookCard2.append(h2Card2, divAuthor2, divYear2, divButton2);

    return {bookCard1, bookCard2};
}

function addBook(){
    const id = generateId();
    const title = document.getElementById("title-book").value;
    const author = document.getElementById("author-book").value;
    const year = document.getElementById("year-book").value;
    const isCompleted = document.getElementById("check-complete").checked;

    const book = makeBook(id, title, author, year, isCompleted);

    arrBook.push(book);
    document.dispatchEvent(new Event(RELOAD_DATA));
    saveData();
}

function addButtonBook(){
    hideElemenBookList();
    document.querySelector(".input_section").style.display = "flex";
}

function removeBook(id){
    const index = findIdIndex(id);
    console.log(index);
    if (index === -1)return;

    arrBook.splice(index, 1);
    document.dispatchEvent(new Event(RELOAD_DATA));
    saveData();
}

function tabMenu(menu){
    if (menu === 1){
        hideElemenEdit();
        hideElemenBookList();
        hideElemenTambah();

        document.getElementById("card-books-container").style.display = "flex";
        refreshHal();
    } else if (menu === 2){
        hideElemenEdit();
        hideElemenBookList();
        hideElemenTambah();

        document.getElementById("card-unread-container").style.display = "flex";
        refreshHal();
    } else if (menu === 3){
        hideElemenEdit();
        hideElemenBookList();
        hideElemenTambah();

        document.getElementById("card-read-container").style.display = "flex";
        refreshHal();
    }
}

function addBookToCompleted(book){
    book.isCompleted = true;
    document.dispatchEvent(new Event(RELOAD_DATA));
    saveData();
}

function undoBookFromCompleted(book){
    book.isCompleted = false;
    document.dispatchEvent(new Event(RELOAD_DATA));
    saveData();
}

document.querySelector(".tambah-button").addEventListener('click', function(){
    addButtonBook();
});

document.getElementById("daftar-buku").addEventListener('click', function(){
    NUMBER_MENU = 1;
    tabMenu(NUMBER_MENU);
});

document.getElementById("sedang-dibaca").addEventListener('click', function(){
    NUMBER_MENU = 2;
    tabMenu(NUMBER_MENU);
});

document.getElementById("selesai-dibaca").addEventListener('click', function(){
    NUMBER_MENU = 3;
    tabMenu(NUMBER_MENU);
});

document.addEventListener('DOMContentLoaded', function () {
    loadHal();
    const inputForm = document.getElementById('inputBook');
  
    inputForm.addEventListener('submit', function (event) {
        addBook();
    });

    const editForm = document.getElementById('editBook');

    editForm.addEventListener('submit', function (event) {
        const editedBook = findId(ID_FOR_EDIT);
        editedBook.title = document.querySelector(".title-edit").value;
        editedBook.author = document.querySelector(".author-edit").value;
        editedBook.year = document.querySelector(".year-edit").value;
        editedBook.isCompleted = document.querySelector(".check-edit").checked;

        document.dispatchEvent(new Event(RELOAD_DATA));
        saveData();
    });
});

function hideElemenBookList(){
    document.getElementById("card-books-container").style.display = "none";
    document.getElementById("card-unread-container").style.display = "none";
    document.getElementById("card-read-container").style.display = "none";
}

function hideElemenEdit(){
    document.querySelector(".edit_section").style.display = "none";
}

function hideElemenTambah(){
    document.querySelector(".input_section").style.display = "none";
}

window.addEventListener('resize', function(){
    refreshHal();
});

function refreshHal(){
    const windowWidth = window.innerWidth;
    const card1 = document.querySelectorAll("#card-books-container .card");
    const card2 = document.querySelectorAll("#card-read-container .card");
    const card3 = document.querySelectorAll("#card-unread-container .card");
    if (windowWidth > 1620){
        // 4 item
        if (card1.length > 6){
            for(let item of card1){
                item.style.margin = "10px auto";
            }
        } else{
            for(let item of card1){
                item.style.margin = "10px";
            }
        }

        if (card2.length > 6){
            for(let item of card2){
                item.style.margin = "10px auto";
            }
        } else{
            for(let item of card2){
                item.style.margin = "10px";
            }
        }

        if (card3.length > 6){
            for(let item of card3){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card3){
                item.style.margin = "10px";
            }
        }
    }else if (windowWidth > 1350){
        // 4 item
        if (card1.length > 5){
            for(let item of card1){
                item.style.margin = "10px auto";
            }
        } else{
            for(let item of card1){
                item.style.margin = "10px";
            }
        }

        if (card2.length > 5){
            for(let item of card2){
                item.style.margin = "10px auto";
            }
        } else{
            for(let item of card2){
                item.style.margin = "10px";
            }
        }

        if (card3.length > 5){
            for(let item of card3){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card3){
                item.style.margin = "10px";
            }
        }
    }else if (windowWidth > 1080){
        // 4 item
        if (card1.length > 4){
            for(let item of card1){
                item.style.margin = "10px auto";
            }
        } else{
            for(let item of card1){
                item.style.margin = "10px";
            }
        }

        if (card2.length > 4){
            for(let item of card2){
                item.style.margin = "10px auto";
            }
        } else{
            for(let item of card2){
                item.style.margin = "10px";
            }
        }

        if (card3.length > 4){
            for(let item of card3){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card3){
                item.style.margin = "10px";
            }
        }
    }else if (windowWidth > 810){
        // 3 item
        if (card1.length > 3){
            for(let item of card1){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card1){
                item.style.margin = "10px";
            }
        }

        if (card2.length > 3){
            for(let item of card2){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card2){
                item.style.margin = "10px";
            }
        }

        if (card3.length > 3){
            for(let item of card3){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card3){
                item.style.margin = "10px";
            }
        }
    }else if(windowWidth > 540){
        // 2 item
        if (card1.length > 2){
            for(let item of card1){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card1){
                item.style.margin = "10px";
            }
        }

        if (card2.length > 2){
            for(let item of card2){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card2){
                item.style.margin = "10px";
            }
        }

        if (card3.length > 2){
            for(let item of card3){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card3){
                item.style.margin = "10px";
            }
        }
    }else{
        // 2 item
        if (card1.length > 1){
            for(let item of card1){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card1){
                item.style.margin = "10px";
            }
        }

        if (card2.length > 1){
            for(let item of card2){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card2){
                item.style.margin = "10px";
            }
        }

        if (card3.length > 1){
            for(let item of card3){
                item.style.margin = "10px auto";
            }
        }else{
            for(let item of card3){
                item.style.margin = "10px";
            }
        }
    }
}

function searchWord(){
    const keyWordSearch = document.getElementById("keyWordSearch").value.trim(); 
    let containers;

    if (NUMBER_MENU === 1) {
        containers = document.querySelectorAll("#card-books-container .title-book");
    } else if (NUMBER_MENU === 2) {
        containers = document.querySelectorAll("#card-unread-container .title-book");
    } else if (NUMBER_MENU === 3) {
        containers = document.querySelectorAll("#card-read-container .title-book");
    }

    for (let item of containers) {
        const title = item.innerText.toLowerCase(); 
        
        if (!title.includes(keyWordSearch.toLowerCase())) {
            item.closest(".card").style.display = "none"; 
        } else {
            item.closest(".card").style.display = "block";
        }
    }
}

document.getElementById('searchCard').addEventListener('click', function (event) {
    event.preventDefault();
    searchWord();
});