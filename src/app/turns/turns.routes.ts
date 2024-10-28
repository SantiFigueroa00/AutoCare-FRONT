import { Routes } from '@angular/router';
import { NewTurnComponent } from './new-turn/new-turn.component';
import { ArticleDetailComponent } from '../articles/article-detail/article-detail.component';
import { TurnVehiclesComponent } from './new-turn/components/turn-vehicles/turn-vehicles.component';
import { TurnServicesComponent } from './new-turn/components/turn-services/turn-services.component';
import { TurnDateComponent } from './new-turn/components/turn-date/turn-date.component';
import { TurnSummaryComponent } from './new-turn/components/turn-summary/turn-summary.component';

export const TURNS_ROUTES: Routes = [
    {
        path: 'new', component: NewTurnComponent, children: [
            { path: 'vehicles', component: TurnVehiclesComponent },
            { path: 'services', component: TurnServicesComponent },
            { path: 'date', component: TurnDateComponent },
        ]
    },
    {
        path: 'summary', component: TurnSummaryComponent
    }
];