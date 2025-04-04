import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {

    @PrimaryGeneratedColumn('increment')
    locationId: number;
    @ApiProperty({
        default: "OCSO Juriquilla"
    })
    @Column('text')
    locationName: string;
    @ApiProperty({
        default: "Avenida tal"
    })
    @Column('text')
    locationAddress: string;
    @ApiProperty({
        default: [24,67]
    })
    @Column('simple-array')
    locationLatLng: number[];
    
    @ApiProperty({default: "25c6494f-7055-4240-8286-d84814ed25b9"})
    @OneToOne(() => Manager, {
        eager: true
    })
    @JoinColumn({
        name: 'managerId'
    })
    manager: Manager | string;

    @ManyToOne(() => Region, region => region.locations)
    @JoinColumn({
        name: 'regionId'
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];

}
