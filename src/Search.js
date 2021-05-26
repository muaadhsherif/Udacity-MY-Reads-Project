import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

export default class Search extends Component {
	state = {
		searchedBooks: [],
	}

	shelfs = [
		{ title: 'None', value: 'none' },
		{ title: 'Currently Reading', value: 'currentlyReading' },
		{ title: 'Want To Read', value: 'wantToRead' },
		{ title: 'Read', value: 'read' },
	]

	search = (query) => {
		query.length &&
			BooksAPI.search(query, 20).then((searchedBooks) => {
				if (searchedBooks.length) {
					searchedBooks.map((book) => {
						this.props.books.forEach((b) => {
							if (book.id === b.id) {
								book.shelf = b.shelf
							}
						})
						if (!book.hasOwnProperty('shelf')) {
							book.shelf = 'none'
						}

						return book
					})
					this.setState((c) => ({
						searchedBooks: searchedBooks,
					}))
				}
			})
	}

	/* filterShelfs = (shelf) => {
		console.log(this.state.searchedBooks)
		return this.state.searchedBooks.filter((book) => book.shelf === shelf)
	} */

	filterShelfs = (shelf) =>
		this.state.searchedBooks.filter((b) => b.shelf === shelf)

	render() {
		return (
			<div className='search-books'>
				<div className='search-books-bar'>
					<h1>{this.state.n}</h1>

					<Link className='close-search' to='/'>
						Close
					</Link>
					<div className='search-books-input-wrapper'>
						<input
							type='text'
							placeholder='Search by title or author'
							onChange={(e) => this.search(e.target.value.trim())}
						/>
					</div>
				</div>
				<div className='search-books-results'>
					<ol className='books-grid'></ol>
					<Books
						shelfs={this.shelfs}
						filterShelfs={this.filterShelfs}
						changeShelf={this.props.changeShelf}
					/>
				</div>
			</div>
		)
	}
}
