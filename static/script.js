console.log('script working :D');
var searchButton = document.querySelector('button');
var searchCity = document.querySelector('#city');
var loading = document.querySelector('#load');

var showWeather = function(success_data){
	if(success_data == null){
		alert("Please Check your Input :P");
	}
    var temperture = success_data.main.temp;
    var description = success_data.weather[0].main;

    document.querySelector('#weather-temperature').innerHTML =  (temperture).toFixed(2) + '&#8451';
    document.querySelector('#weather-description').innerHTML = description;
    document.querySelector('#weather-result').style.display = 'flex';
	loading.style.display = 'none';
    
}
// USING JQUERY FOR AJAX REQUEST
var getWeather = function (){
    console.log("Clicked the Submit Button ... Processing the data");
    if ($("#city").val().trim().length == 0){
        return alert('Please Enter a valid City Name')
    } 
	loading.style.display = 'block';
    document.querySelector('#weather-result').style.display = 'none';
	
	$.ajax({
		type: 'GET',
		url: 'http://api.openweathermap.org/data/2.5/weather',
		data: {
			'APPID': 'd025b248c28ef88dc60f2db52a06d998',
			// 'q': $(this).val(); to do this we have make a variable down and then send to this function
			'q': $("#city").val(),
			'units' : 'metric'
		},

         
		success: function(success_data){
            // console.log(success_data);
			showWeather(success_data);
		},
		error: function(error_data){
			console.log(error_data);
			alert("Something went Wrong :(")
		}
	});

}
// Event Listners
searchButton.addEventListener('click', getWeather);
document.addEventListener('keypress', (event) => {
	const keyName = event.key;
	if (keyName == 'Enter'){
		getWeather();
	}
	// alert('keypress event\n\n' + 'key: ' + keyName);
  });