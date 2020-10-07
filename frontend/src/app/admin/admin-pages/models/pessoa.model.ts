import { Municipio } from './municipio.model';
import { Usuario } from '../../../auth/usuario.model';

export interface Pessoa {
  id: number;
  usuario: Usuario;
  telefone: string;
  celular: string;
  municipio: Municipio;
  cep: string;
  bairro: string;
  endereco: string;
  numero: string;
  complemento: string;
  ativo: boolean;
}
