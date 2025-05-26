import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  standalone: false,

  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  @Output()
  public onDelete = new EventEmitter<string>();

  @Input()
  public characterList: Character[] = [];

  onDeleteCharacter(id: string): void {
    this.onDelete.emit(id);
  }
}
