import { HeroesService } from './../../services/heroes.service';
import { Hero } from './../../interfaces/hero.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-page',
  standalone: false,

  templateUrl: './list-page.component.html',
  styles: ``,
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes));
  }
}
