mapboxgl.accessToken = 'pk.eyJ1IjoibXJoYW51bWFuIiwiYSI6ImNraGhxcnB1bDBwcjMycW85OHlsZGppczMifQ.R08qaST7dDoqzeLWtL79Ug';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true});

function successLocation(position) {
    setCenter([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
    alert("Error loading current position !");
    setCenter([88.363892, 22.572645]);
}

function setCenter(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 10,
        pitch: 30
    });

    // for navigation control
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    // geolocation control
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));

    // fullscreen control
    map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));

    // mapbox gl directions
    var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
    });
    map.addControl(directions, 'top-left');

    // mapbox gl traffic
    map.addControl(new MapboxTraffic());
}