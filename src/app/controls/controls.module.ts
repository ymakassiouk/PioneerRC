import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ControlsPage } from './controls.page';


@NgModule({
    imports: [
        FormsModule, 
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ControlsPage
            }
        ])
    ],
    declarations: [ControlsPage],
    providers: [
        
    ]
}
)
export class ControlsPageModule {}