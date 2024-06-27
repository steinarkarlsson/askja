import {ArrayField, Datagrid, ReferenceField, RichTextField, Show, SimpleShowLayout, TextField} from 'react-admin';
import React from 'react';
import {Box, Grid} from '@mui/material';

export const ReviewShow = (props: any) => (
        <Box sx={{margin: 5}}>
            <Show {...props} actions={false}>
                <Grid container spacing={2} sx={{marginTop: 3, marginX: 5}}>
                    <Grid item xs={6}>
                        <SimpleShowLayout>
                            <TextField source="employeeName"/>
                            <TextField source="jobTitle"/>
                            <ReferenceField source="manager" reference="employee" link={false}/>
                        </SimpleShowLayout>
                    </Grid>
                    <Grid item xs={6}>
                        <SimpleShowLayout>
                            <TextField source="reviewPeriodName"/>
                            <TextField source="status"/>
                        </SimpleShowLayout>
                    </Grid>
                </Grid>
                <SimpleShowLayout>
                    <ArrayField source="competencies">
                        <Datagrid bulkActionButtons={false}>
                            <Box display="flex" alignItems="flex-start">
                                <ReferenceField link={false} source="competencyCategory" reference="competencyCategory"
                                                sx={{fontSize: '20px'}}/>
                            </Box>
                            <Box display="flex" alignItems="flex-start">
                                <TextField source="title" sx={{fontSize: '16px'}}/>
                            </Box>
                            <RichTextField source="description"/>
                        </Datagrid>
                    </ArrayField>
                </SimpleShowLayout>
            </Show>
        </Box>
);
