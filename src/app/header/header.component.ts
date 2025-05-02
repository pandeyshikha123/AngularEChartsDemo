import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title ='Tech Usage Visualization';
  description = 'An interactive Angular dashboard showing usage trends of popular programming languages using ECharts.';


}
