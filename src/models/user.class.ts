export class User {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date | null;
  street: string;
  zipCode: number | null;
  city: string;
  profileImageUrl: string;  

  constructor(obj?: Partial<User>) {
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.email = obj?.email ?? '';
    this.birthDate = obj?.birthDate ? new Date(obj.birthDate) : null;
    this.street = obj?.street ?? '';
    this.zipCode = obj?.zipCode ?? null;
    this.city = obj?.city ?? '';
    this.profileImageUrl = obj?.profileImageUrl ?? 'assets/user.png'; 
  }

  toJson() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate instanceof Date ? this.birthDate.toISOString() : this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      profileImageUrl: this.profileImageUrl,  
    };
  }
}
