import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BotaoComponent} from '../../componentes/botao/botao.component';
import {CardComponent} from '../../componentes/card-component/card-component';
import {BandaServiceService} from '../../services/banda-service.service';
import {AlbumServiceService} from '../../services/album-service.service';

@Component({
  selector: 'app-bandas-view',
  standalone: true,
  imports: [CommonModule, BotaoComponent, CardComponent],
  templateUrl: './bandas-view.component.html',
  styleUrl: './bandas-view.component.scss'
})
export class BandasViewComponent implements OnInit {

  bandas: any[] = [];

  constructor(private bandaService: BandaServiceService) {
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.bandaService.getBandas().subscribe({
      next: (dados) => this.bandas = dados,
      error: (err) => console.error('Erro ao buscar bandas:', err)
    });

  }
}

