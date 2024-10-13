class Geolocation {
    successCallback(position){
        let result = document.querySelector("#result")
        result.style.display = "block"
        result.innerText = "Lat: " + position.coords.latitude + ", Long: " + position.coords.longitude

        let mapContainer = document.querySelector("#map")
        mapContainer.style.display = "block"

        const map = L.map("map").setView(
            [position.coords.latitude, position.coords.longitude],
            13
        )

        const tiles = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 19,
                attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }
        ).addTo(map)

        const marker = L.marker([
            position.coords.latitude,
            position.coords.longitude
        ]).addTo(map)
    }

    errorCallback(error){
        let result = document.querySelector("#result")
        result.style.display = "block"
        if(error.code == 1) {
            result.innerText = "You have not given permission to access your location."
        }else if(error.code == 2) {
            result.innerText = "Your location is unavailable."
        }else if(error.code == 3) {
            result.innerText = "The request to get your location timed out."
        }else{
            result.innerText = "An unknown error occurred."
        }
    }



    showPosition(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.successCallback,
                this.errorCallback
            )
            let result = document.querySelector("#result")
            result.style.display = "block"
            result.innerText= "Getting the position information..."
        }else{
            alert('Your browser does not support geolocation')
        }
    }
}

const showPosition = document.querySelector("#showPosition")
showPosition.addEventListener("click", function (e) {
    e.preventDefault()
    this.style.display = "none"
    new Geolocation().showPosition()
})