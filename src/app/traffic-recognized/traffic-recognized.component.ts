// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-traffic-recognized',
//   standalone: true,
//   imports: [],
//   templateUrl: './traffic-recognized.component.html',
//   styleUrl: './traffic-recognized.component.css'
// })
// export class TrafficRecognizedComponent {

// }

import { Component, AfterViewInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-traffic-recognized',
  standalone: true,
  templateUrl: './traffic-recognized.component.html',
  styleUrls: ['./traffic-recognized.component.css']
})
export class TrafficRecognizedComponent implements AfterViewInit {

  private root?: am5.Root;

  constructor() {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    // Dispose of existing root if it exists
    if (this.root) {
      this.root.dispose();
    }

    // Create root element
    this.root = am5.Root.new('trafficRecognizedChartDiv');

    // Set themes
    // this.root.setThemes([
    //   am5themes_Animated.new(this.root)
    // ]);

    // Create chart
    const chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
      panX: true,
      panY: true,
      wheelX: 'panY',
      wheelY: 'zoomY',
      pinchZoomY: true,
      paddingLeft: 0
    }));

    // Add cursor
    const cursor = chart.set('cursor', am5xy.XYCursor.new(this.root, {}));
    cursor.lineY.set('visible', false);

    // Create axes
    const yRenderer = am5xy.AxisRendererY.new(this.root, {
      minGridDistance: 20,
      minorGridEnabled: true
    });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(this.root, {
      maxDeviation: 0.3,
      categoryField: 'category',
      renderer: yRenderer,
      tooltip: am5.Tooltip.new(this.root, {})
    }));

    yRenderer.labels.template.setAll({
      multiLocation: 0.5
    });

    yRenderer.grid.template.setAll({
      location: 1
    });

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(this.root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererX.new(this.root, {
        strokeOpacity: 0.1,
        minGridDistance: 60
      })
    }));

    // Create series
    const series = chart.series.push(am5xy.ColumnSeries.new(this.root, {
      xAxis: xAxis,
      yAxis: yAxis,
      baseAxis: yAxis,
      valueXField: 'close',
      openValueXField: 'open',
      categoryYField: 'category',
      tooltip: am5.Tooltip.new(this.root, {
        labelText: '{openValueX} - {valueX}'
      })
    }));

    series.columns.template.setAll({
      height: 0.5
    });

    series.bullets.push(() => {
      return am5.Bullet.new(this.root!, {  // Use non-null assertion operator here
        locationX: 0,
        sprite: am5.Circle.new(this.root!, {
          radius: 5,
          fill: series.get('fill')
        })
      });
    });

    series.bullets.push(() => {
      return am5.Bullet.new(this.root!, {  // Use non-null assertion operator here
        locationX: 1,
        sprite: am5.Circle.new(this.root!, {
          radius: 5
        })
      });
    });

    // Set data
    const data = [];
    let open = 100;
    let close = 120;

    const names = [
      'Raina', 'Demarcus', 'Carlo', 'Jacinda', 'Richie', 'Antony', 
      'Amada', 'Idalia', 'Janella', 'Marla', 'Curtis', 'Shellie', 
      'Meggan', 'Nathanael', 'Jannette', 'Tyrell', 'Sheena', 'Maranda'
    ];

    for (let i = 0; i < names.length; i++) {
      open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
      close = open + Math.round(Math.random() * 10) + 3;
      data.push({
        category: names[i],
        open: open,
        close: close
      });
    }

    if (this.root) {  // Check if root is defined before setting data
      yAxis.data.setAll(data);
      series.data.setAll(data);
    }

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);
  }
}
