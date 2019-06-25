import React, {Component} from "react";

import '../styles/EmailDialog.css';

const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

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
                        return <EmailValue key={index}
                                           index={index}
                                           email={email}
                                           deleteEmail={() => {
                                               emails.splice(index, 1);
                                               this.setState({emails});
                                           }}
                                           updateValue={newValue => {
                                               emails[index] = newValue;
                                               this.setState({emails});
                                           }}
                        />
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

    __updateValue(event) {
        let keyCode = event.nativeEvent && event.nativeEvent.keyCode || 0;
        if (keyCode == 13) {
            this.setState({email: event.currentTarget.value, editing: false}, () => this.props.updateValue(this.state.email));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.nameInput) {
            this.nameInput.focus();
        }
    }

    render() {
        let editing = this.state && this.state.editing;
        let value = this.state && this.state.email || this.props.email;
        let viewStyle = emailPattern.test(value) ? "viewEmail" : "invalid";
        if (editing) {
            return <span className="editEmail"
                         key={this.props.index}
                         onMouseUp={() => this.setState({editing: !editing})}>
                            <input type="text"
                                   style={{width: (value.length) * 8 + 'px'}}
                                   value={value}
                                   onChange={(event) => this.setState({email: event.currentTarget.value})}
                                   onKeyUp={(event) => this.__updateValue(event)}
                                   //onBlur={() => this.setState({editing: false}, () => this.props.updateValue(value))}
                                   //onKeyDown={(event) => {this.nameInput.style.width = ((event.currentTarget.value + 1) * 8) + 'px';}}
                                   ref={(input) => this.nameInput = input}
                            >
                            </input>
                            <div className="deleteEmail deleteEmailEdit"></div>
                  </span>
        }
        return <span className={viewStyle}
                     key={this.props.index}
                     onClick={() => this.setState({editing: !editing})}>
                     {value}
            <div className="deleteEmail deleteEmailView" onClick={() => this.props.deleteEmail()}></div>
               </span>
    }
}