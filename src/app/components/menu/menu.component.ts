import { Component, OnInit, NgModule, Inject, AfterViewInit } from '@angular/core';
import { MenuController, IonicModule, ModalController, NavController, ActionSheetController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  name : string = 'Nome';
  avatar : string = '../../../assets/img/avatar.png'
  constructor(private router: Router, private menu: MenuController, private AuthService: AuthService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  public navigate(url: string) {
    this.closeMenu();
    this.router.navigateByUrl(url);
  }

  async logout() {
   this.AuthService.logout();
  }

  closeMenu() {
    this.menu.close();
  }

}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
  providers: [
  ]
})
export class MenuComponentModule { }
