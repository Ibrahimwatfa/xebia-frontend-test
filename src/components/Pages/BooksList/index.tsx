import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getBooks } from '../../../services/request';

import BookCard, { Book } from '../../molecules/Book';

export const BooksWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;

	@media (min-width: 1200px) {
		flex-direction: row;
	}
`;

const BooksList = () => {
  const [booksList, setBooksList] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const getBooksList = await getBooks();

    setBooksList(getBooksList);
  }

  useEffect(() => {
    fetchBooks();
  }, []);


  return (
    booksList && (
      <BooksWrapper>
        {booksList.map((book: Book) => (<BookCard key={book.isbn} book={book} />))}
      </BooksWrapper>
    )
  );
}

export default BooksList;