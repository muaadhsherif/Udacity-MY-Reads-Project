import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

export default class Search extends Component {
	state = {
		searchedBooks: [],
	}

	shelfs = [
		{ title: 'Currently Reading', value: 'currentlyReading' },
		{ title: 'Want To Read', value: 'wantToRead' },
		{ title: 'Read', value: 'read' },
		{ title: 'Uncategorized', value: 'none' },
	]

	search = (query) => {
		query.length
			? BooksAPI.search(query, 20).then((searchedBooks) => {
					if (Array.isArray(searchedBooks)) {
						let books = searchedBooks.map((book) => {
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
							searchedBooks: books,
						}))
					} else {
						this.setState((c) => ({
							searchedBooks: [],
						}))
					}
			  })
			: this.setState((c) => ({
					searchedBooks: [],
			  }))
	}

	filterShelfs = (shelf) =>
		this.state.searchedBooks.filter((b) => b.shelf === shelf)

	changeShelf = (bookID, newShilf) => {
		let index
		BooksAPI.update(bookID, newShilf)
		BooksAPI.get(bookID).then((newBook) => {
			newBook.shelf = newShilf

			this.state.searchedBooks.forEach((b, i) => {
				if (b.id === newBook.id) {
					index = i
				}
			})
			index
				? (this.state.searchedBooks.splice(index, 1, newBook),
				  this.setState((currentState) => ({})))
				: this.setState((currentState) => ({
						books: currentState.searchedBooks.concat(newBook),
				  }))
		})
		this.props.changeShelf(bookID, newShilf)
	}

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
						changeShelf={this.changeShelf}
					/>
				</div>
			</div>
		)
	}
}
