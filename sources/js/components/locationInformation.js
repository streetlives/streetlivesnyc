'use strict';

import React from 'react';
import moment from 'moment';
import { Comment, Likes, Comments, Location } from './models.js';

import '../../scss/comment.scss';
import '../../scss/location_information.scss';
import '../../scss/like_button.scss';
import '../../scss/input_field.scss';
import '../../scss/button.scss';

var CommentComponent = React.createClass({

    renderUsername: function() {
        if (this.props.comment.username) {
            return (
                <div className="CommentList-username">
                    {this.props.comment.username}
                </div>
            )
        }
    },

    render: function() {
        return (
            <div className="CommentList-item">
                <p>
                    <span className='CommentList-itemDate'>
                        {moment(this.props.comment.created_at).format('MMMM Do YYYY')}
                    </span>
                    {this.props.comment.comment}
                    {this.renderUsername()}
                </p>
            </div>
        )
    }
});

var LikesComponent = React.createClass({

    getInitialState: function() {
        return {
            likes: 0,
            dislikes: 0,
            total: 0
        }
    },

    updateLikes: function(likes) {
        likes = likes.at(0);
        if (likes) {
            this.setState({
                likes: likes.attributes.likes,
                dislikes: likes.attributes.dislikes,
                total: likes.attributes.total
            })
        }
    },

    componentDidMount: function() {
        const likes = new Likes();
        likes.fetch({
            data: { location_id: this.props.location_id },
            success: this.updateLikes
        });
    },

    render: function() {
        return (
            <div className="LikesList">
                <div className="LikesList-item">
                    <span className="LikesList-item--like">
                        {this.state.likes}
                    </span>
                </div>
                <div className="LikesList-item">
                    <span className="LikesList-item--dislike">
                        {this.state.dislikes}
                    </span>
                </div>
                <div className="LikesList-item">
                    <span className="LikesList-item--total">
                        {this.state.total}
                    </span>
                </div>
            </div>
        );
    }
});

var CommentForm = React.createClass({

    getInitialState: function() {
        return {
            liked: 'neither',
            typedStuff: false
        }
    },

    typedComments: function() {
        if (this.refs.comment_text.value !== "") {
            this.setState({
                typedStuff: true
            })
        } else {
            this.setState({
                typedStuff: false
            })
        }
    },

    liked: function() {
        this.setState({
            liked: true
        })
    },

    disliked: function() {
        this.setState({
            liked: false
        })
    },

    addComment: function() {
        const newComment = new Comment({
            location_id: this.props.location_id,
            comment: this.refs.comment_text.value,
            username: this.refs.username.value,
            liked: this.state.liked === 'neither' ? null : this.state.liked
        });
        this.props.addComment(newComment);
    },

    render: function() {
        var placeholder = "Feel free to add tips, warnings, comments or review about " + this.props.name;
        const buttonClass = this.state.typedStuff ? "Button js-ok" : "Button is-disabled js-ok";

        var likeButtonClass;
        var dislikeButtonClass;
        if (this.state.liked === true) {
            likeButtonClass = "LikeButton js-like is-selected";
            dislikeButtonClass = "LikeButton LikeButton--dislike js-like";
        } else if (this.state.liked === false) {
            likeButtonClass = "LikeButton js-like";
            dislikeButtonClass = "LikeButton LikeButton--dislike js-like is-selected";
        } else {
            likeButtonClass = "LikeButton js-like";
            dislikeButtonClass = "LikeButton LikeButton--dislike js-like";
        }

        return (
            <div className="Comments-form">
                <label className="LocationInformation-label">
                    Add something to the conversation!
                </label>
                <div className="InputField InputField-area js-field">
                    <textarea placeholder={placeholder}
                              className="Input InputArea js-comment"
                              ref="comment_text"
                              onChange={this.typedComments}>
                    </textarea>
                </div>

                <div className="LocationForm-field">
                    <label className="LocationForm-label">Your name or initials (optional)</label>
                    <div className="InputField js-field">
                        <input type="text" className="Input js-username" ref="username"/>
                    </div>
                </div>

                <div className="LikeButtons">
                    <p className="LikeButtons-title">
                        Would you recommend this location to others?
                    </p>
                    <ul className="LikeButtons-list">
                        <li className="LikeButtons-listItem">
                            <button className={likeButtonClass}
                                    data-value="1"
                                    onClick={this.liked}>
                                <p className="LikeButtons-response">Yes</p>
                            </button>
                        </li>
                        <li className="LikeButtons-listItem">
                            <button className={dislikeButtonClass}
                                    data-value="0"
                                    onClick={this.disliked}>
                                <p className="LikeButtons-response">No</p>
                            </button>
                        </li>
                    </ul>
                </div>
                <button className={buttonClass} onClick={this.addComment}>
                    Add comment
                </button>
            </div>
        )
    }
});

var CommentsComponent = React.createClass({
    getInitialState: function() {
        return {
            comments: new Comments()
        }
    },

    updateComments: function(comments) {
        this.setState({
            comments: comments
        });
    },

    addComment: function(newComment) {
        this.state.comments.add(newComment);
        const onClickClose = this.props.onClickClose;
        newComment.save({}, {
            success: function() {
                onClickClose(true);
            }
        });
    },

    componentDidMount: function() {
        this.state.comments.fetch({
            data: { location_id: this.props.location_id },
            success: this.updateComments
        });
    },

    renderComments: function() {
        const comments = [];
        this.state.comments.each(function(model) {
            comments.push(<CommentComponent comment={model.attributes}
                                            key={model.attributes.cartodb_id} />);
        });
        return comments;
    },

    render: function() {
        return (
            <div className="Comments">
                <div className="Comments-inner">
                    <div className="Comments-content js-comments">
                        <label className="LocationInformation-label">Comments</label>
                        <div className="js-likes">
                            <LikesComponent location_id={this.props.location_id} />
                        </div>
                        <ul className="CommentList js-comment-list scroll-pane">
                            {this.renderComments()}
                        </ul>
                    </div>
                    <CommentForm name={this.props.name}
                                 location_id={this.props.location_id}
                                 addComment={this.addComment}/>
                </div>
            </div>
        )
    }
});

module.exports.LocationInformation = React.createClass({

    getInitialState: function() {
        return {
            location: new Location(this.props.options),
            title: 'Add location'
        };
    },

    renderOfferings: function() {
        if (this.props.options.offerings) {
            return (
                <div className="LocationInformation-field">
                    <label className="LocationInformation-label">
                        Can offer help with
                    </label>
                    <p>
                        {this.props.options.offerings}
                    </p>
                </div>
            )
        } else {
            return null;
        }
    },

    renderDescription: function() {
        if (this.props.options.description) {
            return (
                <div className="LocationInformation-field">
                    <label className="LocationInformation-label">
                        Description and tips
                    </label>
                    <p className='js-description'
                       dangerouslySetInnerHTML={{__html: this.props.options.description}}>
                    </p>
                </div>
            )
        } else {
            return null;
        }
    },

    render: function() {
        return (
            <div className="LocationInformation">
                <div className="LocationInformation-inner js-content">
                    <div className="LocationInformation-content">
                        <button className="Button--close js-cancel"
                                onClick={this.props.onClickClose}>
                            ✕
                        </button>
                        <div className="LocationInformation-title">
                            <h2 className="LocationInformation-name">
                                {this.props.options.name}
                            </h2>
                            <h4 className="LocationInformation-address">
                                {this.props.options.address}
                            </h4>
                        </div>

                        <div className="LocationInformation-fields js-fields">
                            {this.renderOfferings()}
                            {this.renderDescription()}
                            <CommentsComponent name={this.props.options.name}
                                               location_id={this.props.options.cartodb_id}
                                               onClickClose={this.props.onClickClose}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
