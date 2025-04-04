import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Region } from "src/regions/entities/region.entity";

export class CreateLocationDto{
    @ApiProperty({
        default: "Locacion tal"
    })
    @IsString()
    @MaxLength(35)
    locationName: string;
    @ApiProperty({
        default: "Address tal"
    })
    @IsString()
    @MaxLength(160)
    locationAddress: string;
    @ApiProperty({
        default: [10,60]
    })
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
    @ApiPropertyOptional()
    @IsObject()
    @IsOptional()
    region: Region
    @IsUUID()
    @IsOptional()
    manager: string
}
