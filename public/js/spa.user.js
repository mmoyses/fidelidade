spa.user = (function() {
  'use strict';
  var configMap = {
        settable_map: {
          user_model: true
        },
        user_model: null
      },
      stateMap = {
        $container: null,
        user: null
      },
      jqueryMap = {},
      setJqueryMap, onGetUser, setMenu, configModule, initModule;

  setJqueryMap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $menu: $container.find('#menu'),
      $user: $container.find('.dropdown-toggle')
    }
  };

  onGetUser = function(event, user_map) {
    stateMap.user = $.extend(true, {}, user_map);
    spa.util.setUser(stateMap.user);
    setMenu();
    jqueryMap.$user.html(stateMap.user.nome + '<b class="caret"/>');
  };

  setMenu = function() {
    var i, link, title, menu;

    if (!stateMap.user.admin && !stateMap.user.gerente) {
      menu = [
        {
          link: 'checkin',
          title: 'Check-in'
        },
        {
          link: 'checkout',
          title: 'Check-out'
        },
        {
          link: 'consultar',
          title: 'Consultar'
        },
        {
          link: 'usuarios',
          title: 'Usuários'
        },
        {
          link: 'relatorios',
          title: 'Relatórios'
        }
      ];
    }
    for (i = 0; i < menu.length; i++) {
      link = menu[i].link;
      title = menu[i].title;
      jqueryMap.$menu.append('<li class="' + link + '"><a href="#!page=' + link + '">' + title + '</a></li>');
    }
  };

  configModule = function(input_map) {
    spa.util.setConfigMap({
      input_map: input_map,
      settable_map: configMap.settable_map,
      config_map: configMap
    });

    return true;
  };

  initModule = function($container) {
    stateMap.$container = $container;
    setJqueryMap();

    $.gevent.subscribe(jqueryMap.$menu, 'spa-getuser', onGetUser);
    configMap.user_model.getUser();
  };

  return {
    configModule: configModule,
    initModule: initModule
  };
}());
