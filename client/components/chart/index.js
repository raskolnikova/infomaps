import React, {Component} from 'react';
var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;
var BarChart = require('react-d3-basic').BarChart;
var PieChart = require('react-d3-basic').PieChart;



    var width = 700,
        height = 300,
        margins = {
            left: 100,
            right: 100,
            top: 50,
            bottom: 50
        },
        xScale = 'ordinal',
        xLabel = "Letter",
        yLabel = "Frequency",
        yTicks = [
            10, "%"
        ],
        title = "User sample",

        chartSeries = [
            {
                field: 'BMI',
                name: 'BMI',
                color: '#ff7f0e'
            }
        ],
        // your x accessor
        x = function(d) {
            return d.index;
        },
        value = function(d) {
            return + d.population;
        },
        name = function(d) {
            return d.age;
        },
        innerRadius = 10;

    export default class ViewChart extends Component {

        constructor()
        {
            super()
            this.state = {
                data: []
            }
        }

        getChart(typeChart) {
            switch (typeChart) {
                case 'Гистограмма':
                    return <BarChart title={title} data={this.state.data} width={width} height={height} chartSeries={chartSeries} x={x} xLabel={xLabel} xScale={xScale} yTicks={yTicks} yLabel={yLabel}/>
                    break;
                case 'График':
                    return <LineChart showXGrid={false} showYGrid={false} margins={margins} title={title} data={this.state.data} width={width} height={height} chartSeries={chartSeries} x={x}/>

                    break;
                case 'Круговая диаграмма':
                    return <PieChart data={this.state.data} width={width} height={height} chartSeries={chartSeries} value={value} name={name}/>
                    break;
                case 'Кольцевая диаграмма':
                    return <PieChart data={this.state.data} width={width} height={height} chartSeries={chartSeries} value={value} name={name} innerRadius={innerRadius}/>
                    break;
                default:
                    return 'Неизвестный тип'
            }
        }

        componentWillReceiveProps(nextProps) {
          if (nextProps.data !== this.state.data)
          this.setState({data: nextProps.data});
        }

        render() {
            return (
                <div>
                    {this.getChart(this.props.typeChart)}
                </div>
            )
        }
    }
