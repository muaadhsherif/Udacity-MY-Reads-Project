import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router'
import AddBook from './AddBook'
import BooksList from './BooksList'

class BooksApp extends React.Component {
	state = {
		searchedValue: '',
		books: [],
	}

	search(query) {
		this.setState(() => {
			return { searchedValue: query }
		})
	}

	componentDidMount() {
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
					render={() => <AddBook search={this.search} />}
				/>
				<Route
					exact
					path='/'
					render={() => <BooksList books={this.state.books} />}
				/>
			</div>
		)
	}
}

export default BooksApp
