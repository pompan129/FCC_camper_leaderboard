/**
 * Created by fazbat on 3/13/2016.
 */
//import React, {Component} from "react";
//import ReactDom from "react-dom";

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

        _this.state = {
            campers: [],
            urls: {
                alltime: "http://fcctop100.herokuapp.com/api/fccusers/top/alltime",
                recent: "http://fcctop100.herokuapp.com/api/fccusers/top/recent"
            },
            timeFrame: ""
        };
        _this.getCampers(_this.state.urls.recent, "Last 30 Days");
        return _this;
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            if (!this.state.campers[0]) {
                return null;
            }
            return React.createElement(
                "div",
                null,
                React.createElement(Header, {
                    urls: this.state.urls,
                    getCampers: function getCampers(url, msg) {
                        _this2.getCampers(url, msg);
                    } }),
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(CamperTable, {
                        campers: this.state.campers,
                        sortTable: function sortTable(col) {
                            _this2.sortTable(col);
                        },
                        timeframe: this.state.timeFrame
                    })
                )
            );
        }
    }, {
        key: "sortTable",
        value: function sortTable(col) {
            var sortedCampers = void 0;
            if (isNaN(this.state.campers[0][col])) {
                //sort by word... ie name
                sortedCampers = this.state.campers.sort(function (a, b) {
                    if (a.username > b.username) {
                        return 1;
                    }
                    if (b.username > a.username) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                //sort by number... ie all tim points
                sortedCampers = this.state.campers.sort(function (a, b) {
                    return Number(b[col]) - Number(a[col]);
                });
            }
            this.setState({ campers: sortedCampers });
        }
    }, {
        key: "getCampers",
        value: function getCampers(url, msg) {
            var _this3 = this;

            $.getJSON(url, function (data) {

                _this3.setState({ campers: data, timeFrame: msg });
            });
        }
    }]);

    return App;
}(React.Component);

var Header = function Header(props) {

    return React.createElement(
        "div",
        { className: "container-fluid top-header" },
        React.createElement(
            "div",
            { className: "col-sm-8" },
            React.createElement(
                "h1",
                null,
                "freeCodeCamp: Camper Leaderboard"
            )
        ),
        React.createElement(
            "div",
            { className: "col-sm-4 sort-buttons" },
            React.createElement(
                "div",
                { className: "btn-group pull-right" },
                React.createElement(
                    "button",
                    {
                        type: "button",
                        onClick: function onClick() {
                            props.getCampers(props.urls.recent, "Last 30 Days");
                        },
                        className: "btn btn-primary" },
                    "Last 30 Days"
                ),
                React.createElement(
                    "button",
                    {
                        type: "button",
                        onClick: function onClick() {
                            props.getCampers(props.urls.alltime, "All time");
                        },
                        className: "btn btn-primary" },
                    "All time"
                )
            )
        )
    );
};

var CamperTable = function CamperTable(props) {
    return React.createElement(
        "div",
        { className: "table-responsive" },
        React.createElement(
            "table",
            { className: "table table-bordered table-condensed" },
            React.createElement(
                "caption",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Most Points: ",
                    props.timeframe
                )
            ),
            React.createElement(TableHeader, { sortTable: function sortTable(col) {
                    props.sortTable(col);
                } }),
            React.createElement(TableBody, { campers: props.campers })
        )
    );
};

var TableHeader = function TableHeader(props) {
    "use strict";

    return React.createElement(
        "thead",
        { className: "header" },
        React.createElement(
            "tr",
            null,
            React.createElement(
                "th",
                { className: "row-rank" },
                "No."
            ),
            React.createElement(
                "th",
                { className: "row-name sortable", onClick: function onClick() {
                        props.sortTable("username");
                    } },
                "Name",
                React.createElement("span", { className: "caret" })
            ),
            React.createElement(
                "th",
                { className: "row-pts30 sortable", onClick: function onClick() {
                        props.sortTable("recent");
                    } },
                "Points: Past 30 Days",
                React.createElement("span", { className: "caret" })
            ),
            React.createElement(
                "th",
                { className: "row-pts-all sortable", onClick: function onClick() {
                        props.sortTable("alltime");
                    } },
                "Points: Total",
                React.createElement("span", { className: "caret" })
            )
        )
    );
};

var TableBody = function TableBody(props) {
    "use strict";

    var tableRows = props.campers.map(function (camper, index) {
        return React.createElement(TableRow, { rank: index, camper: camper });
    });
    return React.createElement(
        "tbody",
        null,
        tableRows,
        React.createElement(TableFooter, null)
    );
};

var TableRow = function TableRow(_ref) {
    "use strict";

    var camper = _ref.camper;
    var rank = _ref.rank;
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            rank + 1
        ),
        React.createElement(
            "td",
            null,
            React.createElement("img", { src: camper.img, alt: "" }),
            React.createElement(
                "span",
                null,
                camper.username
            )
        ),
        React.createElement(
            "td",
            null,
            camper.recent
        ),
        React.createElement(
            "td",
            null,
            camper.alltime
        )
    );
};

var TableFooter = function TableFooter(props) {
    "use strict";

    return React.createElement(
        "tr",
        { className: "footer" },
        React.createElement(
            "td",
            { colSpan: "4" },
            "by KURT JOHNSON (pompan129)"
        )
    );
};

ReactDOM.render(React.createElement(App, null), document.querySelector(".main"));
