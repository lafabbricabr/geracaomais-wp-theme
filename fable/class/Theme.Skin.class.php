<?php

/******************************************************************************/
/******************************************************************************/

class ThemeSkin
{
	/**************************************************************************/
	
	function __construct()
	{
		$this->skin=array
		(
			'general'															=>	array
			(
				'landing_url'													=>	'http://quanticalabs.com/wp_themes3/fable/'
			),
			'skin'																=>	array
			(
				1																=>	array
				(			
					'name'														=>	__('Default',THEME_DOMAIN)
				)
			)
		);
	}
	
	/**************************************************************************/
	
	function getSkinDictionary()
	{
		return($this->skin);
	}

	/**************************************************************************/
	
	function getSkin()
	{
		return(get_option(THEME_SKIN_OPTION_NAME,1));
	}
	
	/**************************************************************************/
}

/******************************************************************************/
/******************************************************************************/