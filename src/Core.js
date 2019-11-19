import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual, pick, debounce, } from 'lodash';
import echartsLib from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import { hasOwn } from './util';

export default class ChartsCore extends Component {

  static registerTheme(themeName, config) {
    echartsLib.registerTheme(themeName, config);
  }

  constructor(props) {
    super(props);
    this.el = null;
    this.echarts = null;
    this.handleResize = debounce(this.handleResize.bind(this), 1000);
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.clean();
  }

  componentDidUpdate(prevProps) {
    const pickKeys = ['initOption', 'setOptionOpts', 'option', 'events', 'theme'];

    if (
      !isEqual(pick(this.props, pickKeys), pick(prevProps, pickKeys))
    ) {
      this.clean();
      this.init();
      return;
    }
    
    if (
      !isEqual(prevProps.style, this.props.style) || 
      !isEqual(prevProps.className, this.props.className)
    ) {
      try {
        this.renderDom().resize();
      } catch (e) {
        console.warn(e);
      }
    }
  }

  init() {
    this.renderDom();
    this.bindEvents();
    this.addResizeListener();
  }

  // To extend later
  parseOption() {
    throw new Error('The method must be implemented');
  }

  getEchartsInstance() {
    const { theme, initOptions } = this.props;
    const themeName = theme || 'default';

    return echartsLib.getInstanceByDom(this.el) ||
      echartsLib.init(this.el, themeName, initOptions);
  }

  renderDom() {
    const { option, setOptionOpts } = this.props;
    this.echarts = this.getEchartsInstance();
    this.echarts.setOption(option, setOptionOpts);

    return this.echarts;
  }

  bindEvents() {
    const { events } = this.props;
    const bind = (eventName, fn) => {
      this.echarts.on(eventName, params => {
        fn.call(this, params);
      });
    };

    for (const key in events) {
      if (hasOwn(events, key)) {
        bind(key, events[key]);
      }
    }
  }

  addResizeListener() {
    window.addEventListener('resize', this.handleResize);
  }

  removeResizeListener() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.echarts.resize();
  }

  clean() {
    this.removeResizeListener();
    this.echarts.dispose(this.el);
  }

  render() {
    const { style, className } = this.props;
    const newStyle = {
      height: 300,
      ...style,
    };

    return (
      <div
        ref={el => { this.el = el; }}
        className={className}
        style={newStyle}
      />
    );
  }
}

ChartsCore.propTypes = {
  option: PropTypes.object.isRequired,
  initOptions: PropTypes.object,
  setOptionOpts: PropTypes.object,
  theme: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  events: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
};

ChartsCore.defaultProps = {
  option: {},
  initOptions: {},
  setOptionOpts: {
    notMerge: true,
  },
  theme: 'default',
  events: {},
  className: '',
  style: {},
};
