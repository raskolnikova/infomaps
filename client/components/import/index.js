import React, {Component} from 'react';
import {Link} from 'react-router'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'elemental'
import FileInput from 'react-simple-file-input'
import './index.less'

export default class Import extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            file: {},
            fileContents: {},
            cancelButtonClicked: false,
            progressBarVisible: false,
            progressPercent: 0
        }
        this.handleDataSetAdd = this.handleDataSetAdd.bind(this)
        this.modalOpen = this.modalOpen.bind(this)
        this.cancelButtonClicked = this.cancelButtonClicked.bind(this)
        this.resetCancelButtonClicked = this.resetCancelButtonClicked.bind(this)
        this.showInvalidFileTypeMessage = this.showInvalidFileTypeMessage.bind(this)
        this.showProgressBar = this.showProgressBar.bind(this)
        this.handleFileSelected = this.handleFileSelected.bind(this)
        this.updateProgressBar = this.updateProgressBar.bind(this)

    }

    receivedText(e) {
        let lines = e.target.result;
        var newArr = JSON.parse(lines);
    }

    handleDataSetAdd() {
        const DataSet = {
            name: this.state.file.name,
            file: this.state.fileContents,
            createdAt: new Date()
        }
        this.props.onDataSetAdd(DataSet);
        console.log(DataSet)

    }

    modalOpen() {
        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen
        }));

    }

    cancelButtonClicked() {
        return this.state.cancelButtonClicked;
    }

    resetCancelButtonClicked() {
        this.setState({cancelButtonClicked: false});
    }

    showInvalidFileTypeMessage(file) {
        window.alert("Tried to upload invalid filetype " + file.type);
    }

    showProgressBar() {
        this.setState({progressBarVisible: true});
    }

    updateProgressBar(event) {
        this.setState({
            progressPercent: (event.loaded / event.total) * 100
        });
    }

    handleFileSelected(event, file) {
        this.setState({file: file, fileContents: event.target.result});
    }

    render() {
        return (
            <div>

                <div className='import-container'>
                    <button className='button-import' onClick={this.modalOpen}>
                        <i className="fa fa-plus fa-4x"></i>
                        <div className='inscription'>JSON</div>
                    </button>

                    <button className='button-import'>
                        <i className="fa fa-plus fa-4x"></i>
                        <div className='inscription'>CSV</div>
                    </button>
                </div>

                <Modal isOpen={this.state.modalIsOpen} onCancel={this.modalOpen} backdropClosesModal>
                    <ModalHeader text="Lots of text to show scroll behavior" showCloseButton onClose={this.modalOpen}/>
                    <ModalBody>
                        <FileInput readAs='text' onLoadStart={this.showProgressBar} onLoad={this.handleFileSelected} onProgress={this.updateProgressBar} onCancel={this.showInvalidFileTypeMessage} abortIf={this.cancelButtonClicked} onAbort={this.resetCancelButtonClicked}>
                            Click Here
                        </FileInput>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="primary" value='Load' onClick={this.handleDataSetAdd}>Загрузить</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
