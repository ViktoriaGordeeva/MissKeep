export function BookPreview({ book, onBookPreview }) {
  return (
    <article className="book-preview">
      <div className="img-container">
        <img
          className="book-img"
          src={book.thumbnail} 
          onClick={() => onBookPreview(book)}
        />
      </div>
    </article>
  );
}
