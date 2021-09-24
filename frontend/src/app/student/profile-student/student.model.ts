export class StudentModel {
  constructor(
    public _id: String,
    public Suid: String,

    public image: {
      data: any;
      contentType: String;
    },
    public imageUrl: any,
    public Name: string,
    public Email: string,
    public Phone: string,
    public Sex: string,
    public State: string,
    public District: string,
    public HighestQualification: string,
    public PassOfYear: string,

    public PinCode: number,
    public Course: string,
    public DOB: string,
    public Password: string,
    public ApprovalDate: string,
    public PaymentDate: string
  ) {}
}
