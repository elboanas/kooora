import { Component, OnInit } from "@angular/core";
import { MatchService } from '../match.service';
import { Subscription } from 'rxjs';
import { IMatch } from '../match.model';



@Component({
    selector: 'app-saved-match',
    templateUrl: './match-saved.component.html',
    styleUrls: ['./match-saved.component.css']
})
export class MatchSavedComponent implements OnInit {
    matchs: IMatch[] = [];
    matchServiceSubscribtion: Subscription;
    hell : Subscription;
    constructor(public postService: MatchService) { };

    ngOnInit() {
        this.matchServiceSubscribtion = this.postService.getsavedMatch().subscribe((matchs: any[]) => {
            console.log("retour service=>" + matchs);
            this.matchs = matchs;
        });
    }
    onDelete(matchId: string) {
        console.log("match deleted");
        this.hell = this.postService.deleteMatch(matchId).subscribe((matchs: any[])=>{
            this.matchServiceSubscribtion = this.postService.getsavedMatch().subscribe((matchs: any[]) => {
                console.log("retour service=>" + matchs);
                this.matchs = matchs;
                
            });
            return 0;
        });
        
        /*this.matchServiceSubscribtion = this.postService.getsavedMatch().subscribe((matchs: any[]) => {
            console.log("retour service=>" + matchs);
            this.matchs = matchs;
        });*/
    }
}


