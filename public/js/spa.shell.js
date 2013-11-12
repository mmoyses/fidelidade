spa.shell = (function() {
  'use strict';
  var configMap = {
    anchor_schema_map: {                                                                                                                                                                                                                     
    },
    main_html: String()
      + '<div class="navbar navbar-fixed-top navbar-inverse">'
        + '<div class="navbar-inner">'
          + '<div class="container-fluid">'
            + '<a class="brand" href="/">Programa de Recompensas</a>'
            + '<div class="nav-collapse collapse">'
              + '<ul class="nav" id="menu">'
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
  copyAnchorMap, setJquerymap, changeAnchorPart, onHashchange, onResize, onTapAcct, onLogin, onLogout, setChatAnchor, initModule;

  copyAnchorMap = function() {
    return $.extend(true, {}, stateMap.anchor_map);
  };

  setJquerymap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
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
        is_ok = true,
        anchor_map_proposed, _s_chat_previous, _s_chat_proposed, s_chat_proposed;

    try {
      anchor_map_proposed = $.uriAnchor.makeAnchorMap();
    } catch (error) {
      $.uriAnchor.setAnchor(anchor_map_previous, null, true);
      return false;
    }
    stateMap.anchor_map = anchor_map_proposed;

    _s_chat_previous = anchor_map_previous._s_chat;
    _s_chat_proposed = anchor_map_proposed._s_chat;

    if (!anchor_map_previous || _s_chat_previous !== _s_chat_proposed) {
      s_chat_proposed = anchor_map_proposed.chat;
      switch (s_chat_proposed) {
        case 'opened':
          is_ok = spa.chat.setSliderPosition('opened');
          break;
        case 'closed':
          is_ok = spa.chat.setSliderPosition('closed');
          break;
        default:
          spa.chat.setSliderPosition('closed');
          delete anchor_map_proposed.chat;
          $.uriAnchor.setAnchor(anchor_map_proposed, null, true);
      }
    }

    if (!is_ok) {
      if (anchor_map_previous) {
        $.uriAnchor.setAnchor(anchor_map_previous, null, true);
        stateMap.anchor_map = anchor_map_previous;
      } else {
        delete anchor_map_proposed.chat;
        $.uriAnchor.setAnchor(anchor_map_proposed, null, true);
      }
    }

    return false;
  };

  onResize = function() {
    if (stateMap.resize_idto) {
      return true;
    }

    spa.chat.handleResize();
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

  setChatAnchor = function(position_type) {
    return changeAnchorPart({ chat: position_type });
  };

  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJquerymap();

    $.uriAnchor.configModule({
      schema_map: configMap.anchor_schema_map
    });

    $(window).bind('resize', onResize).bind('hashchange', onHashchange).trigger('hashchange');
  };

  return {
    initModule: initModule
  };
}());
