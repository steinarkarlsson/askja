export const styles =
    {
        '& .RaSimpleFormIterator-form': {
            display: 'grid',
            gridTemplateColumns: '150px 500px auto auto auto',
            gap: 2,
            marginTop: '20px',
        },
        '& .category': {
            gridColumn: '1 / 1',
            gridRow: '1 / 1',
            fontSize: '20px',
            marginTop: '3px',
        },
        '& .MuiTypography-body2': {
            fontSize: '20px',
        },
        '& .title': {
            gridColumn: '2 / 4',
            gridRow: '1 / 2',
        },

        '& .description': {
            gridColumn: '2 / 4',
            gridRow: '2 / 2',
            marginTop: '42px',
        },
        '& .managerApproved': {
            gridColumn: '4 / 4',
            gridRow: '1 / 2',
        },
        '& .managerComment': {
            gridColumn: '4 / 4',
            gridRow: '2 / 2',
            marginTop: '42px',
        },
        '& .hrApproved': {
            gridColumn: '5 / 5',
            gridRow: '1 / 2',
            marginTop: '0px',
        },
        '& .hrComment': {
            gridColumn: '5 / 5',
            gridRow: '2 / 2',
        },
        '& .hrFeedback': {
            gridColumn: '5 / 5',
            gridRow: '2 / 2',
        },
        '& .managerFeedback': {
            gridColumn: '4 / 4',
            gridRow: '2 / 2',
        },
    };
