import {Menu} from 'react-admin';

export const customMenu = () => {
        return (
            <Menu>
                <Menu.DashboardItem/>
                <Menu.Item to="/employee" primaryText="Employees" />
                <Menu.Item to="/review" primaryText="Reviews"/>
                <Menu.Item to="/reviewPeriod" primaryText="Review Periods"/>
                <Menu.Item to="/template" primaryText="Templates"/>
            </Menu>
    )
}