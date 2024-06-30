import { useEffect, useMemo, useRef } from 'react'

import { useWSGameStore } from '@/commons/stores'

const getHeightRatio = (height: number) => {
  if (height <= 700) {
    return 0.24
  }

  if (height <= 900) {
    return 0.32
  }

  // if (height <= 1280) {
  //   return 0.32;
  // }

  // 667 100

  return 0.35
}

const useChartOptions = () => {
  const { chartDataSet, gameResults } = useWSGameStore()

  const height = useRef(window.innerHeight)

  function updateChartHeight(e: Event) {
    if (e.target instanceof Window) {
      height.current = e.target?.innerHeight
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateChartHeight)

    return () => window.removeEventListener('resize', updateChartHeight)
  }, [])

  const heightRatio = getHeightRatio(height.current)

  const options = useMemo(() => {
    if (gameResults) {
      if (gameResults.win) {
        const winConfig = {
          chart: {
            type: 'spline',
            marginRight: 10,
            backgroundColor: 'transparent',
            height: heightRatio * height.current,

            // animation: Highcharts.svg, // don't animate in old IE
          },
          title: {
            text: '',
          },
          subTitle: {
            text: '',
          },
          xAxis: {
            visible: false,
            // type: "linear",
            // width: 400,
            type: 'logarithmic',
            tickInterval: 1,
            tickPositions: chartDataSet.data.map((number) => {
              const teste = Math.ceil(number * 10) / 10
              return Math.log10(teste)
            }),
          },

          yAxis: {
            startsFromZero: false,
            type: 'linear',
            title: '',
            tickInterval: 0.1,
            tickColor: '#272A3A',
            tickWidth: 1,
            gridLineColor: '#272A3A',
            softMax: 2,
            softMin: 1,
            startOnTick: false,
            minRange: 1,
            min: 1,

            labels: {
              format: '{value}x',
            },
          },
          legend: {
            enabled: false,
          },
          exporting: {
            enabled: false,
          },
          tooltip: {
            enabled: false,
            followPointer: false,
          },
          plotOptions: {
            spline: {
              lineWidth: 4,
              lineColor: '#34C759',
              marker: {
                enabled: false,
              },
              allowPointSelect: false,
              pointStart: 0,

              stickyTracking: false,
              series: {
                shadow: true,
              },
            },
          },
          credits: {
            enabled: false,
          },
          series: [
            {
              data: [
                ...chartDataSet.data,
                {
                  y: chartDataSet.data[chartDataSet.data.length - 1],
                  marker: {
                    symbol: 'circle',
                    width: 20, // Width of the ellipse
                    height: 10, // Height of the ellipse
                    fillColor: 'yellow', // Fill color
                    lineColor: 'red', // Border color
                    lineWidth: 2, // Border width
                  },
                },
              ],
              shadow: {
                color: '#5DD27A',
                width: 10,
                opacity: 1,
                offsetX: 0,
                offsetY: 0,
              },
            },
          ],
        }

        return winConfig
      }
      const loseConfig = {
        chart: {
          type: 'spline',
          marginRight: 10,
          backgroundColor: 'transparent',

          height: heightRatio * height.current,

          // animation: Highcharts.svg, // don't animate in old IE
        },
        title: {
          text: '',
        },
        subTitle: {
          text: '',
        },
        xAxis: {
          visible: false,
          // type: "linear",
          // width: 400,
          type: 'logarithmic',
          tickInterval: 1,
          tickPositions: chartDataSet.data.map((number) => {
            const teste = Math.ceil(number * 10) / 10
            return Math.log10(teste)
          }),
        },

        yAxis: {
          startsFromZero: false,
          type: 'linear',
          title: '',
          tickInterval: 0.1,
          tickColor: '#272A3A',
          tickWidth: 1,
          gridLineColor: '#272A3A',
          softMax: 2,
          softMin: 1,
          startOnTick: false,
          minRange: 1,
          min: 1,

          labels: {
            format: '{value}x',
          },
        },
        legend: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
          followPointer: false,
        },
        plotOptions: {
          spline: {
            lineWidth: 4,
            lineColor: '#FF3B30',
            marker: {
              enabled: false,
            },
            allowPointSelect: false,
            pointStart: 0,

            stickyTracking: false,
            series: {
              shadow: true,
            },
          },
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            data: [
              ...chartDataSet.data,
              {
                y: chartDataSet.data[chartDataSet.data.length - 1],
                marker: {
                  symbol: 'circle',
                  width: 20, // Width of the ellipse
                  height: 10, // Height of the ellipse
                  fillColor: 'yellow', // Fill color
                  lineColor: 'red', // Border color
                  lineWidth: 2, // Border width
                },
              },
            ],
            shadow: {
              color: '#FF6259',
              width: 10,
              opacity: 1,
              offsetX: 0,
              offsetY: 0,
            },
          },
        ],
      }

      return loseConfig
    }
    const config = {
      chart: {
        type: 'spline',
        marginRight: 10,
        backgroundColor: 'transparent',

        height: heightRatio * height.current,

        // animation: Highcharts.svg, // don't animate in old IE
      },
      title: {
        text: '',
      },
      subTitle: {
        text: '',
      },

      xAxis: {
        visible: false,
        // type: "linear",
        // width: 400,
        type: 'logarithmic',
        tickInterval: 1,
        tickPositions: chartDataSet.data.map((number) => {
          const teste = Math.ceil(number * 10) / 10
          return Math.log10(teste)
        }),
      },

      yAxis: {
        startsFromZero: false,
        type: 'linear',
        title: '',
        tickInterval: 0.1,
        tickColor: '#272A3A',
        tickWidth: 1,
        gridLineColor: '#272A3A',
        softMax: 2,
        softMin: 1,
        startOnTick: false,
        minRange: 1,
        min: 1,

        labels: {
          format: '{value}x',
        },
      },
      legend: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
        followPointer: false,
      },
      plotOptions: {
        spline: {
          lineWidth: 4,
          lineColor: '#FFBC2D',
          marker: {
            enabled: false,
          },
          allowPointSelect: false,
          pointStart: 0,

          stickyTracking: false,
          series: {
            shadow: true,
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          data: [
            ...chartDataSet.data,
            {
              y: chartDataSet.data[chartDataSet.data.length - 1],
              marker: {
                symbol: 'circle',
                width: 60, // Width of the ellipse
                height: 60, // Height of the ellipse
                fillColor: 'yellow', // Fill color
                lineColor: 'red', // Border color
                lineWidth: 2, // Border width
              },
            },
          ],
          animation: {
            duration: 2000,
          },
          shadow: {
            color: '#FFCA5A',
            width: 10,
            opacity: 1,
            offsetX: 0,
            offsetY: 0,
          },
        },
      ],
    }

    return config
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameResults, chartDataSet])

  return options
}

export default useChartOptions
