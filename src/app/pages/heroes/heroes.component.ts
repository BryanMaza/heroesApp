import { Component, OnInit, DoCheck } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',

})
export class HeroesComponent implements OnInit {

  constructor(
    private _heroesService: HeroesService
  ) { }

  heroes: HeroeModel[] = [];
  cargando = false;

  ngOnInit(): void {

    this.cargando = true;
    this._heroesService.getHeroes().subscribe(
      response => {
        this.heroes = response;
        this.cargando = false;
      } );
  }


  borrarHeroe(heroe: HeroeModel, i) {


    Swal.fire({
      title: '¿Estas seguro?',
      text: `Estas seguro que quieres borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroes.splice(i, 1)
        this._heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });


  }



}
