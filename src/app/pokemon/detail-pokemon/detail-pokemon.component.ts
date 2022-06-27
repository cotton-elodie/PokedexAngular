import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styles: [
  ]
})
export class DetailPokemonComponent implements OnInit {

  @Input() pokemonDetail!: Pokemon;


  pokemonsList: Pokemon[];
  pokemon: Pokemon | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService) { }

  ngOnInit() {
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');

    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId).subscribe(pokemon => this.pokemon = pokemon)
    }
  }

  backToList(){
    this.router.navigate(['/pokemons']);
  }

  goToEdit(pokemon: Pokemon) {
    this.router.navigate(['editpokemon', pokemon.id]);
  }

  goToPokemonList(){
    this.router.navigate(['/pokemons'])
  }

  deletePokemon(pokemon: Pokemon){
    this.pokemonService.deletePohemonByID(pokemon.id)
    .subscribe(()=> this.goToPokemonList())
  }

}
