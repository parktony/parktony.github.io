var URL = document.location.href;

if (URL.indexOf('digital.westpacgroup.com.au') > -1 || URL.indexOf('jira.srv.westpac.com.au') > -1) {

	if (jQuery('#jiraHelper').length > 0){jQuery('#jiraHelper').css('display','block');} else {

		jQuery('body').prepend('<div id="jiraHelper" class="modal"><div class="modal-content"><span class="close">&times;</span><h2>CRO Campaign Namer</h2><div><h3>Name for</h3><div id="namingType" class="switch-group"><div>JIRA</div><div>Target</div></div></div><div id="jiraElements"><div><h3>Campaign type</h3><div id="campaignType" class="switch-group"><div value="TS">A/B Test</div><div value="TG">Targeting</div><div value="PN">Personalisation</div><div value="SP">Support</div></div></div><div id="targeting-section" style="display: none;"><h3>Targeting type</h3><div id="targeting" class="switch-group"><div value="CM">Campaign</div><div value="QS">Quality sale</div><div value="AA">App abandonment</div><div value="ON">Onboarding</div><div value="PM">Product maturity</div><div value="DF">Defection</div><div value="OB">Onsite behavioural</div><div value="DA">Digitally active</div><div value="DD">Digital adoption</div><div value="PR">Propensity</div></div></div><div><h3>Brand</h3><div id="brand" class="switch-group"><div value="WBC"">Westpac</div><div value="STG">St George</div><div value="BOM">BOM</div><div value="BSA">BSA</div></div></div><div><h3>Division</h3><div id="division" class="switch-group"><div value="C">Consumer</div><div value="B">Business</div></div></div><div><h3>Portfolio</h3><div id="portfolio" class="switch-group"><div value="TR">Transactions</div><div value="SA">Savings</div><div value="CC">Credit cards</div><div value="BL">Business loans</div><div value="PL">Personal loans</div><div value="TD">Term deposits</div><div value="FC">FCA</div><div value="FX">Foreign exchange</div><div value="GC">GCC</div><div value="MR">Merchants</div><div value="HL">Home loans</div><div value="IN">Insurance</div><div value="WL">Wealth</div><div value="SU">Super</div><div value="SR">Service</div><div value="NA">Generic</div></div></div><div><h3>Description</h3><div class="output"><input id="campaignName"></div></div><div><h3>Ticket name</h3><div class="output"><input id="prefix"><div class="copyClipboard">Copy to clipboard</div></div></div></div><div id="targetElements" style="display: none;"><div id="targetMessage" style="clear: both; padding-top: 40px;"><p>To obtain the Target campaign name, click on this bookmark from the JIRA ticket for this campaign (apropriately named using this bookmark).</p></div><div><h3>Target name</h3><div class="output"><input id="targetName"><div class="copyClipboard">Copy to clipboard</div></div></div></div><div id="footer-section"><small>Courtesy of Tony Park &#9786;</small></div></div></div><style>.modal{display: block; position: fixed; z-index: 5000; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4);}.modal-content{background-color: #fefefe; padding: 15px 25px 32px 40px; border: 1px solid #888; width: 75%; margin-top: 40px; margin-left: auto; margin-right: auto;}#jiraHelper .close{color: #aaa; float: right; font-size: 28px; font-weight: bold;}#jiraHelper .close:hover,#jiraHelper .close:focus{color: black; text-decoration: none; cursor: pointer;}#jiraHelper h2{margin-bottom: 20px; margin-top: 16px;}#jiraHelper .switch-group{padding-top: 10px;padding-bottom: 10px; float: left;}#jiraHelper .switch,.copyClipboard{color: #848484; font-size: 12px; padding: 8px 10px 8px 10px; text-decoration: none; width: 110px; text-align: center; cursor: pointer; background: #efefef; float: left; border: 1px solid #d4d4d4;}.copyClipboard{margin-top: 10px;}#jiraHelper .switch:first-child{border-top-left-radius: 2px;border-bottom-left-radius: 2px;}#jiraHelper .switch:last-child{border-top-right-radius: 2px;border-bottom-right-radius: 2px;}#jiraHelper .switch.active{background: #621a4b; color: #ffffff; border: 1px solid #621a4b;}#jiraHelper h3{padding-top: 15px;clear: both; float: left; width: 150px;}#portfolio.switch-group,#targeting.switch-group{margin-top: -40px; margin-left: 150px;}#jiraHelper input{font-size: 14px; padding: 8px 10px 8px 10px; width: 375px; float: left; border: 1px solid #d4d4d4; margin-top: 10px; margin-bottom: 10px;}#jiraHelper .output{margin-top: 10px; margin-bottom: 40px;}#footer-section{clear: both; float: none; padding-top: 15px;}</style>');

		jQuery('.switch-group').each(function(){
			jQuery(this).children().addClass("switch");
			jQuery(this).children().first().addClass("active");
		});

		function copytoClipboard(textToCopy) {
			var copyText = document.getElementById(textToCopy);
			copyText.select();
			document.execCommand("copy");
		}

		function updatePrefix() {
		    var campaignType = jQuery('#campaignType').children('.switch.active').attr('value'),
		    brand = jQuery('#brand').children('.switch.active').attr('value'),
		    division = jQuery('#division').children('.switch.active').attr('value'),
		    portfolio = jQuery('#portfolio').children('.switch.active').attr('value'),
		    targetingtype = '-' + jQuery('#targeting').children('.switch.active').attr('value'),
		    campaignName = jQuery('#campaignName').val();
		    if (campaignType != 'TG'){targetingtype = ''}
		    var prefix = campaignType+'-'+brand+'-'+division+'-'+portfolio+targetingtype+': '+campaignName;
		    jQuery('#prefix').val(prefix);
		}

		function toggleTargeting() {
		    if (jQuery("#campaignType .active").attr('value') == "TG") {
		        jQuery("#targeting-section").css('display','');
		    } else {
		        jQuery("#targeting-section").css('display','none');
		    }
		}

		function getTargetName() {
			var jiraKey = jQuery('.issue-link:eq(0)').text().replace('-','_');
			var summaryText = jQuery('#summary-val').text();
			if (jiraKey.length > 0 && summaryText.length > 0) {
				jQuery('#targetName').val(jiraKey+'-'+summaryText);
			}
		}

		jQuery('#jiraElements .switch').click(function(){
		    jQuery(this).siblings().removeClass('active');
		    jQuery(this).addClass('active');
		    toggleTargeting();
		    updatePrefix();
		});

		jQuery('#namingType .switch').click(function(){
		    jQuery(this).siblings().removeClass('active');
		    jQuery(this).addClass('active');
		    if (jQuery('#namingType .switch.active').text() == "JIRA") {
		    	jQuery('#jiraElements').css('display','');
		    	jQuery('#targetElements').css('display','none');
		    } else {
		    	jQuery('#jiraElements').css('display','none');
		    	jQuery('#targetElements').css('display','');		    	
		    }
		});

		jQuery('#campaignName').keyup(function(){updatePrefix();});

		jQuery('.copyClipboard').click(function(){
			var copyText = jQuery(this).siblings('input');
			copyText.select();
			document.execCommand("copy");
		});

		jQuery('.close').click(function(){jQuery('.modal').css('display','none');});

		updatePrefix();

		if (URL.indexOf('/browse/BUSDIGRUN') > -1 || URL.indexOf('/browse/DCV') > -1){
			getTargetName();
		}

	}

} else {
	alert('Oops! You can only use this tool while in JIRA.');
}
