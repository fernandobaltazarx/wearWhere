

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

  clothing = '<table>  \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="img/clothes/beachparty/beachfemale1.jpg"><img width="200px" src="img/clothes/beachparty/beachfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="img/clothes/beachparty/beachfemale2.jpg"><img width="200px" src="img/clothes/beachparty/beachfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="img/clothes/beachparty/beachmale3.jpg"><img width="200px" src="img/clothes/beachparty/beachmale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewfemale1.jpg"><img width="200px" src="img/clothes/interview/interviewfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewfemale2.jpg"><img width="200px" src="img/clothes/interview/interviewfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewfemale3.jpg"><img width="200px" src="img/clothes/interview/interviewfemale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewmale1.jpg"><img width="200px" src="img/clothes/interview/interviewmale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewmale2.jpg"><img width="200px" src="img/clothes/interview/interviewmale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewmale3.jpg"><img width="200px" src="img/clothes/interview/interviewmale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationfemale1.jpg"><img width="200px" src="img/clothes/presentarion/presentationfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationfemale2.jpg"><img width="200px" src="img/clothes/presentation/presentationfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationfemale3.jpg"><img width="200px" src="img/clothes/presentation/presentationfemale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationmale1.jpg"><img width="200px" src="img/clothes/presentation/presentationmale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationmale2.jpg"><img width="200px" src="img/clothes/presentation/presentationmale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationmale3.jpg"><img width="200px" src="img/clothes/presentation/presentationmale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingfemale1.jpg"><img width="200px" src="img/clothes/wedding/weddingfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingfemale2.jpg"><img width="200px" src="img/clothes/wedding/weddingfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingfemale3.jpg"><img width="200px" src="img/clothes/wedding/weddingfemale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingmale1.jpg"><img width="200px" src="img/clothes/wedding/weddingmale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingmale2.jpg"><img width="200px" src="img/clothes/wedding/weddingmale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingmale3.jpg"><img width="200px" src="img/clothes/wedding/weddingmale3.jpg"/></a> \
                        </table>';
 if ( userGender = "male" ) {
          clothing = '<table>  \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="img/clothes/beachparty/beachfemale1.jpg"><img width="200px" src="img/clothes/beachparty/beachfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="img/clothes/beachparty/beachfemale2.jpg"><img width="200px" src="img/clothes/beachparty/beachfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="img/clothes/beachparty/beachmale3.jpg"><img width="200px" src="img/clothes/beachparty/beachmale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewfemale1.jpg"><img width="200px" src="img/clothes/interview/interviewfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewfemale2.jpg"><img width="200px" src="img/clothes/interview/interviewfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewfemale3.jpg"><img width="200px" src="img/clothes/interview/interviewfemale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewmale1.jpg"><img width="200px" src="img/clothes/interview/interviewmale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewmale2.jpg"><img width="200px" src="img/clothes/interview/interviewmale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewmale3.jpg"><img width="200px" src="img/clothes/interview/interviewmale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationfemale1.jpg"><img width="200px" src="img/clothes/presentation/presentationfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationfemale2.jpg"><img width="200px" src="img/clothes/presentation/presentationfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationfemale3.jpg"><img width="200px" src="img/clothes/presentation/presentationfemale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationmale1.jpg"><img width="200px" src="img/clothes/presentation/presentationmale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationmale2.jpg"><img width="200px" src="img/clothes/presentation/presentationmale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationmale3.jpg"><img width="200px" src="img/clothes/presentation/presentationmale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingfemale1.jpg"><img width="200px" src="img/clothes/wedding/weddingfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingfemale2.jpg"><img width="200px" src="img/clothes/wedding/weddingfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingfemale3.jpg"><img width="200px" src="img/clothes/wedding/weddingfemale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingmale1.jpg"><img width="200px" src="img/clothes/wedding/weddingmale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingmale2.jpg"><img width="200px" src="img/clothes/wedding/weddingmale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingmale3.jpg"><img width="200px" src="img/clothes/wedding/weddingmale3.jpg"/></a> \
                        </table>';
    }
     if ( userGender = "female" ) {
          clothing = '<table>  \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="img/clothes/beachparty/beachfemale1.jpg"><img width="200px" src="img/clothes/beachparty/beachfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="img/clothes/beachparty/beachfemale2.jpg"><img width="200px" src="img/clothes/beachparty/beachfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="img/clothes/beachparty/beachmale3.jpg"><img width="200px" src="img/clothes/beachparty/beachmale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewfemale1.jpg"><img width="200px" src="img/clothes/interview/interviewfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewfemale2.jpg"><img width="200px" src="img/clothes/interview/interviewfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewfemale3.jpg"><img width="200px" src="img/clothes/interview/interviewfemale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewmale1.jpg"><img width="200px" src="img/clothes/interview/interviewmale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewmale2.jpg"><img width="200px" src="img/clothes/interview/interviewmale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="img/clothes/interview/interviewmale3.jpg"><img width="200px" src="img/clothes/interview/interviewmale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationfemale1.jpg"><img width="200px" src="img/clothes/presentation/presentationfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationfemale2.jpg"><img width="200px" src="img/clothes/presentation/presentationfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationfemale3.jpg"><img width="200px" src="img/clothes/presentation/presentationfemale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationmale1.jpg"><img width="200px" src="img/clothes/presentation/presentationmale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationmale2.jpg"><img width="200px" src="img/clothes/presentation/presentationmale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="img/clothes/presentation/presentationmale3.jpg"><img width="200px" src="img/clothes/presentation/presentationmale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingfemale1.jpg"><img width="200px" src="img/clothes/wedding/weddingfemale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingfemale2.jpg"><img width="200px" src="img/clothes/wedding/weddingfemale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingfemale3.jpg"><img width="200px" src="img/clothes/wedding/weddingfemale3.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingmale1.jpg"><img width="200px" src="img/clothes/wedding/weddingmale1.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingmale2.jpg"><img width="200px" src="img/clothes/wedding/weddingmale2.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="img/clothes/wedding/weddingmale3.jpg"><img width="200px" src="img/clothes/wedding/weddingmale3.jpg"/></a> \
                        </table>';
    }
  $(".clothing").html(clothing).show();
};

if (weather.temp < 40) { 
  clothing = '          <table>  \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category1" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category2" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category3" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a> \
                        <a class="fancybox" data-fancybox-group="gallery" data-filter="category4" href="images/clothing/santa-claus-08.jpg"><img width="200px" src="images/clothing/santa-claus-08.jpg"/></a> \
                        </table>';
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
