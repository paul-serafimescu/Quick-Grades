import React, { Component } from 'react';
import Grade from './Grade';
import Stats from './Stats';
import './style/Grade.scss'

/*
 * allow PATCH requests on value/description fields, add validation
 */

export default class Grades extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            data: [],
            processedData: {},
            value: '',
            class: '',
            description: '',
            error: ''
        };
        this.updateData = this.updateData.bind(this);
        this.changeData = this.changeData.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    handleValueChange(event) {
        this.setState({value: event.target.value});
    }

    handleClassChange(event) {
        this.setState({class: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    updateData(cls, id, key) {
        var tempData = this.state.data, tempP = this.state.processedData;
        tempData.splice(key, 1);
        if(tempP[cls].length === 1) delete tempP[cls];
        else for(let i = 0; i < tempP[cls].length; i++) if(tempP[cls][i].id === id) {tempP[cls].splice(i, 1); break;};
        this.setState({processedData: tempP, data: tempData});
    }

    changeData(cls, id, key, location, newData) {
        var tempData = this.state.data, tempP = this.state.processedData;
        tempData[key][location] = newData;
        if(location === "class") {
            for(let i = 0; i < tempP[cls].length; i++) {
                if(tempP[cls][i].id === id) {
                    if(tempP[newData])
                        tempP[newData].push(tempP[cls][i]);
                    else
                        tempP[newData]= [tempP[cls][i]];
                    tempP[cls].splice(i, 1);
                    if(tempP[cls].length === 0) delete tempP[cls];
                    break;
                }
            }
        }
        else if(location === "value") {
            for(let i = 0; i < tempP[cls].length; i++) {
                if(tempP[cls][i].id === id) {
                    tempP[cls][i][location] = Number(newData);
                    break;
                }
            }
        }
        else {
            for(let i = 0; i < tempP[cls].length; i++) {
                if(tempP[cls][i].id === id) {
                    tempP[cls][i][location] = newData;
                    break;
                }
            }
        }
        this.setState({data: tempData, processedData: tempP});
    }

    updateState(event) {
        event.preventDefault();
        if(isNaN(this.state.value) || this.state.value > 100 || this.state.value < 0) return this.setState({error: 'please enter a valid grade'});
        this.setState({error: ''});
        const creator = JSON.parse(localStorage.getItem('credentials')).username;
        var request = {
            value: parseFloat(this.state.value),
            class: this.state.class,
            description: this.state.description ? this.state.description : "no description provided",
            creatorName: creator
        };
        var current = [...this.state.data];
        var currentP = this.state.processedData;
        fetch('grades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(response => {
            const resp = response.id;
            const item = {
                id: resp,
                value: parseFloat(this.state.value),
                class: this.state.class,
                description: this.state.description ? this.state.description : "no description provided"
            };
            current.push(item);
            current.sort((a, b) => a.class[0] > b.class[0] ? 1 : -1);
            !(this.state.class in currentP) ? currentP[this.state.class] = [item] : currentP[this.state.class].push(item);
            this.setState({processedData: currentP, data: current, value: '', class: '', description: ''});
        })
        .catch(error => console.log(error));
    }

    componentDidMount() {
        this._isMounted = true;
        const username = JSON.parse(localStorage.getItem('credentials')).username;
        fetch(`grades?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(serverData => this._isMounted && this.setState({data: serverData}))
        .then(() => {
            this.state.data.forEach(element => {
                var temp = this.state.processedData;
                if(!(element.class in this.state.processedData)) {
                    temp[element.class] = [element];
                    this.setState({processedData: temp});
                }
                else {
                    temp[element.class].push(element);
                    this.setState({processedData: temp});
                }
            });
        })
        .catch(error => console.log(error));
        var newData = this.state.processedData;
        for(var i of Object.keys(this.state.processedData)) {
            var sum = 0;
            for(let j = 0; j < this.state.processedData.length; j++)
                sum += this.state.processedData[i][j].value;
            newData[i] = sum;
            console.log(newData[i], this.state.processedData);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            this.state.data !== [] &&
            <div className="grades-container">
                <form style={{margin: "15px"}} onSubmit={this.updateState}>
                    <label>Grade </label>
                    <input required style={{display: "inline"}} type="text" value={this.state.value} onChange={this.handleValueChange} />
                    <label>  Class </label>
                    <input required style={{display: "inline"}} type="text" value={this.state.class} onChange={this.handleClassChange} />
                    <label>  Description </label>
                    <input style={{display: "inline"}} type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
                    <input style={{marginLeft: "5px"}} type="submit" value="Add" />
                    <p style={{color: "red"}}>  {this.state.error}</p>
                </form>
                <div className="table-container">
                <table className="main-display">
                    <tbody>
                        <tr className="head">
                            <td id="left"><strong>Class</strong></td>
                            <td id="middle"><strong>Description</strong></td>
                            <td id="right"><strong>Grade (%)</strong></td>
                            <td id="right"><strong>Delete?</strong></td>
                        </tr>
                        {this.state.data.map((entry, index) =>
                            <tr key={index} className="grades-body">
                                <Grade k={index} changeData={this.changeData} deleteData={this.updateData} id={entry.id} value={entry.value} class={entry.class} description={entry.description} />
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
                <table className="stats">
                    <tbody>
                        <tr>
                        <Stats
                            data={this.state.processedData}
                        />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}