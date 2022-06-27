import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',

})
export class SearchPokemonComponent implements OnInit {
  // flux de données des recherches utilisateur
  searchTerm = new Subject<string>();
  // affciher en mirroir la recherche sous forme de liste
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
  }

  search(term: string) {
    this.searchTerm.next(term)

  }

  goToDetailPokemon(pokemon: Pokemon) {
    const link = ['pokemon', pokemon.id];
    this.router.navigate(link)
  }

}
