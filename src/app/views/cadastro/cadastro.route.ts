import {Routes} from '@angular/router';
import {Cliente} from '@/app/views/cadastro/cliente/cliente';
import {Profissional} from '@/app/views/cadastro/profissional/profissional';
import {Servico} from '@/app/views/cadastro/servico/servico';
import {Peca} from '@/app/views/cadastro/peca/peca';


export const CADASTRO_ROUTES: Routes = [
    {
        path: 'cliente',
        component: Cliente,
        data: {title: "Clientes"},
    },
    {
        path: 'profissional',
        component: Profissional,
        data: {title: "Profissionais"},
    },
    {
        path: 'servico',
        component: Servico,
        data: {title: "Serviços"},
    },
    {
        path: 'peca',
        component: Peca,
        data: {title: "Peças"},
    },
]
