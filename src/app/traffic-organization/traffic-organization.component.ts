// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-traffic-organization',
//   standalone: true,
//   imports: [],
//   templateUrl: './traffic-organization.component.html',
//   styleUrl: './traffic-organization.component.css'
// })
// export class TrafficOrganizationComponent {

// }

import { Component, AfterViewInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-traffic-organization',
  standalone: true,
  templateUrl: './traffic-organization.component.html',
  styleUrls: ['./traffic-organization.component.css']
})
export class TrafficOrganizationComponent implements AfterViewInit {
  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      // Create root element
      const root = am5.Root.new("trafficOrganizationChartDiv");

      // Set themes
      // root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      const chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout
      }));

      // Data
      const data = [{
        year: "2017",
        income: 23.5,
        expenses: 18.1
      }, {
        year: "2018",
        income: 26.2,
        expenses: 22.8
      }, {
        year: "2019",
        income: 30.1,
        expenses: 23.9
      }, {
        year: "2020",
        income: 29.5,
        expenses: 25.1
      }, {
        year: "2021",
        income: 24.6,
        expenses: 25
      }];

      // Create axes
      const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
          minorGridEnabled: true
        })
      }));

      yAxis.data.setAll(data);

      const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
          minGridDistance: 50
        }),
        min: 0
      }));

      // Add series
      function createSeries(field: string, name: string) {
        const series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: field,
          categoryYField: "year",
          sequencedInterpolation: true,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryY}: {valueX}"
          })
        }));

        series.columns.template.setAll({
          height: am5.p100,
          strokeOpacity: 0
        });

        series.bullets.push(() => {
          return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              centerY: am5.p50,
              text: "{valueX}",
              populateText: true
            })
          });
        });

        series.bullets.push(() => {
          return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              centerX: am5.p100,
              centerY: am5.p50,
              text: "{name}",
              fill: am5.color(0xffffff),
              populateText: true
            })
          });
        });

        series.data.setAll(data);
        series.appear();

        return series;
      }

      createSeries("income", "Income");
      createSeries("expenses", "Expenses");

      // Add legend
      const legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      }));

      legend.data.setAll(chart.series.values);

      // Add cursor
      const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomY"
      }));
      cursor.lineY.set("forceHidden", true);
      cursor.lineX.set("forceHidden", true);

      // Make stuff animate on load
      chart.appear(1000, 100);

      this.root = root;
    });
  }

  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
  
}
