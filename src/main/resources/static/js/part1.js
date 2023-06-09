function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.center(userLocation);
        }, function(error) {
            console.error("Error getting user location:", error);
        });
    } else {
        console.error("Geolocation is not supported");
    }
}

document.getElementById("current-location").addEventListener("click", getCurrentLocation);

function initAutocomplete() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const map = new google.maps.Map(document.getElementById("map"),{
                center: userLocation,
                zoom: 15,
                mapTypeId: "roadmap",
            });
            const input = document.getElementById("pac-input");
            const searchBox = new google.maps.places.SearchBox(input);
            const service = new google.maps.places.PlacesService(map);

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            map.addListener("bounds_changed", ()=>{
                    searchBox.setBounds(map.getBounds());
                }
            );

            let markers = [];

            var curDate = new Date();

            var curTime = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate() + " " + curDate.getHours() + ":" + curDate.getMinutes() + ":" + curDate.getSeconds();

            let infowindow;
            // 현재 열려 있는 인포윈도우를 저장할 변수

            function myClickListener(place, marker) {
                const content = document.createElement("div");
                const nameElement = document.createElement("h2");
                const placeIdElement = document.createElement("p");
                const placeAddressElement = document.createElement("p");
                const openingHoursElement = document.createElement("p");
                const remainingTimeElement = document.createElement("p");
                // 새로운 요소 추가
                const imageElement = document.createElement("img");

                nameElement.textContent = place.name;
                content.appendChild(nameElement);

                let openStatus = "";

                //               if (place.opening_hours) {
                if (place.opening_hours && place.opening_hours.open_now) {
                    //if (place.opening_hours && place.opening_hours.isOpen(검색요망)) {
                    openStatus = "Open";
                    placeIdElement.textContent = openStatus;
                    content.appendChild(placeIdElement);

                    placeAddressElement.textContent = place.formatted_address;
                    content.appendChild(placeAddressElement);

                    if (infowindow) {
                        infowindow.close();
                    }

                    const request = {
                        placeId: place.place_id,
                        fields: ["opening_hours"]
                    };

                    const service = new google.maps.places.PlacesService(map);
                    service.getDetails(request, (placeResult,status)=>{
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                if (placeResult.opening_hours && placeResult.opening_hours.weekday_text) {
                                    openingHoursElement.textContent = "Opening Hours Today:";
                                    content.appendChild(openingHoursElement);

                                    const today = new Date();
                                    const currentDayIndex = today.getDay();
                                    const currentDay = placeResult.opening_hours.weekday_text[currentDayIndex - 1];

                                    const openingHourElement = document.createElement("p");
                                    openingHourElement.textContent = currentDay;
                                    content.appendChild(openingHourElement);

                                    // 현재 시간을 표시하는 요소 업데이트
                                    const currentDateTime = document.createElement("p");
                                    const currentTime = today.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    });
                                    currentDateTime.textContent = "Current Time: " + currentTime;
                                    content.appendChild(currentDateTime);

                                    // 마감 시간까지 남은 시간 계산 및 표시
                                    const closingTime = placeResult.opening_hours.periods[currentDayIndex - 1].close.time;
                                    const closingHour = parseInt(closingTime.substring(0, 2));
                                    const closingMinute = parseInt(closingTime.substring(2, 4));

                                    const remainingTime = calculateRemainingTime(today, closingHour, closingMinute);
                                    remainingTimeElement.textContent = "Time Remaining: " + remainingTime;
                                    content.appendChild(remainingTimeElement);

                                    const [hours,minutes] = remainingTime.split(":");
                                    const remainingTimeInMinutes = parseInt(hours) * 60 + parseInt(minutes);

                                    if (remainingTimeInMinutes >= 180) {
                                        // 3 hours or more
                                        imageElement.src = "data:image/jpeg;base64,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";
                                    } else if (remainingTimeInMinutes >= 120) {
                                        // between 2 and 3 hours

                                        imageElement.src = "data:image/png;base64,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";
                                    } else if (remainingTimeInMinutes >= 60) {
                                        // between 1 and 2 hours

                                        imageElement.src = "data:image/jpeg;base64,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";
                                    } else if (remainingTimeInMinutes > 0) {
                                        // less than 1 hour

                                        imageElement.src = "data:image/jpeg;base64,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";
                                    }
                                    imageElement.width = 100;
                                    imageElement.height = 100;
                                    content.appendChild(imageElement);
                                }
                            }

                            infowindow = new google.maps.InfoWindow();
                            infowindow.setContent(content);
                            infowindow.open(map, marker);
                        }
                    );
                } else {
                    // 업장이 닫혀있는 경우
                    openStatus = "Closed";
                    console.log("Closed");
                    return;
                }
            }

            function calculateRemainingTime(currentTime, closingHour, closingMinute) {
                const closingTime = new Date();
                closingTime.setHours(closingHour, closingMinute, 0);

                const timeDiff = closingTime.getTime() - currentTime.getTime();

                let remainingHours = Math.floor(timeDiff / (1000 * 60 * 60));
                let remainingMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                let remainingSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                remainingHours = (remainingHours < 10) ? "0" + remainingHours : remainingHours;
                remainingMinutes = (remainingMinutes < 10) ? "0" + remainingMinutes : remainingMinutes;

                return remainingHours + ":" + remainingMinutes;
            }

            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener("places_changed", ()=>{
                    const places = searchBox.getPlaces();

                    if (places.length == 0) {
                        return;
                    }

                    // Clear out the old markers.
                    markers.forEach((marker)=>{
                            marker.setMap(null);
                        }
                    );
                    markers = [];

                    // For each place, get the icon, name and location.
                    const bounds = new google.maps.LatLngBounds();

                    places.forEach((place)=>{
                            if (!place.geometry || !place.geometry.location) {
                                console.log("Returned place contains no geometry");
                                return;
                            }

                            const icon = {
                                url: place.icon,
                                size: new google.maps.Size(71,71),
                                origin: new google.maps.Point(0,0),
                                anchor: new google.maps.Point(17,34),
                                scaledSize: new google.maps.Size(25,25),
                            };

                            // Create a marker for each place.

                            marker = new google.maps.Marker({
                                map,
                                icon,
                                title: place.name,
                                position: place.geometry.location,
                            });

                            markers.push(marker);

                            google.maps.event.addListener(marker, "click", ()=>{
                                    myClickListener(place, marker);
                                }
                            );

                            if (place.geometry.viewport) {
                                // Only geocodes have viewport.
                                bounds.union(place.geometry.viewport);
                            } else {
                                bounds.extend(place.geometry.location);
                            }
                        }
                    );
                    map.fitBounds(bounds);
                }
            );
        }, function(error) {
            // 위치 정보를 가져오지 못한 경우에 대한 처리
            console.error("Error getting user location:", error);
        });
    } else {
        // Geolocation을 지원하지 않는 경우에 대한 처리
        console.error("Geolocation is not supported");
    }
}

window.initAutocomplete = initAutocomplete;