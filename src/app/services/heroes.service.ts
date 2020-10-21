import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  url = 'https://crud-95366.firebaseio.com';
  constructor(
    private _http:HttpClient
  ) { }

  crearHeroe(heroe:HeroeModel) {
    
    return this._http.post(`${this.url}/heroes.json`, heroe).pipe(map((response:any) => {
      heroe.id = response.name;
      return heroe;
    }));
  }

  borrarHeroe(id:string) {
    
    return this._http.delete(`${this.url}/heroes/${id}.json`);
  }

  actualizarHeroe(heroe: HeroeModel) {
    
    const heroTemp={
      ...heroe
    }
    //para que no se envie el id
    heroTemp.id = null;
    //tambien funcionaria asi : delete heroeTemp.id
    return this._http.put(`${this.url}/heroes/${heroe.id}.json`, heroTemp);
  }

  getHeroe(id:string) {
    return this._http.get(`${this.url}/heroes/${id}.json`);
  }


  getHeroes() {
    
    return this._http.get(`${this.url}/heroes.json`).pipe(
      map(( this.crearArreglo)  
      )
    );
  }

  private crearArreglo(heroesObj:Object) {
    const heroes: HeroeModel[]=[];

    if(heroesObj === null){return []}
     
    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key]
      heroe.id = key;

      heroes.push(heroe)
    })

    return heroes;
  }
}
