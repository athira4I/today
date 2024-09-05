// import { Component } from '@angular/core';

// @Component({
//   standalone: true,
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.css']
// })
// export class SidebarComponent {
//   menuItems = [
//     { icon: 'assets/bell.png' }, // Replace with actual icon paths
//     { icon: 'assets\bell.png' },
//     { icon: 'assets\bell.png' },
//     { icon: 'assets\bell.png' },
//     { icon: 'assets\bell.png' },
//     { icon: 'assets\bell.png' },
//     { icon: 'assets\bell.png' },
//     { icon: 'assets\bell.png' }
//   ];
// }



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    { icon: 'assets/bell.png' }, 
    { icon: 'assets/bell.png' },
    { icon: 'assets/bell.png' },
    { icon: 'assets/bell.png' },
    { icon: 'assets/bell.png' },
    { icon: 'assets/bell.png' },
    { icon: 'assets/bell.png' },
    { icon: 'assets/bell.png' }
  ];
}
