import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div className="book-detail">
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>All books by this Author</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <h4>No book Selected!</h4>
        </div>
      )
    }
  }
  render() {
    return (
      <div id="book-details">
        <p> Output of Book Details </p>
        {this.displayBookDetails()}
      </div>
    )
  }
}

export default graphql(getBookQuery, {
    options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);