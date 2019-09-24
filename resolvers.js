exports.resolvers = {
  Mutation: {
    addBook: async (
      _,
      { book: { name, author, description, category, pageCount, publisher } },
      { Book }
    ) => {
      const newBook = await new Book({
        name,
        author,
        description,
        category,
        pageCount,
        publisher
      }).save();
      return newBook;
    },
    deleteBook: async (_, { id }, { Book }) => {
      const deletedBook = await Book.deleteOne({ id });
      return deletedBook;
    },
    createUser: async (_, { userInput: { name, age, email } }, { User }) => {
      const user = new User({
        name,
        age,
        email
      }).save();
      return user;
    },
    addFavoriteBook: async (_, { userId, bookId }, { Book, User }) => {
      const user = await User.findOne({ _id: userId });
      const book = await Book.findOne({ _id: bookId });
      await user.favoriteBooks.push(bookId)
      return await user.save()
    }
  },

  Query: {
    getAllBooks: (_, args, { Book }) => {
      const books = Book.find();
      return books;
    },
    getBook: (_, { _id }, { Book }) => {
      const book = Book.findOne({ _id });
      return book;
    },
    getUser: async (_, {userId}, {User}) => {
        const user = await User.findOne({_id: userId}).populate("favoriteBooks").exec();
        return user
    }
  }
};
