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

var BasketElm = function (_React$Component) {
    _inherits(BasketElm, _React$Component);

    function BasketElm() {
        _classCallCheck(this, BasketElm);

        var _this = _possibleConstructorReturn(this, (BasketElm.__proto__ || Object.getPrototypeOf(BasketElm)).call(this));

        _this.onDelete = _this.onDelete.bind(_this);
        return _this;
    }

    _createClass(BasketElm, [{
        key: 'onDelete',
        value: function onDelete() {
            this.props.store.dispatch(actions.deleteElm(this.props.key));
        }
    }, {
        key: 'render',
        value: function render() {
            // this should be the object from medicalStudies 
            var target = this.state.studies[this.props.key];
            return _react2.default.createElement(
                'div',
                { className: 'fullview' },
                _react2.default.createElement(
                    'div',
                    { className: 'details' },
                    _react2.default.createElement(
                        'span',
                        { className: 'name' },
                        target.name
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'cpt' },
                        target.CPT
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'diagnosis' },
                        target["Intended Diagnosis"]
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'sensitivity' },
                        target.Sensitivity
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'specificity' },
                        target.Specificity
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'PPV' },
                        target.PPV
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'NPV' },
                        target.NPV
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'comments' },
                        target.comments
                    )
                ),
                _react2.default.createElement(
                    'button',
                    { className: 'trash', onClick: this.onDelete },
                    'Trash'
                )
            );
        }
    }]);

    return BasketElm;
}(_react2.default.Component);

exports.default = BasketElm;