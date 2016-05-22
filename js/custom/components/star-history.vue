<template>
    {{ errorMessage }}<br/>
    Input repo name:
    <input type="text" placeholder="{{ defaultRepo }}" v-model="searchRepo">
    <button class="btn" v-on:click="SearchStarHistory">Search</button>
    <div id="chart">
        <svg></svg>
    </div>
</template>

<script>
import d3 from "d3";
import nv from "nvd3";
import Vue from "vue"
import VueResource from "vue-resource"
import "nvd3/build/nv.d3.css"

//TODO config server
//TODO error message
//TODO filter same repo
export default {
    name: 'StarHistoryView',
    data: function() {
        return {
            errorMessage: '',
            defaultRepo: 'timqian/star-history',
            searchRepo: '',
            repoData: []
        }
    },
    methods: {
        SearchStarHistory: function(event) {
            let searchRepo = this.searchRepo?this.searchRepo:this.defaultRepo;
            let serverAddress = 'http://133.130.99.202/api/starhistory/1.0/';
            let searchUrl = serverAddress + searchRepo;
            console.log(searchUrl);
            Vue.use(VueResource);
            Vue.http.get(searchUrl).then((response) => {
                this.errorMessage = "";
                console.log(this.repoData);
                let currRepoStarHistory = get_data_from_json(response.data);            
                this.repoData.push(currRepoStarHistory);
                update_star_history_graph(this.repoData);
            }).catch((response) => {
                console.log(response);
                this.errorMessage = "Can't get data.";
            });
        }
    }
}

function get_data_from_json(json_data) {
    return {
        key: json_data['repo_name'],
        values: json_data['history_data'].map((item) => {
            return {
                x: new Date(item.date),
                y: Number(item.count)
            }
        })
    }
}

function update_star_history_graph(data) {
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
}
</script>

<style>
svg {
    display: block;
}
/*TODO solve x axis text block problem*/
#chart,
svg {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin: auto;
    padding-left: auto;
    padding-right: auto;
    padding-right: auto;
}
</style>