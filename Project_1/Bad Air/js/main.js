console.log("Start of Bad Air!");

let minYear = 99999; 
let maxYear = 0; 
let years = [];

d3.csv('data/Hamilton_Data.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);

    //Processing Data
    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
      d.Year = +d.Year;
      d.Days_with_AQI = +d.Days_with_AQI;
      
      d.Good_Days = +d.Good_Days;
      d.Moderate_Days = +d.Moderate_Days;
      d.Unhealthy_Sensitive_Days = +d.Unhealthy_Sensitive_Days;
      d.Unhealthy_Days = +d.Unhealthy_Days;
      d.Very_Unhealthy_Days = +d.Very_Unhealthy_Days;
      d.Hazardous_Days = +d.Hazardous_Days;

      d.Max_AQI = +d.Max_AQI;
      d.Percentile90_AQI = +d.Percentile90_AQI;
      d.Median_AQI = +d.Median_AQI;

      d.Days_CO = +d.Days_CO;
      d.Days_NO2 = +d.Days_NO2;
      d.Days_Ozone = +d.Days_Ozone;
      d.Days_SO2 = +d.Days_SO2;

      d.Days_PM2_5 = +d.Days_PM2_5;
      d.Days_PM10 = +d.Days_PM10;

      updateMinMaxYear(d.Year);
    });

  	for(let y = minYear; y <= maxYear; y++){
  		years.push(y); 
  	}

    console.log(years);
    var svg = d3.select("svg")

    line = new Line({
      'parentElement': '#line',
      'containerHeight': 1100,
      'containerWidth': 1000
    }, data);

  })  
  .catch(error => {
    console.error('Error loading the data');
});

function updateMinMaxYear(year){
  if( year < minYear)
    minYear = year;
  if( year > maxYear)
    maxYear = year;
  console.log("min year = " + minYear);
  console.log("max year = " + maxYear);
}