import React, {Component} from 'react';
var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;
var BarChart = require('react-d3-basic').BarChart;
var PieChart = require('react-d3-basic').PieChart;

var 
    margins = {
        left: 70,
        right: 0,
        top: 10,
        bottom: 30
    },
    

   
    title = "",

    
     name = function(d) {
        return d;
     },
    innerRadius = 10;

export default class ViewChart extends Component {

    constructor(props)
    {
        super(props)
        let count = props.visibleColumns.length - 1, state={}
        if(props.isfromConstructor)
               state = {
                data: props.data,
                visibleColumns: props.visibleColumns,
                xLabel:"",
                yLabel:"",
                width:350,
                height: 250, 
        }
         else 
              state = {
                data: [],
                visibleColumns: [],
                xLabel: "",
                yLabel: "",
                width:700,
                height: 400, 
        }
         
          
         
        this.state = state
    }

    

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }


getDataForPieChart(d,column){
    console.log(d)
    console.log(column)
    
    console.log(d[column[0]])
if (!this.isNumeric(d[column[0]]))
            return 0
        else 
            return d[column[0]]
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
                return <BarChart title={title} data={this.state.data} width={this.state.width} height={this.state.height} chartSeries={this.getChartSeries(this.props.visibleColumns)} x={(e, visibleColumns) => this.getX(e, this.state.visibleColumns)} xLabel={this.state.xLabel} xScale={'ordinal'}  yLabel={this.state.yLabel}/>
            case 'График':
                return <LineChart showXGrid={false} showYGrid={false} margins={margins} title={title} data={this.state.data} width={this.state.width} height={this.state.height} xLabel={this.state.xLabel}  yLabel={this.state.yLabel} chartSeries={this.getChartSeries(this.props.visibleColumns)} xScale={'ordinal'} x={(e, visibleColumns) => this.getX(e, this.state.visibleColumns)}/>
            case 'Круговая диаграмма':
                return <PieChart data={this.state.data} width={this.state.width} height={this.state.height} chartSeries={this.getChartSeries(this.props.visibleColumns)} value={(data, visibleColumns) => this.getDataForPieChart(this.state.data, this.props.visibleColumns)} name={name}/>
            case 'Кольцевая диаграмма':
                return <PieChart data={this.state.data} width={this.state.width} height={this.state.height} chartSeries={chartSeries} value={value} name={name} innerRadius={innerRadius}/>
            default:
                return 'Неизвестный тип'
        }
    }

    componentWillReceiveProps(nextProps) {
        let count = nextProps.visibleColumns.length - 1
        if(nextProps.isUpdateChart){
          this.setState({data: nextProps.data,
                        visibleColumns: nextProps.visibleColumns
                        })
        } else
        if (nextProps.data !== this.state.data)
            this.setState({data: nextProps.data});
        else if(count > 0)
        {
            this.setState({visibleColumns: nextProps.visibleColumns})
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
