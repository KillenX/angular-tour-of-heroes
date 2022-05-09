import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
	providedIn: 'root',
})
export class HeroService {
	private heroesUrl = 'api/heroes';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

	constructor(
		private messageService: MessageService,
		private http: HttpClient
	) {}

	private log(message: string) {
		this.messageService.add(message);
	}

	getHeroes(): Observable<Hero[]> {
		return this.http.get<Hero[]>(this.heroesUrl).pipe(
			tap((_) => this.log('fetched heroes')),
			catchError(this.handleError<Hero[]>('getHeroes', []))
		);
	}

	getHero(id: number) {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url).pipe(
			tap((_) => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}

	updateHero(hero: Hero) {
		return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
			tap((_) => this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError<any>('updateHero'))
		);
	}

	/** POST: add a new hero to the server */
	addHero(hero: Hero): Observable<Hero> {
		return this.http
			.post<Hero>(this.heroesUrl, hero, this.httpOptions)
			.pipe(
				tap((newHero: Hero) =>
					this.log(`added hero w/ id=${newHero.id}`)
				),
				catchError(this.handleError<Hero>('addHero'))
			);
	}

	deleteHero(id: number) {
		const url = `${this.heroesUrl}/${id}`;

		return this.http.delete<Hero>(url, this.httpOptions).pipe(
			tap((_) => this.log(`deleted hero id=${id}`)),
			catchError(this.handleError<Hero>('deleteHero'))
		);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}
}
