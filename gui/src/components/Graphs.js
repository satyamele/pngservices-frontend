import React, {Component, useEffect, useState} from "react";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { formatDate, compareMonth } from "../utility/utility";

const options = {
    chart: {
        type: "pie"
    },
    title: {
        text: `Investments done on ${formatDate(new Date())}`,
    },
    series: [{
        name: 'Investments',
        colorByPoint: true,
        data: []
    }]
};

export const DailyInvestmentPieChart = ({data}) => {
    const [graphData, setGraphData] = useState(options);

    useEffect(() => {
        const nameAndInvestments = data.map(item => {
            const q = new Date();
            const m = q.getMonth();
            const d = q.getDate();
            const y = q.getFullYear();

            const today = new Date(y,m,d).getDate();
            const invDate = new Date(item.lastservice).getDate();
            return invDate === today && ({name: item.name, y: item.investment});
        }).filter(data => data !== false);

        setGraphData({...options, series: [{...options.series[0], data: nameAndInvestments}]})
    }, [data.length])
    return (
        <div style={{marginTop: 24}}>
            <PieChart highcharts={Highcharts} options={graphData}/>
        </div>
    );
};


const BarChartoptions = {
    chart: {
        type: 'column'
    },
    title: {
        text: `Investments done on ${formatDate(new Date).split(' ')[1]}`
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total monthly investments'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: []
}

export const MonthlyInvestmentBarChart = ({data}) => {
    const [graphData, setGraphData] = useState(BarChartoptions);

    useEffect(() => {
        const thisMonthDates = {};
        data && data.forEach(item => {
           if(compareMonth(item.lastservice)) {
               if(!thisMonthDates.hasOwnProperty(item.lastservice)) {
                   thisMonthDates[item.lastservice] = [item.investment];
               } else {
                   thisMonthDates[item.lastservice].push(item.investment);
               }
           }
        });
        const seriesData = Object.values(thisMonthDates).map(val => ({ data: val }))
        const categories = Object.keys(thisMonthDates);
        setGraphData({...BarChartoptions, series: seriesData, xAxis: { categories }})
    }, [data.length])

    return (
        <div style={{marginTop: 24}}>
            <PieChart highcharts={Highcharts} options={graphData}/>
        </div>
    );
}
