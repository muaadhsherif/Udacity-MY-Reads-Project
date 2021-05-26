import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Books from './Books.js'

export default class BooksList extends Component {
	shelfs = [
		{ title: 'Currently Reading', value: 'currentlyReading' },
		{ title: 'Want To Read', value: 'wantToRead' },
		{ title: 'Read', value: 'read' },
	]

	filterShelfs = (shelf) =>
		this.props.books.filter((book) => book.shelf === shelf)

	render() {
		return (
			<div>
				<div className='list-books'>
					<div className='list-books-title'>
						<h1>MyReads</h1>
					</div>
					<Books
						shelfs={this.shelfs}
						filterShelfs={this.filterShelfs}
						changeShelf={this.props.changeShelf}
					/>
				</div>
				<div className='open-search'>
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		)
	}
}
