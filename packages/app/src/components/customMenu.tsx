import React from 'react';
import {Menu} from 'react-admin';
import {useGetUserProfile} from '../hooks/useGetUserProfile';
import ReviewsIcon from '@mui/icons-material/Reviews';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import PeopleIcon from '@mui/icons-material/People';

export const CustomMenu = () => {
    const {data: user} = useGetUserProfile();

    const isAdmin = user?.role == 'admin';
    const isManager = user?.role == 'manager';

    return (
            <Menu>
                <Menu.Item to="/selfReview" primaryText="Self Review" leftIcon={<ReviewsIcon/>}/>
                <Menu.Item to="/employeeReview" primaryText="Employee Reviews" leftIcon={<ReviewsIcon/>}/>
                <Menu.Item to="/reviewPeriod" primaryText="Review Periods" leftIcon={<EditCalendarIcon/>}/>
                <Menu.Item to="/template" primaryText="Templates" leftIcon={<CalendarViewMonthIcon/>}/>
                <Menu.Item to="/employee" primaryText="Employees" leftIcon={<PeopleIcon/>}/>
            </Menu>
    );
};
