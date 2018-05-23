import { Component, OnChanges, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges{
    starWidth: number;
    //Input decorator is a function
    @Input() rating: number;
    @Output() ratingClicked: EventEmitter<string> =
        new EventEmitter<string>();

    //Onchanges only works with inputs
    ngOnChanges(): void {
        this.starWidth = this.rating * 86 / 5;
    }
    onClick() {
        this.ratingClicked.emit(`clicked`);
    }
}