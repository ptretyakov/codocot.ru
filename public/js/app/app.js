define(function(require){
    'use strict';

    var Marionette = require('marionette');
    var Routes     = require('app/routes');
    var Desktop    = require('controllers/desktop');
    var Handlebars = require('handlebars');
    var LoaderCat  = require('views/dinamics/loader_cat');

    require('system/helpers');
    require('bootstrap');
    require('flat-ui');
    require('backbone.rivets');

    var app = new Marionette.Application({
        helpers : {} ,

        regions:{
            regionTopMenu   : '#topmenu'        ,
            regionContent   : '#region-content'
        },

        initialize : function(){
            if(DEBUG) console.log('Initialize application');

            var _this = this;

            this.helpers.showLoad = function(){
                _this.regionContent.show( new LoaderCat() );
            }
        } ,

        preload: function(){
            if(DEBUG) console.log('app: preload');

            $.ajax({
                method: 'GET',
                url: '/configs',
                dataType: 'JSON',
                data:{
                    action: 'preload'
                },
                success: function(data){

                    this.appRouter = new Routes({ controller: new Desktop() });
                    Backbone.history.start();
                }
            });
        }
    });

    app.addInitializer(function(options){
        if(DEBUG) console.log('app: init');

        this.preload();
    });

    Marionette.Behaviors.behaviorsLookup = function() {
        return window.Behaviors;
    }

    Marionette.Renderer.render = function(template, data){
        var toHTML = Handlebars.compile(template);
        return toHTML(data);
    };   

    return app;
});
