var objPeople = [
    {
        username : "omar",
        password : "omar"
    },
    {
        username : "user",
        password : "1234"
    }
]
function getInfo() {
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value

    for (var i = 0 ; i< objPeople.length;i++) {
        if(username == objPeople[i].username && password == objPeople[i].password) {
            console.log(username + "is logged in!")
            window.location.href = 'https://codehush.com/admin/dashboard';
            return
        }
    }
    console.log('incorrect username or password!')
}