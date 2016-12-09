'use strict';

import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

// TODO: fetch from /offerings...
const offeringsJson = {
    "fields": {
        "cartodb_id": {
            "type": "number"
        },
        "created_at": {
            "type": "date"
        },
        "description": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "the_geom": {
            "type": "geometry"
        },
        "the_geom_webmercator": {
            "type": "geometry"
        },
        "updated_at": {
            "type": "date"
        }
    },
    "rows": [
        {
            "cartodb_id": 6,
            "created_at": "2015-10-07T19:06:01Z",
            "description": null,
            "name": "Other Services",
            "the_geom": null,
            "the_geom_webmercator": null,
            "updated_at": "2015-10-07T19:06:01Z"
        },
        {
            "cartodb_id": 7,
            "created_at": "2015-10-07T19:06:01Z",
            "description": null,
            "name": "Tips",
            "the_geom": null,
            "the_geom_webmercator": null,
            "updated_at": "2015-10-07T19:06:01Z"
        },
        {
            "cartodb_id": 9,
            "created_at": "2015-10-07T19:06:01Z",
            "description": null,
            "name": "Food",
            "the_geom": null,
            "the_geom_webmercator": null,
            "updated_at": "2015-10-07T19:06:01Z"
        },
        {
            "cartodb_id": 4,
            "created_at": "2015-10-07T19:06:01Z",
            "description": null,
            "name": "Shelter",
            "the_geom": null,
            "the_geom_webmercator": null,
            "updated_at": "2015-10-07T19:06:01Z"
        },
        {
            "cartodb_id": 5,
            "created_at": "2015-10-07T19:06:01Z",
            "description": null,
            "name": "Drop In Center",
            "the_geom": null,
            "the_geom_webmercator": null,
            "updated_at": "2015-10-07T19:06:01Z"
        },
        {
            "cartodb_id": 10,
            "created_at": "2016-06-22T00:23:01Z",
            "description": null,
            "name": "Health",
            "the_geom": null,
            "the_geom_webmercator": null,
            "updated_at": "2016-06-22T00:23:01Z"
        }
    ],
    "time": 0.005,
    "total_rows": 6
}

module.exports.Categories = React.createClass({

    getInitialState() {
        return {
            selectedCategories: []
        };
    },

    clickOffering(offering) {
        if (_.indexOf(this.state.selectedCategories, offering) > -1) {
            //unselect
            this.setState({
                selectedCategories: _.reject(this.state.selectedCategories, { cartodb_id: offering.cartodb_id })
            });
        } else {
            //select
            this.setState({
                selectedCategories: this.state.selectedCategories.concat(offering)
            });
        }
    },

    componentWillMount() {
        this.categories = offeringsJson.rows;
    },

    render() {
        return (
                <div className="offerings">
                {this.categories.map((row) => {
                    return (
                        <div className="offerings__offering" key={row.cartodb_id}>
                            <div>Id: {row.cartodb_id}</div>
                            <div style={_.indexOf(this.state.selectedCategories, row) > -1 ? {color: "red"} : {}}
                                 onClick={() => {
                                this.clickOffering(row);
                            }}>Name: {row.name}</div>
                        </div>
                    );
                })}
                <Link to={{pathname: "/map",
                           query: { categories: _.map(this.state.selectedCategories, "cartodb_id") }
                          }}>
                  Submit
                </Link>
                </div>
        );
    }
});
