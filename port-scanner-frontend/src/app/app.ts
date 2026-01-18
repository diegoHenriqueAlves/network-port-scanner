import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { PortService } from './services/port.service';
import type { portsProps } from './type/port-type'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class AppComponent implements OnInit {
  ports: portsProps[] = [];

  constructor(private portSecvice: PortService) {}

  ngOnInit() {
    this.portSecvice.getPorts().subscribe({
      next: (data) => {
        this.ports = data;
      },
      error: (err) => console.error(err)
    });
  }
}
