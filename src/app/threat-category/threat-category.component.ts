// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-threat-category',
//   standalone: true,
//   imports: [],
//   templateUrl: './threat-category.component.html',
//   styleUrl: './threat-category.component.css'
// })
// export class ThreatCategoryComponent {

// }

import { Component, AfterViewInit } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'app-threat-category',
  standalone: true,
  templateUrl: './threat-category.component.html',
  styleUrls: ['./threat-category.component.css']
})
export class ThreatCategoryComponent implements AfterViewInit {

  private root?: am5.Root;

  constructor() {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    // Ensure there's only one Root element for the chart container
    if (this.root) {
      this.root.dispose();  // Dispose of the existing root if it exists
    }

    // Create root element
    this.root = am5.Root.new('threatCategoryChartDiv');

    // Set themes
    // this.root.setThemes([
    //   am5themes_Animated.new(this.root)
    // ]);

    // Create chart
    const chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
      panX: false,
      panY: false,
      wheelX: 'none',
      wheelY: 'none',
      paddingLeft: 0,
      layout: this.root.verticalLayout
    }));

    // Create axes and their renderers
    const yRenderer = am5xy.AxisRendererY.new(this.root, {
      visible: false,
      minGridDistance: 20,
      inversed: true,
      minorGridEnabled: true
    });

    yRenderer.grid.template.set('visible', false);

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(this.root, {
      maxDeviation: 0,
      renderer: yRenderer,
      categoryField: 'weekday'
    }));

    const xRenderer = am5xy.AxisRendererX.new(this.root, {
      visible: false,
      minGridDistance: 30,
      opposite: true,
      minorGridEnabled: true
    });

    xRenderer.grid.template.set('visible', false);

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(this.root, {
      renderer: xRenderer,
      categoryField: 'hour'
    }));

    // Create series
    const series = chart.series.push(am5xy.ColumnSeries.new(this.root, {
      calculateAggregates: true,
      stroke: am5.color(0xffffff),
      clustered: false,
      xAxis: xAxis,
      yAxis: yAxis,
      categoryXField: 'hour',
      categoryYField: 'weekday',
      valueField: 'value'
    }));

    series.columns.template.setAll({
      tooltipText: '{value}',
      strokeOpacity: 1,
      strokeWidth: 2,
      width: am5.percent(100),
      height: am5.percent(100)
    });

    series.columns.template.events.on('pointerover', function(event) {
      const di = event.target.dataItem;
      if (di) {
        // Example: update heat legend if needed
        // heatLegend.showValue(di.get('value', 0));
      }
    });

    series.events.on('datavalidated', function() {
      // Example: adjust heat legend if needed
      // heatLegend.set('startValue', series.getPrivate('valueHigh'));
      // heatLegend.set('endValue', series.getPrivate('valueLow'));
    });

    // Set up heat rules
    series.set('heatRules', [{
      target: series.columns.template,
      min: am5.color(0xfffb77),
      max: am5.color(0xfe131a),
      dataField: 'value',
      key: 'fill'
    }]);

    // Add heat legend
    const heatLegend = chart.bottomAxesContainer.children.push(am5.HeatLegend.new(this.root, {
      orientation: 'horizontal',
      endColor: am5.color(0xfffb77),
      startColor: am5.color(0xfe131a)
    }));

    // Set data
    const data = [
      { hour: '12pm', weekday: 'Sunday', value: 2990 },
      { hour: '1am', weekday: 'Sunday', value: 2520 },
      { hour: '2am', weekday: 'Sunday', value: 2334 },
      // ... include the full data set here ...
      { hour: '10pm', weekday: 'Saturday', value: 2855 },
      { hour: '11pm', weekday: 'Saturday', value: 2625 }
    ];

    series.data.setAll(data);

    // Auto-populate X and Y axis category data
    const weekdays: any[] = [];
    const hours: any[] = [];
    am5.array.each(data, function(row) {
      if (weekdays.indexOf(row.weekday) === -1) {
        weekdays.push(row.weekday);
      }
      if (hours.indexOf(row.hour) === -1) {
        hours.push(row.hour);
      }
    });

    yAxis.data.setAll(weekdays.map(function(item: any) {
      return { weekday: item };
    }));

    xAxis.data.setAll(hours.map(function(item: any) {
      return { hour: item };
    }));

    // Make stuff animate on load
    chart.appear(1000, 100);
  }
}
