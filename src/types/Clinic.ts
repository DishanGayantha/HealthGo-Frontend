import IDoctor from "./doctor";
import IPatient from "./patient";

export default interface IClinic {
    id: string;
    clinicName: string;
    doctor: IDoctor;
    patients: IPatient[];
}

