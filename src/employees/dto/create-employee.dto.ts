import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";

export class LocationEmployeeDto extends Location{
    @ApiProperty()
    declare locationId: number;
    @ApiPropertyOptional()
    declare locationName: string;
    @ApiPropertyOptional()
    declare locationLatLng: number[];
    @ApiPropertyOptional()
    declare locationAddress: string;
}


export class CreateEmployeeDto{
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    employeeName: string;
    @ApiProperty()
    @IsString()
    @MaxLength(70)
    employeeLastName: string;
    @ApiProperty()
    @IsString()
    @MaxLength(10)
    employeePhoneNumber: string;
    @ApiProperty()
    @IsString()
    @IsEmail()
    employeeEmail: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    location: LocationEmployeeDto;

}

