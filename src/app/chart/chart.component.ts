import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as echarts from 'echarts';
import { ChartService } from '../services/chart.service';
import { ChartData } from '../models/chart-data.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chartInstance!: echarts.ECharts;
  chartType: string = 'bar';
  chartOptions: any;
  chartData: ChartData[] = [];

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartData = this.chartService.getTechUsageData();
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  @HostListener('window:resize')
  onResize() {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  }

  onChartTypeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.chartType = value;
    this.initChart();
  }

  initChart(): void {
    if (!this.chartContainer?.nativeElement) return;

    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#17becf'];

    if (this.chartType === 'all') {
      this.chartOptions = {
        backgroundColor: '#f7f9fc',
        title: {
          text: 'Programming Language Usage - All Views',
          left: 'center',
          textStyle: {
            fontSize: 20,
            color: '#003366'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 0
        },
        grid: {
          top: 60,
          left: 40,
          right: 40,
          bottom: 80
        },
        xAxis: {
          type: 'category',
          data: this.chartData.map(d => d.category),
          axisLine: {
            lineStyle: { color: '#000' }
          },
          axisLabel: {
            color: '#000',
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: { color: '#000' }
          },
          axisLabel: {
            color: '#000',
            fontSize: 14,
            fontWeight: 'bold'
          },
          splitLine: {
            lineStyle: { color: '#ccc' }
          }
        },
        series: [
          {
            name: 'Bar',
            type: 'bar',
            data: this.chartData.map((d, i) => ({
              value: d.value,
              name: d.category,
              itemStyle: {
                color: colors[i % colors.length],
                borderRadius: [5, 5, 0, 0]
              }
            })),
            barWidth: '30%'
          },
          {
            name: 'Line',
            type: 'line',
            data: this.chartData.map(d => d.value),
            smooth: true,
            lineStyle: { color: '#ff7f0e' }
          },
          {
            name: 'Area',
            type: 'line',
            data: this.chartData.map(d => d.value),
            areaStyle: {
              opacity: 0.4,
              color: colors[2]
            },
            lineStyle: { color: colors[2] }
          },
          {
            name: 'Pie',
            type: 'pie',
            radius: '30%',
            center: ['80%', '30%'],
            data: this.chartData.map((d, i) => ({
              value: d.value,
              name: d.category,
              itemStyle: { color: colors[i % colors.length] }
            }))
          }
        ]
      };
    } else {
      // Default behavior for bar, line, area, pie
      this.chartOptions = {
        backgroundColor: '#f7f9fc',
        title: {
          text: 'Programming Language Usage (%)',
          left: 'center',
          textStyle: {
            fontSize: 20,
            color: '#003366'
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: '#ffffff',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: {
            color: '#000',
            fontWeight: 'bold',
            fontSize: 14
          },
          formatter: (params: any) => {
            const info = this.chartData[params.dataIndex]?.extraInfo || '';
            return `${params.name}: ${params.value}%<br/><small>${info}</small>`;
          }
        },
        xAxis: this.chartType !== 'pie' ? {
          type: 'category',
          data: this.chartData.map(d => d.category),
          axisLine: {
            lineStyle: { color: '#000' }
          },
          axisLabel: {
            color: '#000',
            fontSize: 14,
            fontWeight: 'bold'
          },
          splitLine: { show: false }
        } : undefined,
        yAxis: this.chartType !== 'pie' ? {
          type: 'value',
          axisLine: {
            lineStyle: { color: '#000' }
          },
          axisLabel: {
            color: '#000',
            fontSize: 14,
            fontWeight: 'bold'
          },
          splitLine: {
            lineStyle: { color: '#ccc' }
          }
        } : undefined,
        series: [
          {
            name: 'Usage',
            type: this.chartType === 'area' ? 'line' : this.chartType,
            data: this.chartData.map((d, i) => ({
              value: d.value,
              name: d.category,
              itemStyle: {
                color: colors[i % colors.length],
                borderRadius: this.chartType === 'bar' ? [5, 5, 0, 0] : 0
              }
            })),
            radius: this.chartType === 'pie' ? '60%' : undefined,
            barWidth: this.chartType === 'bar' ? '50%' : undefined,
            areaStyle: this.chartType === 'area' ? {
              opacity: 0.4,
              color: colors[0]
            } : undefined,
            emphasis: {
              scale: true,
              itemStyle: {
                borderColor: '#000',
                borderWidth: 2,
                shadowBlur: 15,
                shadowColor: 'rgba(0, 0, 0, 0.6)'
              },
              label: {
                show: true,
                fontWeight: 'bold',
                color: '#000'
              }
            },
            animationEasing: 'elasticOut',
            animationDuration: 1000
          }
        ]
      };
    }

    this.chartInstance.setOption(this.chartOptions);
  }

}
