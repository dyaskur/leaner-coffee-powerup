import {Trello} from './types/TrelloPowerUp';
import Debug from './utils/Debug';
import {LeanCoffeeBase, LeanCoffeeBaseParams} from './LeanCoffeeBase';
import {I18nConfig} from './utils/I18nConfig';

class LeanCoffeeAuth extends LeanCoffeeBase {
  t: Trello.PowerUp.IFrame;

  constructor({w, config}: LeanCoffeeBaseParams) {
    super({w, config});
    this.t = w.TrelloPowerUp.iframe({localization: I18nConfig, helpfulStacks: !this.isRunningInProduction()});
  }

  init(): void {
    if (!this.isRunningInProduction()) {
      (this.w.document.querySelector('.dev-only') as HTMLElement).style.display = 'block';
      this.w.document.getElementById('showData').addEventListener('click', this.showData.bind(this));
      this.w.document.getElementById('wipeData').addEventListener('click', this.wipeData.bind(this));
    }

    this.t.render(() => {
      this.t.localizeNode(document.body);
      this.t.sizeTo('#leanCoffeeSettingsForm');
    });
    var oauthUrl = window.origin + '/3rd-party/authorize.html';

    var authBtn = document.getElementById('authorize');
    authBtn.addEventListener('click', () => {
      this.t.authorize(oauthUrl)
        .then((token: any) => {
          return this.t.set('member', 'private', 'authToken', token)
        })
        .then(() =>  {
          return this.t.closePopup();
        });
    });
  }

  showData = async (evt: Event): Promise<void> => {
    evt.preventDefault();
    if (this.isRunningInProduction()) {
      return;
    }

    await Debug.showData(this.t);
  };

  wipeData = async (evt: Event): Promise<void> => {
    evt.preventDefault();
    if (this.isRunningInProduction()) {
      return;
    }

    await Debug.wipeData(this.t, this.cardStorage, this.boardStorage);
  };
}

export default LeanCoffeeAuth;
