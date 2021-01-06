import {BookPreview} from '../cmps/book-preview.jsx'

export function BookList({books , onBookPreview}){
    return (
        books.map(book =>{
            return <BookPreview book={book} key={book.id} onBookPreview={onBookPreview}/>
        })
    )


}