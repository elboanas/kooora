import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Subject, Observable, of } from 'rxjs';

import { IMatch } from './match.model';
import { matchs } from '../../mocks/matchs';

import { flatMap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class MatchService {
  public Date: string;
  constructor(private http: HttpClient) {
  }

  // Service message commands
  announceDate(date: string) {
    console.log("Emitter: " + date);
    this.Date = date;
  }
  saveMatch(hometeam: string, awayteam: string, hometeamScore, awayteamScore: string) {
    const matchSaved = { hometeam: hometeam, awayteam: awayteam, hometeamScore: hometeamScore, awayteamScore: awayteamScore };
    this.http.post("http://localhost:3000/api/match/save", matchSaved)
      .subscribe(response => {
        console.log(response);
      });
  }

  getMatchs(): Observable<IMatch[]> {
    //let matchsObservable:Observable<any> = of(matchs);
    // TODO uncomment to use real service call
    //this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    let params = new HttpParams()
      .set('action', 'get_events')
      .set('from', this.Date)
      .set('to', this.Date)
      .set('league_id', '109')
      .set('APIkey', '66869ef860f058236e75d7466b804e053882c52a10c152f3111bef56e5463c4a');
    //let matchsObservable:Observable<any> = this.http.get(environment.footballApi,{ params: params });
    //return matchsObservable
    return this.http.get(environment.footballApi, { params })
      .pipe(map((apiMatchs: any) =>
        apiMatchs.map((apiMatch) => {
          let appMatch: IMatch = {
            hometeam: apiMatch.match_hometeam_name,
            awayteam: apiMatch.match_awayteam_name,
            hometeamScore: apiMatch.match_hometeam_score,
            awayteamScore: apiMatch.match_awayteam_score
          };
          return appMatch;
        })
      ));
  }
}