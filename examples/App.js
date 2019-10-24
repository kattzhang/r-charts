import React from 'react';
import './App.less';
import { ReLine } from '../dist/r-charts.esm';

function renderLine() {
  const option = {
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
  return (
    <ReLine
      option={option}
    />
  )
}

function renderBar() {
  const option = {
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: ['product', '2015', '2016', '2017'],
      source: [
        {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
        {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
        {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
        {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
      ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    series: [
      {type: 'bar'},
      {type: 'bar'},
      {type: 'bar'}
    ]
  };
  return (
    <ReLine
      option={option}
    />
  )
}

function renderPie() {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'horizontal',
      data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
      {
        name:'访问来源',
        type:'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
          {value:135, name:'视频广告'},
          {value:1548, name:'搜索引擎'}
        ]
      }
    ]
  };
  return (
    <ReLine
      option={option}
    />
  )
}

export default function App() {
  return (
    <div className="app">
      <ul>
        <li>
          {renderLine()}
        </li>
        <li>
          {renderBar()}
        </li>
        <li>
          {renderPie()}
        </li>
      </ul>
    </div>
  )
};
