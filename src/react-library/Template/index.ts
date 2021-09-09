import { registerTemplate } from '../registry';
import Default from './Default';
import HTMLTag from './HTMLTag';

registerTemplate('default', Default);
registerTemplate('html', HTMLTag)