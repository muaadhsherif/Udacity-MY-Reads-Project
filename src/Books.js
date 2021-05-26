import React, { Component } from 'react'

export default class Books extends Component {
	shelfs = [
		{ title: 'Currently Reading', value: 'currentlyReading' },
		{ title: 'None', value: 'none' },
		{ title: 'Want To Read', value: 'wantToRead' },
		{ title: 'Read', value: 'read' },
	]

	render() {
		const { shelfs, filterShelfs, changeShelf } = this.props
		return (
			<div className='list-books-content'>
				{shelfs.map((shelf) => (
					<div className='bookshelf' key={shelf.value}>
						<h2 className='bookshelf-title'>{shelf.title}</h2>
						<div className='bookshelf-books'>
							<ol className='books-grid'>
								{filterShelfs(shelf.value).length ? (
									filterShelfs(shelf.value).map((book) => (
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
														<select
															defaultValue={shelf.value}
															onChange={(e) =>
																changeShelf(
																	book.id,
																	e.target.value,
																)
															}
														>
															<option value='move' disabled>
																Move to...
															</option>
															{this.shelfs.map((shelf) => (
																<option
																	key={shelf.value}
																	value={shelf.value}
																>
																	{shelf.title}
																</option>
															))}
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
									))
								) : (
									<h1>No Books match</h1>
								)}
							</ol>
						</div>
					</div>
				))}
			</div>
		)
	}
}
