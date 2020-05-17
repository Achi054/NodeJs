var weatherForm = document.querySelector("form");
var search = document.querySelector("input");

var success = document.querySelector("#success-message");
var failure = document.querySelector("#failure-message");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    success.textContent = "Loading...";
    failure.textContent = "";

    fetch("/weather?address=" + search.value)
    .then((response) => {
        response.json().then((data) => {
            if(data.error)
                failure.textContent = data.error;
            success.textContent = `${data.location} is located at ${data.latitude}:${data.longitude}`;
        });
    });
});