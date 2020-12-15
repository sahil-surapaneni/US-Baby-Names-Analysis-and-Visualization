

const parseDate = d3.utcParse("%Y");



d3.csv("babynames.csv", (d) => ({
    Id: +d.Id,
    Name: d.Name,
    Year: parseDate(d.Year),
    Gender: d.Gender,
    Count: +d.Count
  })).then(function(data){
    //var name = document.getElementById("mySearch").value;
    let datasub = data.filter(d => (d.Name === "Aaliyah"))
    let temp = document.getElementById("test").offsetWidth;

    let trace1 = {
        type: "scatter",
        mode: "lines",
        name: "Male",
        x: datasub.filter(d => d.Gender === "M").map(d => d.Year),
        y: datasub.filter(d => d.Gender === "M").map(d => d.Count),
        line: {color: '#7F7F7F'}
      };

      let trace2 = {
        type: "scatter",
        mode: "lines",
        name: "Female",
        x: datasub.filter(d => d.Gender === "F").map(d => d.Year),
        y: datasub.filter(d => d.Gender === "F").map(d => d.Count),
        line: {color: '17BECF'}
      }


      let layout = {
        title: "Popularity of 'Aaliyah' over Time",

        width: temp-20,
        margin: {
          l: 80,
          r: 20,
          b: 30,
          t: 30,
          pad: 4
        },
        paper_bgcolor: '#f7f5eb',
        plot_bgcolor: '#f7f5eb'
    };


      //const div = DOM.element('cha');
      Plotly.newPlot("chart", [trace1, trace2], layout);

  })




function line_graph(source) {
    const parseDate = d3.utcParse("%Y");
        let temp = document.getElementById("test").offsetWidth;
        d3.csv(source, (d) => ({
            Name: d.name,
            Year: parseDate(d.year),
            Gender: d.gender,
            Count: +d.count,
            State: d.state
        })).then(function(data){
            var name = curr_name;
            console.log(curr_name)
            let datasub = data.filter(d => (d.Name === curr_name))
            console.log(datasub)
            
    
            let trace1 = {
                type: "scatter",
                mode: "lines",
                name: "Male",
                x: datasub.filter(d => d.Gender === "M").map(d => d.Year),
                y: datasub.filter(d => d.Gender === "M").map(d => d.Count),
                line: {color: '#7F7F7F'}
            };
    
            let trace2 = {
                type: "scatter",
                mode: "lines",
                name: "Female",
                x: datasub.filter(d => d.Gender === "F").map(d => d.Year),
                y: datasub.filter(d => d.Gender === "F").map(d => d.Count),
                line: {color: '17BECF'}
            }
    
    
            let layout = {
                title: "Popularity of \'"+name+"\' over Time in "+state_to_disp,
                width: temp-20,
                margin: {
                  l: 80,
                  r: 20,
                  b: 30,
                  t: 30,
                  pad: 4
                },
                paper_bgcolor: '#f7f5eb',
                plot_bgcolor: '#f7f5eb'
            };
    
    
            //const div = DOM.element('cha');
            Plotly.react ("chart", [trace1, trace2], layout);
    
      })
    
  
  }
  
  




  function line_graph2(source) {
    const parseDate = d3.utcParse("%Y");
        let temp = document.getElementById("test").offsetWidth;
        d3.csv(source, (d) => ({
            Name: d.Name,
            Year: parseDate(d.Year),
            Gender: d.Gender,
            Count: +d.Count
        })).then(function(data){
            var name = curr_name;
            console.log(curr_name)
            let datasub = data.filter(d => (d.Name === curr_name))
            console.log(datasub)
            
    
            let trace1 = {
                type: "scatter",
                mode: "lines",
                name: "Male",
                x: datasub.filter(d => d.Gender === "M").map(d => d.Year),
                y: datasub.filter(d => d.Gender === "M").map(d => d.Count),
                line: {color: '#7F7F7F'}
            };
    
            let trace2 = {
                type: "scatter",
                mode: "lines",
                name: "Female",
                x: datasub.filter(d => d.Gender === "F").map(d => d.Year),
                y: datasub.filter(d => d.Gender === "F").map(d => d.Count),
                line: {color: '17BECF'}
            }
    
    
            let layout = {
                title: "Popularity of \'"+name+"\' over Time",
                width: temp-20,
                margin: {
                  l: 50,
                  r: 20,
                  b: 30,
                  t: 30,
                  pad: 4
                },
                paper_bgcolor: '#f7f5eb',
                plot_bgcolor: '#f7f5eb'
            };
    
    
            //const div = DOM.element('cha');
            Plotly.newPlot("chart", [trace1, trace2], layout);
    
      })
    
  
  }


















  



var width = window.innerWidth
var height = window.innerHeight

var margin = ({top: 10, right: 10, bottom: 60, left: 60})




function convertData(gender,data1,uniqueNames){



  return ({
    y: "Number of Babies",
    series: uniqueNames.map(n => ({
      name: n,
      values: dataFilter(data1,n,gender).map(d => d.Count)
    })),
    years: [... new Set(data1.filter(n => n.Name === "Mary" && n.Gender === "F").map(n => n.Year))]
  })
};


dataFilter = (data1,n, g) => {


      //console.log(data1.filter(name => name.Name === n && name.Gender === g).map(d => d.Count))
      //console.log(data1.filter(name => name.Name === n && name.Gender === g))
      // console.log()



  return data1.filter(name => name.Name === n && name.Gender === g)
}





function multiChart(){

  d3.select("#multiChart").selectAll("*").remove()


d3.csv("babynames.csv", (d) => ({
    Id: +d.Id,
    Name: d.Name,
    Year: parseDate(d.Year),
    YearN: +d.Year,
    Gender: d.Gender,
    Count: +d.Count
})).then(function(data1){
      var name = document.getElementById("mySearch2").value;
      var gender = document.getElementById("gender").value;
      const searchBar = document.getElementById("searchBar");
      if( name === null){

          name = "Mary,Amy";

      }

        var uniqueNames = name.split(",");

      
      

      
      let chartData = convertData(gender,data1,uniqueNames)
      //console.log((chartData.series[0].values).length)



    let max =0;
   
    for(i=0;i<chartData.series.length;i++){
      let tempMax = d3.max(chartData.series[i].values)
      if(max < tempMax){
        max = tempMax;
      }
      

      if(chartData.series[i].values.length != 0 && chartData.series[i].values.length <139){
        let temp = 139-(chartData.series[i].values).length;

        for(z=0;z<temp;z++){
          

          chartData.series[i].values.unshift(0)

        }



      }


    }




    

    //d3.max(chartData.series[i].values)
    // console.log(datasub)
    // console.log(chartData)

    x = d3.scaleUtc()
      .domain(d3.extent(chartData.years))
      .range([margin.left, width - margin.right])


    y = d3.scaleLinear()
      .domain([0, max]).nice()
      .range([height - margin.bottom, margin.top])

    xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .attr("font-size","20px")


    yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(chartData.y))
            .attr("font-size","14px");

    
    line = d3.line()
      .x((d, i) => x(chartData.years[i]))
      .y(d => y(d))


      let multiChart = d3.select("#multiChart")
      let svg = multiChart.append("svg")
      svg.attr("viewBox", [0, 0, window.innerWidth, window.innerHeight])
      svg.style("overflow", "visible");

      svg.append("g")
        .call(xAxis);

      svg.append("g")
        .call(yAxis);

    const path = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
    
    .selectAll("path")
    .data(chartData.series)
    .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("d", d => line(d.values));

      
    svg.call(hover, path,chartData);
})



function hover(svg, path,chartData) {
  
  if ("ontouchstart" in document) svg
      .style("-webkit-tap-highlight-color", "transparent")
      .on("touchmove", moved)
      .on("touchstart", entered)
      .on("touchend", left)
  else svg
      .on("mousemove", moved)
      .on("mouseenter", entered)
      .on("mouseleave", left);

  const dot = svg.append("g")
      .attr("display", "none");

  dot.append("circle")
      .attr("r", 2.5);

  dot.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("y", -8);

  function moved(event) {
    event.preventDefault();
    const pointer = d3.pointer(event, this);
    const xm = x.invert(pointer[0]);
    const ym = y.invert(pointer[1]);
    const i = d3.bisectCenter(chartData.years, xm);
    const s = d3.least(chartData.series, d => Math.abs(d.values[i] - ym));
    path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
    dot.attr("transform", `translate(${x(chartData.years[i])},${y(s.values[i])})`);
    dot.select("text").text(s.name)
      .attr("font-size","20px");
  }

  function entered() {
    path.style("mix-blend-mode", null).attr("stroke", "#ddd");
    dot.attr("display", null);
  }

  function left() {
    path.style("mix-blend-mode", "multiply").attr("stroke", null);
    dot.attr("display", "none");
  }
}




}



multiChart();



















































let barSize = 80;



var parser = d3.timeParse("%m/%d/%Y");

let barChart = d3.select("#maleRace");

let svg1 = barChart.append("svg")
svg1.attr("viewBox",[0,0,window.innerWidth,window.innerHeight])
svg1.attr("overflow","visible");

svg1.append("text")
    .attr("x", (width / 2))             
    .attr("y", 75)
    .attr("text-anchor", "middle")  
    .style("font-size", "20px")   
    .text("Top 10 Female Baby Names [1880-2018]");


function femaleDraw(){    
  d3.select("#bars").selectAll("svg > *").remove();
    console.log("REMOVES");
    d3.csv("babynames_female.csv").then(function(data){
        data.forEach(d => {
            d.Year = parser(d.Year);
            d.Count = +d.Count;
        });


        formatYear = d3.format(",d");
        const females = data

        femaleNames  = new Set(females.map(d => d.Name));

        yearValues = Array.from(d3.rollup(females, ([d]) => d.Count,  d => +d.Year, d => d.Name))
            .map(([Year, females]) => [new Date(Year), females])
            


        frames = getFrames(yearValues);
        femaleFrames = d3.groups(frames.flatMap(([, females]) => females), d=> d.Name);


        previous = new Map(femaleFrames.flatMap (([, females]) => d3.pairs(females, (a,b) => [b,a])));


        next = new Map(femaleFrames.flatMap(([, females]) => d3.pairs(females)));
        



        x1 = d3.scaleLinear([0, 1], [margin.left, width-margin.right])

        y1 = d3.scaleBand()
            .domain(d3.range(10+1))
            .rangeRound([margin.top, margin.top+barSize*(10+1+0.1)])
            .padding(0.1)

        formatDate = d3.utcFormat("%Y");


  


        const updateBars = bars(svg1);
        const updateAxis = axis(svg1);
        const updateLabels = label(svg1);
        const updateTicker = ticker(svg1);


        async function runFrames(frames,svg1){

            for (const frame of frames) {
                const transition = svg1.transition()
                    .duration(700)
                    .ease(d3.easeLinear);
        
                x1.domain([0, frame[1][0].value]);
        
                updateAxis(frame, transition);
                updateBars(frame, transition);
                updateLabels(frame, transition);
                updateTicker(frame, transition);
        
            await transition.end();
        
            }


        }


        runFrames(frames,svg1);    

        

        var iters = 0;
        // assigning rank to each top 10 female names every yeAR
        function ranks(value){
            const data = Array.from(femaleNames, Name => ({Name, value: value(Name)}));
            data.sort((a,b) => d3.descending(a.value, b.value));
            for(let i = 0; i < data.length; ++i) data[i].ranks = Math.min(10,i);
            iters++;
            
            return data; 
        }

        // var ans = ranks(Name => yearValues[0][1].get(Name));
        // console.log(ans);

        // interpolation
        function getFrames(yearValues){
            const keyFrames = [];
            let ka;
            let kb;
            let a;
            let b;


            for([[ka, a], [kb, b]] of d3.pairs(yearValues)){
                for (let i = 0; i < 1; ++i){
                    const t = i/1;
                    keyFrames.push([
                        new Date(ka*(1-t) + kb*t),
                        ranks(Name => (a.get(Name) || 0)*(1-t) + (b.get(Name) || 0)*t)
                    ]);
                }        
            }
            keyFrames.push([new Date(kb), ranks(Name => b.get(Name) || 0)]);
            return keyFrames;
    };
        




        function bars(svg){
            let bar = svg.append("g")
                .attr("fill-opacity", 0.6)
            .selectAll("rect");
            
            return([Year, females], transition) => bar = bar
                .data(females.slice(0, 10), d => d.Name)
                .join(
                    enter => enter.append("rect")
                        .attr("fill", "pink")
                        .attr("height", y1.bandwidth())
                        .attr("x", x1(0))
                        .attr("y", d => y1((previous.get(d) || d).ranks))
                        .attr("width", d => x1((previous.get(d) || d).value) - x1(0)),
                    update => update,
                    exit => exit.transition(transition).remove()
                        .attr("y", d => y1((next.get(d) || d).ranks))
                        .attr("width", d => x1((next.get(d) || d).value) - x1(0))
                )
                .call(bar => bar.transition(transition)
                    .attr("y", d => y1(d.ranks))
                    .attr("width", d => x1(d.value)-x1(0)));
        }


        
        
        function labelYear(a, b){
            const x1 = d3.interpolateNumber(a, b);
            return function(t){
                this.textContent = formatYear(x1(t));
            };
        }


        function label(svg){
            let label = svg.append("g")
                .style("font-size", "25px")
                .style("font-weight", "bold")
                .style("font-variant-numeric", "tabular-nums")
                .attr("text-anchor", "end")
            .selectAll("rect");
            
            return([Year, females], transition) => label = label   
                .data(females.slice(0, 10), d => d.Name)
                .join(
                    enter => enter.append("text")
                        .attr("transform", d => `translate(${x1((previous.get(d) || d).value)}, ${y1((previous.get(d) || d).ranks)})`)
                        .attr("y", y1.bandwidth()/2)
                        .attr("x", -6)
                        .attr("dy", "-0.25em")
                        .text(d => d.Name)
                        .call(text => text.append("tspan")
                            .attr("fill-opacity", 0.7)
                            .attr("font-size","27px")
                            .attr("font-weight", "normal")
                            .attr("x", -6)
                            .attr("dy", "1.15em")),
                    update => update,
                    exit => exit.transition(transition).remove()
                        .attr("transform", d => `tranlate(${x1((next.get(d) || d).value)}, ${y1((next.get(d) || d).ranks)})`)
                        .call(g => g.select("tspan").tween("text", d => labelYear(d.value, (next.get(d) || d).value)))                    
                )
                .call(bar => bar.transition(transition)
                    .attr("transform", d => `translate(${x1(d.value)}, ${y1(d.ranks)})`)
                    .call(g => g.select("tspan").tween("text", d => labelYear((previous.get(d) || d).value, d.value))))
        }


        // Makes the axis adjustable 

        function axis(svg){
            const g = svg.append("g")
                .attr("transform", `translate(0, ${margin.top})`);
            
                const axis = d3.axisTop(x1)
                    .ticks(width/160)
                    .tickSizeOuter(0)
                    .tickSizeInner(-barSize*(10+y1.padding()));

            return (_, transition) => {
                g.transition(transition).call(axis);
                g.select(".tick:first-of-type text").remove();
                g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
                  
                g.select(".domain").remove();
            };
        }
        


        // Ticks the year through from 1880-2018

        function ticker(svg){
            const now = svg.append("text")
                .style("font-size", "100px")
                .style("font-weight", "bold")
                .attr("text-anchor", "end")
                .attr("x", width-50)
                .attr("y", margin.top + barSize*(10-0.3))
                .attr("dy", "0.32em")
                .text(formatDate(frames[0][0]));
            return([date], transition) => {
                transition.end().then(() => now.text(formatDate(date)));
            };
        }

        

        

    });
}

let malebarChart = d3.select("#barRace");

let svg2 = malebarChart.append("svg")
svg2.attr("viewBox",[0,0,window.innerWidth,window.innerHeight])
svg2.attr("overflow","visible");
// svg2.attr("style", "outline: thin double lightblue;")

svg2.append("text")
    .attr("x", (width / 2))             
    .attr("y", 75)
    .attr("text-anchor", "middle")  
    .style("font-size", "20px")   
    .text("Top 10 Male Baby Names [1880-2018]");


function maleDraw()
{
    d3.select("#bars").selectAll("svg > *").remove();
    d3.csv("babynames_male.csv").then(function(data){
        data.forEach(d => {
            d.Year = parser(d.Year);
            // d.Year = d3.timeFormat("%m-%d-%Y")(d.Year)
            d.Count = +d.Count;
        });


        formatYear = d3.format(",d");

        const males = data

        maleNames  = new Set(males.map(d => d.Name));

        maleYearValues = Array.from(d3.rollup(males, ([d]) => d.Count,  d => +d.Year, d => d.Name))
            .map(([Year, males]) => [new Date(Year), males])
            


        frames2 = getFrames(maleYearValues);
        maleFrames = d3.groups(frames2.flatMap(([, males]) => males), d=> d.Name);


        prev = new Map(maleFrames.flatMap (([, males]) => d3.pairs(males, (a,b) => [b,a])));


        n = new Map(maleFrames.flatMap(([, males]) => d3.pairs(males)));
        



        x2 = d3.scaleLinear([0, 1], [margin.left, width-margin.right])

        y2 = d3.scaleBand()
            .domain(d3.range(10+1))
            .rangeRound([margin.top, margin.top+barSize*(10+1+0.1)])
            .padding(0.1)

        formatDate = d3.utcFormat("%Y");


  


        const updateBars = bars(svg2);
        const updateAxis = axis(svg2);
        const updateLabels = label(svg2);
        const updateTicker = ticker(svg2);


        async function runFrames(frames2,svg2){

            for (const frame of frames2) {
                const transition = svg2.transition()
                    .duration(700)
                    .ease(d3.easeLinear);
        
                x2.domain([0, frame[1][0].value]);
        
                updateAxis(frame, transition);
                updateBars(frame, transition);
                updateLabels(frame, transition);
                updateTicker(frame, transition);
        
            await transition.end();
        
            }


        }


        runFrames(frames2,svg2);    

        

        var iters = 0;
        // assigning rank to each top 10 female names every yeAR
        function ranks(value){
            const data = Array.from(maleNames, Name => ({Name, value: value(Name)}));
            data.sort((a,b) => d3.descending(a.value, b.value));
            for(let i = 0; i < data.length; ++i) data[i].ranks = Math.min(10,i);
            iters++;
            
            return data; 
        }

        // var ans = ranks(Name => maleYearValues[0][1].get(Name));
        // console.log(ans);

        // interpolation
        function getFrames(maleYearValues){
            const keyFrames = [];
            let ka;
            let kb;
            let a;
            let b;


            for([[ka, a], [kb, b]] of d3.pairs(maleYearValues)){
                for (let i = 0; i < 1; ++i){
                    const t = i/1;
                    keyFrames.push([
                        new Date(ka*(1-t) + kb*t),
                        ranks(Name => (a.get(Name) || 0)*(1-t) + (b.get(Name) || 0)*t)
                    ]);
                }        
            }
            keyFrames.push([new Date(kb), ranks(Name => b.get(Name) || 0)]);
            return keyFrames;
    };
        




        function bars(svg){
            let bar = svg.append("g")
                .attr("fill-opacity", 0.6)
            .selectAll("rect");
            
            return([Year, males], transition) => bar = bar
                .data(males.slice(0, 10), d => d.Name)
                .join(
                    enter => enter.append("rect")
                        .attr("fill", "lightblue")
                        .attr("height", y2.bandwidth())
                        .attr("x", x2(0))
                        .attr("y", d => y2((prev.get(d) || d).ranks))
                        .attr("width", d => x2((prev.get(d) || d).value) - x2(0)),
                    update => update,
                    exit => exit.transition(transition).remove()
                        .attr("y", d => y2((n.get(d) || d).ranks))
                        .attr("width", d => x2((n.get(d) || d).value) - x2(0))
                )
                .call(bar => bar.transition(transition)
                    .attr("y", d => y2(d.ranks))
                    .attr("width", d => x2(d.value)-x2(0)));
        }


        
        
        function labelYear(a, b){
            const x1 = d3.interpolateNumber(a, b);
            return function(t){
                this.textContent = formatYear(x1(t));
            };
        }


        function label(svg){
            let label = svg.append("g")
                .style("font-size", "25px")
                .style("font-weight", "bold")
                .style("font-variant-numeric", "tabular-nums")
                .attr("text-anchor", "end")
            .selectAll("rect");
            
            return([Year, males], transition) => label = label   
                .data(males.slice(0, 10), d => d.Name)
                .join(
                    enter => enter.append("text")
                        .attr("transform", d => `translate(${x2((prev.get(d) || d).value)}, ${y2((prev.get(d) || d).ranks)})`)
                        .attr("y", y2.bandwidth()/2)
                        .attr("x", -6)
                        .attr("dy", "-0.25em")
                        .text(d => d.Name)
                        .call(text => text.append("tspan")
                            .attr("fill-opacity", 0.7)
                            .attr("font-size","27px")
                            .attr("font-weight", "normal")
                            .attr("x", -6)
                            .attr("dy", "1.15em")),
                    update => update,
                    exit => exit.transition(transition).remove()
                        .attr("transform", d => `tranlate(${x2((n.get(d) || d).value)}, ${y2((n.get(d) || d).ranks)})`)
                        .call(g => g.select("tspan").tween("text", d => labelYear(d.value, (n.get(d) || d).value)))                    
                )
                .call(bar => bar.transition(transition)
                    .attr("transform", d => `translate(${x2(d.value)}, ${y2(d.ranks)})`)
                    .call(g => g.select("tspan").tween("text", d => labelYear((prev.get(d) || d).value, d.value))))
        }


        // Makes the axis adjustable 

        function axis(svg){
            const g = svg.append("g")
                .attr("transform", `translate(0, ${margin.top})`);
            
                const axis = d3.axisTop(x2)
                    .ticks(width/160)
                    .tickSizeOuter(0)
                    .tickSizeInner(-barSize*(10+y2.padding()));

            return (_, transition) => {
                g.transition(transition).call(axis);
                g.select(".tick:first-of-type text").remove();
                g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
                g.select(".domain").remove();
            };
        }
        


        // Ticks the year through from 1880-2018

        function ticker(svg){
            const now = svg.append("text")
                .style("font-size", "100px")
                .style("font-weight", "bold")
                .attr("text-anchor", "end")
                .attr("x", width-50)
                .attr("y", margin.top + barSize*(10-0.3))
                .attr("dy", "0.32em")
                .text(formatDate(frames2[0][0]));
            return([date], transition) => {
                transition.end().then(() => now.text(formatDate(date)));
            };
        }

        

        

    });
}

drawGraphs();

function drawGraphs()
{
  femaleDraw();
  maleDraw();

}

































//Width and height of map
// var width = window.innerWidth/2;
// var height = window.innerHeight/2;
var source = "data/Aaliyah.csv"
var YEAR = 1910;
var curr_click = -1;
var state_to_disp = ""
var state_source = ""
var curr_name = "Aaliyah"


// d3v4 Projection
var projection = d3v4.geoAlbersUsa()
  .scale(550)
  .translate([250,150])
  // .translate([width / 2, height / 2]) // translate to center of screen
  //.scale([1000]); // scale things down so see entire US

// Define path generator
var path = d3v4.geoPath() // path generator that will convert GeoJSON to SVG paths
  .projection(projection); // tell path generator to use albersUsa projection

d3v4.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

//Create SVG element and append map to the SVG
d3v4.csv("namelist.csv", function(error, data) {
    var select = d3v4.select("#mapNameContainer")
      .append("div")
      .append("select")

    select
      .on("change", function(d) {
        var value = d3v4.select(this).property("value");
        curr_name = value;
        source = 'data/' + value + '.csv'
        document.getElementById('nameText').innerHTML = value;
        tempUpdate(source);
        line_graph2("babynames.csv");
      });

    select.selectAll("option")
      .data(data)
      .enter()
        .append("option")
        .attr("Name", function (d) { return d.name; })
        .text(function (d) { return d.name; });
  });


var svg = d3v4.select("#map")
  .append("svg")
  .attr("width", 500)
  .attr("height", 300);




function tempUpdate(source){
  d3v4.csv(source, function(data) {
    var dataArray = [];
    var gender = data[0].gender;
    if(gender == "F"){
        var lowColor = '#e7edea'
        var highColor = '#bc2a66'
    }
    else{
        var lowColor = '#e7edea'
        var highColor = '#0D4F8B'
    }
    for (var d = 0; d < data.length; d++){
        dataArray.push(parseFloat(data[d][YEAR]))
    }
    var minVal = d3v4.min(dataArray)
    var maxVal = d3v4.max(dataArray)
    var ramp = d3v4.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])
        
    // Load GeoJSON data and merge with states data
    d3v4.json("us-states.json", function(json) {

        // Loop through each state data value in the .csv file
        for (var i = 0; i < data.length; i++) {

          // Grab State Name
          var dataState = data[i].state;

          // Grab data value 
          var dataValue = data[i][YEAR];

          // Find the corresponding state inside the GeoJSON
          for (var j = 0; j < json.features.length; j++) {
              var jsonState = json.features[j].properties.name;

              if (dataState == jsonState) {

              // Copy the data value into the JSON
              json.features[j].properties.value = dataValue;

              // Stop looking through the JSON
              break;
              }
          }
        }

        var svg = d3v4.select('#map').select("svg").selectAll('path').data(json.features);
        svg.attr('d', path)
          .style("stroke", "#fff")
          .style("stroke-width", "1")
          .on("click",function(d){
            d3v4.select('#map').select("svg").selectAll("path")
              .style("stroke", "#fff")
              .style("stroke-width", "1")
              .style("fill", function(d) {
                var value = d.properties.value;
  
                if (value) {
                    return ramp(value);
                } else {
                //If value is undefined…
                return "rgb(213,222,217)";
                }
            });
            d3v4.select(this)
              .style("fill","#69b3a2")
              .style("stroke", "#000")
              .style("stroke-width", "2")
              .moveToFront();
  
            if(d.id == curr_click){
              d3v4.select(this)
              .style("stroke", "#fff")
              .style("stroke-width", "1")
              .style("fill", function(d) {
                var value = d.properties.value;
  
                if (value) {
                    return ramp(value);
                } else {
                //If value is undefined…
                return "rgb(213,222,217)";
                }
              });
              curr_click = -1;
              state_to_disp = "none"
              line_graph2("babynames.csv")
            }
            else{
              curr_click = d.id
              state_to_disp = d.properties.name;
              state_source = "state_data/" + state_to_disp + ".csv";
              console.log(state_source);
              line_graph(state_source);
            }
            
          })

          .style("fill", function(d) {
              var value = d.properties.value;

              if (value) {
                  return ramp(value);
              } else {
              //If value is undefined…
              return "rgb(213,222,217)";
              }
          });
          
          var w = 140, h = 300;
          d3v4.select("#legend").selectAll("*").remove();
            var key = d3v4.select("#legend")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

            var legend = key.append("defs")
                .append("svg:linearGradient")
                .attr("id", "gradient")
                .attr("x1", "100%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

            legend.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", highColor)
                .attr("stop-opacity", 1);
                
            legend.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", lowColor)
                .attr("stop-opacity", 1);

            key.append("rect")
                .attr("width", w - 100)
                .attr("height", h)
                .style("fill", "url(#gradient)")
                .attr("transform", "translate(0,10)");

            var y = d3v4.scaleLinear()
                .range([h, 0])
                .domain([minVal, maxVal]);

            var yAxis = d3v4.axisRight(y);

            key.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(41,10)")
                .call(yAxis)
        svg.exit().remove();    

    });
    });
}






// Load in my states data!
function updateChart(source){
    // d3v4.select("#map").selectAll("*").remove();
    // var svg = d3v4.select("#map")
    // .append("svg")
    // .attr("width", width)
    // .attr("height", height);
    d3v4.csv(source, function(data) {
    var dataArray = [];
    var gender = data[0].gender;
    if(gender == "F"){
        var lowColor = '#e7edea'
        var highColor = '#bc2a66'
    }
    else{
        var lowColor = '#e7edea'
        var highColor = '#0D4F8B'
    }
    for (var d = 0; d < data.length; d++){
        dataArray.push(parseFloat(data[d][YEAR]))
    }
    var minVal = d3v4.min(dataArray)
    var maxVal = d3v4.max(dataArray)
    var ramp = d3v4.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])
        
    // Load GeoJSON data and merge with states data
    d3v4.json("us-states.json", function(json) {

        // Loop through each state data value in the .csv file
        for (var i = 0; i < data.length; i++) {

        // Grab State Name
        var dataState = data[i].state;

        // Grab data value 
        var dataValue = data[i][YEAR];

        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < json.features.length; j++) {
            var jsonState = json.features[j].properties.name;

            if (dataState == jsonState) {

            // Copy the data value into the JSON
            json.features[j].properties.value = dataValue;

            // Stop looking through the JSON
            break;
            }
        }
        }

        // Bind the data to the SVG and create one path per GeoJSON feature
        
        svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .on("click",function(d){
          svg.selectAll("path")
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function(d) {
              var value = d.properties.value;

              if (value) {
                  return ramp(value);
              } else {
              //If value is undefined…
              return "rgb(213,222,217)";
              }
          });
          d3v4.select(this)
            .style("fill","#69b3a2")
            .style("stroke", "#000")
            .style("stroke-width", "2")
            .moveToFront();

          if(d.id == curr_click){
            d3v4.select(this)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function(d) {
              var value = d.properties.value;

              if (value) {
                  return ramp(value);
              } else {
              //If value is undefined…
              return "rgb(213,222,217)";
              }
            });
            curr_click = -1;
            state_to_disp = "none"
            line_graph2("babynames.csv")
          }
          else{
            curr_click = d.id
            state_to_disp = d.properties.name;
            state_source = "state_data/" + state_to_disp + ".csv";
            console.log(state_source);
            line_graph(state_source);
          }
          
        })
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .style("fill", function(d) {
            var value = d.properties.value;

            if (value) {
                return ramp(value);
            } else {
            //If value is undefined…
            return "rgb(213,222,217)";
            }
        });
        
            // add a legend
            var w = 140, h = 300;

            var key = d3v4.select("#legend")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

            var legend = key.append("defs")
                .append("svg:linearGradient")
                .attr("id", "gradient")
                .attr("x1", "100%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

            legend.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", highColor)
                .attr("stop-opacity", 1);
                
            legend.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", lowColor)
                .attr("stop-opacity", 1);

            key.append("rect")
                .attr("width", w - 100)
                .attr("height", h)
                .style("fill", "url(#gradient)")
                .attr("transform", "translate(0,10)");

            var y = d3v4.scaleLinear()
                .range([h, 0])
                .domain([minVal, maxVal]);

            var yAxis = d3v4.axisRight(y);

            key.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(41,10)")
                .call(yAxis)
    });
    });
}


var dataTime = d3.range(0, 12).map(function(d) {
    return new Date(1910 + 10*d, 10, 3);
  });

var slider = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .width(300)
    .default(new Date(2000, 10, 3))
    .displayValue(false)
    .step(1000 * 60 * 60 * 24 * 365)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTime)
    .on('onchange', (val) => {
        var temp = val.toString()
        var res = temp.split(" ");
      YEAR = res[3];
      document.getElementById('yearText').innerHTML = YEAR;
      tempUpdate(source);
      d3.select('#value').text(YEAR);
    });

  d3.select('#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider);

 updateChart(source);