import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [
  {
    id: uuid(),
    name: 'Miguel',
    lastName: 'Garcia',
    phoneNumber: '1234567890'
  },
  {
    id: uuid(),
    name: 'Juan',
    lastName: 'Perez',
    phoneNumber: '0987654321'
  }
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    if(!employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeetoUpdate = this.findOne(id);
    employeetoUpdate = {
      ...employeetoUpdate,
      ...updateEmployeeDto
    };
    this.employees = this.employees.map((employee) => {
      if(employee.id === id){
        employee = employeetoUpdate;
      }
      return employee;
    });
    return employeetoUpdate;
  }

  remove(id: string) {
    this.findOne(id);
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}
