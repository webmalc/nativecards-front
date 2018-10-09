import { NavController, ToastController, LoadingController, Loading } from 'ionic-angular';

import { AuthProvider } from '../providers/auth/auth';
import { User } from '../models/user';

export class BasePage {

  public loading: Loading;
  public reloadButton: boolean = false;
  public user: User;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public auth: AuthProvider,
  ) {
    this.auth.getUserInfo().then((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  public showLoading() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      this.loading.present();
    }
  }

  public dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  public showMessage(text: string = 'Oops, something went wrong!') {
    this.dismissLoading();
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  public reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}
