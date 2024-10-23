export class User {
    firstName: string;
    lastName: string;
    birthDate: Date | null;
    street: string;
    zipCode: number | null;
    city: string;
  
    constructor(obj?: User) {
      this.firstName = obj?.firstName ?? '';
      this.lastName = obj?.lastName ?? '';
      this.birthDate = obj?.birthDate ?? null;
      this.street = obj?.street ?? '';
      this.zipCode = obj?.zipCode ?? null;
      this.city = obj?.city ?? '';
    }
  }
  