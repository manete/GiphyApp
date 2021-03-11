import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { SearchGifResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = 'HO9z3TpEluqK4eOHBdqrNxc87F4MlaWG';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  
  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial];
  }

  constructor(private httpClient: HttpClient){
    this._historial= JSON.parse(localStorage.getItem('historial')!) || [];    
    this.resultados= JSON.parse(localStorage.getItem('resultados')!) || [];    
  }

  buscarGifs( query: string = ''){
     query = query.trim().toLowerCase();
     if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this.historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', query);
      console.log(params.toString());
     this.httpClient.get<SearchGifResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe((resp) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(resp.data));
    })
  }
}
