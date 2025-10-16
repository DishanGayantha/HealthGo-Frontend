export default interface IAppointment {
    appointmentId : string;
    patientId : string;
    doctorId : string;
    hospitalId : string;
    date : string;
    time : string;
    type : string;
    paymentStatus : PaymentStatus;
    isPaid : boolean;
} 

enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}