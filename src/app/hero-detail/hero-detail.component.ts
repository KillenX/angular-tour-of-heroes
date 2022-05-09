import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
	@Input() hero?: Hero;
	constructor() {
		/* TODO document why this constructor is empty */
	}

	ngOnInit(): void {
		/* TODO document why this method 'ngOnInit' is empty */
	}
}
