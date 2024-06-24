import React from 'react';
import {Menu} from 'react-admin';
import {useGetUserProfile} from '../hooks/useGetUserProfile';
import ReviewsIcon from '@mui/icons-material/Reviews';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import CategoryIcon from '@mui/icons-material/Category';
import {Divider, Typography} from '@mui/material';

export const CustomMenu = () => {
    const {data: user} = useGetUserProfile();

    const isAdmin = user?.role == 'admin';
    const isManager = user?.role == 'manager';

    return (
            !isAdmin && !isManager ? null : (
            isAdmin ? (
                    <Menu>
                        <Typography variant="h6" color="textSecondary" sx={{paddingLeft: 2}}>Reviews</Typography>
                        <Menu.Item to="/selfReview" primaryText="KPI Review" leftIcon={<ReviewsIcon/>}/>
                        <Menu.Item to="/employeeReview" primaryText="Employee Reviews" leftIcon={<ReviewsIcon/>}/>
                        <Menu.Item to="/hrReview" primaryText="HR Reviews" leftIcon={<ReviewsIcon/>}/>
                        <Divider/>
                        <Typography variant="h6" color="textSecondary" sx={{paddingLeft: 2}}>Admin</Typography>
                        <Menu.Item to="/reviewPeriod" primaryText="Review Periods" leftIcon={<EditCalendarIcon/>}/>
                        <Menu.Item to="/template" primaryText="Templates" leftIcon={<CalendarViewMonthIcon/>}/>
                        <Menu.Item to="/employee" primaryText="Employees" leftIcon={<PeopleIcon/>}/>
                        <Menu.Item to="/employeeLevel" primaryText="Employee Levels" leftIcon={<StarIcon/>}/>
                        <Menu.Item to="/competencyCategory" primaryText="KPI Categories" leftIcon={<CategoryIcon/>}/>
                    </Menu>
                    ) : isManager ? (
                    <Menu>
                        <Typography variant="h6" color="textSecondary" sx={{paddingLeft: 2}}>Reviews</Typography>
                        <Menu.Item to="/selfReview" primaryText="KPI Review" leftIcon={<ReviewsIcon/>}/>
                        <Menu.Item to="/employeeReview" primaryText="Employee Reviews" leftIcon={<ReviewsIcon/>}/>
                        <Divider/>
                        <Typography variant="h6" color="textSecondary" sx={{paddingLeft: 2}}>Admin</Typography>
                        <Menu.Item to="/employee" primaryText="Employees" leftIcon={<PeopleIcon/>}/>
                    </Menu>
            ): null)
    );
};
