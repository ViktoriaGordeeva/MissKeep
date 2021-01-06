import { bookServise } from "../services/book-service.js";

export class BookReview extends React.Component {
  state = {
    book: null,
    review:{review :'' , score:0}
  };

  componentDidMount() {
    const { bookId } = this.props.match.params;

    bookServise.getById(bookId).then((book) => {
      this.setState({ book });
      
    });

  }

  goBack = () => {
    this.props.history.goBack();
  };

  onSaveBookReview = (ev) => {
    ev.preventDefault();


    if (this.state.book.score < 0 || this.state.book.score === "") {
      return;
    }

    const { bookId } = this.props.match.params;

    bookServise.save(this.state.review , bookId ).then((review) => {

      this.setState({
        book: {
          ...this.state.book,
          reviews: [review, ...this.state.book.reviews],
        },

      });

    });

  };

  onInputChange = (ev) => {
    const value =
      ev.target.type === "number" ? +ev.target.value : ev.target.value;


    this.setState({
      review: {...this.state.review , [ev.target.name] : value},
    });
  };

  render() {
    if (!this.state.book) return <h1>Loading..</h1>;
    return (
      <form onSubmit={this.onSaveBookReview} className="review-form">
        <button onClick={this.goBack} className="review-goBack-btn">Go back</button>
        <h2 className="review-name">Book Name: {this.state.book.title}</h2>
        {this.state.book.reviews && (
          <div className="reviews-name2">
            <span>Book Reviews:</span> 
            {this.state.book.reviews.map((review, idx) => {
              return (
                <div key={idx}>
                  <p>
                    {review.review} {review.score}/10
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="review-text-area">
          <textarea
            className="text-area-field"
            name="review"
            cols="50"
            rows="10"
            placeholder="Review Area"
            onChange={this.onInputChange}
          ></textarea>
        </div>

        <div className="review-input-score">
          <input 
            className="input-score-field"
            type="number"
            name="score: "
            placeholder="Score"
            min="0"
            max="10"
            onChange={this.onInputChange}
          />
        </div>

        <div className="review-btn-submit">
          <button type="submit" className="review-add-btn">Add Review</button>
        </div>
      </form>
    );
  }
}

