/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var DOC=function(object,option)
	{
		/**********************************************************************/
		
		var $self=this;
		var $this=$(object);
		var $option=option;
		
		/**********************************************************************/
		
		this.create=function()
		{
			$.getScript('http://quanticalabs.com/.tools/EnvatoItems/js/getItems.js',function() { });
			
			$('.doc-main-menu-default').find('a').on('click',function(e)
			{
				$(this).parent('li').children('ul').toggle();
			});
			
			new Waypoint.Sticky(
			{
				element: $('.doc-content-left')[0]
			});
			
			$('.flexnav').flexNav(
			{
				'transitionOpacity': false
			});
			
			$(window).bind('hashchange',function(e)
			{ 
				e.preventDefault();
				
				$.scrollTo('#'+window.location.hash.substring(5),500,{easing:'easeInOutExpo',onAfter:function()
				{
				
				}});
			});
			
			$('.fancybox').fancybox({fitToView:false,maxWidth:'100%'});
		};	
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.DOC=function(option) 
	{
		var menu=new DOC(this,option);
		menu.create();
		return(menu);
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/