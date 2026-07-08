const { getUserById } = require('./js-foundation/03-callbacks')

getUserById(1, function(error, user) {
    if (error) {
        throw new Error(`User with id {id} not found`)
    }
    console.log({user})
});