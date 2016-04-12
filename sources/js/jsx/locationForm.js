var LocationForm = React.createClass({

    getInitialState: function() {
        return {
            enableSubmit: false
        }
    },

    addLocation: function() {
        var ids = _.filter(this.refs.offerings.children,
            function(child) {
                return child.children[0].children[0].checked;
        }).map(function(child) {
            return child.children[0].children[0].value;
        });

        var name = this.refs.name.value;
        var username = this.refs.username.value;
        var comment = this.refs.comment.value;

        var location = new Location(this.props);
        var onAddLocation = this.props.onAddLocation;
        var onClickCancel = this.props.onClickCancel;
        location.save({ name: name, comment: comment, username: username, offerings: ids }, {
            success: function() {
                onAddLocation(location);
                onClickCancel();
            }
        });
    },

    checkSubmitButton: function() {
        this.setState({
            enableSubmit: this.refs.name.value.length > 0
        });
    },

    renderOfferingList: function(offering) {
        var id = offering.get('cartodb_id');
        return (
            <li className="OfferingList-item" key={id}>
                <label for={'offering_'+ id} className="InputCheck-label">
                    <input type='checkbox'
                           value={id}
                           id={'offering_' + id}
                           className="InputCheck js-checkbox" />{offering.get('name')}
                </label>
            </li>
        )
    },

    render: function() {
        return (
            <div className="LocationForm">
                <div className="LocationForm-inner js-content">
                    <div className="LocationForm-content js-content">
                        <ul className="LocationForm-fields">
                            <li className="LocationForm-field">
                                <label className="LocationForm-label">Address</label>
                                <span className="js-address">{this.props.address}</span>
                            </li>

                            <li className="LocationForm-field">
                                <label className="LocationForm-label">Name</label>
                                <div className="InputField js-field">
                                    <input type="text" placeholder="Name of this location"
                                           className="Input js-name"
                                           ref="name"
                                           defaultValue={this.props.name}
                                           onChange={this.checkSubmitButton}/>
                                </div>
                            </li>

                            <li className="LocationForm-field">
                                <label className="LocationForm-label">What does it offer?</label>
                                <ul className="OfferingList" ref="offerings">
                                    {this.props.offerings.map(this.renderOfferingList)}
                                </ul>
                            </li>

                            <li className="LocationForm-field">
                                <label className="LocationForm-label">Add something to the conversation!</label>
                                <div className="InputField js-field">
                                    <textarea placeholder="Feel free to add tips, warnings, comments or review about this place"
                                              className="Input InputArea js-comment" ref="comment"/>
                                </div>
                            </li>

                            <li className="LocationForm-field">
                                <label className="LocationForm-label">Your name or initials (optional)</label>
                                <div className="InputField js-field">
                                    <input type="text" className="Input js-username" ref="username"/>
                                </div>
                            </li>

                        </ul>

                        <footer className="Footer">
                            <button className={this.props.name || this.state.enableSubmit ?
                                               'Button js-ok' : 'Button js-ok is-disabled'}
                                    onClick={this.addLocation}>Add location</button>
                        </footer>

                        <button className="Button Button--close js-cancel"
                                onClick={this.props.onClickCancel}>✕</button>

                    </div>
                </div>
            </div>
        )
    }
});