import {Component, OnInit} from '@angular/core';
import {CardComponent} from '../../componentes/card-component/card-component';
import {BotaoComponent} from '../../componentes/botao/botao.component';
import {NgForOf} from '@angular/common';
import {BandaServiceService} from '../../services/banda-service.service';
import {AlbumServiceService} from '../../services/album-service.service';

@Component({
  selector: 'app-albuns-view',
  imports: [
    CardComponent,
    BotaoComponent,
    NgForOf
  ],
  templateUrl: './albuns-view.component.html',
  styleUrl: './albuns-view.component.scss'
})
export class AlbunsViewComponent implements OnInit {
  albuns: any[] = [];

  constructor (private albumService: AlbumServiceService) {}

  ngOnInit(): void {
    this.carregarDados();
  }
  carregarDados(){
    this.albumService.getAlbuns().subscribe({
      next: (dados) => this.albuns = dados,
      error: (err) => console.error('Erro ao buscar álbuns:', err)
    });
  }
}
