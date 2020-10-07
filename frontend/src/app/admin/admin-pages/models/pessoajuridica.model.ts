import { Pessoa } from './pessoa.model';

export interface PessoaFisica {
  id: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  pessoa: Pessoa;
}
