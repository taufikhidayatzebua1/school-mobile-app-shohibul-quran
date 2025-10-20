import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  /**
   * Show loading indicator
   */
  async showLoading(message: string = 'Memuat...', duration?: number) {
    this.loading = await this.loadingController.create({
      message,
      duration,
      spinner: 'crescent'
    });
    await this.loading.present();
    return this.loading;
  }

  /**
   * Hide loading indicator
   */
  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

  /**
   * Show toast notification
   */
  async showToast(
    message: string,
    duration: number = 3000,
    color: 'success' | 'warning' | 'danger' | 'primary' | 'secondary' | 'tertiary' | 'medium' | 'light' | 'dark' = 'primary',
    position: 'top' | 'bottom' | 'middle' = 'top'
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
    return toast;
  }

  /**
   * Show success toast
   */
  async showSuccess(message: string) {
    return this.showToast(message, 3000, 'success');
  }

  /**
   * Show error toast
   */
  async showError(message: string) {
    return this.showToast(message, 4000, 'danger');
  }

  /**
   * Show warning toast
   */
  async showWarning(message: string) {
    return this.showToast(message, 3000, 'warning');
  }

  /**
   * Show alert dialog
   */
  async showAlert(
    header: string,
    message: string,
    buttons: any[] = ['OK']
  ) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons
    });
    await alert.present();
    return alert;
  }

  /**
   * Show confirmation dialog
   */
  async showConfirm(
    header: string,
    message: string,
    confirmText: string = 'Ya',
    cancelText: string = 'Tidak'
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: confirmText,
            role: 'confirm',
            handler: () => resolve(true)
          }
        ]
      });
      await alert.present();
    });
  }
}
