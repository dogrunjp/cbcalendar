;(function($) {
    $.fn.cbcalendar = function(){
        var color = ["green", "blue", "red", "black"];
        var svg1 = d3.select("body").append("svg").attr("width", 200).attr("height", 300);
        var bars = svg1.append("g").attr("class", "bars");

        var margin = {top: 30, left: 20, right: 20, bottom: 30}, width = 180, height = 500,
            x1 = d3.scale.linear().range([0, width]).domain([1, 12.9]),
            xAxis = d3.svg.axis().scale(x1).orient("top"),
            axis1 = svg1.append("g").attr("class", "x axis").attr("transform", "translate(5,30)");
        axis1.call(xAxis);

        d3.json("data/calender.json", function (error, data) {
            var nest = d3.nest()
                .key(function (d) {
                    return d.name
                })
                .entries(data);

            nest.forEach(function (d1, i) {
                var bars1 = bars.selectAll("g").data(d1.values).enter().append("rect");
                bars1.attr("transform", "translate(5,33)")
                    .attr("x", function (d) {
                        return x1(+d.start)
                    })
                    .attr("rx", 6)
                    .attr("width", function (d) {
                        return x1(+d.end) - x1(+d.start)
                    })
                    .attr("y", function (d) {
                        return i * 15
                    })
                    .attr("ry", 6)
                    .attr("height", 13)
                    .attr("fill", color[i]);

            })
        })
    }
})(jQuery);