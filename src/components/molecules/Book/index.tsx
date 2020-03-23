import React from 'react';
import styled from 'styled-components';

import AddToCart from '../Cart/AddToCart';

/**
 * Styled book and wrapper
 */
const BookCardStyle = styled.div`
	padding-top: 10px;
	padding-bottom: 40px;

	img {
		width: 100%;
	}

	@media (min-width: 1199px) {
		flex-basis: 25%;
		padding: 20px 10px 50px;
	}
`;

const BookTitle = styled.div`
	font-size: 20px;
	padding-top: 10px;
	font-weight: 600;
`;

const BookSynopsis = styled.div`
	font-size: 14px;
	padding-top: 10px;
	line-height: 20px;
`;

const ActionsWrapper = styled.div`
	padding-top: 15px;
	font-size: 16px;

	> :first-child {
		float: left;
		padding-top: 5px;
	}
	> :last-child {
		float: right;
	}
	&::after {
		clear: both;
		content: "";
		display: table;
	}
`;

/**
 * Book props and component
 */
export interface Book {
	isbn: string;
	title: string;
	price: number;
	cover: string;
	synopsis: string[];
}
export interface BookCardProps {
	book: Book;
	isCartPage?: boolean;
}

const BookCard = (props: BookCardProps) => {
	const { book, isCartPage } = props;
	const { cover, title, synopsis, price } = book;

	return (
		<BookCardStyle>
			<img src={cover} alt={title}/>
			<BookTitle>{title}</BookTitle>
			<BookSynopsis>
				{synopsis.length && synopsis[0].length > 150 ?
					synopsis[0].substr(0, 150).concat('...') :
					synopsis[0]}
			</BookSynopsis>
			{!isCartPage && (
				<ActionsWrapper>
					<span>{price} €</span>
					<AddToCart book={book} />
				</ActionsWrapper>
			)}
		</BookCardStyle>
	)
}

export default BookCard;