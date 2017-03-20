const React = require('react');
const moment = require('moment');
const map = require('lodash/map');

const XLabels = React.createClass({

    propTypes: {
        display: React.PropTypes.oneOf(['month', 'week', 'day']),
        date: React.PropTypes.object.isRequired
    },

    render() {
        let days = [];
        if (this.props.display === 'day') {
            days.push(this.props.date.clone().milliseconds(0).seconds(0).minutes(0).hours(0));
        } else {
            // Add 1 day to start week from monday
            const day = this.props.date.clone().startOf('week');
            for (let i = 0; i < 7; i++) {
                days.push(day.clone().add(i, 'day'));
            }
        }
        
        const currentDay = moment().milliseconds(0).seconds(0).minutes(0).hours(0).format('x');
        // const format = (this.props.display === 'month' ? 'dddd' : 'ddd D');
        const labels = map(days, function (day) {
            return (
                <div key={day.format('YYYYMMDD')} 
                    className={`day-label ${currentDay === day.format('x') ? "current-day" : ""}`}>
                    <span>{day.format("ddd")}</span>
                    <span className="day-index">{day.format("D")}</span>
                </div>
            );
        });

        return (
            <div className="x-labels">{labels}</div>
        );

    }

});

module.exports = XLabels;
