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

function validateForm(formId, formValidClass, formInvalidClass, inputErrorClass) {

    let inputs = document.getElementsByTagName("input");
    Array.from(inputs).forEach(input => {
        input.addEventListener("blur", event => {
            if ((event.target.tagName == "INPUT") && !isInputValid(event.target)) {
                event.target.classList.add(inputErrorClass);
            }
        }, true);

        input.addEventListener("focus", event => {
            if (event.target.tagName == "INPUT") {
                event.target.classList.remove(inputErrorClass);
            }
            if (event.target.classList.contains('form-check-input')){
                document.querySelector('.form__comment').classList.remove(inputErrorClass);
                document.querySelector('.form__comment').style.color = '#777';
            }
        }, true);
    });

    let form = document.getElementById(formId);
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (checkFormCorrectness(inputErrorClass)) {
            form.classList.remove(formInvalidClass);
            form.classList.add(formValidClass);
        } else {
            form.classList.remove(formValidClass);
            form.classList.add(formInvalidClass);
        }
    });
}

function checkFormCorrectness(invalidInputClass) {
    Array.from(document.getElementsByTagName("input")).forEach(input => {
        if (!isInputValid(input)) {
            input.classList.add(invalidInputClass);
        }
    });
    if (document.querySelectorAll('input[name="service"]:checked').length === 0){
        document.querySelector('.form__comment').classList.add(invalidInputClass);
        document.querySelector('.form__comment').style.color = '#ff0000' ;
    }
    return document.getElementsByClassName(invalidInputClass).length == 0;
}

function isInputValid(elem) {
    let dataAttrs = elem.dataset;
    if (elem.value.length == 0) {
        return dataAttrs.required === undefined ? true : false;
    }
    if (elem.classList.contains('form-tel') && elem.value.length < 10) {
        return false;
    } else if (elem.classList.contains('form-date') && !(new RegExp()).test(elem.value)) {
        return false;
    }

    return true;
}

ymaps.ready(initMap);


document.addEventListener('DOMContentLoaded', function() {

    let today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth() + 1,
        yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.querySelector(".form-date").setAttribute("min", today);

    Inputmask.extendDefaults({
        'autoUnmask': true
    });
    Inputmask().mask(document.querySelectorAll("input"));

    validateForm('makeAppointment', 'form_valid', 'form_invalid', 'input_error');

}, false);