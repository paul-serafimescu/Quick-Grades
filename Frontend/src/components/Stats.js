import React, { Component, Fragment } from 'react';
import './style/Stats.scss';

// style this thing a little bit

export default class Stats extends Component {

    render() {
        var sums = [];
        for(const entry of Object.entries(this.props.data)) {
            let sum = 0;
            entry[1].map(element => sum += element.value);
            sums.push(sum);
        }
        var index = 0;
        return (
            <Fragment>
                {Object.entries(this.props.data).map(([key, value]) =>
                    value.length > 0 ? <td className="stat-item" key={key} style={{padding: "5px", border: "none"}}><p>{key}</p><p>Average: {(sums[index++] / value.length).toFixed(2)}%</p></td> : null
                )}
            </Fragment>
        );
    }
}