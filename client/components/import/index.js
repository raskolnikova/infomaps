import React, {Component} from 'react';
import {Link} from 'react-router'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'elemental'
import FileInput from 'react-simple-file-input'
import CSVConvertor from 'babyparse'
import './index.less'

// function fileIsIncorrectFiletype(file) {
//     if (allowedFileTypes.indexOf(file.type) === -1) {
//         return true;
//     } else {
//         return false;
//     }
// }

export default class Import extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            file: {},
            cancelButtonClicked: false,
            progressBarVisible: false,
            progressPercent: 0
        }
        this.handleDatasetAdd = this.handleDatasetAdd.bind(this)
        this.modalOpen = this.modalOpen.bind(this)
        this.cancelButtonClicked = this.cancelButtonClicked.bind(this)
        this.resetCancelButtonClicked = this.resetCancelButtonClicked.bind(this)
        this.showInvalidFileTypeMessage = this.showInvalidFileTypeMessage.bind(this)
        this.showProgressBar = this.showProgressBar.bind(this)
        this.handleFileSelected = this.handleFileSelected.bind(this)
        this.updateProgressBar = this.updateProgressBar.bind(this)

    }

    handleDatasetAdd() {
        let file,
            Dataset,
            name = this.state.file.name;
        if (name.search(/(.csv)$/g) !== -1) {
            file = CSVConvertor.parse(this.state.fileContents, {
                header: true,
                dynamicTyping: true,
                comments: "#",
                skipEmptyLines: true,
                quoteChar: 'auto'
            })
            Dataset = this.getDataset(name, JSON.stringify(file.data))
            console.log(file);
            this.props.onDatasetAdd(Dataset);
            this.modalOpen()
        } else if (name.search(/(.json)$/g) !== -1) {
            Dataset = this.getDataset(name, this.state.fileContents)
            this.props.onDatasetAdd(Dataset);
            this.modalOpen()
        } else
            console.error('неподдерживаемый формат данных');
        }

    getDataset(name, file) {
        return {name: name, file: file, createdAt: new Date()}
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

                <button className='button-import' onClick={this.modalOpen}>
                    <i className="fa fa-upload fa-4x"></i>
                    <div className='inscription'>Добавить новый файл</div>
                </button>

                <Modal isOpen={this.state.modalIsOpen} onCancel={this.modalOpen} backdropClosesModal>
                    <ModalHeader text="Lots of text to show scroll behavior" showCloseButton onClose={this.modalOpen}/>
                    <ModalBody>
                        <FileInput readAs='text' onLoadStart={this.showProgressBar} onLoad={this.handleFileSelected} onProgress={this.updateProgressBar} onCancel={this.showInvalidFileTypeMessage} abortIf={this.cancelButtonClicked} onAbort={this.resetCancelButtonClicked}>
                            Нажмите здесь для выбора файла
                        </FileInput>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="primary" value='Load' onClick={this.handleDatasetAdd}>Загрузить</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
