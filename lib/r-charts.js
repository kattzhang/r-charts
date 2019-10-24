(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('lodash'), require('echarts/lib/echarts'), require('echarts/lib/component/title'), require('echarts/lib/component/tooltip'), require('echarts/lib/component/legend'), require('echarts/lib/component/dataZoom'), require('echarts/lib/chart/line'), require('echarts/lib/chart/bar'), require('echarts/lib/chart/pie')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'lodash', 'echarts/lib/echarts', 'echarts/lib/component/title', 'echarts/lib/component/tooltip', 'echarts/lib/component/legend', 'echarts/lib/component/dataZoom', 'echarts/lib/chart/line', 'echarts/lib/chart/bar', 'echarts/lib/chart/pie'], factory) :
  (global = global || self, factory(global['r-charts'] = {}, global.React, global.PropTypes, global.lodash, global.echartsLib));
}(this, function (exports, React, PropTypes, lodash, echartsLib) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  echartsLib = echartsLib && echartsLib.hasOwnProperty('default') ? echartsLib['default'] : echartsLib;

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
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
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

  var ChartsCore =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ChartsCore, _Component);

    _createClass(ChartsCore, null, [{
      key: "registerTheme",
      value: function registerTheme(themeName, config) {
        echartsLib.registerTheme(themeName, config);
      }
    }]);

    function ChartsCore(props) {
      var _this;

      _classCallCheck(this, ChartsCore);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChartsCore).call(this, props));
      _this.el = null;
      _this.echarts = null;
      _this.handleResize = lodash.debounce(_this.handleResize.bind(_assertThisInitialized(_this)), 1000);
      return _this;
    }

    _createClass(ChartsCore, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.init();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clean();
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
            console.warn(e);
          }
        }
      }
    }, {
      key: "init",
      value: function init() {
        this.renderDom();
        this.bindEvents();
        this.addResizeListener();
      }
    }, {
      key: "parseOption",
      // TODO: 后期扩展参数使用  (需要继承的类都必须实现此方法)
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
        var events = this.props.events;
        var inst = this.echarts;

        var bind = function bind(eventName, fn) {
          inst.on(eventName, function (params) {
            fn(params, inst);
          });
        };

        for (var key in events) {
          bind(key, events[key]);
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
        var _this2 = this;

        var _this$props3 = this.props,
            style = _this$props3.style,
            className = _this$props3.className;

        var newStyle = _objectSpread2({
          height: 300
        }, style);

        return React__default.createElement("div", {
          ref: function ref(el) {
            _this2.el = el;
          },
          className: className,
          style: newStyle
        });
      }
    }]);

    return ChartsCore;
  }(React.Component);
  ChartsCore.propTypes = {
    option: PropTypes.object.isRequired,
    initOptions: PropTypes.object,
    setOptionOpts: PropTypes.object,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    events: PropTypes.object,
    style: PropTypes.object,
    className: PropTypes.string
  };
  ChartsCore.defaultProps = {
    option: {},
    initOptions: {},
    setOptionOpts: {
      notMerge: true // 为 false 时，调用 setOption 有时不能正确显示

    },
    theme: 'default',
    events: {},
    className: '',
    style: {}
  };

  var ReLine =
  /*#__PURE__*/
  function (_Core) {
    _inherits(ReLine, _Core);

    function ReLine() {
      _classCallCheck(this, ReLine);

      return _possibleConstructorReturn(this, _getPrototypeOf(ReLine).apply(this, arguments));
    }

    return ReLine;
  }(ChartsCore);

  var ReBar =
  /*#__PURE__*/
  function (_Core) {
    _inherits(ReBar, _Core);

    function ReBar() {
      _classCallCheck(this, ReBar);

      return _possibleConstructorReturn(this, _getPrototypeOf(ReBar).apply(this, arguments));
    }

    return ReBar;
  }(ChartsCore);

  var RePie =
  /*#__PURE__*/
  function (_Core) {
    _inherits(RePie, _Core);

    function RePie() {
      _classCallCheck(this, RePie);

      return _possibleConstructorReturn(this, _getPrototypeOf(RePie).apply(this, arguments));
    }

    return RePie;
  }(ChartsCore);

  exports.ReBar = ReBar;
  exports.ReLine = ReLine;
  exports.RePie = RePie;
  exports.default = ChartsCore;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
