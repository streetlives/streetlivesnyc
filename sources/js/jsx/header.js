var ReactHeader = React.createClass({
    render: function() {
        return 
        (<div>
            <a href={this.props.url} className="HeaderTitle">
                {this.props.title}
            </a>

            <ul className="HeaderItems">
              <li className="HeaderItem"><a href='/' className="HeaderItem-link is-selected js-item js-map">Map</a></li>
              <li className="HeaderItem"><a href='/about' className="HeaderItem-link js-item js-about">About</a></li>
              <li className="HeaderItem"><a href='/privacy' className="HeaderItem-link js-item js-privacy">Privacy</a></li>
            </ul>
        </div>)
    }
});
