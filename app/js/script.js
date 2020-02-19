/* Описание необходимых переменных*/
var none = '<img class="desc__complectation-img" src="img/null.png">',
bad = '<img class="desc__complectation-img" src="img/bad.png">',
nail = '<img class="desc__complectation-img" src="img/nail.png">',
games = '<img class="desc__complectation-img" src="img/games.png">',
house = '<img class="desc__complectation-img" src="img/house.png">';
var xs = 'xs', s = 's', m = 'm', l = 'l', xl = 'xl', xxl = 'xxl'; 

/* Вхожные данные */
let json_data = [
	{
  		name: 'Эконом',
  		size: '90x70x180',
  		square: '0,63',
  		image: 'img/cat1.jpg',
  		complectation: [none],
  		compl: 'none',
  		price: 100,
  		data_size: xs
  	},
  	{
  		name: 'Эконом плюс',
  		size: '90x100x180',
  		square: '0,90',
  		image: 'img/cat2.jpg',
  		complectation: [bad, nail],
  		compl: 'bad nail',
  		price: 200,
  		data_size: s
  	},
  	{
  		name: 'Комфорт',
  		size: '100x125x180',
  		square: '1,13',
  		image: 'img/cat3.jpg',
  		complectation: [bad, nail, games],
  		compl: 'bad nail games',
  		price: 250,
  		data_size: m
  	},
  	{
  		name: 'Сьют',
  		size: '125x125x180',
  		square: '1,56',
  		image: 'img/cat4.jpg',
  		complectation: [bad, nail, games],
  		compl: 'bad nail games',
  		price: 350,
  		data_size: l
  	},
  	{
  		name: 'Люкс',
  		size: '160x160x180',
  		square: '2,56',
  		image: 'img/cat5.jpg',
  		complectation: [bad, nail, games, house],
  		compl: 'bad nail games house',
  		price: 500,
  		data_size: xl
  	},
  	{
  		name: 'Супер-Люкс',
  		size: '180x160x180',
  		square: '2,88',
  		image: 'img/cat6.jpg',
  		complectation: [bad, nail, games, house],
  		compl: 'bad nail games house',
  		price: 600,
  		data_size: xxl
  	}
];

/* Header-Fix*/
let header = document.getElementById('header');
window.onscroll = function() {
    if (window.pageYOffset > 120) {
        header.classList.add('header--fixed');
    }
    else if (window.pageYOffset < 120) {
        header.classList.remove('header--fixed');
    }
};

/* Генерация каталога */
for (let i = 0; i < json_data.length; i++) {

	let card = '<div class="catalog__card card">' + 
						'<img src="'+json_data[i].image+'" class="card__image">' +
						'<span class="card__title">'+json_data[i].name+'</span>' +
						'<div class="card__desc desc">' +
							'<div class="desc__line">' +
								'<span class="desc__sizes-text">Размеры (ШхГхВ) - </span>' +
								'<span class="desc__sizes-value">'+json_data[i].size+' см</span>' +
							'</div>' +
							'<div class="desc__line">' +
								'<span class="desc__square-text">Площадь - </span>' +
								'<span class="desc__square-value"> '+json_data[i].square+' м²</span>' +
							'</div>' +
							'<div class="desc__line">' +
								'<span class="desc__complectation-text">Оснащение номера </span>' +
								'<span class="desc__complectation-value">'+json_data[i].complectation+'</span>' +
							'</div>' +
							'<div class="desc__line">' +
								'<span class="desc__price-text">Цена за сутки: </span>' +
								'<span class="desc__price-value">'+json_data[i].price+'</span>' +
							'</div>' +
						'</div>' +
						'<a href="#" class="card__btn">Забронировать</a>' +
					'</div>';

	let catalog = document.querySelector('.catalog__catalog-content');

	let card_wrp = document.createElement('div');
	card_wrp.classList.add('catalog__card-wrp'); 
	card_wrp.setAttribute('data-size',json_data[i].data_size);
	card_wrp.setAttribute('data-compl',json_data[i].compl);
	card_wrp.setAttribute('data-price',1);
	card_wrp.innerHTML = card;
	catalog.appendChild(card_wrp);
}

/*** Сортировка ***/
/* Меню выбора */
let select_block = document.querySelector('.sorting');
select_block.onclick =function(){
	this.classList.add('main__sorting-container--open');
}
document.addEventListener('click', function(event) {
    let isClickInside = select_block.contains(event.target);
    if (!isClickInside) {
        select_block.classList.remove('main__sorting-container--open');
    }
});
/* Изменение активного вида сортировки */
select_block.addEventListener('click', function(e) {
	let select_li = document.querySelectorAll('.sorting__item')
	let target = e.target
  Array.from(select_li).forEach(item => {
  	item.classList.remove('active')
  });
  target.classList.add('active')
});
/* Работа сортировки */
let parent = document.querySelector('.catalog__catalog-content'),
	sort_option = document.querySelectorAll('.sorting__item');

for (let i = sort_option.length - 1; i >= 0; i--) {
	sort_option[i].onclick = function(){
	 	let sign = this.getAttribute('data-sign');
		let signstring = '.desc__'+sign+'-value';

		function sort_func() {
  			[].slice.call(parent.children).sort(function(a, b) {
      			return sort_option[i].value * (sorting(a) - sorting(b));
    		}).forEach(function(ele) {
      			parent.appendChild(ele);
    		})
		}

		function sorting(ele) {
  			return parseFloat(ele.querySelector(''+signstring+'').textContent.replace(/[^\d.]+/g, '')) || 0;
		} 

	sort_func(sorting);
	}
}
/***/

/* Фильтр */
let apply = document.querySelector('.filter__btn--apply');
let chbox = document.querySelectorAll('.square__item-input');
let ch_card = document.querySelectorAll('.catalog__card-wrp'); // Все карточки каталога
let inpt_one = document.querySelector('.price__one');
let inpt_two = document.querySelector('.price__two');
let compl_chbox = document.querySelectorAll('.complectation__item-input');
let price = document.querySelectorAll('.desc__price-value')

apply.onclick = function(){ // Дейтсвия по кнопке "Применить"
	/* Обработка цены */
	if (inpt_two.value != 0 || inpt_one.value != 0) { 
		for (var i = price.length - 1; i >= 0; i--) {
			let price_int = parseInt(price[i].innerHTML);
				if(price_int >= inpt_one.value && price_int <= inpt_two.value){
					ch_card[i].setAttribute('data-price',1);
				} 
				else {   
						ch_card[i].setAttribute('data-price',0);
				}
		}
	}
	/* Обработка площади */
	for (var i = chbox.length - 1; i >= 0; i--) {
		let size = chbox[i].value;
		if(chbox[i].checked){
			for (var j = ch_card.length - 1; j >= 0; j--) {
				let hotel_size = ch_card[j].getAttribute('data-size');
				if(hotel_size == size){
					ch_card[j].setAttribute('data-size-f',1);
				}
			}
		} 
		else { 
			for (var j = ch_card.length - 1; j >= 0; j--) {
				let hotel_size = ch_card[j].getAttribute('data-size');
				if(hotel_size == size){
					ch_card[j].setAttribute('data-size-f',0);
				}
			}
		}
	}
	/* Обработка комплектности (не удлось реализовать) */
	for (var i = compl_chbox.length - 1; i >= 0; i--) {
		let complect = compl_chbox[i].value;
		if(compl_chbox[i].checked){
			for (var j = ch_card.length - 1; j >= 0; j--) {
				let hotel_compl = ch_card[j].getAttribute('data-compl');
				var patt = new RegExp(complect);
                var res = patt.test(hotel_compl);
                if(res == true){
                    ch_card[j].setAttribute('data-compl-f',1);
				} 
			}
		} 
		else { 
			for (var j = ch_card.length - 1; j >= 0; j--) {
                ch_card[j].setAttribute('data-compl-f',0);
			}
		}
	}
	/* Выбоор блоков которые надо вывести/скрыть */
	for (var i = ch_card.length - 1; i >= 0; i--) {
		let resprice = ch_card[i].getAttribute('data-price');
		let ressize = ch_card[i].getAttribute('data-size-f');
		let rescompl = ch_card[i].getAttribute('data-compl-f');
		let res = resprice*ressize;
		if(res == 0){
			ch_card[i].classList.add('hide');
			ch_card[i].classList.remove('show');
			let hidden_blocks = document.querySelectorAll('.catalog__card-wrp.hide');
			let empty_cat = document.querySelector('.catalog__catalog-empty');
			if(hidden_blocks.length == ch_card.length){
				empty_cat.classList.add('show');	
			} 
			else { 
				empty_cat.classList.remove('show');	
			}
		}
		else { 
			ch_card[i].classList.add('show'); 
			ch_card[i].classList.remove('hide'); 
		}
	}
};


/* Дейтсвия по кнопке "Сбросить" */
let filter_clean = document.querySelector('.filter__btn--clean');
let square_filter = document.querySelectorAll('.square__item-input');
let complectation_filter = document.querySelectorAll('.complectation__item-input');
let price_filter = document.querySelectorAll('.price__input');

filter_clean.onclick = function(){
	this.classList.add('hide-btn');
	for (var i = square_filter.length - 1; i >= 0; i--) {
		square_filter[i].checked=false;
	}	
	for (var i = complectation_filter.length - 1; i >= 0; i--) {
		complectation_filter[i].checked=false;
	}
	for (var i = price_filter.length - 1; i >= 0; i--) {
		price_filter[i].value='';
	}
}

/* Скрытие кнопки "Сбросить" при пустом фильтре */
let filter_form = document.getElementById('filter_form');
filter_form.onchange = function () {
	filter_clean.classList.remove('hide-btn');
}

/* Разворачивание/Сворачивание фильтра для адаптива (ниже 768) */
document.querySelector('.filter__btn--hide').onclick = function() {
	openbox('box', this);
	return false;
};
function openbox(id, toggler) {
	let div = filter_form;
	if(div.style.display == 'block') {
		div.style.display = 'none';
		toggler.innerHTML = 'Открыть фильтр';
	}
	else {
		div.style.display = 'block';
		toggler.innerHTML = 'Свернуть фильтр';
	}
}