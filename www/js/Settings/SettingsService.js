angular.module('appcki.settings')
    .factory('SettingsService', ['$state', '$localStorage', 
    	function($state, $localStorage){
            'use strict';

    		var SettingsService = {};

    		var setNavMenuInStorage = function()
    		{
    			var views = $state.get('app.home.views').views;

				var homeviews = {};
				var position = 0;
				for(var key in views)
				{
					var view = views[key];
					view.frontpage = true;
					view.id = key;
					view.position = position;
               
                    view.html = "<ion-nav-view name=\"" + key + "\"><\/ion-nav-view>";
                    
					homeviews[key] = view;


					position++;
				}

				$localStorage.navMenu = homeviews;
    		};
    		
            $localStorage.navMenu = undefined;
    		
            if(!angular.isDefined($localStorage.navMenu))
    		{
    			setNavMenuInStorage();
    		}

    		SettingsService.getViews = function(){
    			var homeviews = $localStorage.navMenu;
    			var views = [];
    			
    			for(var key in homeviews)
    			{
    				var view = homeviews[key];
    				views[view.position] = view;
    			}
    			
    			return views;
    		};

    		SettingsService.setHome = function(item, state)
    		{
    			$localStorage.navMenu[item].home = state;
    		};

    		SettingsService.setNavOrder = function(item, indexOld, indexNew)
    		{
    			var homeViews = {};
    			var addIndex, start, end;
    			
    			if(indexOld < indexNew)
    			{
    				addIndex = -1;
    				start = indexOld;
    				end = indexNew;
    			} else {
    				addIndex = 1;
    				start = indexNew;
    				end = indexOld;
    			}

    			for(var key in $localStorage.navMenu)
    			{
    				var view = $localStorage.navMenu[key];
    				if(view === item)
    				{
    					view.position = indexNew;
    				} else if (view.position >= start && view.position <= end) {
    					view.position += addIndex;
    				}
    				homeViews[key] = view;
    			}

    			$localStorage.navMenu = homeViews;
    		};

    		return SettingsService;
    	}
    ]);