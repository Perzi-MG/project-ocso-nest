import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Provider } from "../entities/provider.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProviderDto {
    @ApiProperty({
        default: "PepsiCo"
    })
    @IsString()
    @MaxLength(100)
    providerName: string;
    @ApiProperty({
        default: "provider@gmail.com"
    })
    @IsEmail()
    @IsString()
    providerEmail: string;
    @ApiProperty({
        default: "58768476"
    })
    @IsString()
    @MaxLength(15)
    @IsOptional()
    providerPhoneNumber: string;


}
