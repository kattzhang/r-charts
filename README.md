# A simple chart components based on React and Echarts(3.x & 4.x)

> inspired by [v-charts](https://github.com/ElemeFE/v-charts)

# Installation

```sh
npm install --save echarts @cany/r-charts
```


# Usage

**to use directly**

```js
import React from 'react';
import RCharts from '@cany/r-charts';
import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/pie';
// ....

<RCharts
  option={this.getOption()}
  theme={'ThemeName'}
  events={this.events}
/>
```

**inherit**

```js
// ReLine.js
import RCharts from '@cany/r-charts';
import 'echarts/lib/chart/line';

export default class ReLine extends RCharts {};

// src/main.js
<ReLine
  option={this.getOption()}
  theme={'ThemeName'}
  events={this.events}
/>
```


# Component Props

- **`option`** (required, object)

  the echarts option config, can see [option](http://echarts.baidu.com/option.html#title).

- **`style`** (optional, object)

  the `style` of echarts container. it is `{ height: 300 }` by default.

- **`className`** (optional, string)

  the `class` of echarts container.

- **`theme`** (optional, string)

  the `theme` of echarts, should use [registerTheme](https://www.echartsjs.com/zh/api.html#echarts.registerTheme) before using it

- **`events`** (optional, object)

  binding the echarts event, it will be invoked with the `echarts event object` as paramters.

  ```js
  let events = {
    'click': this.onChartClick,
    ...
  }

  <RCharts
    option={ this.getOption() }
    style={{ height: 300 }}
    events={ events } 
  />
  ```

  for more events, see [events](http://echarts.baidu.com/api.html#events)

- **`initOptions`** (optional, object)

  the third options when create an echarts instance by invoking the [echart.init](https://www.echartsjs.com/zh/api.html#echarts.init) api

- **`setOptionOpts`** (optional, object)

  the second options as object, when set echarts instance by invoking the [echartsInstance.setOption](https://www.echartsjs.com/zh/api.html#echartsInstance.setOption) api



# Component API

- **`getEchartsInstance()`** 

   get the echarts instance, then you can use any `API of echarts`. e.g:

  ```js
  <RCharts 
    ref={ inst => { this.rcharts = inst } }
    option={ this.getOption() } 
  />

  const echarts = this.rcharts..getEchartsInstance()
  echarts.resize()
  ```

  **About API of echarts instance, can see** [echartsInstance](http://echarts.baidu.com/api.html#echartsInstance).



# Licensee

MIT@[kattzhang](https://github.com/kattzhang).



