import IAppointment from "./appointment";
import IMedicalHistory from "./medicalHistory";

export default interface IPatient{
    id: string;
    name: string;
    email: string;
    profileImage: File;
    address: string;
    age: number;
    gender: string;
    contactNumber: string;
    emergencyDial: string;
    Appointments : IAppointment[];
    medicalHistory : IMedicalHistory[];
}