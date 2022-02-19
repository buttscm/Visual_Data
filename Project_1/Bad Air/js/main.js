var global_data;
var line_1a,line_2a,line_3a,pie_1a,pie_2a;
var line_1b,line_2b,line_3b,pie_1b,pie_2b;
d3.csv('data/AQI_Data.csv')
  .then(data => {

    //Processing Data
    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
      d.Year = +d.Year;
      d.Days_with_AQI = +d.Days_with_AQI;
      d.Days_without_AQI = +d.Days_without_AQI;
      
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
    });

    //console.log(countyAndStateArr);
    
    //var svg = d3.select("svg");
    console.log("Raw Data");
    console.log(data);

    // Filtering counties

    document.getElementById("county_1").onchange = function() {county_1_Change(data)};
    document.getElementById("county_2").onchange = function() {county_2_Change(data)};
    document.getElementById("yearRange").onchange = function() {year_change(data)};
  })  
  .catch(error => {
    console.error('Error loading the data');
});

function county_1_Change(data) {

  var currentYear = document.getElementById("yearRange");
  var county_1 = document.getElementById("county_1");
  var state_county = county_1.value.split(" ")[0].split(",");

  var county_data = [];

  for(let i = 0; i < data.length; i++) {

    if(data[i]["State"] == state_county[0] && data[i]["County"] == state_county[1]) {
      county_data.push(data[i]);
    }
  }

  if(line_1a == null) {
      line_1a = new Line({
      'parentElement': '#line_1a',
      'containerHeight': 300,
      'containerWidth': 500,
      'fields': ["Max_AQI","Percentile90_AQI","Median_AQI"],
      'side': 'a',
      'labels' : ["Year", "AQI", "AQI Yearly Progression"]
    }, county_data);

    line_2a = new Line({
      'parentElement': '#line_2a',
      'containerHeight': 300,
      'containerWidth': 500,
      'fields': ["Days_CO","Days_NO2","Days_Ozone","Days_SO2","Days_PM2_5","Days_PM10"],
      'side': 'a',
      'labels': ["Year", "Days", "Days as Main Pollutant"]
    }, county_data);

    line_3a = new Line({
      'parentElement': '#line_3a',
      'containerHeight': 300,
      'containerWidth': 500,
      'fields': ["Days_without_AQI"],
      'side': 'a',
      'labels': ["Year", "Days", "Days Without AQI"] 
    }, county_data);
  } else {
    line_1a.updateDataVis(county_data, 'a');
    line_2a.updateDataVis(county_data, 'a');
    line_3a.updateDataVis(county_data, 'a');
  }

  var pie_data;

  for(let i = 0; i < county_data.length; i++) {
    if(county_data[i]["Year"] == currentYear.value) {
      pie_data = county_data[i];
    }
  }

    if(pie_1a == null && pie_data != null) {
      pie_1a = new Pie({
          'parentElement': '#pie_1a',
          'containerHeight': 300,
          'containerWidth': 500,
          'fields': ["Good_Days","Moderate_Days","Unhealthy_Days",
          "Unhealthy_Sensitive_Days","Very_Unhealthy_Days","Hazardous_Days"],
          'labels': "Daily Health"   
      }, pie_data);

      pie_2a = new Pie({
        'parentElement': '#pie_2a',
        'containerHeight': 300,
        'containerWidth': 500,
        'fields': ["Days_CO","Days_NO2","Days_Ozone","Days_SO2","Days_PM2_5","Days_PM10"],
        'labels': "Main Pollutant"   
      }, pie_data);
    } else if(pie_1a != null){
      pie_1a.updateDataVis(pie_data);
      pie_2a.updateDataVis(pie_data);
    } 
}

function county_2_Change(data) {

  var currentYear = document.getElementById("yearRange");
  var county_2 = document.getElementById("county_2");
  var state_county = county_2.value.split(" ")[0].split(",");

  var county_data = [];

  for(let i = 0; i < data.length; i++) {

    if(data[i]["State"] == state_county[0] && data[i]["County"] == state_county[1]) {
      county_data.push(data[i]);
    }
  }

  if(line_1b == null) {
      line_1b = new Line({
      'parentElement': '#line_1b',
      'containerHeight': 300,
      'containerWidth': 500,
      'fields': ["Max_AQI","Percentile90_AQI","Median_AQI"],
      'side': 'b',
      'labels' : ["Year", "AQI", "AQI Yearly Progression"]
    }, county_data);

    line_2b = new Line({
      'parentElement': '#line_2b',
      'containerHeight': 300,
      'containerWidth': 500,
      'fields': ["Days_CO","Days_NO2","Days_Ozone","Days_SO2","Days_PM2_5","Days_PM10"],
      'side': 'b',
      'labels': ["Year", "Days", "Days as Main Pollutant"]
    }, county_data);

    line_3b = new Line({
      'parentElement': '#line_3b',
      'containerHeight': 300,
      'containerWidth': 500,
      'fields': ["Days_without_AQI"],
      'side': 'b',
      'labels': ["Year", "Days", "Days Without AQI"]
    }, county_data);
  } else {
    line_1b.updateDataVis(county_data, 'b');
    line_2b.updateDataVis(county_data, 'b');
    line_3b.updateDataVis(county_data, 'b');
  }

  var pie_data;

  for(let i = 0; i < county_data.length; i++) {
    if(county_data[i]["Year"] == currentYear.value) {
      pie_data = county_data[i];
    }
  }

    if(pie_1b == null && pie_data != null) {
      pie_1b = new Pie({
          'parentElement': '#pie_1b',
          'containerHeight': 300,
          'containerWidth': 500,
          'fields': ["Good_Days","Moderate_Days","Unhealthy_Days",
          "Unhealthy_Sensitive_Days","Very_Unhealthy_Days","Hazardous_Days"],
          'labels': "Daily Health"  
      }, pie_data);

      pie_2b = new Pie({
        'parentElement': '#pie_2b',
        'containerHeight': 300,
        'containerWidth': 500,
        'fields': ["Days_CO","Days_NO2","Days_Ozone","Days_SO2","Days_PM2_5","Days_PM10"],
        'labels': "Main Pollutant" 
      }, pie_data);
    } else if(pie_1b != null) {
      pie_1b.updateDataVis(pie_data);
      pie_2b.updateDataVis(pie_data);
    }
}

function year_change(data) {
  console.log("Entering year_change");

  var currentYear = document.getElementById("yearRange");

  var county_1 = document.getElementById("county_1");
  var county_2 = document.getElementById("county_2");

  console.log(county_1.value);

  if(county_1.value != "") { 
    var  state_county_1 = county_1.value.split(" ")[0].split(",");
    var county_1_data;

    for(let i = 0; i < data.length; i++) {
      if(data[i]["State"] == state_county_1[0] && data[i]["County"] 
      == state_county_1[1] && data[i]["Year"] == currentYear.value) {
        county_1_data = data[i];
      }
    }

      if(pie_1a == null && county_1_data != null) {
        pie_1a = new Pie({
          'parentElement': '#pie_1a',
          'containerHeight': 300,
          'containerWidth': 500,
          'fields': ["Good_Days","Moderate_Days","Unhealthy_Days",
          "Unhealthy_Sensitive_Days","Very_Unhealthy_Days","Hazardous_Days"],
          'labels': "Daily Health"
        }, county_1_data);
  
        pie_2a = new Pie({
          'parentElement': '#pie_2a',
          'containerHeight': 300,
          'containerWidth': 500,
          'fields': ["Days_CO","Days_NO2","Days_Ozone","Days_SO2","Days_PM2_5","Days_PM10"],
          'labels': "Main Pollutant"
        }, county_1_data);
      } else if(pie_1a != null){
        pie_1a.updateDataVis(county_1_data);
        pie_2a.updateDataVis(county_1_data);
      }
  }

  if(county_2.value != "") { 

    var state_county_2 = county_2.value.split(" ")[0].split(",");
  
    var county_2_data;

    for(let i = 0; i < data.length; i++) {
      if(data[i]["State"] == state_county_2[0] && data[i]["County"] 
      == state_county_2[1] && data[i]["Year"] == currentYear.value) {
        county_2_data = data[i];
      }
    }

      if(pie_1b == null && county_2_data != null) {
        pie_1b = new Pie({
          'parentElement': '#pie_1b',
          'containerHeight': 300,
          'containerWidth': 500,
          'fields': ["Good_Days","Moderate_Days","Unhealthy_Days",
          "Unhealthy_Sensitive_Days","Very_Unhealthy_Days","Hazardous_Days"],
          'labels': "Daily Health"  
        }, county_2_data);
  
        pie_2b = new Pie({
          'parentElement': '#pie_2b',
          'containerHeight': 300,
          'containerWidth': 500,
          'fields': ["Days_CO","Days_NO2","Days_Ozone","Days_SO2","Days_PM2_5","Days_PM10"],
          'labels': "Main Pollutant"
        }, county_2_data);
      } else if(pie_1b != null){
        pie_1b.updateDataVis(county_2_data);
        pie_2b.updateDataVis(county_2_data);
      }
  }
}