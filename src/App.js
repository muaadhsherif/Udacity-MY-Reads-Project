import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router'
import Search from './Search'
import BooksList from './BooksList'

class BooksApp extends React.Component {
	state = {
		books: [],
	}

	changeShelf = (bookID, newShilf) => {
		let index
		console.log(newShilf)
		BooksAPI.update(bookID, newShilf)
		BooksAPI.get(bookID).then((newBook) => {
			newBook.shelf = newShilf

			this.state.books.forEach((b, i) => {
				if (b.id === newBook.id) {
					index = i
				}
			})
			index
				? //this.state.books.splice(index, 1, newBook)
				  this.setState((currentState) => ({
						books: currentState.books
							.filter((val, ind) => ind !== index)
							.concat(newBook),
				  }))
				: this.setState((currentState) => ({
						books: currentState.books.concat(newBook),
				  }))
		})
	}

	componentDidMount = () => {
		BooksAPI.getAll().then((books) => {
			console.log(books)
			this.setState(() => ({
				books,
			}))
		})
	}

	render() {
		return (
			<div className='app'>
				<Route
					path='/search'
					render={() => (
						<Search
							changeShelf={this.changeShelf}
							books={this.state.books}
						/>
					)}
				/>
				<Route
					exact
					path='/'
					render={() => (
						<BooksList
							changeShelf={this.changeShelf}
							books={this.state.books}
						/>
					)}
				/>
			</div>
		)
	}
}

export default BooksApp
