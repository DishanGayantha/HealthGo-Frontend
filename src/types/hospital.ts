export default interface IHospital{
    hospitalId : string;
    hospitalName : string;
    hospitalEmail : string;
    area : string;
    contactNumber : string;
    HospitalType : hospitalType
}

enum hospitalType {
    PRIVATE_HOSPITAL = "PRIVATE_HOSPITAL",
    PUBLIC_HOSPITAL = "PUBLIC_HOSPITAL",
}