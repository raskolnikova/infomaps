import React, {Component} from 'react'
import {FormSelect, FormInput, FormIconField, Button} from 'elemental'

export default class AdditionalCostamMap extends Component {
  render() {
      return (
          <div>
            <FormInput placeholder="Введите название колонки с ISO3 кодом стран"  onChange={(e) => this.props.updateColumnName(e.target.value)}/>
            <Button type="success" onClick={() => this.props.handleColoringMap()}>Раскрасить карту</Button>
            <Button type="success">Добавить геопривязку</Button>
          </div>
      )
  }
}
