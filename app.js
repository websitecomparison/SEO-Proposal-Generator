jQuery(document).ready(function ($) {

	var form = $('#form-customize'),
		contract = $('#contract');

	form.on('submit', function (e) {
		e.preventDefault();

		var element = document.getElementById('contract');
		html2pdf(element, {
		  margin:       array(0.25, 0.5, 0.25, 0.5),
		  filename:     'WC-Proposal.pdf',
		  image:        { type: 'jpeg', quality: 0.98 },
		  html2canvas:  { dpi: 192, letterRendering: true },
		  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
		});
		
	});

	/*
	Bootstrap Datepicker
	https://github.com/eternicode/bootstrap-datepicker
	 */
	form.find('.input-group.date').datepicker({ format: 'dd/mm/yyyy' });

	/*
	Editing the form
	 */
	form.on('focus keyup change', '.form-control', function (event) {
		event.preventDefault();
		var inputName = $(this).attr('name');
		var inputVal = $(this).val();
		if (inputVal.length) {
			contract.find('.' + inputName).addClass('item-editing').text(inputVal);
		} else {
			contract.find('.' + inputName).addClass('item-editing');
		}
	});

	/*
	Toggle sidebar visibility
	 */
	$('.cmn-toggle-switch').on('click', function (event) {
		event.preventDefault();
		$(this).toggleClass('active');
		$('#wrapper').toggleClass('toggled');
	});

	/*
	Media Queries
	 */
	if (matchMedia) {
		var mq = window.matchMedia('(min-width: 768px) and (max-width: 1200px)');
		mq.addListener(WidthChange);
		WidthChange(mq);
	}

	function WidthChange(mq) {
		if (mq.matches) {
			$('textarea[name="payment"]').attr('rows', 1);
		} else {
			$('textarea[name="payment"]').attr('rows', 2);
		}
	}

});
