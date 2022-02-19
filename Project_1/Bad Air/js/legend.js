// select the svg area
var svg_1 = d3.select("#line_1_legend")
    .attr('height', 200);
// Handmade legend
svg_1.append("circle").attr("cx",50).attr("cy",20).attr("r", 6).style("fill", "#F32525")
svg_1.append("circle").attr("cx",50).attr("cy",50).attr("r", 6).style("fill", "#3FB936")
svg_1.append("circle").attr("cx",50).attr("cy",80).attr("r", 6).style("fill", "#13B6F0")
svg_1.append("text").attr("x", 70).attr("y", 20).text("Max AQI").style("font-size", "15px").attr("alignment-baseline","middle")
svg_1.append("text").attr("x", 70).attr("y", 50).text("90th Percentile AQI").style("font-size", "15px").attr("alignment-baseline","middle")
svg_1.append("text").attr("x", 70).attr("y", 80).text("Median AQI").style("font-size", "15px").attr("alignment-baseline","middle")

var svg_2 = d3.select("#line_2_legend")
    .attr('height', 200);

svg_2.append("circle").attr("cx",50).attr("cy",10).attr("r", 6).style("fill", "#DADBDB")
svg_2.append("circle").attr("cx",50).attr("cy",40).attr("r", 6).style("fill", "#49763E")
svg_2.append("circle").attr("cx",50).attr("cy",70).attr("r", 6).style("fill", "#085483")
svg_2.append("circle").attr("cx",50).attr("cy",100).attr("r", 6).style("fill", "#FFB500")
svg_2.append("circle").attr("cx",50).attr("cy",130).attr("r", 6).style("fill", "#9723C2")
svg_2.append("circle").attr("cx",50).attr("cy",160).attr("r", 6).style("fill", "#B33757")
svg_2.append("text").attr("x", 70).attr("y", 10).text("CO²").style("font-size", "15px").attr("alignment-baseline","middle")
svg_2.append("text").attr("x", 70).attr("y", 40).text("NO²").style("font-size", "15px").attr("alignment-baseline","middle")
svg_2.append("text").attr("x", 70).attr("y", 70).text("Ozone").style("font-size", "15px").attr("alignment-baseline","middle")
svg_2.append("text").attr("x", 70).attr("y", 100).text("SO²").style("font-size", "15px").attr("alignment-baseline","middle")
svg_2.append("text").attr("x", 70).attr("y", 130).text("PM2.5").style("font-size", "15px").attr("alignment-baseline","middle")
svg_2.append("text").attr("x", 70).attr("y", 160).text("PM10").style("font-size", "15px").attr("alignment-baseline","middle")

var svg_4 = d3.select("#pie_1_legend")
    .attr('height', 200);

svg_4.append("circle").attr("cx",50).attr("cy",10).attr("r", 6).style("fill", "#31EA16")
svg_4.append("circle").attr("cx",50).attr("cy",40).attr("r", 6).style("fill", "#CDE520")
svg_4.append("circle").attr("cx",50).attr("cy",70).attr("r", 6).style("fill", "#FFF300")
svg_4.append("circle").attr("cx",50).attr("cy",100).attr("r", 6).style("fill", "#FFC100")
svg_4.append("circle").attr("cx",50).attr("cy",130).attr("r", 6).style("fill", "#FF6800")
svg_4.append("circle").attr("cx",50).attr("cy",160).attr("r", 6).style("fill", "#EE2710")
svg_4.append("text").attr("x", 70).attr("y", 10).text("Good Days").style("font-size", "15px").attr("alignment-baseline","middle")
svg_4.append("text").attr("x", 70).attr("y", 40).text("Moderate Days").style("font-size", "15px").attr("alignment-baseline","middle")
svg_4.append("text").attr("x", 70).attr("y", 70).text("Unhealthy Days").style("font-size", "15px").attr("alignment-baseline","middle")
svg_4.append("text").attr("x", 70).attr("y", 100).text("Unhealthy Sensitive Days").style("font-size", "15px").attr("alignment-baseline","middle")
svg_4.append("text").attr("x", 70).attr("y", 130).text("Very Unhealthy Days").style("font-size", "15px").attr("alignment-baseline","middle")
svg_4.append("text").attr("x", 70).attr("y", 160).text("Hazardous Days").style("font-size", "15px").attr("alignment-baseline","middle")

var svg_5 = d3.select("#pie_2_legend")
    .attr('height', 200);

svg_5.append("circle").attr("cx",50).attr("cy",10).attr("r", 6).style("fill", "#DADBDB")
svg_5.append("circle").attr("cx",50).attr("cy",40).attr("r", 6).style("fill", "#49763E")
svg_5.append("circle").attr("cx",50).attr("cy",70).attr("r", 6).style("fill", "#085483")
svg_5.append("circle").attr("cx",50).attr("cy",100).attr("r", 6).style("fill", "#FFB500")
svg_5.append("circle").attr("cx",50).attr("cy",130).attr("r", 6).style("fill", "#9723C2")
svg_5.append("circle").attr("cx",50).attr("cy",160).attr("r", 6).style("fill", "#B33757")
svg_5.append("text").attr("x", 70).attr("y", 10).text("CO²").style("font-size", "15px").attr("alignment-baseline","middle")
svg_5.append("text").attr("x", 70).attr("y", 40).text("NO²").style("font-size", "15px").attr("alignment-baseline","middle")
svg_5.append("text").attr("x", 70).attr("y", 70).text("Ozone").style("font-size", "15px").attr("alignment-baseline","middle")
svg_5.append("text").attr("x", 70).attr("y", 100).text("SO²").style("font-size", "15px").attr("alignment-baseline","middle")
svg_5.append("text").attr("x", 70).attr("y", 130).text("PM2.5").style("font-size", "15px").attr("alignment-baseline","middle")
svg_5.append("text").attr("x", 70).attr("y", 160).text("PM10").style("font-size", "15px").attr("alignment-baseline","middle")