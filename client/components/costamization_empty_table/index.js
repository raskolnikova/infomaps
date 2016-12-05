import React, {Component} from 'react';
import {Form, FormField, FormInput, Button} from 'elemental'

export default class CostamizationEmptyTable extends Component {
    constructor() {
        super()
        this.state = {
            inputs: [
                {
                    id: 1,
                    target: ''
                }
            ]
        }
        this.addColumn = this.addColumn.bind(this);
    }

    addColumn() {
        //я знаю, что нельзя напрямую изменять состояние, но по другому не работает
        const id = this.state.inputs.length + 1;
        this.state.inputs.push({id: id, target: ''})
        this.setState(this.state)
    }

    handleChange(event, id) {
        this.state.inputs[id - 1].target = event.target.value;
        this.setState(this.state)

    }

    render() {
        return (
            <div>
                <div id="columns">
                  <Button submit onClick={() => this.props.createTable()}>Создать пустую таблицу</Button>
                    <Button submit >Открыть наборы данных</Button>
                      <Button submit >Импортировать набор данных</Button>
                    {/* <Form type="inline">
                        {this.state.inputs.map((item) => (
                            <FormField>
                                <FormInput key={item.id} target={item.target} onChange={(e) => this.handleChange(e, item.id)}/>
                            </FormField>
                        ))
}
                    </Form>*/}

                </div>

            </div>
        )
    }
}
