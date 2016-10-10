'use strict';

var myApp = angular.module('myApp', []);

myApp.controller('currentWeather', function currentWeather($http, $scope) {
    var key = 'dddcd2cbd1d2d744671a9cf971bcf18f';

    $scope.requestWeather = function(cityid) {

        $http.get('http://api.openweathermap.org/data/2.5/weather?id='+cityid+'&appid='+key+'&units=metric').then(function (response) {
            $scope.weather = response.data;
            $scope.search = '';
            $scope.resault = 'active';
            console.log($scope.weather)
        })
    };

    $scope.queryCity = function() {
        var query = '';
        if($scope.cityForm.$valid) {
            query = $scope.city;
            $scope.loader = 'active';
            $http.get('http://api.openweathermap.org/data/2.5/find?q='+query+'&type=like&mode=json&appid=dddcd2cbd1d2d744671a9cf971bcf18f').then(function (response) {
                var res = response.data,
                    city_list = res["list"];
                $scope.cities = city_list;
                $scope.search = 'active';
                $scope.loader = '';
            })
        } else {
            query = '';
            $scope.loader = '';
            $scope.cities = '';
            $scope.search = '';
        }
    }
})
