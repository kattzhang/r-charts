# A simple chart components based on React and Echarts(>=3.0 & >=4.0)

> inspired by [v-charts](https://github.com/ElemeFE/v-charts) and [echarts-for-react](https://github.com/hustcc/echarts-for-react)

# Install

```sh
npm install --save @cany/r-charts echarts
```


# Usage

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



