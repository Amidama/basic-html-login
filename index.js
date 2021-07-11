var jwt = localStorage.getItem("jwt")
if (jwt == null) {
    window.location.href = "./login.html"
}

function loadUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.mecallapi.com/api/auth/user");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer "+jwt);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const object = JSON.parse(this.responseText);
            if (object["status"] == "ok") {
                const user = object["user"];
                document.getElementById("fname").innerHTML = user["fname"];
                document.getElementById("avatar").src = user["avatar"];
                document.getElementById("username").innerHTML = user["username"];
            } else {
                Swal.fire(
                    object["message"],
                    '',
                    'error'
                )
            }
        }
    }
}

function logoutUser() {
    localStorage.removeItem("jwt")
    Swal.fire({
        title: "Logged out",
        icon: 'success'
    }).then(() => {
        window.location.href = "./login.html"
    })
    
}

loadUser();