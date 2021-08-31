import Form, {FormInitProps} from './Form';
import './Field';
import './Container';
import './Template';
import Label from './Field/Label';
import ErrorMessage from './Field/ErrorMessage';
import Element from './Element';

import * as utils from './utils';
import * as registry from './registry';

import '@fortawesome/fontawesome-free/css/all.css';

export type FormProps = FormInitProps;
export { Form, Label, Element, ErrorMessage, registry, utils }
