import { bookServise } from "../services/book-service.js";
import { BookAdd } from "../cmps/book-add.jsx";
import { BookList } from "../cmps/book-list.jsx";
import { BookFilter } from "../cmps/book-filter.jsx";

const {Link } = ReactRouterDOM


export class BookApp extends React.Component {
  state = {

    books: [],

    filterBy: {
      title: "",
    },

    selectedBook: null,
  };

  componentDidMount() {
    this.loadBooks();
  }


  loadBooks = () => {
    bookServise.query()
      .then(books=>{
      this.setState({ books });

    })
  };

  getBooksForDisplay = () => {
    const { filterBy } = this.state;
    return this.state.books.filter((book) => {
      return book.title.toLowerCase().includes(filterBy.title.toLowerCase());
    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy });
  };


  onBookPreview = (book) => {
    this.setState({
      selectedBook : book
    })
  };



  onCloseModal = () =>{

    this.setState({
      selectedBook :null
    })

  }




  isLongRead = () =>{

    var pageNum = this.state.selectedBook.pageCount
    var pageLength


    switch (true){
      case pageNum > 500:
        pageLength = 'Long reading'
        break;
      case pageNum > 200:
        pageLength = 'Decent Reading'
        break;
      case pageNum < 100:
        pageLength = 'Light Reading'
        break;

    }

    return pageLength

  }

  isBookNew = () =>{
    var bookYear = this.state.selectedBook.publishedDate
    var howManyYears = 2020 - bookYear
    var bookAge;

    switch (true){
      case howManyYears > 10:
        bookAge = 'Veteran Book'
        break;
      case howManyYears < 10:
        bookAge = 'New!'
        break;
    }

    return bookAge
    
  }


  priceCurrency = ()=>{
    var symbolTxt = this.state.selectedBook.listPrice.currencyCode
    var symbol;

    switch(symbolTxt){
      case 'ILS':
        symbol = '₪'
        break;
      case 'USD':
        symbol = '$'
        break;
      case 'EUR':
        symbol = '€'
        break;

    }
    return symbol
  }



  priceColor = () =>{
    var price = this.state.selectedBook.listPrice.amount
    if (price > 150) return 'red'
    else if(price < 20) return 'green'
    
  }


  isOnSale = () =>{
    var isSale = this.state.selectedBook.listPrice.isOnSale
    if (isSale) return 'THE BOOK IS ON SALE!'
  }
  onAdding=()=>{
    this.loadBooks()
  }

  render() {
    return (
      
      <section className="book-app">

          <div className="books-inputs">
            <BookFilter setFilter={this.onSetFilter} />
            <BookAdd onAdding={this.onAdding}/>
          </div>


        <h2 className="books-header">My Books!</h2>
        <section className="book-list">
          <BookList
            books={this.getBooksForDisplay()}
            onBookPreview={this.onBookPreview}
          />
        </section>



        {this.state.selectedBook && <div className="modal-book">
          <div className="modal-content-book">

            <div className="modal-header-book">
              <span className="close" onClick={()=>this.onCloseModal()}>&times;</span>
              <h2 className="modal-book-name">Book Name: {this.state.selectedBook.title}</h2>
              <h2 className="modal-book-price">Price: <span className={this.state.selectedBook && this.priceColor()}>{this.state.selectedBook.listPrice.amount}</span>
              {this.state.selectedBook && this.priceCurrency()}</h2>
            </div>

            <div className="modal-img">
              <img src={this.state.selectedBook.thumbnail} alt=""/>
            </div>

            <div className="modal-body-book">
              <h1 className="modal-book-sale">{this.state.selectedBook && this.isOnSale()}</h1>
              <p>{this.state.selectedBook && this.isBookNew()}</p>
              <p>{this.state.selectedBook && this.isLongRead()}</p>
              <p><span>Description:</span> {this.state.selectedBook.description}</p>
              <p className="modal-book-review"><Link to={`/book/reviews/${this.state.selectedBook.id}`}><span>Reviews</span> </Link> </p>
            </div>

          </div>
        </div>}

      </section>
    );
  }
}



