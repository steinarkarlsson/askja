import { templateSchema } from '@jucy-askja/common/schemas/Template';
import firestoreAdmin from './firestoreAdmin';
import { mapTemplate } from './mappers/mapTemplate';

const collection = firestoreAdmin.collection('template');
(async () => {
    const templateSnapshots = await collection.get();
    const data = templateSnapshots.docs.map((doc) => doc.data());

    for (const template of data) {
        const sanitizedTemplate = mapTemplate(template);
        templateSchema.parse(sanitizedTemplate);
        await collection.doc(template.id).set(sanitizedTemplate);
    }
})().catch(console.error);
