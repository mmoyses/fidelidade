spa.fake = (function() {
  'use strict';
  var getClientList, getClient, _clients, _hospedagens, getHospedagemList,
  _empresas, _users, pad, checkIn, checkOut, getUser, mockSio;

  _clients = [
    { id: '9982442', nome: 'GUILHERME RIBEIRO ESPINOSA COSTA', documento: '111.466.247-00',
      endereco: 'RUA SIDNEY VASCONCELOS AGUIAR, Nº 1047 APTO 505A', bairro: 'GLÓRIA', cidade: 'MACAÉ',
      estado: 'RJ', cep: '27937-010', celular: '(22) 9946-7508', email: 'guilherme.espinosa@yahoo.com.br',
      data_cadastro: new Date('2013-08-20 04:47:33'), hashed_password: '3CD377C7F7AA56D49F67CFEC515921C5', pontos: 0 },
    { id: '9982443', nome: 'CRISTIANE ESMERALDO OLIVEIRA E SILVA', documento: '010.117.511-60',
      telefone: '(61) 3273-1247', celular: '(61) 9634-7712', email: 'crisesmeraldo@gmail.com',
      data_cadastro: new Date('2013-08-20 13:33:12'), hashed_password: '94DB03E0064D80F815A81E59848B12C0', pontos: 0 },
    { id: '9982444', nome: 'MARCOS HUBER MENDES', documento: '635.003.617-49',
      endereco: 'RUA GENERAL RIBEIRO DA COSTA 56 APTO 703', bairro: 'LEME', cidade: 'RIO DE JANEIRO', estado: 'RJ',
      cep: '22010050', telefone: '2196085537', celular: '2196085537', email: 'hubermendes@decisionsupport.com.br',
      empresa: 'PALISADE', data_cadastro: new Date('2013-08-24 06:25:23'),
      hashed_password: '894650E1F860B6664844D58D460E48A7', pontos: 0 },
    { id: '9982445', nome: 'MAURO JOSÉ LAURO', documento: '108.001.638-42', endereco: 'R. JOSÉ MORAIS, 1026',
      cidade: 'COSMÓPOLIS', estado: 'SP', cep: '13150-000', telefone: '19 38821818', email: 'lauro@petrobras.com.br',
      empresa: 'PETROBRAS', data_cadastro: new Date('2013-08-26 07:52:09'),
      hashed_password: 'FBD8197BCA340A4EBBA6C4A9D2C5E890', pontos: 0 },
    { id: '9982446', nome: 'GUSTAVO KLAUS RUZISCKA', documento: '072.856.657-54', endereco: 'ESTRADA DO CAFUNDÁ, 1757',
      bairro: 'TAQUAR', cidade: 'RIO DE JANEIRO', estado: 'RJ', cep: '22725030', telefone: '2195770575',
      celular: '2195770575', email: 'gugacrvas@gmail.com', data_cadastro: new Date('2013-08-30 18:57:55'),
      hashed_password: '17D1833CD38A5C5CE2FE28F177A56C61', pontos: 0 },
    { id: '9982447', nome: 'MARCELO ANES CARVALHO', documento: '368.954.901-91', endereco: 'QI 33 BLOCO 5 APTO 603',
      bairro: 'GUARÁ II', cidade: 'BRASÍLIA', estado: 'DF', cep: '71065330', telefone: '+55 61 30369608',
      celular: '+55 61 96469606', email: 'marcelo.carvalho.ma@hitachi.com', empresa: 'HITACHI BRASIL LTDA',
      data_cadastro: new Date('2013-09-05 09:56:17'), hashed_password: 'A8706EB6C49DFBCD307CE50258029B8A', pontos: 0 },
    { id: '9982448', nome: 'MARCELO FABIANO FRAGA DE OLIVEIRA', documento: '174.057.128-27',
      endereco: 'RUA EUCLIDES DA CUNHA 533', bairro: 'LORENZETTI', cidade: 'MARILIA', estado: 'SP', cep: '17506180',
      celular: '(14) 99704-1709', email: 'mf_foliveira@hotmail.com',
      empresa: 'ASSOCIAÇÃO DOS SERVIDORES PUBLICOS MUNICIPAIS DE MARILIA',
      data_cadastro: new Date('2013-09-05 12:58:38'), hashed_password: 'FA4DA36C5585EDF44A1CE3254C54D640', pontos: 0 },
    { id: '9982449', nome: 'MARINA DE FARIA CASTRO APPROBATO', documento: '368.288.818-77', endereco: 'RUA CUIABÁ 717',
      bairro: 'CENTRO', cidade: 'GLÓRIA DE DOURADOS', estado: 'MS', cep: '79730-000', celular: '16 98112-4888',
      email: 'maapprobato@yahoo.com.br', empresa: 'M.A. ACESSÓRIOS', data_cadastro: new Date('2013-09-18 07:03:54'),
      hashed_password: 'B1CC4680D30ECC259BA974C6B7C3C258', pontos: 0 },
    { id: '9982450', nome: 'SANDRO APARECIDO GARBIN', documento: '056.869.748-02',
      endereco: 'SQN 214 - BLOCO E - APTO 414', bairro: 'ASA NORTE', cidade: 'BRASÍLIA', estado: 'DF', cep: '70873050',
      celular: '6181185885', email: 'sandro.garbin@caixa.gov.br', empresa: 'CAIXA ECONÔMICA FEDERAL',
      data_cadastro: new Date('2013-09-23 05:57:40'), hashed_password: '04D271F5E3B498DE06B6C82BE685868C', pontos: 0 },
    { id: '9982451', nome: 'RUBEM RECH', documento: '891.376.710-49', endereco: 'RUA RIACHUELO, 1616',
      bairro: 'CENTRO HISTÓRICO', cidade: 'PORTO ALEGRE', estado: 'RS', cep: '90010273', telefone: '51 30730950',
      celular: '51 81516225', email: 'rubem.rech@gmail.com', empresa: 'COPROBEL',
      data_cadastro: new Date('2013-09-25 06:25:40'), hashed_password: 'C1CF271B1260618F786A8BBA4A796353', pontos: 0 },
    { id: '9982452', nome: 'LAURY DO AMARAL', documento: '070.315.627-67', cep: '01311100', telefone: '11 32665052',
      celular: '21 8374-0351', email: 'laury.amaral@dinsmorecompass.com.br',
      data_cadastro: new Date('2013-09-27 12:20:48'), hashed_password: '2D84241FDEF22D8D84BDD9B6FAC96217', pontos: 9 },
    { id: '9982453', nome: 'ELYSON MELO E SILVA', documento: '052.810.507-88', celular: '(21) 8744-5016',
      email: 'elysonmelo@yahoo.com.br', data_cadastro: new Date('2013-09-30 12:46:53'),
      hashed_password: '4A00447011400E7BE17914FD7BE0D93F', pontos: 9 },
    { id: '9982454', nome: 'SERGIO LUIZ DO AMARAL LOZOVEY', documento: '401.514.339-68', endereco: 'JOSÉ QUIRINO',
      bairro: 'SÃO JOÃO', cidade: 'ITAJAÍ', estado: 'SC', cep: '88305060', telefone: '(47) 3046-2001',
      celular: '(47) 9987-3350', email: 'estel@estelengenharia.com.br', empresa: 'ESTEL ENGENHARIA LTDA-EPP',
      data_cadastro: new Date('2013-10-04 10:46:25'), hashed_password: '714A06E897D18CA6EDB077FCEA2E378B', pontos: 0 },
    { id: '9982455', nome: 'YLANA SCHECHNER', documento: '916.204.817-15', celular: '21-99368360',
      email: 'ylana@mls.com.br', data_cadastro: new Date('2013-10-07 16:26:21'),
      hashed_password: '0545373343AD4909AE23B3C4E1AF8453', pontos: 2.88 },
    { id: '9982456', nome: 'RENATO CALDEIRA DE ANDRADE', documento: '013.141.276-08',
      endereco: 'AV. CRISTIANO MACHADO 1844/303', bairro: 'CIDADE NOVA', cidade: 'BELO HORIZONTE', estado: 'MG',
      cep: '31170800', telefone: '(31) 32264564', celular: '(31) 84220210', email: 'caldeira.alcatel@gmail.com',
      empresa: 'CIENA', data_cadastro: new Date('2013-10-14 19:14:58'),
      hashed_password: '504573DD6E8DB84B6A09ED5A46527447', pontos: 0 },
    { id: '9982457', nome: 'JEFFERSON OLIVEIRA PIMENTEL', documento: '052.922.259-08',
      endereco: 'RUA JOSE GOMES HENRIQUE N 90', bairro: 'PARQUE DAS BANDEIRA GLEBA 2', cidade: 'SAO VICENTE',
      estado: 'SP', cep: '11346-180', telefone: '013 3566 7447', celular: '013 98137 7400',
      email: 'jeffersonoliveirapimentel@gmail.com', data_cadastro: new Date('2013-10-15 10:32:07'),
      hashed_password: '96FC78FE153663B4D5F730567DF550A4', pontos: 0 }
  ];

  _hospedagens = [
    { id: 1, client: 'RUBEM RECH', data_checkin: new Date('10/01/2013 12:00:00'),
      data_checkout: new Date('11/01/2013 12:00:00'), empresa: 1, pontos: 2 },
    { id: 2, client: 'CRISTIANE ESMERALDO OLIVEIRA E SILVA',
      data_checkin: new Date('11/01/2013 12:00:00'), empresa: 1, pontos: null },
    { id: 3, client: 'SERGIO LUIZ DO AMARAL LOZOVEY',
      data_checkin: new Date('11/12/2013 12:00:00'), empresa: 1, pontos: null },
    { id: 4, client: 'MARCOS HUBER MENDES',
      data_checkin: new Date('11/15/2013 12:00:00'), empresa: 2, pontos: null }
  ];

  _empresas = [
    { id: 1, nome: 'Feller Avenida Paulista', ativa: true, tipo: 'hotel', imagem: '/img/empresas/feller.gif' }
  ];

  _users = [
    { id: 1, nome: 'Marcus Moyses', email: 'marcus.moyses@gmail.com',
    username: 'mmoyses', hashed_password: '28C6FC532627733F572B6EA4A5710A47', empresa: 1 }
  ];

  getClientList = function() {
    return _clients;
  };

  getClient = function(id) {
    var i;
    for (i = 0; i < _clients.length; i++) {
      if (_clients[i].id === id)
        return _clients[i];
    }

    return null;
  };

  getHospedagemList = function(hotel_id, client_id) {
    var i, client,
        list = [];
    if (!client_id) {
      for (i = 0; i < _hospedagens.length; i++) {
        if (!_hospedagens[i].data_checkout && hotel_id === _hospedagens[i].empresa)
          list.push(_hospedagens[i]);
      }
    } else {
      client = getClient(client_id);
      for (i = 0; i < _hospedagens.length; i++) {
        if (hotel_id === _hospedagens[i].empresa && _hospedagens[i].client === client.nome)
          list.push(_hospedagens[i]);
      }
    }
    return list;
  };

  pad = function(number) {
    if (number.toString().length === 1)
      return '0' + number;
    return number;
  };

  checkIn = function(id, date) {
    var client = getClient(id),
        length = _hospedagens.length,
        lastId = _hospedagens[length - 1].id,
        empresa = spa.user.getUser().empresa,
        hospedagens = getHospedagemList(empresa),
        i, found;
    for (i = 0; i < hospedagens.length; i++) {
      if (hospedagens[i].client === client.nome) {
        found = true;
        break;
      }
    }
    if (found)
      return false;
    _hospedagens.push({ id: lastId + 1, client: client.nome, data_checkin: date, empresa: empresa });
    return true;
  };

  checkOut = function(id, date, price) {
    var i,
        failed = false,
        hospedagens = getHospedagemList(spa.user.getUser().empresa);
    for (i = 0; i < hospedagens.length; i++) {
      if (hospedagens[i].id === id) {
        if (hospedagens[i].data_checkin > date)
          failed = true;
        else {
          hospedagens[i].data_checkout = date;
          hospedagens[i].pontos = Number((price * 0.01).toFixed(2));
          console.log(hospedagens[i]);
          break;
        }
      }
    }
    return !failed;
  };

  getUser = function() {
    return _users[0];
  };

  mockSio = (function() {
    var on_sio, emit_sio,
        callback_map = {};

    on_sio = function(msg_type, callback) {
      callback_map[msg_type] = callback;
    };

    emit_sio = function(msg_type, data) {
      if (msg_type === 'getclient' && callback_map.getclient) {
        setTimeout(function() {
          var client = getClient(data.id),
              client_map = {};
          if (client) {
            client_map.id = client.id;
            client_map.nome = client.nome;
          } else {
            client_map.error = 'Não existe cliente com esse id';
          }
          callback_map.getclient(client_map);
        }, 1000);
      }

      if (msg_type === 'checkin' && callback_map.checkin) {
        setTimeout(function() {
          var id = data.id,
              date = data.date,
              checkin_map = {};
          if (id && date) {
            if (checkIn(id, date))
              checkin_map.msg = 'Check-in realizado com sucesso';
            else
              checkin_map.error = 'Cliente ' + id + ' já está hospedado no hotel';
          } else {
            checkin_map.error = 'Não foi possível fazer check-in do cliente ' + id;
          }
          callback_map.checkin(checkin_map);
        }, 1000);
      }

      if (msg_type === 'getactivelist' && callback_map.getactivelist) {
        setTimeout(function() {
          var id = data.hotel,
              hospedagem_map = {},
              list;
          if (id) {
            list = getHospedagemList(id);
            if (list.length > 0) {
              hospedagem_map.hospedagens = list;
            } else {
              hospedagem_map.error = 'Não há hospedagens em aberto';
            }
          } else {
            hospedagem_map.error = 'Não há hospedagens em aberto';
          }
          callback_map.getactivelist(hospedagem_map);
        }, 1000);
      }

      if (msg_type === 'checkout' && callback_map.checkout) {
        setTimeout(function() {
          var id = Number(data.id),
              date = data.date,
              price = data.price,
              checkout_map = {};
          if (id && date && price) {
            if (checkOut(id, date, price)) {
              checkout_map.msg = 'Check-out realizado com sucesso';
              checkout_map.id = id;
            } else
              checkout_map.error = 'Data de check-out não pode ser anterior ao check-in';
          } else {
            checkout_map.error = 'Não foi possível fazer check-out';
          }
          callback_map.checkout(checkout_map);
        }, 1000);
      }

      if (msg_type === 'getuser' && callback_map.getuser) {
        setTimeout(function() {
          var user_map = getUser();
          callback_map.getuser(user_map);
        }, 1000);
      }

      if (msg_type === 'gethospedagens' && callback_map.gethospedagens) {
        setTimeout(function() {
          var client_id = data.client,
              hotel_id = data.hotel,
              hospedagens_map = {},
              list;
          if (client_id && hotel_id) {
            list = getHospedagemList(hotel_id, client_id);
            if (list.length > 0) {
              hospedagens_map.hospedagens = list;
            } else {
              hospedagens_map.error = 'Não há hospedagens para esse cliente';
            }
          } else {
            hospedagens_map.error = 'Não há hospedagens para esse cliente';
          }
          callback_map.gethospedagens(hospedagens_map);
        }, 1000);
      }
    };

    return {
      emit: emit_sio,
      on: on_sio
    };

  }());

  return {
    mockSio: mockSio
  };
}());
