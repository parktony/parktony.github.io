(function ($) {

var URL = document.location.href;

function updatePrefix() {
    var campaignType = $('#campaignType').children('.switch.active').attr('value'),
    brand = $('#brand').children('.switch.active').attr('value'),
    division = $('#division').children('.switch.active').attr('value'),
    portfolio = $('#portfolio').children('.switch.active').attr('value'),
    targetingtype = '-' + $('#targeting').children('.switch.active').attr('value'),
    campaignName = $('#campaignName').val();
    if (campaignType != 'TG'){targetingtype = ''}
    var prefix = campaignType+'-'+brand+'-'+division+'-'+portfolio+targetingtype+': '+campaignName;
    $('#prefix').val(prefix);
}

function toggleTargeting() {
    if ($("#campaignType .active").attr('value') == "TG") {
        $("#targeting-section").css('display','');
    } else {
        $("#targeting-section").css('display','none');
    }
}

function getTargetName() {
	if (URL.indexOf('/browse/BUSDIGRUN') > -1 || URL.indexOf('/browse/DCV') > -1){
		var jiraKey = $('.issue-link:eq(0)').text().replace('-','_');
		var summaryText = $('#summary-val').text();
		if (jiraKey.length > 0 && summaryText.length > 0) {
			$('#targetName').val(jiraKey+'-'+summaryText);
		}
	}
}

if (URL.indexOf('digital.westpacgroup.com.au') > -1 || URL.indexOf('jira.srv.westpac.com.au') > -1) {

	if ($('#jiraHelper').length > 0){

		$('#jiraHelper').css('display','block');
		getTargetName();

	} else {

		$('body').prepend('<div id="jiraHelper"><div class="modal-content"><span class="close">&times;</span><h2>CRO Campaign Namer</h2><div><h3>Name for</h3><div id="namingType" class="switch-group"><div>JIRA</div><div>Target</div></div></div><div id="jiraElements"><div><h3>Campaign type</h3><div id="campaignType" class="switch-group"><div value="TS">A/B Test</div><div value="TG">Targeting</div><div value="PN">Personalisation</div><div value="SP">Support</div></div></div><div id="targeting-section" style="display: none;"><h3>Targeting type</h3><div id="targeting" class="switch-group"><div value="CM">Campaign</div><div value="QS">Quality sale</div><div value="AA">App abandonment</div><div value="ON">Onboarding</div><div value="PM">Product maturity</div><div value="DF">Defection</div><div value="OB">Onsite behavioural</div><div value="DA">Digitally active</div><div value="DD">Digital adoption</div><div value="PR">Propensity</div></div></div><div><h3>Brand</h3><div id="brand" class="switch-group"><div value="WBC"">Westpac</div><div value="STG">St George</div><div value="BOM">BOM</div><div value="BSA">BSA</div></div></div><div><h3>Division</h3><div id="division" class="switch-group"><div value="C">Consumer</div><div value="B">Business</div></div></div><div><h3>Portfolio</h3><div id="portfolio" class="switch-group"><div value="TR">Transactions</div><div value="SA">Savings</div><div value="CC">Credit cards</div><div value="BL">Business loans</div><div value="PL">Personal loans</div><div value="TD">Term deposits</div><div value="FC">FCA</div><div value="FX">Foreign exchange</div><div value="GC">GCC</div><div value="MR">Merchants</div><div value="HL">Home loans</div><div value="IN">Insurance</div><div value="WL">Wealth</div><div value="SU">Super</div><div value="SR">Service</div><div value="NA">Generic</div></div></div><div><h3>Description</h3><div class="output"><input id="campaignName"></div></div><div><h3>Ticket name</h3><div class="output"><input id="prefix"><div class="copyClipboard">Copy to clipboard</div></div></div></div><div id="targetElements" style="display: none;"><div id="targetMessage" style="clear: both; padding-top: 40px;"><p>To obtain the Target campaign name, click on this bookmark from the JIRA ticket for this campaign (appropriately named using this bookmark).</p></div><div><h3>Target name</h3><div class="output"><input id="targetName"><div class="copyClipboard">Copy to clipboard</div></div></div></div><div id="footer-section"><small>Courtesy of Tony Park &#9786;</small></div></div></div><style>#jiraHelper{position: fixed; z-index: 5000; height: 100%; width: 100%; background-color: rgba(0,0,0,0.4);}.modal-content{background-color: #fefefe; padding: 15px 25px 32px 40px; border: 1px solid #888; width: 75%; margin: 40px auto 0 auto;}#jiraHelper .close{color: #aaa; float: right; font-size: 28px; font-weight: bold;}#jiraHelper .close:hover,#jiraHelper .close:focus{color: black; text-decoration: none; cursor: pointer;}#jiraHelper h2{margin-bottom: 20px; margin-top: 16px;}.switch-group{padding-top: 10px;padding-bottom: 10px; float: left;}.switch,.copyClipboard{color: #848484; font-size: 12px; padding: 8px 10px 8px 10px; width: 110px; text-align: center; cursor: pointer; background: #efefef; float: left; border: 1px solid #d4d4d4;}.copyClipboard{margin-top: 10px;}.switch:first-child{border-top-left-radius: 2px;border-bottom-left-radius: 2px;}.switch:last-child{border-top-right-radius: 2px;border-bottom-right-radius: 2px;}.switch.active{background: #621a4b; color: #ffffff; border: 1px solid #621a4b;}#jiraHelper h3{padding-top: 15px;clear: both; float: left; width: 150px;}#portfolio.switch-group,#targeting.switch-group{margin-top: -40px; margin-left: 150px;}#jiraHelper input{font-size: 14px; padding: 8px 10px 8px 10px; width: 375px; float: left; border: 1px solid #d4d4d4; margin-top: 10px; margin-bottom: 10px;}#jiraHelper .output{margin-top: 10px; margin-bottom: 40px;}#footer-section{clear: both; float: none; padding-top: 15px;}</style>');

		$('.switch-group').each(function(){
			$(this).children().addClass("switch");
			$(this).children().first().addClass("active");
		});

		$('#jiraElements .switch').click(function(){
		    $(this).siblings().removeClass('active');
		    $(this).addClass('active');
		    toggleTargeting();
		    updatePrefix();
		});

		$('#namingType .switch').click(function(){
		    $(this).siblings().removeClass('active');
		    $(this).addClass('active');
		    if ($('#namingType .switch.active').text() == "JIRA") {
		    	$('#jiraElements').css('display','');
		    	$('#targetElements').css('display','none');
		    } else {
		    	$('#jiraElements').css('display','none');
		    	$('#targetElements').css('display','');
		    	getTargetName();	    	
		    }
		});

		$('#campaignName').keyup(function(){updatePrefix();});

		$('.copyClipboard').click(function(){
			var copyText = $(this).siblings('input');
			copyText.select();
			document.execCommand("copy");
		});

		$('.close').click(function(){$('#jiraHelper').css('display','none');});

		updatePrefix();

		getTargetName();

	}

} else {
	alert('Oops! You can only use this tool while in JIRA.');
}

})(jQuery);
