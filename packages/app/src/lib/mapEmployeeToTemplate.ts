import {FirebaseDataProvider} from "react-admin-firebase";

export const mapEmployeeToTemplate = (employee)=> {
//pull in the templates from the database
    dataprovider.getMany('templates', {
        filter: {id: employee.templateId}
    })

//find if employee.jobTitle matches a template.jobTitle and return the template object if it does otherwise continue

//find if employee.level matches a template.level and return the template object if it does otherwise return null

}