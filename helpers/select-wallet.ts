/**
 * Helper function to select wallet.
 * Navigates to selector screen, and then navigates back while resolving promise with selected wallet.
 *
 * @param navigateFunc {function} Function that does navigatino should be passed from outside
 * @param currentScreenName {string} Current screen name, so we know to what screen to get back to
 * @param chainType {string} One of `Chain.` constant to be used to filter wallet pannels to show
 * @param availableWallets {array} Wallets to be present in selector. If set, overrides `chainType`
 * @param noWalletExplanationText {string} Text that is displayed when there are no wallets to select from
 *
 * @returns {Promise<TWallet>}
 */
import { TWallet } from '../class/wallets/types';

export default function (
  navigateFunc: (scr: string | any, params?: any) => void,
  currentScreenName: string,
  chainType: string | null,
  availableWallets?: TWallet[],
  noWalletExplanationText = '',
): Promise<TWallet> {
  return new Promise((resolve, reject) => {
    if (!currentScreenName) return reject(new Error('currentScreenName is not provided'));

    const params: {
      chainType: string | null;
      availableWallets?: TWallet[];
      noWalletExplanationText?: string;
      onWalletSelect: (selectedWallet: TWallet) => void;
    } = {
      chainType: null,
      onWalletSelect: (selectedWallet: TWallet) => {},
    };
    if (chainType) params.chainType = chainType;
    if (availableWallets) params.availableWallets = availableWallets;
    if (noWalletExplanationText) params.noWalletExplanationText = noWalletExplanationText;

    params.onWalletSelect = function (selectedWallet: TWallet) {
      if (!selectedWallet) return;

      setTimeout(() => resolve(selectedWallet), 1);
      console.warn('trying to navigate back to', currentScreenName);
      navigateFunc({ name: currentScreenName, params: {}, merge: true });
    };

    navigateFunc('SelectWallet', params);
  });
}
