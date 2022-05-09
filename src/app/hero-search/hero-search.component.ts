import { Component, OnInit } from '@angular/core';
import {
	debounceTime,
	distinctUntilChanged,
	Observable,
	Subject,
	switchMap,
} from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
	selector: 'app-hero-search',
	templateUrl: './hero-search.component.html',
	styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
	constructor(private heroService: HeroService) {}
	heroes$!: Observable<Hero[]>;

	private searchTerms = new Subject<string>();

	// Push a search term into the observable stream.
	search(term: string) {
		this.searchTerms.next(term);
	}

	ngOnInit(): void {
		this.heroes$ = this.searchTerms.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			switchMap((term: string) => this.heroService.searchHeroes(term))
		);
	}
}
