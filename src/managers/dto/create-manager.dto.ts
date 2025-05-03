import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";

export class CreateManagerDto{
    @ApiProperty({
        default: "Nombre tal"
    })
    @IsString()
    managerFullName: string;
    @ApiProperty({
        default: "manager@gmail.com"
    })
    @IsString()
    @IsEmail()
    managerEmail: string;
    @ApiProperty({
        default: "4832749827"
    })
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
    @ApiProperty({
        default: "4567"
    })
    @IsNumber()
    managerSalary: number;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    location: Location
}
