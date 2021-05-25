import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class BooksList extends Component {
	shelfs = [
		{ title: 'Currently Reading', value: 'currentlyReading' },
		{ title: 'Want To Read', value: 'wantToRead' },
		{ title: 'Read', value: 'read' },
	]

	filterShelf = (shelf) =>
		this.props.books.filter((value) => value.shelf === shelf)

	render() {
		return (
			<div>
				<div className='list-books'>
					<div className='list-books-title'>
						<h1>MyReads</h1>
					</div>
					<div className='list-books-content'>
						{this.shelfs.map((shelf) => (
							<div className='bookshelf' key={shelf.value}>
								<h2 className='bookshelf-title'>{shelf.title}</h2>
								<div className='bookshelf-books'>
									<ol className='books-grid'>
										{this.filterShelf(shelf.value).map((book) => (
											<li key={book.id}>
												<div className='book'>
													<div className='book-top'>
														<div
															className='book-cover'
															style={{
																width: 128,
																height: 193,
																backgroundImage: `url(${book.imageLinks.thumbnail})`,
															}}
														></div>
														<div className='book-shelf-changer'>
															<select defaultValue={shelf.value}>
																<option value='move' disabled>
																	Move to...
																</option>
																<option value='currentlyReading'>
																	Currently Reading
																</option>
																<option value='wantToRead'>
																	Want to Read
																</option>
																<option value='read'></option>
																<option value='none'>
																	None
																</option>
															</select>
														</div>
													</div>
													<div className='book-title'>
														{book.title}
													</div>
													<div className='book-authors'>
														{book.authors}
													</div>
												</div>
											</li>
										))}
									</ol>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='open-search'>
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		)
	}
}
