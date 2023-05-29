
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initAutocomplete() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.534522948, lng: 126.994243914  },
        zoom: 15,
        mapTypeId: "roadmap",
    });
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    /*const request = {
            placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
            fields: ["name", "formatted_address", "place_id", "geometry" ]
          };
    */
    //const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    //service.getDetails(request, callback);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];


    var curDate = new Date();

    var curTime = curDate.getFullYear() + "-" +
        (curDate.getMonth() + 1) + "-" + curDate.getDate() + " " +
        curDate.getHours() + ":" + curDate.getMinutes() + ":" +
        curDate.getSeconds();


    let infowindow; // 현재 열려 있는 인포윈도우를 저장할 변수

    function myClickListener(place, marker) {
        const content = document.createElement("div");
        const nameElement = document.createElement("h2");
        const placeIdElement = document.createElement("p");
        const placeAddressElement = document.createElement("p");

        nameElement.textContent = place.name;
        content.appendChild(nameElement);

        let openStatus = "";

        if (place.opening_hours && place.opening_hours.open_now) {
            openStatus = "Open";
        } else {
            openStatus = "Closed";
            markers.push(marker);
            return;
        }
        placeIdElement.textContent = openStatus;
        content.appendChild(placeIdElement);

        placeAddressElement.textContent = place.formatted_address;
        content.appendChild(placeAddressElement);

        if (infowindow) {
            infowindow.close();
        }

        // 새로운 인포윈도우를 생성하고 엽니다.
        infowindow = new google.maps.InfoWindow();
        infowindow.setContent(content);
        infowindow.open(map, marker);
    }




    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            // Create a marker for each place.

            marker = new google.maps.Marker({
                map,
                icon,
                title: place.name,
                position: place.geometry.location,
            });

            markers.push(marker);


            google.maps.event.addListener(marker, "click", () => {
                myClickListener(place, marker);
            });

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

window.initAutocomplete = initAutocomplete;




/*      function callback(place, status){
if(status !== google.maps.places.PlacesServiceStatus.OK) return;

if(place.opening_hours && place.utc_offset_minutes) {
console.log('${place.opening_hours.weekday_text[0]}');
const isOpenNow = place.opening_hours.isOpen();
if(isOpenNow){
console.log('${place.name} is currently open.');
}
const isOpenAtTime = place.opening_hours.isOpen(
new Date('December 17, 2020 03:24:00'))
};
if(isOpenAtTime){
console.log(
'${place.name} will be open on December 17, 2020 at 03:24:00');
}

}
*/



/*         new google.maps.places.PlacesService(attrContainer).getDetails({
placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
fields: ['opening_hours','utc_offset_minutes'],
}, function (place, status) {
if (status !== 'OK') return; // something went wrong
const isOpenAtTime = place.opening_hours.isOpen(new Date('December 17, 2020 03:24:00'));
if (isOpenAtTime) {
// We know it's open.
}

const isOpenNow = place.opening_hours.isOpen();
if (isOpenNow) {
// We know it's open.
}
});

function placeIsOpen(id) {
if (!service) {
return undefined;
}

service.getDetails({
placeId: id,
fields: ['opening_hours', 'utc_offset_minutes']
}, function(place, status) {
if (status !== 'OK') {
return undefined;
}

return place.opening_hours.ㄴㄴㄴㄴㄴisOpen();
});

return undefined;
} */