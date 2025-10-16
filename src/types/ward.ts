import IBed from "./Bed";
import IHospital from "./hospital";

export default interface IWard {
    wardId: string;
    hospital: IHospital;
    wardNo: number;
    beds: IBed[];
  }