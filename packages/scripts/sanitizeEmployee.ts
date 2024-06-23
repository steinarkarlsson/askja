const firestoreAdmin = require('./firestoreAdmin');
const mapEmployee = require('./mappers/mapEmployee').mapEmployee;
const employeeSchema = require('@jucy-askja/common/schemas/Employee').employeeSchema;


const collection = firestoreAdmin.collection('employee');
(async () => {
    const templateSnapshots = await collection.get();
    const data = templateSnapshots.docs.map((doc: { data: () => any; }) => doc.data());

    for (const employee of data) {
        const sanitizedEmployee = mapEmployee(employee);
        employeeSchema.parse(sanitizedEmployee);
        console.log(sanitizedEmployee);
        await collection.doc(employee.id).set(sanitizedEmployee);
    }
})().catch(console.error);
