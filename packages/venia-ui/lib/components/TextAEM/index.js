import React from 'react';
import classes from './index.css';
import { MapTo, withModel } from '@adobe/aem-react-editable-components';

export const TextEditConfig = {
    emptyLabel: 'Text',
    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};

const Text = ({ cqPath, richText, text }) => {
    const richTextContent = () => (
        <div className={classes.aem_text} id={cqPath.substr(cqPath.lastIndexOf('/') + 1)} data-rte-editelement dangerouslySetInnerHTML={{__html: text}}/>
    );
    return richText ? richTextContent() : (<div className={classes.aem_text}>{text}</div>);
}

MapTo('we-retail-journal/components/text')(Text, TextEditConfig);

export default Text;


export const AEMText =  withModel(Text, { injectPropsOnInit: true });
