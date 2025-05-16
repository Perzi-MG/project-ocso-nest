import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";


export class CreateEmployeeDto{
    @ApiProperty({
        default: "Miguel"
    })
    @IsString()
    @MaxLength(30)
    employeeName: string;
    @ApiProperty({
        default: "Garcia"
    })
    @IsString()
    @MaxLength(70)
    employeeLastName: string;
    @ApiProperty({
        default: "4641712221"
    })
    @IsString()
    @MaxLength(10)
    employeePhoneNumber: string;
    @ApiProperty({
        default: "mgarciammej@gmail.com"
    })
    @IsString()
    @IsEmail()
    employeeEmail: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    location: Location | string;
    @IsOptional()
    employeePhoto: string;

}

