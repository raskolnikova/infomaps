import React, {Component} from 'react'
import {FormSelect, FormInput, FormIconField, Button} from 'elemental'


export default class AdditionalCostamMap extends Component {
  render() {
      return (
<div>
          <div className='geo-input'>
            <FormInput placeholder="Введите название колонки с ISO3 кодом стран"  onChange={(e) => this.props.updateColumnName(e.target.value)}/>
            <Button type="success">Добавить геопривязку</Button>
            <FormSelect options={this.props.ColorScheme} onChange={(e) => this.props.updateColorSchemes(e)}/>
          </div>
          <div className="domen-input">
            <input type="text"/>
            <input type="text"/>
          </div>
          <Button type="success" onClick={() => this.props.handleColoringMap()}>Раскрасить карту</Button>
          </div>
      )
  }
}
