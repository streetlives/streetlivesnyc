import React from 'react'

const AddLocationDialog = React.createClass({
    render() {
        return (
            <div className="Dialog">
                <div className="Dialog-inner js-content">
                    <button className="Button--close js-cancel"
                            onClick={this.props.onClickClose}>✕</button>
                    <div className="Dialog-content">
                        <p>
                            <strong className="Popup-addressName">
                                {this.props.nameString} {this.props.address}
                            </strong>
                            <br/>
                            is not part of Streetlives yet.
                            Do you want to add this location to the map?
                        </p>
                    </div>
                    <button className="Button Button--addLocationSmall js-add-location"
                            onClick={this.props.onClickAddLocation}>
                        Add location
                    </button>
                </div>
            </div>
        )
    }
})

export default AddLocationDialog
