import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SmoothedLineChartComponent } from "./smoothed-line-chart/smoothed-line-chart.component";
import { TrafficSourceTypeComponent } from './traffic-source-type/traffic-source-type.component';
import { TrafficOrganizationComponent } from "./traffic-organization/traffic-organization.component";
import { TodaysLogComponent } from "./todays-log/todays-log.component";
import { OrganisationStatsComponent } from "./organisation-stats/organisation-stats.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TrafficRecognizedComponent } from "./traffic-recognized/traffic-recognized.component";
import { ThreatCategoryComponent } from "./threat-category/threat-category.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SmoothedLineChartComponent, TrafficSourceTypeComponent, TrafficOrganizationComponent, TodaysLogComponent, OrganisationStatsComponent, SidebarComponent, TrafficRecognizedComponent, ThreatCategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Assignment1st';
}
