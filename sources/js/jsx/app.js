var ReactApp = React.createClass({

    render: function() {
        return (
            <div>
                <ReactMap />
                <div>
                    <ReactHeader title='StreetlivesNYC'
                                 url='http://beta.streetlives.nyc'/>
                </div>
            </div>
        )
    }

});