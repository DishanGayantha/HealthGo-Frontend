import IPatient from "./patient";

export default interface IBed{
    bedId : string;
    wardId : string;
    patient  : IPatient;
    status : BedType;
}

enum BedType {
    AVAILABLE = 'AVAILABLE',
    RECEIVED = 'RECEIVED',
  }