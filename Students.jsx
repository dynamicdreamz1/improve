import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';
import { useState } from 'react';


const studentsDataComponent = () => {
 const [studentsData, setStudentsData] = useState([]);
 const [schoolsData, setSchoolsData] = useState([]);
 const [legalguardiansData, setLegalguardiansData] = useState([]);


 const onStudentsPick = async (studentIds) => {
   const studentPromises = studentIds.map((studentId) => fetchStudentData(studentId));
   const studentData = await Promise.all(studentPromises);

   const schoolPromises = studentData.map((student) => fetchSchoolData(student.schoolId));
   const schoolData = await Promise.all(schoolPromises);


   const legalguardianPromises = studentData.map((student) => fetchLegalguardianData(student.legalguardianId));
   const legalguardianData = await Promise.all(legalguardianPromises);


   setStudentsData([...studentsData, ...studentData]);
   setSchoolsData([...schoolsData, ...schoolData]);
   setLegalguardiansData([...legalguardiansData, ...legalguardianData]);
 };


 return (
   <>
     <StudentsPicker onPickHandler={onStudentsPick} />
     <StudentsTable
       studentsData={studentsData}
       schoolsData={schoolsData}
       legalguardiansData={legalguardiansData}
     />
   </>
 );
};


export default studentsDataComponent;

