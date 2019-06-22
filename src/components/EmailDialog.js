import React, {Component} from "react";

import '../styles/EmailDialog.css';

export default class EmailDialog extends Component {
    render() {
        return (
            <div className="panel">
                <h2>Share <b>{this.props.borderName || "Border name"}</b> with other</h2>
                <div className="emailsField">
                    <input type="text" placeholder="add more people..."></input>
                </div>
            </div>
        );
    }
}