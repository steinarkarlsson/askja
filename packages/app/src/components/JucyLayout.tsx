import * as React from 'react';
import {Layout} from 'react-admin';
import {JucyAppBar} from "./JucyAppBar";
import {customMenu} from "./customMenu";
// @ts-ignore
export const JucyLayout = (props) => <Layout {...props} appBar={JucyAppBar} menu={customMenu} sx={{alignItems:'center', height:'100vh', marginTop:10}}/>;