const users = [{
    id: 1,
    name : "Iram"
},
{
    id: 2,
    name : "Fernando"
}
]

function getUserById( id ) {
    const user = users.find(function(user) {
        return user.id === id
    })

    console.log({user})
}


module.exports = {
    getUserById
}