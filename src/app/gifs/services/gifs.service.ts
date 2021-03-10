import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = 'HO9z3TpEluqK4eOHBdqrNxc87F4MlaWG';
  private _historial: string[] = [];
  
  public resultados: any[] = [];


  get historial() {
    return [...this._historial];
  }

  constructor(private httpClient: HttpClient){}

  buscarGifs( query: string = ''){
     query = query.trim().toLowerCase();
     if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this.historial.splice(0, 10);
    }
     this.httpClient.get(`https://api.giphy.com/v1/gifs/search?api_key=HO9z3TpEluqK4eOHBdqrNxc87F4MlaWG&q=${query}&limit=10`)
    .subscribe((resp: any) => {
      this.resultados = resp.data;
      console.log(resp);
    })
     console.log(this._historial);
  }
}
