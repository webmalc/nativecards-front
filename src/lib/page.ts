import { NavController, ToastController, LoadingController, Loading, } from 'ionic-angular';

// import { AuthServiceProvider } from '../providers/auth-service/auth-service';
// import { BrowserProvider } from '../providers/browser/browser';
import { User } from '../models/user';

export class BasePage {

  public loading: Loading;
  public reloadButton: boolean = false;
  public currentUser: User;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    // public auth: AuthServiceProvider,
    // public browser: BrowserProvider,
  ) {
    // this.auth.getUserInfo().then((user) => {
    //   if (user) {
    //     this.currentUser = user;
    //   }
    // });
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

  public showError(text) {
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
