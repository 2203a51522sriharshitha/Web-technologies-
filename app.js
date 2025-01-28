var app = angular.module('weatherApp', []);

app.controller('WeatherController', function ($scope, $http) {
    $scope.city = ''; // Initialize city input
    $scope.weatherData = null; // Initialize weather data object
    $scope.error = ''; // Initialize error message

    // Function to fetch weather data
    $scope.getWeather = function () {
        if ($scope.city.trim() === '') {
            $scope.error = "Please enter a valid city name.";
            $scope.weatherData = null; // Clear previous weather data
            return;
        }

        // Replace with your OpenWeatherMap API key
        const apiKey = '8b07d8456b94d585afb5a20b7f9980e4';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${$scope.city}&appid=${apiKey}&units=metric`;

        $http.get(url)
            .then(function (response) {
                const data = response.data;
                $scope.weatherData = {
                    temp: data.main.temp,
                    humidity: data.main.humidity,
                    conditions: data.weather[0].description
                };
                $scope.error = ''; // Clear any previous error
            })
            .catch(function (error) {
                $scope.weatherData = null; // Clear previous weather data
                if (error.status === 404) {
                    $scope.error = "City not found. Please try again.";
                } else {
                    $scope.error = "Failed to fetch weather data. Please try again later.";
                }
            });
    };
});
