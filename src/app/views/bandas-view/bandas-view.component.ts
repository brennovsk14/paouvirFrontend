import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BotaoComponent} from '../../componentes/botao/botao.component';
import {CardComponent} from '../../componentes/card-component/card-component';
import {BandaServiceService} from '../../services/banda-service.service';
import {AlbumServiceService} from '../../services/album-service.service';
import {CarrosselComponent} from '../../componentes/carrossel/carrossel.component';
import {CadastroBandaComponent} from '../../componentes/cadastro-banda/cadastro-banda.component';
import {Router} from '@angular/router';
import {ModalService} from '../../services/modal-service';

@Component({
  selector: 'app-bandas-view',
  standalone: true,
  imports: [CommonModule, BotaoComponent, CardComponent, CarrosselComponent],
  templateUrl: './bandas-view.component.html',
  styleUrl: './bandas-view.component.scss'
})
export class BandasViewComponent implements OnInit {

  bandas: any[] = [];

  constructor(private bandaService: BandaServiceService, private modalService: ModalService,) {
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
  abrirModalCadastroBanda() {
    const modalRef = this.modalService.open(CadastroBandaComponent, {
      title: 'Cadastrar Nova Banda',
      size: 'md', // 'sm' | 'md' | 'lg' | 'full'
      closeOnClickOutside: true
    });

    modalRef.afterClosed((resultado) => {
      if (resultado && resultado.sucesso) {
        console.log('Banda cadastrada:', resultado.nomeBanda);
        this.carregarDados(); // Recarrega a lista para mostrar o novo item no carrossel!
      }
    });
  }
}

