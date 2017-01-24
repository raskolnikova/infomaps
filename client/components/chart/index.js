import React, {Component} from 'react';
var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;
var BarChart = require('react-d3-basic').BarChart;
var PieChart = require('react-d3-basic').PieChart;

var width = 700,
    height = 400,
    margins = {
        left: 100,
        right: 100,
        top: 50,
        bottom: 50
    },
    xScale = 'ordinal',
    yTicks = [
        10, "%"
    ],
    title = "User sample",

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
            data: [],
            visibleColumns: [],
            xLabel: "",
            yLabel: ""
        }
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    getX(d, visibleColumns) {
        let count = visibleColumns.length - 1
        if (count < 0)
            return 0
        else if (!this.isNumeric(d[visibleColumns[count]]))
            return 0
        else {
          {
            return d[visibleColumns[count]];
          }
        }
    }

    getChartSeries(visibleColumns) {
        if (visibleColumns === undefined) {
            return [
                {
                    field: '',
                    name: '',
                    color: '#ff7f0e'
                }
            ]
        } else

            return [
                {
                    field: visibleColumns[0],
                    name: visibleColumns[0],
                    color: '#ff7f0e'
                }
            ]
        }


    getChart(typeChart) {
        switch (typeChart) {
            case 'Гистограмма':
                return <BarChart title={title} data={this.state.data} width={width} height={height} chartSeries={this.getChartSeries(this.props.visibleColumns)} x={(e, visibleColumns) => this.getX(e, this.state.visibleColumns)} xLabel={this.state.xLabel} xScale={xScale}  yLabel={this.state.yLabel}/>
                break;
            case 'График':
                return <LineChart showXGrid={false} showYGrid={false} margins={margins} title={title} data={this.state.data} width={width} height={height} xLabel={this.state.xLabel}  yLabel={this.state.yLabel} chartSeries={this.getChartSeries(this.props.visibleColumns)} x={(e, visibleColumns) => this.getX(e, this.state.visibleColumns)}/>
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
        let count = nextProps.visibleColumns.length - 1
        if (nextProps.data !== this.state.data)
            this.setState({data: nextProps.data});
        else if(count > 0)
        {
            this.setState({visibleColumns: nextProps.visibleColumns,
                          xLabel: nextProps.visibleColumns[count],
                          yLabel: nextProps.visibleColumns[0]})
            }
          }

    render() {
        return (
            <div>
                {this.getChart(this.props.typeChart)}
            </div>
        )
    }
}
