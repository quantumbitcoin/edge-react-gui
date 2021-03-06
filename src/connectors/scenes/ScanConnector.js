// @flow

import { connect } from 'react-redux'

import { qrCodeScanned, toggleAddressModal } from '../../actions/ScanActions'
import { selectWalletFromModal } from '../../actions/WalletActions.js'
import Scan from '../../components/scenes/ScanScene'
import { getCameraPermission } from '../../modules/permissions/PermissionsSelectors'
import type { Dispatch, State } from '../../modules/ReduxTypes'

const mapStateToProps = (state: State) => ({
  cameraPermission: getCameraPermission(state),
  torchEnabled: state.ui.scenes.scan.torchEnabled,
  scanEnabled: state.ui.scenes.scan.scanEnabled,
  showToWalletModal: state.ui.scenes.walletListModal.walletListModalVisible
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  qrCodeScanned: data => dispatch(qrCodeScanned(data)),
  toggleEnableTorch: () => dispatch({ type: 'TOGGLE_ENABLE_TORCH' }),
  toggleAddressModal: () => dispatch(toggleAddressModal()),
  onSelectWallet: (walletId: string, currencyCode: string) => dispatch(selectWalletFromModal(walletId, currencyCode))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scan)
