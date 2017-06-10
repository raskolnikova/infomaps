import React, {Component} from 'react'
import {FormSelect, FormInput, FormIconField, Button} from 'elemental'
import './index.less'

export default class AdditionalCostamMap extends Component {

constructor(){
  super()
  this.state={
    domen:[1000000,100000,10000,1000,100,10],
    columnName:'',
    colorScheme:0
  }
}

  handelUpdateDomen(value, countInput) {
      let newDomen = this.state.domen;
    if (value !== '' && value!==newDomen[countInput]) {
        newDomen[countInput] = Number(value);
        this.setState({ domen: newDomen })
    }
  }

 updateColumnName(name) {
        this.setState({columnName: name})
    }

     updateColorSchemes(option) {
        this.setState({colorScheme: option})
    }

  render() {
      return (
<div>
          <div className='geo-input'>
            <FormInput placeholder="Введите название колонки с ISO3 кодом стран"  onChange={(e) => this.updateColumnName(e.target.value)}/>
            <FormSelect options={this.props.ColorScheme} onChange={(e) => this.updateColorSchemes(e)}/>
          </div>
          <div className='domen'>
         <div>Введите границы интервалов значений для заданной цветовой схемы</div>
            <input  className="domen-input" type="text"  onChange={(e,countInput) => this.handelUpdateDomen(e.target.value,0)}/>
            <input  className="domen-input" type="text" onChange={(e,countInput) => this.handelUpdateDomen(e.target.value,1)} />
            <input  className="domen-input" type="text" onChange={(e,countInput) => this.handelUpdateDomen(e.target.value,2)}/>
            <input  className="domen-input" type="text" onChange={(e,countInput) => this.handelUpdateDomen(e.target.value,3)}/>
            <input  className="domen-input" type="text" onChange={(e,countInput) => this.handelUpdateDomen(e.target.value,4)}/>
            <input  className="domen-input" type="text" onChange={(e,countInput) => this.handelUpdateDomen(e.target.value,5)}/>
          </div>
          <Button type="success" onClick={(columnName,domen,colorScheme) => this.props.handleColoringMap(this.state.columnName,this.state.domen,this.state.colorScheme)}>Раскрасить карту</Button>
          </div>
      )
  }
}
