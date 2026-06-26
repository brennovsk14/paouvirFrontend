import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para usar o [(ngModel)] no formulário
import { BotaoComponent } from '../../componentes/botao/botao.component'; // Ajuste o caminho se necessário
import { ModalService } from '../../services/modal-service'; // Ajuste o caminho conforme sua estrutura

@Component({
  selector: 'app-cadastro-banda',
  standalone: true,
  imports: [CommonModule, FormsModule, BotaoComponent],
  templateUrl: './cadastro-banda.component.html',
  styleUrl: './cadastro-banda.component.scss'
})
export class CadastroBandaComponent {
  // Objeto para armazenar os dados do formulário
  novaBanda = {
    nome: '',
    genero: '',
    anoFormacao: null
  };

  constructor(private modalService: ModalService) {}

  /**
   * Fecha a modal sem salvar e sem retornar dados
   */
  fechar() {
    this.modalService.close();
  }

  /**
   * Valida os campos, simula o salvamento e retorna o objeto para o componente pai
   */
  salvar() {
    if (!this.novaBanda.nome.trim()) {
      alert('Por favor, insira o nome da banda.');
      return;
    }

    // Fecha a modal passando um objeto de sucesso e os dados da nova banda
    this.modalService.close({
      sucesso: true,
      dados: { ...this.novaBanda }
    });
  }
}
