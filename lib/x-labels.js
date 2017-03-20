'use strict';

var React = require('react');
var moment = require('moment');
var map = require('lodash/map');

var XLabels = React.createClass({
    displayName: 'XLabels',


    propTypes: {
        display: React.PropTypes.oneOf(['month', 'week', 'day']),
        date: React.PropTypes.object.isRequired
    },

    render: function render() {
        var days = [];
        if (this.props.display === 'day') {
            days.push(this.props.date.clone().milliseconds(0).seconds(0).minutes(0).hours(0));
        } else {
            // Add 1 day to start week from monday
            var day = this.props.date.clone().startOf('week');
            for (var i = 0; i < 7; i++) {
                days.push(day.clone().add(i, 'day'));
            }
        }

        var currentDay = moment().milliseconds(0).seconds(0).minutes(0).hours(0).format('x');
        // const format = (this.props.display === 'month' ? 'dddd' : 'ddd D');
        var labels = map(days, function (day) {
            return React.createElement(
                'div',
                { key: day.format('YYYYMMDD'),
                    className: 'day-label ' + (currentDay === day.format('x') ? "current-day" : "") },
                React.createElement(
                    'span',
                    null,
                    day.format("ddd")
                ),
                React.createElement(
                    'span',
                    { className: 'day-index' },
                    day.format("D")
                )
            );
        });

        return React.createElement(
            'div',
            { className: 'x-labels' },
            labels
        );
    }
});

module.exports = XLabels;