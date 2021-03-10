import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styles: [
  ]
})
export class ResultadoComponent implements OnInit {

  get resultados(){
    return this.gifsService.resultados;
  }

  constructor( private gifsService: GifsService) { }

  ngOnInit(): void {
  }


}
