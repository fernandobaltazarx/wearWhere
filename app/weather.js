

var usernName = location.search.split('name=')[1].split('&')[0]
var placezipcode = location.search.split('zip=')[1].split('&')[0]
var userGender = location.search.split('gender=')[1].split('&')[0]

console.log("username found: " + usernName);
console.log("placezipcode found: " + placezipcode);
//some logic to weather app 


    loadWeather(placezipcode, "");


$(document).ready(function() {
    setInterval(getWeather, 10000);
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'F',
        success: function(weather) {
            city = weather.city;
            temp = weather.temp + '&deg;';
            altTemp = Math.round((weather.temp - 32) * (5 / 9)) + '&deg;';
            wcode = '<img class="weathericon" src="images/clothing/weathericons/' + weather.code + '.svg">';
            wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
            altWind = '<p>' + Math.round(weather.wind.speed * 1.6) + '</p><p>kph</p>';
            humidity = weather.humidity + ' %';
            $(".location").text(city);
            $(".temperature").html(temp).show();
            $(".alt-temperature").html(altTemp).hide();
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind).show();
            $(".alt-windspeed").html(altWind).hide();
            $(".humidity").text(humidity);

//LOGIC FOR CLOTHING

if (weather.temp >= 40) {
  clothing = '          <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="img/image1.jpg"><img width="200px" src="img/image1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/image2.jpg"><img width="200px" src="img/image2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/image3.jpg"><img width="200px" src="img/image3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/image4.jpg"><img width="200px" src="img/image4.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/image5.jpg"><img width="200px" src="img/image5.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/image6.jpg"><img width="200px" src="img/image6.jpg"/></a>';
  $(".clothing").html(clothing).show();
};

if (weather.temp < 40) {
  clothing = '          <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a>';
  $(".clothing").html(clothing).show();
};


        },
        error: function(error) {
            $(".error").html('<p>' + error + '</p>');
        }

    });
}

$("button").click(function() {
    $(".temperature").toggle();
    $(".alt-temperature").toggle();
    $(".windspeed").toggle();
    $(".alt-windspeed").toggle();
});
