import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchAll } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
 
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel(); 
  constructor(
    private _heroesService: HeroesService,
    private _router: Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = this._route.snapshot.paramMap.get('id');
    if (id!=='nuevo') {
      this._heroesService.getHeroe(id).subscribe((res:HeroeModel) => {
        this.heroe = res;
        this.heroe.id = id;
      });
    }
    

  }

  guardar(form:NgForm) {
    

    if (form.invalid) {
      
      console.log('Formulario no valido');
      return
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick:false
    });

    Swal.showLoading();


    let peticion: Observable<any>;

    if (this.heroe.id) {
      
      peticion=this._heroesService.actualizarHeroe(this.heroe);

    } else {
      peticion=this._heroesService.crearHeroe(this.heroe);
    }
    
    peticion.subscribe(
      response => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizó correctamente',
          icon:'success'
        });
      }
    );
    
  }

  ver(id:string) {
    this._heroesService.getHeroe(id).subscribe(res => {
      console.log(res);
      
    });
  }

}
