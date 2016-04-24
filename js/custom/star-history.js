import d3 from "d3";
import nv from "nvd3";
import Vue from "vue";
import "nvd3/build/nv.d3.css"
//TODO solve path problem
import "../../css/custom/star-history.css"

//dynamic data managed by Vue
let starHistoryGraphComponent = Vue.extend({
    template: '<div>A custom component!</div>'
})
//Vue.component('star-history-graph-component', starHistoryGraphComponent);
new starHistoryGraphComponent().$mount('star-history-graph-component')

let data = [
    {
        key: 'test1/test1',
        values: [
            {
                x: new Date('2013-03-01'),
                y: 22
            },
            {
                x: new Date('2013-07-01'),
                y: 55
            },
            {
                x: new Date('2013-12-01'),
                y: 122
            },
            {
                x: new Date('2014-05-01'),
                y: 467
            },
            {
                x: new Date('2015-02-01'),
                y: 1223
            }
        ]
    },
    {
        key: 'test1/test2',
        values :[
            {
                x: new Date('2012-03-01'),
                y: 12
            },
            {
                x: new Date('2012-12-21'),
                y: 355
            },
            {
                x: new Date('2013-06-13'),
                y: 722
            },
            {
                x: new Date('2015-02-12'),
                y: 4223
            }
        ]
    }
];
console.log(data);

nv.addGraph(function() {
    var chart = nv.models.lineChart()
    .useInteractiveGuideline(true)
    .color(d3.scale.category10().range());

    chart.xAxis
    .tickFormat(function(d) {
        return d3.time.format('%x')(new Date(d))
    });

    chart.yAxis
    .axisLabel('Stars')
    .tickFormat(d3.format('d'));

    d3.select('#chart svg')
    .datum(data)
    .transition().duration(500)
    .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
});