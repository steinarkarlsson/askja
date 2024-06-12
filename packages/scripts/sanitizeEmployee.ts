import { employeeSchema } from '@jucy-askja/common/schemas/Employee';
import firestoreAdmin from './firestoreAdmin';
import { mapEmployee } from './mappers/mapEmployee';


const collection = firestoreAdmin.collection('employee');
(async () => {
    const templateSnapshots = await collection.get();
    const data = templateSnapshots.docs.map((doc) => doc.data());

    for (const employee of data) {
        const sanitizedEmployee = mapEmployee(employee);
        employeeSchema.parse(sanitizedEmployee);
        console.log(sanitizedEmployee);
        await collection.doc(employee.id).set(sanitizedEmployee);
    }
})().catch(console.error);
