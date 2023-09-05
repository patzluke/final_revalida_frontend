import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FarmingTip } from 'src/app/modules/landing/models/farming-tip';
import { FarmingTipsActions } from 'src/app/modules/landing/states/farmingtips-state/farmingtips.actions';
import { selectFarmingTip } from 'src/app/modules/landing/states/farmingtips-state/farmingtips.selectors';

@Component({
  selector: 'app-view-farming-tip',
  templateUrl: './view-farming-tip.component.html',
  styleUrls: ['./view-farming-tip.component.scss'],
})
export class ViewFarmingTipComponent implements OnInit {
  farmingTipId: number = 0;
  selectedFarmingTip: FarmingTip | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.farmingTipId = data['tip'];

      this.store.dispatch({
        type: FarmingTipsActions.GET_FARMINGTIPS,
      });

      this.store
        .select(selectFarmingTip(this.farmingTipId))
        .subscribe((data) => {
          this.selectedFarmingTip = data;
        });
    });

    console.log(this.farmingTipId);
  }
}
