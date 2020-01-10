const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username: String,
    name: String,
    passwordHashi: String,
    blogs: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'

    }]

})


//tekee _id:stä id:n, poistaa __v:n ja pwHashin mitä ei saa tietenkään näyttää
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHashi
    }
  })

  const User = mongoose.model('User', userSchema)

  module.exports = User