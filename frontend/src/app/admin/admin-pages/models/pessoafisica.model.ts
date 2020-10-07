import { Pessoa } from './pessoa.model';

export interface PessoaFisica {
  id: number;
  primeiroNome: string;
  sobrenome: string;
  cpf: string;
  rg: string;
  ssp: string;
  dataNacimento: string;
  genero: boolean;
  pessoa: Pessoa;
}



