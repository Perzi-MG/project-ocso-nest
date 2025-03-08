import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Provider } from "src/providers/entities/provider.entity";

export class CreateProductDto{
    @ApiProperty({
        default: "UUID"
    })
    @IsString()
    @IsUUID("4")
    @IsOptional()
    productId: string;
    @ApiProperty({
        default: "Gansito"
    })
    @IsString()
    @MaxLength(40)
    productName: string;
    @ApiProperty({
        default: "15"
    })
    @IsNumber()
    price: number;
    @ApiProperty({
        default: "56"
    })
    @IsInt()
    countSeal: number;
    @ApiPropertyOptional()
    @IsObject()
    provider: Provider;

}
