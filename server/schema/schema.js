const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

//  dummy data will later be exported to a db
const books = [
  { name: 'James Lee the Legend', genre: 'Sci-Fi', id: '1', authorId: '2' },
  { name: 'Bustling City', genre: 'Fiction', id: '2', authorId: '1' },
  { name: 'Because he lived', genre: 'Romance', id: '3', authorId: '2' },
  { name: 'Dream High', genre: 'Action', id: '4', authorId: '3' },
  { name: 'Run baby run', genre: 'Fantasy', id: '5', authorId: '1' },
  { name: 'Mara\'s House 3', genre: 'Family', id: '6', authorId: '3' },
  { name: 'Arm Dead Horror', genre: 'Horror', id: '7', authorId: '3' }
];

const authors = [
  { name: 'James Anderson', age: 32, id: '1' },
  { name: 'Helen Keller', age: 41, id: '2' },
  {name: 'Brad Pitt', age: 82, id: '3'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, {id: parent.authorId });
      }
     }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
       return _.filter(books, { authorId: parent.id } );
      }
    }
  })
});

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        // code to get data from the db/ other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from the db/ other source
        return _.find(authors, { id:args.id });
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery
});