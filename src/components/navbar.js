import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/menu/menu-item.js';
import '@material/web/menu/menu.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/tabs/tabs.js';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const navMenuKeys = new Map([
  ['mydetails', { path: '/details' }],
  ['logout', { path: '/logout' }],
  ['help', { path: '/help' }],
  ['signin', {}],
]);

const onChoose = ({ target }) => {
  target.nextElementSibling?.show();
};

class NavBar extends LitElement {
  @property()
  accessor navTitle = '';

  render() {
    return html`<div class="navbar-container">
        <header class="top-app-bar admin-tabbar">
          <div class="top-app-bar-row admin-tabbar-row">
            <section
              class="top-app-bar-section top-app-bar-section-align-start"
            >
              <div class="top-app-bar-tla">Westmuir Web</div>
            </section>
            <section class="top-app-bar-section top-app-bar-section-align-end">
              <md-outlined-button @click=${this.onClick}
                >Stuff</md-outlined-button
              >
            </section>
          </div>
        </header>
      </div>

      <div class="top-app-bar-fixed-adjust"></div>`;
  }

  onClick() {
    console.log('on click');
  }
}

@customElement('ww-navbar')
export class WWNavBarNav extends NavBar {
  static styles = css`
    .navbar-container {
      position: relative;
      z-index: 20;
      flex-shrink: 0;
    }

    .navbar-container {
      position: relative;
      z-index: 20;
      flex-shrink: 0;
    }

    .top-app-bar-tla {
      margin-left: 10px;
      font-family: var(--md-sys-typescale-headline-small-font);
      font-weight: var(--md-sys-typescale-headline-small-weight);
    }

    .top-app-bar-logo {
      width: 32px;
    }

    .top-app-bar .top-app-bar-logo {
      width: 32px;
    }

    .top-app-bar .top-app-bar-tla {
      margin-left: 10px;
      font-weight: 700;
    }

    @media only screen and (750px <= width) {
      .top-app-bar-narrow {
        display: none;
      }
    }

    @media only screen and (width > 750px) {
      .top-app-bar-wide {
        display: none;
      }
    }

    .top-app-bar {
      position: fixed;
      z-index: 4;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      box-sizing: border-box;
      width: 100%;

      color: #fff;

      background-color: #0b4014;
      background-color: var(--mdc-theme-primary, #0b4014);
    }

    .top-app-bar-dense .top-app-bar-row.admin-tabbar-row {
      height: 48px;
    }

    .admin-tabbar .admin-tabbar-tabs {
      --mdc-typography-button-font-size: 14px;
      --md-sys-color-on-surface-variant: white;
      --md-sys-color-surface: auto;
    }

    .admin-tabbar-tabs::part(divider) {
      --md-divider-color: #0b4014;
    }

    .top-app-bar-fixed-adjust {
      padding-top: 64px;
    }

    .top-app-bar-dense-fixed-adjust {
      padding-top: 48px;
    }

    .top-app-bar-row {
      position: relative;
      z-index: 1;

      display: flex;

      box-sizing: border-box;
      width: 100%;
      height: 64px;
    }

    .top-app-bar .top-app-bar-row:nth-of-type(1) {
      z-index: 2;
    }

    .top-app-bar-section-align-start {
      justify-content: flex-start;
      order: -1;
    }

    .top-app-bar-section-align-end {
      justify-content: flex-end;
      order: 1;
    }

    .top-app-bar-section {
      z-index: 1;

      display: inline-flex;
      flex: 1 1 auto;
      align-items: center;

      min-width: 0;
      padding: 8px 12px;
    }
  `;
}
