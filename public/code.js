setCookie = function (value) {
    var secret = "secret=correct"
    document.cookie = secret;
}
setCookie();
var checkCookie = function async() {
    var lastCookie = document.cookie; // 'static' memory between function calls
    return function () {
        var currentCookie = document.cookie;
        if (currentCookie != lastCookie) {
            const cookieValue = document.cookie.split('; ').find(row => row.startsWith('secret=')).split('=')[1];
            checkWithApi(cookieValue);
            lastCookie = currentCookie; // store latest cookie
        }
    };
}();
async function checkWithApi(cookieValue) {
    try {
        fetch(`/api/hddn?secret=${cookieValue}`).then(response => response.json()).then(data => {
            document.getElementById("heading").innerHTML = data.heading;
            document.getElementById("comment").hidden = false;
            document.getElementById("comment").innerHTML = data.comment;
            document.getElementById("comment").hidden = true;
        });
    } catch (err) {
        console.log(err)
    }
}
window.setInterval(checkCookie, 1000); // run every 100 ms
