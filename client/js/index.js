class PostApi {
	static fetch() {
		return fetch('/api/film', {
			method: 'get'
		}).then(res => res.json())
	}

	static create(film) {
		return fetch('/api/film', {
			method: 'post',
			body: JSON.stringify(film),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			} 
		}).then(res => res.json())
	}

	static remove(id) {
		return fetch(`/api/film/${id}`, {
			method: 'delete'
		}).then(res => res.json())
	}
}


var vm = new Vue({
	el: '#app',
	data: {
		films: [{}],
		film: '',
		selectFilmIndex: 0,
		allFilmsVisible: true,
		newFilm: [0],
		searchFilm: '',
		searchTitle: false,
		checkedSearch: ['name', 'actors']
	},
	methods: {
		selectFilm(id) {
			this.film = this.films.find(film => {
				this.selectFilmIndex = film.id;
				return film.id === id;
			});
		},
		showAllFilms() {
			PostApi.fetch().then(backendFilms => {
				this.films = backendFilms.concat();
				this.film = this.films[this.selectFilmIndex];
			})
		},
		addFilm() {
			if (this.newFilm[1] && this.newFilm[2] && this.newFilm[3] && this.newFilm[4]) {
				var addNewFilm = {
					id: this.films[this.films.length - 1].id + 1,
					name: this.newFilm[1],
					year: this.newFilm[2],
					format: this.newFilm[3],
					actors: this.newFilm[4]
				}
				PostApi.create(addNewFilm).then(film => {
					this.films.push(film);
				})
				$('#addFilm').modal('hide')
				this.newFilm = [];
				alert('Фильм успешно сохранен!');
			} else {

			}
		},
		deleteFilm(id) {
			const decision = confirm('Вы уверены, что хотите удалить пост?', '');
			if (decision) {
				PostApi.remove(id).then(() => {
					const filmIndex = this.films.findIndex(film => film.id === id)
					this.films.splice(filmIndex, 1);
				})

				var myId = id,
					selectId = false,
					checkId = false;

				for (var i = 0; i < this.films.length; i++) {
					if (typeof this.films[i] == 'object') {
						selectId = this.films[i].id;
						if (selectId === myId) {
							checkId = true;
						}
						break;
					}
				}

				if (checkId) {
					this.selectFilm(selectId + 1);
				} else {
					this.selectFilm(selectId);
				}
			}
		}
	},
	computed: {
		visibleAllFilms() {
			return this.allFilmsVisible ? 'Скрыть фильмы' : 'Открыть фильмы'
		},
		filteredFilms() {
			var searchInName = (this.checkedSearch[0] === 'name' || this.checkedSearch[1] === 'name') ? true : false
			var searchInActors = (this.checkedSearch[0] === 'actors' || this.checkedSearch[1] === 'actors') ? true : false

			return this.films.filter(film => {
				if (searchInName && searchInActors) {
					return film.name.toLowerCase().indexOf(this.searchFilm.toLowerCase()) > -1 || film.actors.toLowerCase().indexOf(this.searchFilm.toLowerCase()) > -1
				} else if (searchInName && !searchInActors) {
					return film.name.toLowerCase().indexOf(this.searchFilm.toLowerCase()) > -1
				}  else if (!searchInName && searchInActors) {
					return film.actors.toLowerCase().indexOf(this.searchFilm.toLowerCase()) > -1
				}
			})

		},
		visibleResultTitle() {
			if (this.filteredFilms.length > 0) {
				this.searchTitle = true;
				return 'Найденные результаты:'
			} else {
				this.searchTitle = false;
				return 'Нет результатов'
			}
		}
	},
	filters: {

	}
});

vm.showAllFilms();