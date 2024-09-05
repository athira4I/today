// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-organisation-stats',
//   standalone: true,
//   imports: [],
//   templateUrl: './organisation-stats.component.html',
//   styleUrl: './organisation-stats.component.css'
// })
// export class OrganisationStatsComponent {

// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-organisation-stats',
  standalone: true,
  templateUrl: './organisation-stats.component.html',
  styleUrls: ['./organisation-stats.component.css']
})
export class OrganisationStatsComponent implements OnInit, OnDestroy {

  private root!: am5.Root;
  private chart!: am5percent.PieChart;

  ngOnInit(): void {
    // Create root element
    this.root = am5.Root.new("chartdiv");

    // Set themes
    // this.root.setThemes([
    //   am5themes_Animated.new(this.root)
    // ]);

    // Create chart
    this.chart = this.root.container.children.push(am5percent.PieChart.new(this.root, {
      layout: this.root.verticalLayout,
      innerRadius: am5.percent(40)
    }));

    // Create series
    const series0 = this.chart.series.push(am5percent.PieSeries.new(this.root, {
      valueField: "bottles",
      categoryField: "country",
      alignLabels: false
    }));

    const series1 = this.chart.series.push(am5percent.PieSeries.new(this.root, {
      valueField: "litres",
      categoryField: "country",
      alignLabels: true
    }));

    // Customize series appearance
    const bgColor = this.root.interfaceColors.get("background");

    series0.ticks.template.setAll({ forceHidden: true });
    series0.labels.template.setAll({ forceHidden: true });
    series0.slices.template.setAll({
      stroke: bgColor,
      strokeWidth: 2,
      tooltipText: "{category}: {valuePercentTotal.formatNumber('0.00')}% ({value} bottles)"
    });
    series0.slices.template.states.create("hover", { scale: 0.95 });

    series1.slices.template.setAll({
      stroke: bgColor,
      strokeWidth: 2,
      tooltipText: "{category}: {valuePercentTotal.formatNumber('0.00')}% ({value} litres)"
    });

    // Set data
    const data = [
      { country: "Lithuania", litres: 501.9, bottles: 1500 },
      { country: "Czech Republic", litres: 301.9, bottles: 990 },
      { country: "Ireland", litres: 201.1, bottles: 785 },
      { country: "Germany", litres: 165.8, bottles: 255 },
      { country: "Australia", litres: 139.9, bottles: 452 },
      { country: "Austria", litres: 128.3, bottles: 332 },
      { country: "UK", litres: 99, bottles: 150 },
      { country: "Belgium", litres: 60, bottles: 178 },
      { country: "The Netherlands", litres: 50, bottles: 50 }
    ];

    series0.data.setAll(data);
    series1.data.setAll(data);

    // Play initial series animation
    series0.appear(1000, 100);
    series1.appear(1000, 100);
  }

  ngOnDestroy(): void {
    if (this.root) {
      this.root.dispose();
    }
  }
}