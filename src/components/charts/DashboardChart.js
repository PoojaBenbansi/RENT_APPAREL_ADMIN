import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Row, Col, Table } from 'react-bootstrap';

export default class DashboardChart extends Component {
  render() {
    return (
      <Row className='cart-sec'>
        <Col md='5'>
          <h5>General results</h5>
          <div className='ct-chart' id='chartActivity'>
            <Row className='blueChart'>
              <Col md='8'>
                <p>
                  <span className='rating'>9.256</span> Followers
                </p>
                <ChartistGraph
                  data={{
                    labels: [
                      'a',
                      'b',
                      'c',
                      'd',
                      'e',
                      'f',
                      'g',
                      'h',
                      'i',
                      'j',
                      'k',
                      'l',
                    ],
                    series: [
                      [
                        542,
                        443,
                        320,
                        780,
                        553,
                        453,
                        326,
                        434,
                        568,
                        610,
                        756,
                        895,
                      ],
                    ],
                  }}
                  type='Bar'
                  options={{
                    seriesBarDistance: 5,
                    axisX: {
                      showGrid: false,
                    },
                    height: '130px',
                  }}
                  responsiveOptions={[
                    [
                      'screen and (max-width: 640px)',
                      {
                        seriesBarDistance: 5,
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      },
                    ],
                  ]}
                />
              </Col>
              <Col md='4'>
                <ChartistGraph
                  data={{
                    series: [60, 40],
                  }}
                  type='Pie'
                  options={{
                    donut: true,
                    donutWidth: 20,
                    donutSolid: true,
                    startAngle: 270,
                    showLabel: false,
                  }}
                  responsiveOptions={[
                    [
                      'screen and (max-width: 640px)',
                      {
                        seriesBarDistance: 5,
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      },
                    ],
                  ]}
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col md='5'>
          <h5>Ratings by category </h5>
          <div className='ct-chart' id='chartActivity'>
            <Row>
              <Col md='8' className='redBar'>
                <p>
                  <span className='rating'>3.256</span> Followers
                </p>
                <ChartistGraph
                  data={{
                    labels: [
                      'a',
                      'b',
                      'c',
                      'd',
                      'e',
                      'f',
                      'g',
                      'h',
                      'i',
                      'j',
                      'k',
                      'l',
                    ],
                    series: [
                      [
                        642,
                        443,
                        252,
                        780,
                        553,
                        253,
                        726,
                        687,
                        568,
                        610,
                        320,
                        422,
                      ],
                    ],
                  }}
                  type='Bar'
                  options={{
                    seriesBarDistance: 5,
                    axisX: {
                      showGrid: false,
                    },
                    height: '130px',
                  }}
                  responsiveOptions={[
                    [
                      'screen and (max-width: 640px)',
                      {
                        seriesBarDistance: 5,
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      },
                    ],
                  ]}
                />
              </Col>
              <Col md='4' className='redChart'>
                <ChartistGraph
                  data={{
                    series: [70, 20],
                  }}
                  type='Pie'
                  options={{
                    donut: true,
                    donutWidth: 20,
                    donutSolid: true,
                    startAngle: 270,
                    showLabel: false,
                  }}
                  responsiveOptions={[
                    [
                      'screen and (max-width: 640px)',
                      {
                        seriesBarDistance: 5,
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      },
                    ],
                  ]}
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col md='2'>
          <Table>
            <tbody>
              <tr>
                <td>Term 1</td>
                <td>
                  <b>85.25</b>
                </td>
              </tr>
              <tr>
                <td>Term 2</td>
                <td>
                  <b>36.66</b>
                </td>
              </tr>
              <tr>
                <td>Term 3</td>
                <td>
                  <b>25.35</b>
                </td>
              </tr>
              <tr>
                <td>Term 4</td>
                <td>
                  <b>69.99 </b>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}
