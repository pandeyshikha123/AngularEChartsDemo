import { Injectable } from '@angular/core';
import { ChartData } from '../models/chart-data.model';

@Injectable({ providedIn: 'root' })
export class ChartService {
  getTechUsageData(): ChartData[] {  
    return [
      { category: 'TypeScript', value: 72, extraInfo: 'Used in Angular, Deno' },
      { category: 'JavaScript', value: 94, extraInfo: 'Core web language' },
      { category: 'Python', value: 85, extraInfo: 'Popular for AI/ML, web, scripting' },
      { category: 'Java', value: 60, extraInfo: 'Strong in enterprise & Android' },
      { category: 'Go', value: 45, extraInfo: 'Great for backend concurrency' }
    ];
  }
}
