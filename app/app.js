// GLOBE CODE:

   var $win = $(window);
   var $globe = $("#g-globe");
   var $globeText = $("#g-globe-text");
   var globeD = 120;
   var projection = d3.geo.orthographic()
     .translate([globeD / 2, globeD / 2])
     .scale(60)
     .clipAngle(90)
     .precision(0.6);

   var nearestCity = "Washington"
   var nearestCityCoords = [-77.036871, 38.907192];

   var DATA = {};
   var curCityIndex = 0;

   function init(){
       loadData(function() {
           var t0 = (new Date()).getTime(),
               ow = innerWidth,
               timeToRender;

           renderAll(function() {
               console.log('all rendered');
               containerWidthChanged = false;
               timeToRender = (new Date()).getTime() - t0;
               $(window).resize(_.throttle(function() {
                   if (innerWidth != ow) {
                       containerWidthChanged = true;
                       ow = innerWidth;
                       monthWidths.length = 0;
                       renderAll();
                   }
               }, timeToRender+200));
           });

           function renderAll(callback) {
               // check if its mobile;
               isAPhone = innerWidth < 461 && document.body.parentElement.classList.contains('mobile');
               isMobile = innerWidth < 461 || document.body.parentElement.classList.contains('mobile');
               isTinyLaptop = innerWidth < 481;
               isMiniTablet = innerWidth < 1024 && innerWidth > 599 && document.body.parentElement.classList.contains('mobile');
               isTablet = innerWidth < 1025 && innerWidth > 461 && document.body.parentElement.classList.contains('mobile');
               isMedium = innerWidth > 1024;
               isLaptop = innerWidth < 1281;
               isBigEnough = innerWidth >= 1080;
               queue(1)
                   .defer(drawGlobe, nearestCity, nearestCityCoords)
                   .await(callback || function() {});
           }

       });

       var $caption = $('.g-caption');
       var $itemHeight = $('.g-item').outerHeight();
       var $img = $('.g-image');
       $globe.css({
         '-webkit-transform' : "translate(" + ($img.outerWidth() / 3) + "px,0px)",
         '-moz-transform'    : "translate(" + ($img.outerWidth() / 3) + "px,0px)",
         '-ms-transform'     : "translate(" + ($img.outerWidth() / 3) + "px,0px)",
         '-o-transform'      : "translate(" + ($img.outerWidth() / 3) + "px,0px)",
         'transform'         : "translate(" + ($img.outerWidth() / 3) + "px,0px)"
       });

       $globeText.css({
         '-webkit-transform' : "translate(0px," + (globeD / 2 - 5) + "px)",
         '-moz-transform'    : "translate(0px," + (globeD / 2 - 5) + "px)",
         '-ms-transform'     : "translate(0px," + (globeD / 2 - 5) + "px)",
         '-o-transform'      : "translate(0px," + (globeD / 2 - 5) + "px)",
         'transform'         : "translate(0px," + (globeD / 2 - 5) + "px)"
       });

       $win.on("resize", function(){
           $globe.css({
             '-webkit-transform' : "translate(" + ($img.outerWidth() / 3) + "px,0px)",
             '-moz-transform'    : "translate(" + ($img.outerWidth() / 3) + "px,0px)",
             '-ms-transform'     : "translate(" + ($img.outerWidth() / 3) + "px,0px)",
             '-o-transform'      : "translate(" + ($img.outerWidth() / 3) + "px,0px)",
             'transform'         : "translate(" + ($img.outerWidth() / 3) + "px,0px)"
           });
       })

       $win.on("scroll", function(){
           var $win = $(this);
           var currentItem;
           $caption.each(function(){
               var $el = $(this);

               if ($win.scrollTop() >= $el.offset().top - ($itemHeight / 2)) {
                   $globe.removeClass("inactive");
                   $globeText.addClass("inactive");

                   currentItem = $el;
                   var itemData, itemName, itemLocation;
                   var itemText = currentItem.text();

                   itemData = _.filter(rowData, function(r){ return r['caption'] === itemText });
                   itemName = (itemData.length > 0) ? itemData[0]['caption'] : null;
                   itemLocation = (itemData.length > 0) ? [itemData[0]['long'],itemData[0]['lat']] : null;

                   (itemName !== null) ? $globe.removeClass("inactive") : $globe.addClass("inactive");

                   drawGlobe(itemName, itemLocation, function(){
                       $globeText.text(itemText).removeClass("inactive");
                   });

               }
           });
       })
   };




   function loadData(callback) {
       queue()
           .defer(d3.json, NYTG_ASSETS + "rows.json")
           .defer(d3.json, NYTG_ASSETS + "world-110m.json")
           .defer(d3.json, NYTG_ASSETS + "cities_loc.json")
           .defer(d3.json, NYTG_ASSETS + "states_abb.json")
           .defer(d3.csv,  NYTG_ASSETS + "country_codes.csv")
           .await(function(err, rows, world, citiesLoc, stateAbb, names) {

               citiesLoc = _.filter(citiesLoc, function(d) { return d.duplicates == "1" || d.duplicates_use == "1"; });
               citiesLoc = _.filter(citiesLoc, function(d) { return d["exclude"] != "1"; });

               // init city display title
               citiesLoc.forEach(function(city){
                   var stateInfo = _.findWhere(stateAbb, {name: city.admin1});
                   if (stateInfo && city.country == "United States") {
                       city.display = city.name + ", " + stateInfo.nytabbrev;
                   } else if (city.name.trim() == "") {
                       city.display = city.country;
                   } else {
                       city.display = city.name + ", " + city.country;
                   }
               });

               rowData = rows;


               DATA.citiesLoc = citiesLoc;
               DATA.stateAbb = stateAbb;
               DATA.world = world;
               DATA.names = names;

               DATA.land = topojson.feature(DATA.world, DATA.world.objects.land),
               DATA.countries = topojson.feature(DATA.world, DATA.world.objects.countries).features,
               DATA.borders = topojson.mesh(DATA.world, DATA.world.objects.countries, function(a, b) { return a !== b; }),
               // DATA.names[170].id = "643";

               callback();
           });
   };

   function drawGlobe(nearestCity, coordinates, callback) {

       if (nearestCity === null || coordinates === null) return;

       var globe = {type: "Sphere"},
           land = DATA.land,
           countries = DATA.countries,
           borders = DATA.borders,
           i = -1,
           n = countries.length;

       var canvas, c;

       if (d3.select("#g-globe canvas")[0][0] == null) {
           canvas = d3.select("#g-globe").append("canvas")
                   .attr("width", globeD)
                   .attr("height", globeD);
           c = canvas.node().getContext("2d");
       } else {
           canvas = d3.select("#g-globe canvas");
           c = canvas.node().getContext("2d");
       }

       var path = d3.geo.path()
         .projection(projection)
         .context(c);

       var circle = d3.geo.circle();
       var coords = coordinates;

       rotateGlobe(coords);

       function rotateGlobe(coords) {
         center = coords;

         d3.transition()
           .duration(800)
           .tween("rotate", function(){
             var p = center,
                 r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
             return function(t) {
               projection.rotate(r(t));
               c.clearRect(0,0,globeD,globeD);
               c.fillStyle = "#fcfcfc", c.beginPath(), path(globe), c.fill();
               c.fillStyle = "#ccc", c.beginPath(), path(land), c.fill();
               c.strokeStyle = "#fff", c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
               c.strokeStyle = "#a0a0a0", c.lineWidth = 0.8, c.beginPath(), path(globe), c.stroke();
               c.fillStyle = "#a90048", c.beginPath(), path(circle.origin(coords).angle(4)()), c.fill();
               c.strokeStyle = "#fff", c.lineWidth = 1, c.beginPath(), path(circle.origin(coords).angle(4)()), c.stroke();
             };
           });
       }

       if (_.isFunction(callback)) callback();
   };


   init();

   //start of weather data
   var weatherData = {
     city: document.querySelector("#city").
     weather: document.querySelector("#weather"),
     temperature: document.querySelector("#temperature"),
     temperatureValue: 0,
     units: "°C"
   };
   /*converting °C to °F using this formula:
   °F = °C * 9/5 + 32
   °C = (°F - 32) * 5/9*/

   function switchUnits() {
     if(weatherData.units == "°C") {
       weatherData.temperatureValue = roundTemperature(weatherData.temperatureValue * 9/5 +32);
       weatherData.units = "°F"
     }
     else{
       weatherData.temperatureValue = roundTemperature((weatherData.temperatureValue - 32) * 5/9);
       weatherData.units = "°C";
     }
     weatherData.temperature.innerHTML = weatherData.temperatureValue + weatherData.units + ", ";
   }

   /* Creating a way to be independent "web service" utilizing smart-ip.net to wratp OpenWeatherMap and smart-ip.net API callback*/

   function getLocationAndWeather() {
     if(window.XMLHttpRequest){
       var xhr = new XMLHttpRequest();
       xhr.addEventListener("load", function() {
         var response = JSON.parse(xhr.responseText);
         console.log(response);
         var position = {
           latitude: response.latitude,
           longitude: response.longitude
         };
         var cityName = response.city;
         var weatherSimpleDescription = response.weather.simple;
         var weatherDescription = response.weather.description;
         var weatherTemperature = roundTemperature(response.weather.temperature);
         weatherData.temperatureValue = weatherTemperature;

         //loading background (cityscape) from flickr to match geolocation
         loadBackground(position.latitude, position.longitude, weatherSimpleDescription);
         weatherData.city.innerHTML = cityName;
         weatherData.weather.innerHTML = ", " + weatherDescription;
         weatherData.temperature.innerHTML = weatherTemperature + weatherdata.units;
       }, false);

       //adding eventlistener:
       xhr.addEventListener("error", function(err) {
         alert("Could not complete the request");
       }, false);
       //could not find the correct https to "GET" the openweathermap
       xhr.open("GET", "http://smart-ip.net/myip/wearwhere/getlocationandweather.php?owapikey=495c4fab436681328f26833f2057e1a1&units=metric", true);
       xhr.send();
     }
     else{
       alert("Unable to fetch the location and weather data.");
     }
   }
   //calling on Flickr to load image of city requested:
   function loadBackground(lat, lon, weatherTag) {
     var script_element = document.createElement('script');
     script_element.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1fc3caaea5ad5c285e4e091b4fc47c0b&lat=" + lat + "&lon=" + lon + "&accuracy=1&tags=" + weatherTag + "&sort=relevance&extras=url_l&format=json";
     document.getElementbyTagName('head')[0].appendChild(script_element);
   }
   //calling on a function to get pictures to match weather and location... if not, we will use generic background.
   function jsonFlickerApi(data) {
     if (data.photos.pages >0) {
       var photo = data.photos.photo[0];
       document.querySelector("body").style.backgroundImage = "url('" + photo.url_l + "')";
       document.querySelector("#image-source").setAttribute("href", "http://www.flickr.com/photos" + photo.owner + "/" + photo.id);
     }
     else{
       document.querySelector("body").style.backgroundImage = "url('https://www.flickr.com/photos/ulfbodin/32062994020/in/feed')";
       document,querySelector("#image-source").setAttribute("href", "https://www.flickr.com/photos/arcticpenguin/2434144642/in/photolist-4H6Cp5-JnxZr-4w4vcm-JntNj-bjQ1kE-emXzkJ-4H6DLu-gR6Er-7HwKEU-cJMi3G-4H2rin-JvpHW-aceUd3-ao9bp8-aQhhna-5ePPEw-4VEgXH-cJMkgY-an88t5-aAamkF-q5uh2v-9dLDZ-bFSrGg-9dLCP-bFSskc-u4RD4D-5hvRn-ndayGC-nffbad-78CQLH-nBJua-pG8s-ywH88-4H6AkU-MCZev-4H6Afw-5eJGXR-cJMirw-aobZa5-4H2s8X-4H6Eku-8T25H6-aAQcV-RAjJ1-8xM6M2-fmSKW-9dLD4-4YjtAj-aAa3ce-5ePQ2W");
     }
   }
   getLocationAndWeather();
