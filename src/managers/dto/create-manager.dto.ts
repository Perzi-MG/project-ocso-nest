import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";

export class CreateManagerDto{
    @IsString()
    managerFullName: string;
    @IsString()
    @IsEmail()
    managerEmail: string;
    @IsNumber()
    managerPhoneNumber: string;
    @IsString()
    @MaxLength(16)
    managerSalary: number;
    @IsObject()
    @IsOptional()
    location: Location
}
