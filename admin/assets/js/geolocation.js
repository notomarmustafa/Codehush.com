class Geolocation {
    successCallback(position) {
        let result = document.querySelector("#result");
        result.style.display = "block";
        result.innerText = "Lat: " + position.coords.latitude + ", Long: " + position.coords.longitude;

        let mapContainer = document.querySelector("#map");
        mapContainer.style.display = "block";

        const map = L.map("map").setView(
            [position.coords.latitude, position.coords.longitude],
            13
        );

        const tiles = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
        ).addTo(map);

        const marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);

        // Hide the showPosition button, show hidePosition
        document.getElementById("showPosition").style.display = "none";
        document.getElementById("hidePosition").style.display = "block";
        document.getElementById("resetPosition").style.display = "none"; // Keep reset button hidden
    }

    errorCallback(error) {
        let result = document.querySelector("#result");
        result.style.display = "block";
        let resetPosition = document.querySelector("#resetPosition");
        let showPosition = document.querySelector("#showPosition");
        let hidePosition = document.querySelector("#hidePosition");

        if (error.code == 1) {
            // Permission denied
            resetPosition.style.display = "block";
            showPosition.style.display = "none";
            hidePosition.style.display = "none";
            result.innerText = "You have not given permission to access your location. Please reset it.";

        } else if (error.code == 2) {
            result.innerText = "Your location is unavailable.";
        } else if (error.code == 3) {
            result.innerText = "The request to get your location timed out.";
        } else {
            result.innerText = "An unknown error occurred.";
        }
    }

    async showPosition() {
        if (navigator.geolocation) {
            // Check geolocation permission status
            const permissionStatus = await navigator.permissions.query({ name: "geolocation" });

            if (permissionStatus.state === "denied") {
                let result = document.querySelector("#result");
                result.style.display = "block";
                result.innerText = "Permission denied. Please reset your location permissions in the browser settings.";
                
                // Hide buttons since permission is denied
                document.querySelector("#showPosition").style.display = "none";
                document.querySelector("#hidePosition").style.display = "none";
                document.querySelector("#resetPosition").style.display = "block";
            } else {
                navigator.geolocation.getCurrentPosition(
                    this.successCallback.bind(this),
                    this.errorCallback.bind(this)
                );
                let result = document.querySelector("#result");
                result.style.display = "block";
                result.innerText = "Getting the position information...";
            }
        } else {
            alert("Your browser does not support geolocation");
        }
    }
}

const showPosition = document.querySelector("#showPosition");
showPosition.addEventListener("click", function (e) {
    e.preventDefault();
    new Geolocation().showPosition();
});

const hidePosition = document.getElementById("hidePosition");
hidePosition.addEventListener("click", function () {
    location.reload();
});

const resetPosition = document.getElementById("resetPosition");
resetPosition.addEventListener("click", function () {
    // Creating a styled message with the same button theme
    const messageBox = document.createElement("div");
    messageBox.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>Permission Denied</h2>
                <p>It seems like you denied location access. You can reset your permissions by going to your browser's site settings.</p>
                <button id="closeModal" class="btn-reset">Close</button>
            </div>
        </div>
    `;

    // Append the message to the body
    document.body.appendChild(messageBox);

    // Add event listener to close the modal
    const closeButton = document.querySelector(".close-btn");
    closeButton.addEventListener("click", function () {
        document.querySelector(".modal").remove();
    });

    const closeModalButton = document.getElementById("closeModal");
    closeModalButton.addEventListener("click", function () {
        document.querySelector(".modal").remove();
    });
});