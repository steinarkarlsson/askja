export const styles =
    {
        '& .RaSimpleFormIterator-form': {
            display: 'grid',
            gridTemplateColumns: '200px 500px auto auto auto',
            gap: 2,
            marginTop: '20px',
        },
        '& .category': {
            gridColumn: '1 / 1',
            gridRow: '1 / 1',
        },
        '& .MuiTypography-body2': {
            fontSize: '16px',
        },
        '& .title': {
            gridColumn: '2 / 4',
            gridRow: '1 / 2',
        },

        '& .description': {
            gridColumn: '2 / 4',
            gridRow: '2 / 2',
        },
        '& .managerApproved': {
            gridColumn: '4 / 4',
            gridRow: '1 / 2',
        },
        '& .managerComment': {
            gridColumn: '4 / 4',
            gridRow: '2 / 2',
        },
        '& .hrApproved': {
            gridColumn: '5 / 5',
            gridRow: '1 / 2',
        },
        '& .hrComment': {
            gridColumn: '5 / 5',
            gridRow: '2 / 2',
        },
        '& .hrFeedback': {
            gridColumn: '5 / 5',
            gridRow: '1 / 1',
        },
        '& .managerFeedback': {
            gridColumn: '4 / 4',
            gridRow: '1 / 1',
        },
    };
