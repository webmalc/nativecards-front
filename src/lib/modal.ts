// import {NavParams, ViewController } from 'ionic-angular';
// import { BrowserProvider } from '../providers/browser/browser';
// import { User } from '../models/user';
// import { AuthServiceProvider } from '../providers/auth-service/auth-service';

// // Base modal page
// export class BaseModalPage {
//   public data;
//   public currentUser: User;

//   constructor(
//     public params: NavParams,
//     public viewCtrl: ViewController,
//     public browser: BrowserProvider,
//     public auth: AuthServiceProvider,
//   ) {
//     this.data = this.params.get('data');
//     this.auth.getUserInfo().then((user) => {
//       if (user) {
//         this.currentUser = user;
//       }
//     });
//   }

//   dismiss() {
//     this.viewCtrl.dismiss();
//   }

//   public goToMaxibooking(path: string = null) {
//     this.browser.go(this.currentUser, path);
//   }
// }
