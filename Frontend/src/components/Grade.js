import React, { Component, Fragment } from 'react';
import './style/Grade.scss';

export default class Grade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingClass: false,
            editingDescription: false,
            editingValue: false,
            oldData: '',
            editedData: '',
        };
        this.delete = this.delete.bind(this);
        this.editClass = this.editClass.bind(this);
        this.editDescription = this.editDescription.bind(this);
        this.editValue = this.editValue.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleKeyDown(event) {
        if(event.key === 'Enter') {
            if(this.state.editedData.length === 0) return this.setState({editingClass: false, editingDescription: false, editingValue: false});
            var editType;
            if(this.state.editingClass)
                editType = "c";
            else if(this.state.editingDescription)
                editType = "d";
            else {
                var val = Number(this.state.editedData);
                if(isNaN(val) || (val > 100 || val < 0)) return this.setState({editingClass: false, editingDescription: false, editingValue: false});
                editType = "v";
            }
            fetch(`grades/${this.props.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({field: editType, newValue: this.state.editedData})
            })
            .then(response => { if(!response.ok) return; })
            .catch(error => console.log(error));
            this.props.changeData(this.props.class, this.props.id, this.props.k, editType === "c" ? "class" : (editType === "d" ? "description" : "value"), this.state.editedData);
            return this.setState({editingClass: false, editingDescription: false, editingValue: false, editedData: ''});
        }
    }

    handleEdit(event) {
        this.setState({editedData: event.target.value});
    }

    editClass() {
        let current = this.state.editingClass;
        !this.state.editingValue && !this.state.editingDescription && this.setState({editingClass: !current, oldData: this.props.class});
    }

    editDescription() {
        let current = this.state.editingDescription;
        !this.state.editingValue && !this.state.editingClass && this.setState({editingDescription: !current, oldData: this.props.description});
    }

    editValue() {
        let current = this.state.editingValue;
        !this.state.editingDescription && !this.state.editingClass && this.setState({editingValue: !current, oldData: this.props.value});
    }

    delete() {
        if(!window.confirm('delete this item?')) return
        fetch(`grades/${this.props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: this.props.id})
        })
        .then(response => response.ok ? null : window.alert('an error occurred'))
        .then(() => this.props.deleteData(this.props.class, this.props.id, this.props.k))
        .catch(error => console.log(error));
    }

    render() {
        return (
            <Fragment>
                {!this.state.editingClass ? <td id="left" onClick={this.editClass}>{this.props.class}</td> : <td id="left"><input type="text" className="edit-entry" placeholder={this.props.class} onKeyDown={this.handleKeyDown} onChange={this.handleEdit}></input></td>}
                {!this.state.editingDescription ? <td id="middle" onClick={this.editDescription}>{this.props.description}</td> : <td id="middle"><input type="text" className="edit-entry" placeholder={this.props.description} onKeyDown={this.handleKeyDown} onChange={this.handleEdit}></input></td>}
                {!this.state.editingValue ? <td id="middle" onClick={this.editValue}>{this.props.value}</td> : <td id="middle"><input type="text" className="edit-entry" placeholder={this.props.value} onKeyDown={this.handleKeyDown} onChange={this.handleEdit}></input></td>}
                <td style={{fontSize: "small", backgroundColor: "#333", color: "white", border: "none"}} id="right"><p className="delete" onClick={this.delete}>Delete?</p></td>
            </Fragment>
        );
    }
}