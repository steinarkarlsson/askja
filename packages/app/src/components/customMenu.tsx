import React from 'react';
import {Menu} from 'react-admin';
import {useGetUserProfile} from '../hooks/useGetUserProfile';
import ReviewsIcon from '@mui/icons-material/Reviews';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import CategoryIcon from '@mui/icons-material/Category';

export const CustomMenu = () => {
    const {data: user} = useGetUserProfile();

    const isAdmin = user?.role == 'admin';
    const isManager = user?.role == 'manager';

    return (
            <Menu>
                <Menu.Item to="/selfReview" primaryText="Self Review" leftIcon={<ReviewsIcon/>}/>
                {isAdmin || isManager ? <Menu.Item to="/employeeReview" primaryText="Employee Reviews" leftIcon={<ReviewsIcon/>}/> : null}
                {isAdmin ? <Menu.Item to="/hrReview" primaryText="HR Reviews" leftIcon={<ReviewsIcon/>}/> : null}
                {isAdmin ? <Menu.Item to="/reviewPeriod" primaryText="Review Periods" leftIcon={<EditCalendarIcon/>}/> : null}
                {isAdmin ? <Menu.Item to="/template" primaryText="Templates" leftIcon={<CalendarViewMonthIcon/>}/> : null}
                {isAdmin || isManager ? <Menu.Item to="/employee" primaryText="Employees" leftIcon={<PeopleIcon/>}/> : null}
                {isAdmin ? <Menu.Item to="/employeeLevel" primaryText="Employee Levels" leftIcon={<StarIcon/>}/> : null}
                {isAdmin ? <Menu.Item to="/competencyCategory" primaryText="KPI Categories" leftIcon={<CategoryIcon/>}/> : null}
            </Menu>
    );
};
