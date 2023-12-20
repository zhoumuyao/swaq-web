<template>
  <div class="dashboard-container">
    <div id="myChart" :style="{ width: '100%', height: '900px', margin: '0 auto' }"></div>


  </div>
</template>
<script>
import knowledge from "@/assets/home/knowledge.png"
import database from "@/assets/home/database.png"
import research from "@/assets/home/research.png"
import appraisal from "@/assets/home/appraisal.png"
import application from "@/assets/home/application.png"
import shortTitle from "@/assets/home/标题背景短.png"
import longTitle from "@/assets/home/标题背景长.png"
import { mapGetters } from "vuex"
import * as echarts from "echarts"

export default {
  name: "home_page",
  computed: {
    ...mapGetters(["theme"])
  },
  data() {
    return {
      tableData: [
        {
          data1: "安全与系统安全",
          data2: "元数据管理",
          data3: "标准规划管理"
        },
        {
          data1: "数据采集与预处理",
          data2: "数据压缩",
          data3: "ETL抽取/转换/载入工具"
        }
      ]
    }
  },
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
                name: "作战行动影响分析",
                x: 200,
                y: 300,
                symbolSize: [80, 95],
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
                name: "通信能力评估",
                x: 450,
                y: 300,
                symbolSize: [80, 95],
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
                name: "通信保障筹划",
                x: 700,
                y: 300,
                symbolSize: [80, 90],
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
                name: "数据资源管理",
                x: 450,
                y: 150,
                symbolSize: [200, 200],
                symbol: `image://${database}`,
                // itemStyle: {
                //   color: "#144954",
                // },
                label: {
                  position: "top",
                  fontSize: 20,
                  fontWeight: "bolder"
                }
              },

              {
                name: "通信方案推演",
                x: 200,
                y: 120,
                symbol: `image://${knowledge}`,

                symbolSize: [80, 95],
                itemStyle: {
                  color: "#144954"
                },
                label: {
                  position: "bottom",
                  fontSize: 18,
                  fontWeight: "bolder"
                }
              },
              {
                name: "体系影响分析",
                x: 120,
                y: 400,
                id: 11,
                symbolSize: 70,
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
                  fontSize: 15
                }
              },
              {
                name: "链路行动影响分析",
                x: 190,
                y: 400,
                id: 12,
                symbolSize: 70,
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
                  fontSize: 15
                }
              },
              {
                name: "可视化展示",
                x: 260,
                y: 400,
                id: 13,
                symbolSize: 70,
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
                  fontSize: 15
                }
              },
              {
                name: "通信态势可视化",
                x: 800,
                y: 150,
                symbolSize: [80, 90],
                symbol: `image://${appraisal}`,
                itemStyle: {
                  color: "#144954"
                },
                label: {
                  position: "bottom",
                  fontSize: 18,
                  fontWeight: "bolder"
                }
              },
              {
                name: "通信资源状态",
                x: 380,
                y: 400,
                id: 21,
                symbolSize: 70,
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
                  fontSize: 15
                }
              },
              {
                name: "资源能力分析与评估",
                x: 450,
                y: 400,
                id: 22,
                symbolSize: 70,
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
                  fontSize: 15
                }
              },
              {
                name: "通信效能计算",
                x: 530,
                y: 400,
                id: 23,
                symbolSize: 70,
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
                  fontSize: 15
                }
              },
              {
                name: "通信方案管理",
                x: 650,
                y: 400,
                id: 31,
                symbolSize: 70,
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
                  fontSize: 15
                }
              },
              {
                name: "通信方案制定",
                x: 750,
                y: 400,
                id: 32,
                symbolSize: 70,
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
                  fontSize: 15
                }
              },
              {
                name: "方案制定1",
                x: 730,
                y: 460,
                id: 311,
                symbolSize: 30,
                itemStyle: {
                  color: "#05a4ad"
                },
                label: {
                  position: "bottom"
                }
              },
              {
                name: "方案制定2",
                x: 770,
                y: 460,
                id: 312,
                symbolSize: 30,
                itemStyle: {
                  color: "#05a4ad"
                },
                label: {
                  position: "bottom"
                }
              }
            ],

            links: [
              {
                source: "数据资源管理",
                target: "通信态势可视化",
                lineStyle: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0.1
                },
                label: {
                  normal: {
                    show: true,
                    formatter: "数据资源获取",
                    // color: "#606266",
                    fontSize: "15"
                  }
                }
              },
              {
                source: "数据资源管理",
                target: "通信方案推演"
              },
              {
                source: "数据资源管理",
                target: "通信保障筹划",

                lineStyle: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0.1
                },
                label: {
                  normal: {
                    show: true,
                    formatter: "数据资源获取",
                    fontSize: "15"
                  }
                }
              },
              {
                source: "通信保障筹划",
                target: "作战行动影响分析",
                lineStyle: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0.1
                }
              },
              {
                source: "通信保障筹划",
                target: "通信能力评估",

                lineStyle: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0.1
                },
                label: {
                  normal: {
                    show: true,
                    formatter: "方案获取",
                    // color: "#606266",
                    fontSize: "15"
                  }
                }
              },
              {
                source: "作战行动影响分析",
                target: "通信能力评估",
                lineStyle: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0.1
                }
              },
              {
                source: "作战行动影响分析",
                target: "通信态势可视化",
                lineStyle: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0.1
                }
              },
              {
                source: "作战行动影响分析",
                target: "11",
                lineStyle: {
                  opacity: 0.9
                }
              },
              {
                source: "作战行动影响分析",
                target: "12",
                lineStyle: {
                  opacity: 0.9
                }
              },
              {
                source: "作战行动影响分析",
                target: "13",
                lineStyle: {
                  opacity: 0.9
                }
              },
              {
                source: "通信能力评估",
                target: "21",
                lineStyle: {
                  opacity: 0.9
                }
              },
              {
                source: "通信能力评估",
                target: "22",
                lineStyle: {
                  opacity: 0.9
                }
              },
              {
                source: "通信能力评估",
                target: "23",
                lineStyle: {
                  opacity: 0.9
                }
              },
              {
                source: "通信保障筹划",
                target: "31",
                lineStyle: {
                  opacity: 0.9
                }
              },
              {
                source: "通信保障筹划",
                target: "32",
                lineStyle: {
                  opacity: 0.9
                }
              },
              {
                source: "32",
                target: "311",
                lineStyle: {
                  opacity: 0.9
                }
              },
              {
                source: "32",
                target: "312",
                lineStyle: {
                  opacity: 0.9
                }
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
      let that = this
      myChart.on("click", function (params) {
        if (params.dataType == "node") {
          console.log(params)
          if (params.data.name == "数据资源管理") {
            that.$router.push({
              path: `/dataResourceManagement/communicationForceManagement`
            })
          }
          if (params.data.name == "通信方案推演") {
            that.$router.push({
              path: `/deduction/index`
            })
          }
          if (params.data.name == "通信态势可视化") {
            that.$router.push({
              path: `/comstate/comstate1`
            })
          }
          if (params.data.name == "作战行动影响分析") {
            that.$router.push({
              path: `/OperationalAnalysis/SystemImpactAnalysis`
            })
          }
          if (params.data.name == "体系影响分析") {
            that.$router.push({
              path: `/OperationalAnalysis/SystemImpactAnalysis`
            })
          }
          if (params.data.name == "链路行动影响分析") {
            that.$router.push({
              path: `/OperationalAnalysis/ImpactAssessment`
            })
          }
          if (params.data.name == "可视化展示") {
            that.$router.push({
              path: `/OperationalAnalysis/VisualDisplay`
            })
          }
          if (params.data.name == "通信能力评估") {
            that.$router.push({
              path: `/assessment/status`
            })
          }
          if (params.data.name == "通信资源状态") {
            that.$router.push({
              path: `/assessment/status`
            })
          }
          if (params.data.name == "资源能力分析与评估") {
            that.$router.push({
              path: `/assessment/analysis`
            })
          }
          if (params.data.name == "通信效能计算") {
            that.$router.push({
              path: `/assessment/calculation`
            })
          }
          if (params.data.name == "通信保障筹划") {
            that.$router.push({
              path: `/planMaking/plan/plan1`
            })
          }
          if (params.data.name == "通信方案管理") {
            that.$router.push({
              path: `/planMaking/arrange`
            })
          }
          if (params.data.name == "通信方案制定") {
            that.$router.push({
              path: `/planMaking/plan/plan1`
            })
          }
          if (params.data.name == "方案制定1") {
            that.$router.push({
              path: `/planMaking/plan/plan1`
            })
          }
          if (params.data.name == "方案制定2") {
            that.$router.push({
              path: `/planMaking/plan/plan2`
            })
          }
        }
      })
    }
  }
}
</script>
<style></style>
