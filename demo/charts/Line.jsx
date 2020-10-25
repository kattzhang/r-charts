import React, { PureComponent } from 'react';
import RCharts from '@/Core';
import 'echarts/lib/chart/line';

export default class ReLine extends PureComponent {
  getOption() {
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    };

    return option;
  }

  render () {
    return (
      <div className="container">
        <h3>Line</h3>
        <div>
          <RCharts 
            option={this.getOption()}
          />
        </div>
      </div>
    )
  }
};
