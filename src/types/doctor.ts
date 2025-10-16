import IHospital from "./hospital";

export default interface IDoctor{
    id: string;
    name: string;
    email: string;
    specialization: string;
    workingHospitals: IHospital[];
}