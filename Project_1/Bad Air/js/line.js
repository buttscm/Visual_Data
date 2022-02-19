class Line {

  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 500,
      containerHeight: _config.containerHeight || 140,
      fields: _config.fields,
      side: _config.side,
      labels: _config.labels,
      margin: { top: 10, bottom: 30, right: 50, left: 50 }
    }

    this.data = _data;

    // Call a class function
    this.initVis();
  }

  initVis() {
    
    let vis = this; //this is a keyword that can go out of scope, especially in callback functions, 
                    //so it is good to create a variable that is a reference to 'this' class instance

    //set up the width and height of the area where visualizations will go- factoring in margins               
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    //reusable functions for x and y 
        //if you reuse a function frequetly, you can define it as a parameter
        //also, maybe someday you will want the user to be able to re-set it.


    var tmp;
    var tmp_mm;
    var max = 0;

    vis.xValue = d => d.Year;

    for(let i = 0; i < vis.config.fields.length; i++) {
        tmp = d => d[vis.config.fields[i]];
        tmp_mm = d3.extent(vis.data, tmp);
        if(tmp_mm[1] > max) { max = tmp_mm[1]; }
    }
    
    //setup scales
    vis.xScale = d3.scaleLinear()
        .domain([1980, 2021]) 
        .range([0, vis.width]);

    vis.yScale = d3.scaleLinear()
        .domain([0,max])
        .range([vis.height, 0])
        .nice();

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

    // Append group element that will contain our actual chart (see margin convention)
    vis.chart = vis.svg.append('g')
        .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    // Initialize axes
    vis.xAxis = d3.axisBottom(vis.xScale).tickFormat(d3.format("d"));
    vis.yAxis = d3.axisLeft(vis.yScale);
  
    // Append x-axis group and move it to the bottom of the chart
    vis.xAxisG = vis.chart.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0,${vis.height})`)
        .call(vis.xAxis);
    
    // Append y-axis group
    vis.yAxisG = vis.chart.append('g')
        .attr('class', 'axis y-axis')
        .call(vis.yAxis); 

    // X-axis

    vis.chart.append('text')
      .attr('x',205)
      .attr('y',290)
      .text(vis.config.labels[0]);

    // Y-axis

    vis.chart.append('text')
      .attr('x',-150)
      .attr('y',-39)
      .attr('transform', 'rotate(-90)')
      .text(vis.config.labels[1])

    // Title

    vis.chart.append('text')
      .attr('x',150)
      .attr('y',0)
      .text(vis.config.labels[2]);
    
    vis.updateVis();
  }

  //leave this empty for now
 updateVis() { 
    let vis = this;
        
        if(vis.config.fields.length > 3) {
          var color_arr = ['#DADBDB', '#49763E', '#085483', '#FFB500', '#9723C2', '#B33757']
        } else if(vis.config.fields.length > 1) {
          var color_arr = ['#F32525', '#3FB936', '#13B6F0']
        } else {
          var color_arr = ['black']
        }

        vis.highlight = vis.chart.append('rect')
        .attr('width', 2)
        .attr('height', vis.config.containerHeight - 42)
        .attr('fill', 'black')
        .attr('transform',`translate(${vis.config.margin.left - 48.75},${vis.config.margin.top - 8})`)
        .attr('opacity', .5)
        .attr('id','highlight');

        vis.trackingArea = vis.chart.append('rect')
        .attr('width', vis.config.containerWidth - 100)
        .attr('height', vis.config.containerHeight - 42)
        .attr('fill', 'none')
        .attr('pointer-events','all')
        .attr('transform',`translate(${vis.config.margin.left - 48.75},${vis.config.margin.top - 8})`);

      //Initialize line generator helper function
        for(let i = 0; i < vis.config.fields.length; i++) {
            
            vis.yValue = d => d[vis.config.fields[i]];

            vis.line = d3.line()
              .x(d => vis.xScale(vis.xValue(d)))
              .y(d => vis.yScale(vis.yValue(d)));

            vis.chart.append('path')
            .data([vis.data])
            .attr('stroke', color_arr[i])
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', vis.config.side + vis.config.fields[i])
            .attr('d', vis.line);

            if(vis.config.fields.length > 3) {
              vis.chart.selectAll('dot')
                .data(vis.data)
                .enter()
                .append("circle")
                .attr("cx", d=> vis.xScale(vis.xValue(d)))
                .attr("cy", d=> vis.yScale(vis.yValue(d)))
                .attr("r", 5)
                .attr("fill", color_arr[i])
                .on('mouseover', (event,d) => {
                  d3.select('#tooltip')
                    .style('display', 'block')
                    .style('left', (event.pageX + 15) + 'px')   
                    .style('top', (event.pageY + 15) + 'px')
                    .html(`
                      <div class="tooltip-title">${vis.config.fields[i].replace('_',' ')}</div>
                      <div><i>${d.State}, ${d.County}</i></div>
                      <ul>
                        <li>Year: ${d.Year}</li>
                        <li>Days: ${d[vis.config.fields[i]]}</li>
                      </ul>
                    `);
                })
                .on('mouseleave', () => {
                  d3.select('#tooltip').style('display', 'none');
                });
            } else if(vis.config.fields.length > 1) {
              vis.chart.selectAll('dot')
              .data(vis.data)
              .enter()
              .append("circle")
              .attr("cx", d=> vis.xScale(vis.xValue(d)))
              .attr("cy", d=> vis.yScale(vis.yValue(d)))
              .attr("r", 5)
              .attr("fill", color_arr[i])
              .on('mouseover', (event,d) => {
                d3.select('#tooltip')
                  .style('display', 'block')
                  .style('left', (event.pageX + 15) + 'px')   
                  .style('top', (event.pageY + 15) + 'px')
                  .html(`
                    <div class="tooltip-title">${vis.config.fields[i].replace('_',' ')}</div>
                    <div><i>${d.State}, ${d.County}</i></div>
                    <ul>
                      <li>Year: ${d.Year}</li>
                      <li>AQI: ${d[vis.config.fields[i]]}</li>
                    </ul>
                  `);
              })
              .on('mouseleave', () => {
                d3.select('#tooltip').style('display', 'none');
              });             
            } else {
              vis.chart.selectAll('dot')
              .data(vis.data)
              .enter()
              .append("circle")
              .attr("cx", d=> vis.xScale(vis.xValue(d)))
              .attr("cy", d=> vis.yScale(vis.yValue(d)))
              .attr("r", 5)
              .attr("fill", color_arr[i])
              .on('mouseover', (event,d) => {
                d3.select('#tooltip')
                  .style('display', 'block')
                  .style('left', (event.pageX + 15) + 'px')   
                  .style('top', (event.pageY + 15) + 'px')
                  .html(`
                    <div class="tooltip-title">${vis.config.fields[i].replaceAll('_',' ')}</div>
                    <div><i>${d.State}, ${d.County}</i></div>
                    <ul>
                      <li>Year: ${d.Year}</li>
                      <li>Days: ${d[vis.config.fields[i]]}</li>
                    </ul>
                  `);
              })
              .on('mouseleave', () => {
                d3.select('#tooltip').style('display', 'none');
              });
            }
        }

    vis.renderVis();
 }

updateDataVis(data, side) {

  let vis = this
  var tmp = 0;
  var tmp_mm = 0;
  var max = 0;

  vis.chart.selectAll('circle').remove();

  if(vis.config.fields.length > 3) {
    var color_arr = ['#DADBDB', '#49763E', '#085483', '#FFB500', '#9723C2', '#B33757']
  } else if(vis.config.fields.length > 1){
    var color_arr = ['#F32525', '#3FB936', '#13B6F0']
  } else {
    var color_arr = ['black']
  }

  for(let i = 0; i < vis.config.fields.length; i++) {
    if(i == 0) {
      for(let i = 0; i < vis.config.fields.length; i++) {
        tmp = d => d[vis.config.fields[i]];
        tmp_mm = d3.extent(data, tmp);
        if(tmp_mm[1] > max) { max = tmp_mm[1]; }
      }

      vis.yScale.domain([0,max]);
      vis.chart.select('.y-axis')
        .transition()
        .duration(1000)
        .call(vis.yAxis);
    }

    vis.yValue = d => d[vis.config.fields[i]];
    var u = vis.chart.select("." + side + vis.config.fields[i])
    .data([data]);

    u.enter()
    .append('path')
    .merge(u)
    .transition()
    .duration(1000)
    .attr('d', vis.line)
    .attr("stroke", color_arr[i])
    .attr("stroke-width", 2)
    .attr('class', side + vis.config.fields[i])

    u.exit().remove();

    if(vis.config.fields.length > 3) {
      vis.chart.selectAll('dot')
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d=> vis.xScale(vis.xValue(d)))
        .attr("cy", d=> vis.yScale(vis.yValue(d)))
        .attr("r", 5)
        .attr("fill", color_arr[i])
        .on('mouseover', (event,d) => {
          d3.select('#tooltip')
            .style('display', 'block')
            .style('left', (event.pageX + 15) + 'px')   
            .style('top', (event.pageY + 15) + 'px')
            .html(`
              <div class="tooltip-title">${vis.config.fields[i].replace('_',' ')}</div>
              <div><i>${d.State}, ${d.County}</i></div>
              <ul>
                <li>Year: ${d.Year}</li>
                <li>Days: ${d[vis.config.fields[i]]}</li>
              </ul>
            `);
        })
        .on('mouseleave', () => {
          d3.select('#tooltip').style('display', 'none');
        });
    } else if(vis.config.fields.length > 1) {
      vis.chart.selectAll('dot')
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d=> vis.xScale(vis.xValue(d)))
      .attr("cy", d=> vis.yScale(vis.yValue(d)))
      .attr("r", 5)
      .attr("fill", color_arr[i])
      .on('mouseover', (event,d) => {
        d3.select('#tooltip')
          .style('display', 'block')
          .style('left', (event.pageX + 15) + 'px')   
          .style('top', (event.pageY + 15) + 'px')
          .html(`
            <div class="tooltip-title">${vis.config.fields[i].replace('_',' ')}</div>
            <div><i>${d.State}, ${d.County}</i></div>
            <ul>
              <li>Year: ${d.Year}</li>
              <li>AQI: ${d[vis.config.fields[i]]}</li>
            </ul>
          `);
      })
      .on('mouseleave', () => {
        d3.select('#tooltip').style('display', 'none');
      });             
    } else {
      vis.chart.selectAll('dot')
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d=> vis.xScale(vis.xValue(d)))
      .attr("cy", d=> vis.yScale(vis.yValue(d)))
      .attr("r", 5)
      .attr("fill", color_arr[i])
      .on('mouseover', (event,d) => {
        d3.select('#tooltip')
          .style('display', 'block')
          .style('left', (event.pageX + 15) + 'px')   
          .style('top', (event.pageY + 15) + 'px')
          .html(`
            <div class="tooltip-title">${vis.config.fields[i].replace('_',' ')}</div>
            <div><i>${d.State}, ${d.County}</i></div>
            <ul>
              <li>Year: ${d.Year}</li>
              <li>Days: ${d[vis.config.fields[i]]}</li>
            </ul>
          `);
      })
      .on('mouseleave', () => {
        d3.select('#tooltip').style('display', 'none');
      });
    }
  }
}
 //leave this empty for now...
 renderVis() { 
    let vis = this;

    console.log('rendering');

    vis.trackingArea.on('mouseenter', () => {
      d3.selectAll('#highlight')
        .style('display','block')
    })
    .on('mousemove',function(event) {
      const xPos = d3.pointer(event,this)[0];
      d3.selectAll('#highlight')
        .attr('transform',`translate(${xPos},${vis.config.margin.top - 8})`)
    })
    .on('mouseleave', () => {
      d3.selectAll('#highlight').style('display', 'none');
    });
  }
}