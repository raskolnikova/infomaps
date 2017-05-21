import React, {Component} from 'react'
import './index.less'
import {InputGroup,FormInput, Button} from 'elemental'


import NavBar from '../../components/navbar/index';
import ListScripts from '../../components/list-scripts'

 import ScriptStore from './../../stores/ScriptStore'
 import ScriptAction from '../../action/ScriptAction'


function getStateFromFlux() {
  return {isLoading: ScriptStore.isLoading(), displayedScripts: ScriptStore.getScripts(), scripts: ScriptStore.getScripts(), isNewScript:false,nameScript:''};
}


export default class ScriptsPage extends Component {

     constructor() {
       super()
         this.state=getStateFromFlux();
         this._onChange = this._onChange.bind(this)
    }

    componentWillMount() {
        ScriptAction.loadScripts();
    }

    componentDidMount() {
        ScriptStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ScriptStore.removeChangeListener(this._onChange);
    }

    handleScriptDelete(script) {
        ScriptAction.deleteScript(script.id);
    }

    handleScriptAdd() {
        const script = {
            name:this.state.nameScript,
            charts:[],
            maps:[]
        }
        ScriptAction.createScript(script);
    }


handleAddNameScript(name){
        this.setState({nameScript:name})
}

    handleSearch(e){
            var searchQuery = e.target.value.toLowerCase();
                var displayedScripts = this.state.scripts.filter(function(el){
                    var searchValue = el.name.toLowerCase();
                    return searchValue.indexOf(searchQuery) !== -1;
                })
            this.setState({
                displayedScripts:displayedScripts
            })
    }


    changeVisibleForm(){
        this.setState((prevState, props) => {
  return {isNewScript: !prevState.isNewScript };
});
    }

    render() {
        return (
            <div>
                <NavBar/>
             <div className="datasets-container">
                <InputGroup contiguous className="search">
                    <InputGroup.Section grow>
                        <FormInput type="text" placeholder="Введите название сценария" onChange={(e)=>this.handleSearch(e)}/>
                    </InputGroup.Section>
                    <InputGroup.Section>
                       <Button><span className="fa fa-search" /></Button>
                    </InputGroup.Section>
                </InputGroup>
                   {  !this.state.isNewScript? 
                            <Button className='new-script' onClick={() => this.changeVisibleForm()}><span className="fa fa-plus "/> Новый сценарий</Button>:
                            <div>
                                <InputGroup.Section grow>
                                    <FormInput type="text" placeholder="Введите название нового сценария" onChange={(e)=>this.handleAddNameScript(e.target.value)} />
                                </InputGroup.Section>
                                <InputGroup.Section>
                                    <Button className='new-script' onClick={()=>this.handleScriptAdd()}><span className="fa fa-plus " />Добавить</Button>
                                </InputGroup.Section>
                            </div>
                   }
               
                </div>
                
                <div className="datasets-container">
                    <ListScripts scripts={this.state.displayedScripts} onScriptDelete = {this.handleScriptDelete}  />
                </div>
            </div>
        );
    }

    _onChange() {
        this.setState(getStateFromFlux())
    }

};
