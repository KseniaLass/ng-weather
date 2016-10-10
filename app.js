'use strict';

var myApp = angular.module('myApp', []);

myApp.controller('currentWeather', function currentWeather($http, $scope) {
    var key = 'dddcd2cbd1d2d744671a9cf971bcf18f'; //Ключ для доступа к серверу

    $scope.requestWeather = function(cityid) { //Запрос к выбраному городу по ID

        $http.get('http://api.openweathermap.org/data/2.5/weather?id='+cityid+'&appid='+key+'&units=metric').then(function (response) {
            $scope.weather = response.data; //Полученые данные
            $scope.search = ''; // Скрываем модальное окно с результатами поиска
            $scope.resault = 'active'; // Показываем результат полученных данных
        })
    };

    $scope.queryCity = function() { // Функция запроса подходящих городов по названию
        var query = ''; // Очищаем данные запроса
        if($scope.cityForm.$valid) { //Проверяем валидность введенных данных (минимум 3 символа)
            query = $scope.city; //Записываем название города в объект $scope
            $scope.loader = 'active'; //Показываем иконку поиска
            $http.get('http://api.openweathermap.org/data/2.5/find?q='+query+'&type=like&mode=json&appid=dddcd2cbd1d2d744671a9cf971bcf18f').then(function (response) {
                var res = response.data, //Полученные данные
                    city_list = res["list"]; //Получаем названия городов из полученного объекта
                $scope.cities = city_list; //Записываем список городов в объект $scope
                $scope.search = 'active'; //Показываем результаты поиска
                $scope.loader = ''; // Скрываем иконку поиска
            })
        } else { //Убираем результаты поиска и иконку поиска, очищаем данные для запроса, если они не валидны (менее 3 символов)
            query = '';
            $scope.loader = '';
            $scope.cities = '';
            $scope.search = '';
        }
    }
})
