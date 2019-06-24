import React, {Component} from "react";

import '../styles/EmailDialog.css';

export default class EmailDialog extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({emails: []});
    }

    __inputKeyUp(event) {
        if (event.nativeEvent.keyCode == 13) {
            this.__saveEmail(event.currentTarget.value);
            event.currentTarget.value = "";
        }
    }

    __saveEmail(value) {
        if (!value) {
            return;
        }
        let emails = (this.state && this.state.emails) || [];
        emails.push(value)
        this.setState({emails});
    }

    render() {
        let emails = (this.state && this.state.emails) || [];
        return (
            <div className="panel">
                <h2>Share <b>{this.props.borderName || "Border name"}</b> with other</h2>
                <div className="emailsField">
                    {emails.map((email, index) => {
                        return <EmailValue key={index} index={index} email={email}/>
                    })}
                    <input type="text"
                           placeholder="add more people..."
                           onBlur={(event) => {
                               this.__saveEmail(event.currentTarget.value);
                               event.currentTarget.value = "";
                           }}
                           onKeyUp={(event) => this.__inputKeyUp(event)}
                    ></input>
                </div>
            </div>
        );
    }
}

class EmailValue extends Component {

    componentDidMount() {
        this.setState({editing: false})
    }

    render() {
        let editing = this.state && this.state.editing;
        let value = this.state && this.state.email || this.props.email;
        if (editing) {
            return <span className="editEmail" key={this.props.index}
                         onMouseUp={() => this.setState({editing: !editing})}>
                            <input type="text" size={this.props.email.length + 1}></input>
                            <div className="deleteEmail"></div>
                        </span>
        }
        return <span className="viewEmail" key={this.props.index} onClick={() => this.setState({editing: !editing})}>
                            {value}
            <div className="deleteEmail"></div>
                        </span>
    }
}