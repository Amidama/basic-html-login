var jwt = localStorage.getItem("jwt")
if (jwt != null) {
    window.location.href = "./index.html"
}

function login() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://www.mecallapi.com/api/login")
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "username": username,
        "password": password
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const object = JSON.parse(this.responseText);
            console.log(object)
            if( object["status"] == "ok") {
                localStorage.setItem("jwt", object["accessToken"]);
                Swal.fire({
                    title: object["message"],
                    icon: 'success'
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        window.location.href = "./index.html"
                    }
                })
            } else {
                Swal.fire(
                    object["message"],
                    '',
                    'error'
                )
            }
            
        }
    }
    return false
}