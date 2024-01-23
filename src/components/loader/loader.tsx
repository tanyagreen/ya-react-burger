import React from 'react';
import loaderStyles from './loader.module.css';

const Loader = (): JSX.Element => {
    return (
        <div className={loaderStyles.wrapper}>
            <div className={loaderStyles.loader} />
        </div>
    );
};

export default Loader;
