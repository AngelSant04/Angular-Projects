import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  standalone: false,

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private gifsSevice: GifsService) {}

  get tags(): string[] {
    return [...this.gifsSevice.tagsHistory];
  }

  searchTag(tag: string): void {
    this.gifsSevice.searchTag(tag);
  }
}
