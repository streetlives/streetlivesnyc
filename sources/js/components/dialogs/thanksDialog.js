import React from 'react'

const ThanksDialog = React.createClass({
    render: function() {
        return (
            <div className="Dialog">
                <div className="Dialog-inner js-content ThanksDialogInner">
                    <div className="Dialog-content">
                        <div className="Dialog-logo"></div>
                        <div className="Dialog-message">{this.props.title}</div>
                        <p>{this.props.text}</p>
                    </div>
                    <button className="Button js-ok" onClick={this.props.onClickOk}>
                        {this.props.ok_button}
                    </button>
                </div>
            </div>
        )
    }
})

export default ThanksDialog
