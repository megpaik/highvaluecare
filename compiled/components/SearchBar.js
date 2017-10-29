'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../actions/index.js');

var actions = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_React$Component) {
    _inherits(Search, _React$Component);

    function Search() {
        _classCallCheck(this, Search);

        var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));

        _this.onSearchClick = _this.onSearchClick.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(Search, [{
        key: 'onChange',
        value: function onChange(e) {
            this.props.store.dispatch(actions.searchView(e.target.value));
        }
    }, {
        key: 'onSearchClick',
        value: function onSearchClick() {
            this.props.store.dispatch(actions.search(this.state.query));
        }
    }, {
        key: 'render',
        value: function render() {
            var query = this.state.query;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', { className: 'searchtop', value: query, onChange: this.onChange }),
                _react2.default.createElement(
                    'button',
                    { className: 'newsearch', onClick: this.onSearchClick },
                    'Submit'
                )
            );
        }
    }]);

    return Search;
}(_react2.default.Component);

exports.default = Search;