define(function(require){
    'use strict';

    var Marionette = require('marionette');

    var viewTopMenu     = require('views/parts/topmenu/topmenu.view');

    var Pages           = {
        Projects    : require('views/pages/projects/projects') ,
        Home        : require('views/pages/home/home')
    }

    return Marionette.Controller.extend({

        initialize: function(){
            app.regionTopMenu.show( new viewTopMenu() );
        } ,

        run : function(pageName , pageParameters){
            if(DEBUG) console.log('route: ' + pageName);
            var args = Array.prototype.slice.call(arguments);

            app.helpers.showLoad();            
            app.regionContent.show( new Pages[ args.shift() ] (args));

            if(app.loaded) $('#b-content > div').removeClass('hide').addClass('animated fadeIn');
        },

        Home        : function(){ this.run( 'Home'       );  } ,
        Projects    : function(){ this.run( 'Projects'   );  } ,

    });

});
