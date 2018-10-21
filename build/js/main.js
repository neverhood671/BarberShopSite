const BARBERSHOP_LAT = 59.964049,
    BARBERSHOP_LON = 30.304987,
    BARBERSHOP_NAME = 'Лучший Барбершоп',
    BARBERSHOP_ADDRESS = 'ул. Алексея Толстого 26А, Санкт-Петербург';

function initMap() {
    map = new ymaps.Map("map", {
        center: [BARBERSHOP_LAT, BARBERSHOP_LON],
        zoom: 12,
        controls: []
    });

    let placemark = new ymaps.Placemark(
        [BARBERSHOP_LAT, BARBERSHOP_LON], { hintContent: BARBERSHOP_NAME, balloonContentHeader: BARBERSHOP_NAME, balloonContent: BARBERSHOP_ADDRESS }
    );

    map.geoObjects.add(placemark);
}

ymaps.ready(initMap);