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
          lineStyle: {
            color: '#000' // Darker line
          }
        },
        axisLabel: {
          color: '#000',          // Dark color
          fontSize: 14,           // Larger text
          fontWeight: 'bold'      // Bold labels
        },
        splitLine: {
          show: false
        }
      } : undefined,

      yAxis: this.chartType !== 'pie' ? {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#000'
          }
        },
        axisLabel: {
          color: '#000',         
          fontSize: 14,          
          fontWeight: 'bold'    
        },
        splitLine: {
          lineStyle: {
            color: '#ccc' // Optional: grid line color
          }
        }
      } : undefined,


      series: [
        {
          name: 'Usage',
          type: this.chartType,
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

    this.chartInstance.setOption(this.chartOptions);
  }
}
