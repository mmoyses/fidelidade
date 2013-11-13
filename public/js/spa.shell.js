spa.shell = (function() {
  'use strict';
  var configMap = {
    anchor_schema_map: { 
      page: {
        home: true,
        checkin: true,
        checkout: true,
        consultar: true,
        usuarios: true,
        relatorios: true
      }                                                                                                                                                                                                                    
    },
    main_html: String()
      + '<div class="navbar navbar-fixed-top navbar-inverse">'
        + '<div class="navbar-inner" data-ng-controller="HeaderController">'
          + '<div class="container-fluid">'
            + '<a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-responsive-collapse">'
              + '<span class="icon-bar"></span>'
              + '<span class="icon-bar"></span>'
              + '<span class="icon-bar"></span>'
            + '</a>'
            + '<a class="brand" href="#!page=home">Programa de Recompensas</a>'
            + '<div class="nav-collapse navbar-responsive-collapse collapse">'
              + '<ul class="nav" id="menu">'
                + '<li class="home"><a href="#!page=home"><i class="icon-home"></i></a></li>'
                + '<li data-ng-repeat="item in menu" class="{{item.link}}">'
                  + '<a href="#!page={{item.link}}">{{item.title}}</a>'
                + '</li>'
              + '</ul>'
              + '<ul class="nav pull-right" id="account">'
              + '</ul>'
            + '</div>'
          + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="container"></div>'
      + '<div id="push"></div>'
    },
    stateMap = {
      $container: null,
      anchor_map: {}
    },
    jqueryMap = {},
    copyAnchorMap, setJquerymap, changeAnchorPart, onHashchange, onResize, onTapAcct, onLogin, onLogout, setPageAnchor, initModule;

  copyAnchorMap = function() {
    return $.extend(true, {}, stateMap.anchor_map);
  };

  setJquerymap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $innerContainer: $container.find('.container'),
      $acc: $container.find('#account'),
      $nav: $container.find('#menu')
    };
  };

  changeAnchorPart = function(arg_map) {
    var anchor_map_revise = copyAnchorMap(),
        bool_return = true,
        key_name, key_name_dep;

    KEYVAL:
    for (key_name in arg_map) {
      if (arg_map.hasOwnProperty(key_name)) {
        if (key_name.indexOf('_') === 0) {
          continue KEYVAL;
        }
        anchor_map_revise[key_name] = arg_map[key_name];
        key_name_dep = '_' + key_name;
        if (arg_map[key_name_dep]) {
          anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
        } else {
          delete anchor_map_revise[key_name_dep];
          delete anchor_map_revise['_s' + key_name_dep];
        }
      }
    }

    try {
      $.uriAnchor.setAnchor(anchor_map_revise);
    } catch (error) {
      $.uriAnchor.setAnchor(stateMap.anchor_map, null, true);
      bool_return = false;
    }

    return bool_return;
  };

  onHashchange = function(event) {
    var anchor_map_previous = copyAnchorMap(),
        anchor_map_proposed, _s_page_previous, _s_page_proposed, s_page_proposed;

    try {
      anchor_map_proposed = $.uriAnchor.makeAnchorMap();
    } catch (error) {
      $.uriAnchor.setAnchor(anchor_map_previous, null, true);
      return false;
    }
    stateMap.anchor_map = anchor_map_proposed;

    _s_page_previous = anchor_map_previous._s_page;
    _s_page_proposed = anchor_map_proposed._s_page;

    if (!anchor_map_previous || _s_page_previous !== _s_page_proposed) {
      s_page_proposed = anchor_map_proposed.page;
      if (s_page_proposed) {
        if (spa[_s_page_previous]) {
          jqueryMap.$nav.find('.' + _s_page_previous).toggleClass('active');
          spa[_s_page_previous].removeComponent();
        }
        jqueryMap.$nav.find('.' + _s_page_proposed).toggleClass('active');
        spa[s_page_proposed].initModule(jqueryMap.$innerContainer);
      }
    }

    return false;
  };

  onResize = function() {
    if (stateMap.resize_idto) {
      return true;
    }

    stateMap.resize_idto = setTimeout(function() {
      stateMap.resize_idto = undefined;
    }, configMap.resize_interval);

    return true;
  };

  onTapAcct = function(event) {
    var acct_text, user_name,
        user = spa.model.people.get_user();
    if (user.get_is_anon()) {
      user_name = prompt('Please sign-in');
      spa.model.people.login(user_name);
      jqueryMap.$acct.text('... processing ...');
    } else {
      spa.model.people.logout();
    }

    return false;
  };

  onLogin = function(event, login_user) {
    jqueryMap.$acct.text(login_user.name);
  };

  onLogout = function(event, logout_user) {
    jqueryMap.$acct.text('Please sign-in');
  };

  setPageAnchor = function(position_type) {
    return changeAnchorPart({ page: position_type });
  };

  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJquerymap();

    $.uriAnchor.configModule({
      schema_map: configMap.anchor_schema_map
    });

    $(window).bind('resize', onResize).bind('hashchange', onHashchange).trigger('hashchange');

    setPageAnchor('home');
  };

  return {
    initModule: initModule
  };
}());
