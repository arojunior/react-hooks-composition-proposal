import { withProps } from './utils/hocFactory';
import { useFoo, useGithub } from './AppService';
import AppComponent from './AppComponent';

const AppContainer = withProps({
  useFoo,
  useGithub
})(AppComponent);

export default AppContainer;
