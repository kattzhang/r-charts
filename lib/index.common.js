'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var lodash = require('lodash');
var echartsLib = _interopDefault(require('echarts/lib/echarts'));
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

/* eslint-disable import/prefer-default-export */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

var RChartsCore =
/*#__PURE__*/
function (_Component) {
  _inherits(RChartsCore, _Component);

  _createClass(RChartsCore, null, [{
    key: "registerTheme",
    value: function registerTheme(themeName, config) {
      echartsLib.registerTheme(themeName, config);
    }
  }]);

  function RChartsCore(props) {
    var _this;

    _classCallCheck(this, RChartsCore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RChartsCore).call(this, props));
    _this.el = null;
    _this.echarts = null;
    _this.handleResize = lodash.debounce(_this.handleResize.bind(_assertThisInitialized(_this)), 1000);
    return _this;
  }

  _createClass(RChartsCore, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var pickKeys = ['initOption', 'setOptionOpts', 'option', 'events', 'theme'];

      if (!lodash.isEqual(lodash.pick(this.props, pickKeys), lodash.pick(prevProps, pickKeys))) {
        this.clean();
        this.init();
        return;
      }

      if (!lodash.isEqual(prevProps.style, this.props.style) || !lodash.isEqual(prevProps.className, this.props.className)) {
        try {
          this.renderDom().resize();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(e);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clean();
    }
  }, {
    key: "init",
    value: function init() {
      this.renderDom();
      this.bindEvents();
      this.addResizeListener();
    } // To extend later

  }, {
    key: "parseOption",
    value: function parseOption() {
      throw new Error('The method must be implemented');
    }
  }, {
    key: "getEchartsInstance",
    value: function getEchartsInstance() {
      var _this$props = this.props,
          theme = _this$props.theme,
          initOptions = _this$props.initOptions;
      var themeName = theme || 'default';
      return echartsLib.getInstanceByDom(this.el) || echartsLib.init(this.el, themeName, initOptions);
    }
  }, {
    key: "renderDom",
    value: function renderDom() {
      var _this$props2 = this.props,
          option = _this$props2.option,
          setOptionOpts = _this$props2.setOptionOpts;
      this.echarts = this.getEchartsInstance();
      this.echarts.setOption(option, setOptionOpts);
      return this.echarts;
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this2 = this;

      var events = this.props.events;

      var bind = function bind(eventName, fn) {
        _this2.echarts.on(eventName, function (params) {
          fn.call(_this2, params);
        });
      };

      for (var key in events) {
        if (hasOwn(events, key)) {
          bind(key, events[key]);
        }
      }
    }
  }, {
    key: "addResizeListener",
    value: function addResizeListener() {
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: "removeResizeListener",
    value: function removeResizeListener() {
      window.removeEventListener('resize', this.handleResize);
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      this.echarts.resize();
    }
  }, {
    key: "clean",
    value: function clean() {
      this.removeResizeListener();
      this.echarts.dispose(this.el);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          style = _this$props3.style,
          className = _this$props3.className;

      var newStyle = _objectSpread2({
        height: 300
      }, style);

      return React__default.createElement("div", {
        ref: function ref(el) {
          _this3.el = el;
        },
        className: className,
        style: newStyle
      });
    }
  }]);

  return RChartsCore;
}(React.Component);
RChartsCore.propTypes = {
  option: PropTypes.object.isRequired,
  // eslint-disable-line react/forbid-prop-types
  initOptions: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  setOptionOpts: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  events: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  style: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string
};
RChartsCore.defaultProps = {
  initOptions: {},
  setOptionOpts: {
    notMerge: true
  },
  theme: 'default',
  events: {},
  className: '',
  style: {}
};

module.exports = RChartsCore;
