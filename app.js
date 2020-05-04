
//class names
const YES ="fa-check-circle"
const NO ="fa-times-circle"


// Book Class: Represents a Book
class Book {
    constructor(title, author, pages, readStatus) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.readStatus = readStatus;
    }
  }

  // UI Class: Handle UI Tasks
class UI {
    static displayBooks() {

        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
    
        const row = document.createElement('tr');
    
        row.innerHTML = ` 
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td>${book.readStatus}</td>
          <td><i class="fa fa-trash-o fa-lg delete" ></i></td>
        `;
    
        list.appendChild(row);
      }

      static deleteBook(el) {
        if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
        }
      }

      static changeStatus(el) {
        if(el.classList.contains('change')) {
          el.classList.toggle(YES);
          el.classList.toggle(NO);
        }
       
      }

    static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

      static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.getElementById('readStatus').checked = false;
        
      }
    }

    // Store Class: Handles Storage
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(title) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.title === title) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }


    static readOrNot(title) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.title === title) {
         if (book.readStatus===`<i class="fa fa-check-circle fa-lg change" ></i>`) {book.readStatus=`<i class="fa fa-times-circle fa-lg change" ></i>`} 
         else 
         {
           book.readStatus=`<i class="fa fa-check-circle fa-lg change" ></i>`}
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }

  }


  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const readStatus = document.getElementById('readStatus').checked===true ? `<i class="fa fa-check-circle fa-lg change" ></i>` : `<i class="fa fa-times-circle fa-lg change" ></i>`;
  
    // Validate
    if(title === '' || author === '' || pages === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate book
      const book = new Book(title, author, pages, readStatus);
  
      // Add Book to UI
      UI.addBookToList(book);
  
      // Add book to store
      Store.addBook(book);
  
      // Show success message
      UI.showAlert('Book Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Book
  document.querySelector('#book-list').addEventListener('click', (e) => {
   
    if(e.target.classList.contains('change')){
      UI.changeStatus(e.target);
      Store.readOrNot(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    } 
    else
    {

    // Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Book Removed', 'success');
    }
    
  });

  
const backToTopBtn = document.querySelector('#topBtn')
const backToDownBtn = document.querySelector('#downBtn')


// window.addEventListener("scroll", ()=> {
//   let menuArea = document.getElementById('menu-area')
//   if(window.pageYOffset > 0){
//     menuArea.classList.add("cus-nav")
//   }
//   else 
//   {
//     menuArea.classList.remove("cus-nav")
//   }
// })


window.addEventListener("scroll", scrollFunction)

function scrollFunction() {

  if(window.pageYOffset > 100) {
    if(!backToTopBtn.classList.contains("btnEntrance")) {
      backToTopBtn.classList.remove("btnExit");
      backToTopBtn.classList.add("btnEntrance");
      backToTopBtn.style.display = "block";

      backToDownBtn.classList.add("btnExit");
      backToDownBtn.classList.remove("btnEntrance");
      setTimeout(function() {
        backToDownBtn.style.display = "none";
      }, 250);
    }
  }
  else
  {
    if(backToTopBtn.classList.contains("btnEntrance")) {
      backToTopBtn.classList.remove("btnEntrance");
      backToTopBtn.classList.add("btnExit");
      setTimeout(function() {
        backToTopBtn.style.display = "none";
      }, 250);

      backToDownBtn.classList.remove("btnExit");
      backToDownBtn.classList.add("btnEntrance");
      backToDownBtn.style.display = "block";
    }
  }
}


backToTopBtn.addEventListener("click", backToTop)
backToDownBtn.addEventListener("click", backToDown)


function backToTop () {
  window.scrollTo(0,0)
}

function backToDown () {
  window.scrollTo(0,document.body.scrollHeight)
}
  
const pdfbtn = document.querySelector('#pdf')
pdfbtn.addEventListener("click", tableToExcel)

//create excel 
var tableToExcel = (function() {
var uri = 'data:application/vnd.ms-excel;base64,'
  , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
  , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
  , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
return function(table, name) {
  if (!table.nodeType) table = document.getElementById(table)
  var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
  window.location.href = uri + base64(format(template, ctx))
}
})()

