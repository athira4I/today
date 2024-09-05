// import { Component } from '@angular/core';
// import * as am5 from '@amcharts/amcharts5';
// import * as am5xy from '@amcharts/amcharts5/xy';
// import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';


// @Component({
//   selector: 'app-todays-log',
//   standalone: true,
//   imports: [],
//   templateUrl: './todays-log.component.html',
//   styleUrl: './todays-log.component.css'
// })
// export class TodaysLogComponent {

// }



import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-todays-log',
  standalone: true,
  templateUrl: './todays-log.component.html',
  styleUrls: ['./todays-log.component.css']
})
export class TodaysLogComponent implements OnInit, AfterViewInit {

  private root?: am5.Root;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    // Create root element
    if (this.root) {
      this.root.dispose();  // Dispose of the existing root if it exists
    }
    
    this.root = am5.Root.new("todaysLogChartDiv");

    // Set themes
    // this.root.setThemes([
    //   am5themes_Animated.new(this.root)
    // ]);

    // Create chart
    const chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0,
      paddingRight: 1
    }));

    // Add cursor
    const cursor = chart.set("cursor", am5xy.XYCursor.new(this.root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(this.root, { 
      minGridDistance: 30, 
      minorGridEnabled: true
    });

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });

    xRenderer.grid.template.setAll({
      location: 1
    });

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(this.root, {
      maxDeviation: 0.3,
      categoryField: "country",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(this.root, {})
    }));

    const yRenderer = am5xy.AxisRendererY.new(this.root, {
      strokeOpacity: 0.1
    });

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(this.root, {
      maxDeviation: 0.3,
      renderer: yRenderer
    }));

    // Create series
    const series = chart.series.push(am5xy.ColumnSeries.new(this.root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "country",
      tooltip: am5.Tooltip.new(this.root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0
    });

    // series.columns.template.adapters.add("fill", function (fill, target) {
    //   return chart.get("colors").getIndex(series.columns.indexOf(target));
    // });

    // series.columns.template.adapters.add("stroke", function (stroke, target) {
    //   return chart.get("colors").getIndex(series.columns.indexOf(target));
    // });

    // Set data
    const data = [
      { country: "USA", value: 2025 },
      { country: "China", value: 1882 },
      { country: "Japan", value: 1809 },
      { country: "Germany", value: 1322 },
      { country: "UK", value: 1122 },
      { country: "France", value: 1114 },
      { country: "India", value: 984 },
      { country: "Spain", value: 711 },
      { country: "Netherlands", value: 665 },
      { country: "South Korea", value: 443 },
      { country: "Canada", value: 441 }
    ];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);
  }
}
