class Pie {

    constructor(_config, _data) {
        this.config = {
          parentElement: _config.parentElement,
          containerWidth: _config.containerWidth || 500,
          containerHeight: _config.containerHeight || 140,
          fields: _config.fields,
          labels: _config.labels,
          margin: { top: 100, bottom: 20, right: 100, left: 100 }
        }
    
        this.data = _data;

        // Call a class function
        this.initVis();
      }
    
      initVis() {

        let vis = this;
      
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
        vis.radius = Math.min(vis.width,vis.height) / 2;

        vis.svg = d3.select(vis.config.parentElement)
          .attr('width', vis.config.containerWidth)
          .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
          .attr('transform', `translate(${vis.config.margin.left + 100}, ${vis.config.margin.top})`);

        var numbers = [];
        vis.percents = [];

        for(let i = 0; i < vis.config.fields.length; i++) {
            for (const [id, value] of Object.entries(vis.data)) {
              if(id == vis.config.fields[i]){
                numbers.push(value);
              }
            }
        }

        for(let i = 0; i < numbers.length; i++) {
            if(vis.data == null) { 
              break; }
            vis.percents.push((numbers[i] / vis.data["Days_with_AQI"]) * 100);
        }
       
      vis.chart.append('text')
        .attr('x',100)
        .attr('y',0)
        .text(vis.config.labels);

      vis.updateVis();
      }

      updateVis() {

        let vis = this;

        vis.pie = d3.pie();

        vis.arc = d3.arc()
          .innerRadius(0)
          .outerRadius(vis.radius);

        vis.arcs = vis.chart.selectAll("arc")
           .data(vis.pie(vis.percents))
          .enter()
          .append("g")
          .on('mouseover', (event,d) => {

            var name;

            for(let i = 0; i < vis.percents.length; i++) {
              if(vis.percents[i] == d.data) {
                console.log("True");
                name = vis.config.fields[i];
              }
            }

            d3.select('#tooltip')
              .style('display', 'block')
              .style('left', (event.pageX + 15) + 'px')   
              .style('top', (event.pageY + 15) + 'px')
              .html(`
                <div class="tooltip-title">${name.replaceAll('_',' ').replace('2','²')}</div>
                <div><i>${vis.data["State"]}, ${vis.data["County"]}</i></div>
                <ul>
                  <li>Year: ${vis.data["Year"]}</li>
                  <li>Percent: ${Math.round(d.data * 100) / 100}%</li>
                </ul>
              `);
          })
          .on('mouseleave', () => {
            d3.select('#tooltip').style('display', 'none');
          });

        if(vis.config.fields[0] == "Days_CO") {
          var color_arr = ['#DADBDB', '#49763E', '#085483', '#FFB500', '#9723C2', '#B33757']
        } else {
          var color_arr = ['#31EA16', '#CDE520', '#FFF300', '#FFC100', '#FF6800', '#EE2710']
        }

        vis.arcs.append('path')
          .attr('fill', function(d, i) {
            return color_arr[i];
          })
          .attr('d', vis.arc);
      }  
      
      updateDataVis(data) {

        console.log("Inside pie update");

        let vis = this;

        if(data == null) {
          console.log("Inside null check");
          var u = vis.svg.select("g")
            .attr("display","none");
          return;
        } 
        
        console.log("Past null data");

        vis.svg.select("g")
          .attr("display","block");

        if(vis.config.fields[0] == "Days_CO") {
          var color_arr = ['#DADBDB', '#49763E', '#085483', '#FFB500', '#9723C2', '#B33757']
        } else {
          var color_arr = ['#31EA16', '#CDE520', '#FFF300', '#FFC100', '#FF6800', '#EE2710']
        }

        var numbers = [];
        vis.percents = [];

        for(let i = 0; i < vis.config.fields.length; i++) {
          for (const [id, value] of Object.entries(data)) {
            if(id == vis.config.fields[i]){
              numbers.push(value);
            }
          }
        }

        for(let i = 0; i < numbers.length; i++) {
            vis.percents.push((numbers[i] / data["Days_with_AQI"]) * 100);
        }

        // if(data == null) {
        //   console.log("Inside null check");
        //   var u = vis.svg.select("g")
        //     .attr("display","none");
        //   return;
        // } 

        vis.arc = d3.arc()
        .innerRadius(0)
        .outerRadius(vis.radius);

        var u = vis.svg.selectAll("path")
          .data(vis.pie(vis.percents));
      
          u.enter()
          .append('path')
          .merge(u)
          .attr('d', vis.arc)
          .attr("fill", function(d, i) {
            return color_arr[i];
          })
          .on('mouseover', (event,d) => {

            var name;

            for(let i = 0; i < vis.percents.length; i++) {

              if(vis.percents[i] == d.data) {
                name = vis.config.fields[i];
              }
            }

            d3.select('#tooltip')
              .style('display', 'block')
              .style('left', (event.pageX + 15) + 'px')   
              .style('top', (event.pageY + 15) + 'px')
              .html(`
                <div class="tooltip-title">${name.replaceAll('_',' ').replace('2','²')}</div>
                <div><i>${vis.data["State"]}, ${vis.data["County"]}</i></div>
                <ul>
                  <li>Year: ${vis.data["Year"]}</li>
                  <li>Percent: ${Math.round(d.data * 100) / 100}%</li>
                </ul>
              `);
          })
          .on('mouseleave', () => {
            d3.select('#tooltip').style('display', 'none');
          });
      
          u.exit().remove();
      }
      
      renderVis() {

      }
}