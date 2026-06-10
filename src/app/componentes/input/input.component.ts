import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
/**
 * Componente de Input padrão do Design System.
 * Suporta estados de erro, desabilitado, textos auxiliares e integração com formulários reativos.
 *
 * @example
 * <!-- Uso básico -->
 * <app-input label="Nome" placeholder="Digite seu nome"></app-input>
 *
 * <!-- Com ícone (usando FontAwesome, Google Icons, etc) -->
 * <app-input label="Pesquisar" prefixIcon="fa fa-search"></app-input>
 * <app-input label="Senha" type="password" suffixIcon="fa fa-eye"></app-input>
 *
 * <!-- Com ícones e validação -->
 * <app-input label="E-mail" type="email" [error]="emailErrorMsg" prefixIcon="fa fa-envelope"></app-input>
 */
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  /** Rótulo superior do campo */
  @Input() label: string = '';

  /** Texto exibido quando o campo está vazio */
  @Input() placeholder: string = '';

  /** Tipo do input: 'text', 'password', 'email', 'number', etc. */
  @Input() type: string = 'text';

  /** Mensagem de erro. Ativa o estado visual crítico. */
  @Input() error: string = '';

  /** Texto auxiliar ou de suporte abaixo do campo */
  @Input() helperText: string = '';

  /** Define se o campo está desabilitado */
  @Input() disabled: boolean = false;

  /** Adiciona um asterisco visual indicando obrigatoriedade */
  @Input() required: boolean = false;

  /** Texto informativo exibido ao lado da label */
  @Input() hint: string = '';

  /** Classe CSS do ícone a ser exibido ANTES do texto (ex: 'fa fa-user') */
  @Input() prefixIcon: string = '';

  /** Classe CSS do ícone a ser exibido DEPOIS do texto (ex: 'fa fa-eye') */
  @Input() suffixIcon: string = '';

  /** ID único para o campo, gerado automaticamente se não fornecido */
  @Input() id: string = 'input-' + Math.random().toString(36).substring(2, 9);

  /** Armazena se a senha está visível (para inputs tipo 'password') */
  isPasswordVisible: boolean = false;

  /** Retorna o tipo atual do input, permitindo alternar entre password e text */
  get currentType(): string {
    if (this.type === 'password') {
      return this.isPasswordVisible ? 'text' : 'password';
    }
    return this.type;
  }

  /** Retorna o ícone de sufixo atual, alternando o olho se for password */
  get currentSuffixIcon(): string {
    if (this.type === 'password') {
      return this.isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye';
    }
    return this.suffixIcon;
  }

  /** Alterna a visibilidade da senha */
  togglePasswordVisibility() {
    if (this.type === 'password' && !this.disabled) {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
  }

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  onInputChange(event: any) {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
