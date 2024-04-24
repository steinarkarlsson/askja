import * as React from 'react';
import {Layout} from 'react-admin';
import {JucyAppBar} from "./JucyAppBar";

export const JucyLayout = props => <Layout {...props} appBar={JucyAppBar} />;