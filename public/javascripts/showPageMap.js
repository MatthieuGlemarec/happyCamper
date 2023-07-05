
mapboxgl.accessToken = mapToken;


const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 12, // starting zoom
});

new mapboxgl.Marker({
    color: "black"
})
    .setLngLat(campground.geometry.coordinates)
    .addTo(map);

map.addControl(new mapboxgl.FullscreenControl());

