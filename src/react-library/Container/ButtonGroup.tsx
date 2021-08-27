import _ from 'lodash';
import React from 'react';
import Element from '../Element';
import PropTypes from 'prop-types';
import { ButtonGroupProps } from './types';

const ButtonGroup = ({
    config: {
        elements,
        buttonsContainerClass = 'buttons-container',
        buttonGroupClass = 'btn-group'
    }
}:ButtonGroupProps) => (
    <div className={ buttonsContainerClass }>
        <div className={ buttonGroupClass }>
            { _.map(elements, (element, key) =>
                <Element key={ key } config={ element } />)
            }
        </div>
    </div>
);

ButtonGroup.propTypes = {
    config: PropTypes.shape({
        buttonsContainerClass: PropTypes.string,
        buttonGroupClass: PropTypes.string,
        elements: PropTypes.object.isRequired
    })
}

export default ButtonGroup;
