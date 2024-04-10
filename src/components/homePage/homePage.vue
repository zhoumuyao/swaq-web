<template>
  <div class="dashboard-container">
    <div id="myChart" :style="{ width: '100%', height: '95vh', margin: 'auto' }"></div>

  </div>
</template>
<script>
import knowledge from "@/components/homePage/pic/knowledge.png"
import database from "@/components/homePage/pic/database.png"
import research from "@/components/homePage/pic/research.png"
import appraisal from "@/components/homePage/pic/appraisal.png"
import application from "@/components/homePage/pic/application.png"
import { mapGetters } from "vuex"
import * as echarts from "echarts"

export default {
  name: "home_page",
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例

      let myChart = echarts.init(
          document.getElementById("myChart")
          //this.theme
      )
      // 绘制图表

      var option = {
        tooltip: {
          show: false
        },
        backgroundColor: "transparent",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 50,
            roam: false, //鼠标滚轮缩放
            label: {
              show: true
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [2, 10],
            edgeLabel: {
              fontSize: 20
            },
            lineStyle: {
              type: "dashed",
              color: "#33bac4"
            },
            data: [
              {
                name: "生物安全平台",
                x: 450,
                y: 220,
                id: 0,
                symbolSize: 220,
                symbol: `image://${database}`,
                // itemStyle: {
                //   color: "#144954",
                // },
                label: {
                  position: "bottom",
                  fontSize: 20,
                  fontWeight: "bolder"
                }
              },
              {
                name: "风险评估",
                x: 200,
                y: 380,
                id:1,
                symbolSize: 150,
                // symbol:`image://${notFont}`,
                symbol: `image://${appraisal}`,
                // itemStyle: {
                //   color: "#144954",
                // },
                label: {
                  position: "bottom",
                  fontSize: 18,
                  fontWeight: "bolder"
                }
              },
              {
                name: "现场处置",
                x: 450,
                y: 430,
                id: 2,
                symbolSize: 150,
                // symbol:`image://${notFont}`,
                symbol: `image://${research}`,
                // itemStyle: {
                //   color: "#144954",
                // },
                label: {
                  position: "bottom",
                  fontSize: 18,
                  fontWeight: "bolder"
                }
              },
              {
                name: "检验鉴定",
                x: 700,
                y: 380,
                id: 3,
                symbolSize: 150,
                symbol: `image://${application}`,
                // itemStyle: {
                //   color: "#144954",
                // },
                label: {
                  position: "bottom",
                  fontSize: 18,
                  fontWeight: "bolder"
                }
              },
              {
                name: "计划和准备",
                x: 80,
                y: 430,
                id: 4,
                symbolSize: 100,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#02b0a0" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#079bb7" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  textBorderColor: "#555",
                  textBorderWidth: 1,
                  color: "white",
                  fontSize: 16
                }
              },
              {
                name: "风险识别",
                x: 120,
                y: 480,
                id: 5,
                symbolSize: 100,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#02b0a0" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#079bb7" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  textBorderColor: "#555",
                  textBorderWidth: 1,
                  color: "white",
                  fontSize: 16
                }
              },
              {
                name: "风险分析",
                x: 180,
                y: 510,
                id: 6,
                symbolSize: 100,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#02b0a0" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#079bb7" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  textBorderColor: "#555",
                  textBorderWidth: 1,
                  color: "white",
                  fontSize: 16
                }
              },
              {
                name: "风险评价",
                x: 250,
                y: 510,
                id: 7,
                symbolSize: 100,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#02b0a0" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#079bb7" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  textBorderColor: "#555",
                  textBorderWidth: 1,
                  color: "white",
                  fontSize: 16
                }
              },
              {
                name: "详细勘察",
                x: 380,
                y: 510,
                id: 8,
                symbolSize: 100,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#02b0a0" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#079bb7" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  textBorderColor: "#555",
                  textBorderWidth: 1,
                  color: "white",
                  fontSize: 16
                }
              },
              {
                name: "现场信息\n\n智能录入",
                x: 450,
                y: 540,
                id: 9,
                symbolSize: 100,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#02b0a0" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#079bb7" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  textBorderColor: "#555",
                  textBorderWidth: 1,
                  color: "white",
                  fontSize: 16
                }
              },
              {
                name: "无害化处理",
                x: 530,
                y: 510,
                id: 10,
                symbolSize: 100,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#02b0a0" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#079bb7" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  textBorderColor: "#555",
                  textBorderWidth: 1,
                  color: "white",
                  fontSize: 16
                }
              },
              {
                name: "生物危险因子",
                x: 670,
                y: 500,
                id: 11,
                symbolSize: 100,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#02b0a0" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#079bb7" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  textBorderColor: "#555",
                  textBorderWidth: 1,
                  color: "white",
                  fontSize: 16
                }
              },
              {
                name: "染病个体\n\n解剖查验",
                x: 780,
                y: 500,
                id: 12,
                symbolSize: 100,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#02b0a0" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#079bb7" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  textBorderColor: "#555",
                  textBorderWidth: 1,
                  color: "white",
                  fontSize: 16
                }
              },
              {
                name: "样本采集",
                x: 640,
                y: 550,
                id: 13,
                symbolSize: 80,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#02b0a0" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#079bb7" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  textBorderColor: "#555",
                  textBorderWidth: 1,
                  color: "white",
                  fontSize: 16
                }
              },
              {
                name: "实验室检测",
                x: 700,
                y: 560,
                id: 14,
                symbolSize: 80,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#02b0a0" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#079bb7" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  textBorderColor: "#555",
                  textBorderWidth: 1,
                  color: "white",
                  fontSize: 16
                }
              }
            ],

            links: [
              {
                source: "0",
                target: "1",
                lineStyle: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0.1
                },
                label: {
                  normal: {
                    show: true,
                    formatter: "现场风险评估",
                    // color: "#606266",
                    fontSize: "16"
                  }
                }
              },
              {
                source: "0",
                target: "2",
                lineStyle: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0.1
                },
                label: {
                  normal: {
                    show: true,
                    formatter: "现场处置流程",
                    // color: "#606266",
                    fontSize: "16"
                  }
                }
              },
              {
                source: "0",
                target: "3",

                lineStyle: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0.1
                },
                label: {
                  normal: {
                    show: true,
                    formatter: "生物危险因子鉴定",
                    fontSize: "16"
                  }
                }
              },
              {
                source: "1",
                target: "4",
                },{
                source: "1",
                target: "5",
              },{
                source: "1",
                target: "6",
              },{
                source: "1",
                target: "7",
              },{
                source: "2",
                target: "8",
              },{
                source: "2",
                target: "9",
              },{
                source: "2",
                target: "10",
              },{
                source: "3",
                target: "11",
              },{
                source: "3",
                target: "12",
              },{
                source: "11",
                target: "13",
              },{
                source: "11",
                target: "14",
              },
            ]
          }
        ]
      }
      myChart.setOption(option)
      let that = this
      myChart.on("click", function (params) {
        if (params.dataType === "node") {
          console.log(params)
          if (params.data.name === "处置对象") {
            that.$router.push({
              path: `/disposition_object`
            })
          }
          if (params.data.name === "风险评估") {
            that.$router.push({
              path: `/risk0`
            })
          }
          if (params.data.name === "现场处置") {
            that.$router.push({
              path: `/handle1`
            })
          }
          if (params.data.name === "检验鉴定") {
            that.$router.push({
              path: `/identify0`
            })
          }
        }
      })
    }
  }
}
</script>
<style></style>
