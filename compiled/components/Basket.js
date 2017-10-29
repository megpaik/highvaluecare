'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BasketElm = require('./BasketElm');

var _BasketElm2 = _interopRequireDefault(_BasketElm);

var _ScrollArrows = require('./ScrollArrows');

var _ScrollArrows2 = _interopRequireDefault(_ScrollArrows);

var _index = require('../actions/index.js');

var actions = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// THIS IS JUST THE CONTAINER
var Basket = function (_React$Component) {
    _inherits(Basket, _React$Component);

    function Basket() {
        _classCallCheck(this, Basket);

        return _possibleConstructorReturn(this, (Basket.__proto__ || Object.getPrototypeOf(Basket)).call(this));
    }

    _createClass(Basket, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var elmarr = this.state.basket.map(function (elm, i) {
                return _react2.default.createElement(_BasketElm2.default, { index: i, key: elm, store: _this2.props.store });
            });
            return _react2.default.createElement(
                'div',
                { className: 'basket' },
                _react2.default.createElement(
                    'div',
                    { className: 'leftcontainer' },
                    _react2.default.createElement(_ScrollArrows2.default, { left: true, store: this.props.store })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'baskettext' },
                    elmarr
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'rightcontainer' },
                    _react2.default.createElement(_ScrollArrows2.default, { left: false, store: this.props.store })
                )
            );
        }
    }]);

    return Basket;
}(_react2.default.Component);

exports.default = Basket;