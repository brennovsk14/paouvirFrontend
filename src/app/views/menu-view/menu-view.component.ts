import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
import { BotaoComponent } from '../../componentes/botao/botao.component';
import { CardComponent } from '../../componentes/card-component/card-component';
import { CarrosselComponent } from '../../componentes/carrossel/carrossel.component';
import { BandaServiceService } from '../../services/banda-service.service';
import { AlbumServiceService } from '../../services/album-service.service';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [CommonModule, SidebarComponent, BotaoComponent, CardComponent, CarrosselComponent],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.scss'
})
export class MenuViewComponent implements OnInit {

  bandas: any[] = [];
  albuns: any[] = [];

  constructor (private bandaService: BandaServiceService, private albumService: AlbumServiceService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(){
    this.bandaService.getBandas().subscribe({
      next: (dados) => this.bandas = dados,
      error: (err) => console.error('Erro ao buscar bandas:', err)
    });

    this.albumService.getAlbuns().subscribe({
      next: (dados) => this.albuns = dados,
      error: (err) => console.error('Erro ao buscar álbuns:', err)
    });
  }
}

